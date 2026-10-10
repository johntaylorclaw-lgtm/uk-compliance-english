/* ============================================================
   Day-07 复核：脚本语法 / 词表条数 / 朗读内嵌 / 模拟渲染 / 打卡项
   + 与 Anki 队列交叉校验（position 500–599 ↔ 词表 601–700 行）
   用法：node _verify_day07.js [ankiSnapshotPath]

   注：原脚本硬编码 D:/英语培训教程（原作者本机路径），
       此处改为 __dirname 向上两级，项目可整体搬移。
   ============================================================ */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const DIR = path.resolve(__dirname, '..');
const FILE = path.join(DIR, 'Day-07.html');
if (!fs.existsSync(FILE)) { console.error('!! Day-07.html 不存在'); process.exit(1); }
const html = fs.readFileSync(FILE, 'utf8');

const EXP_SEGS = 'A4,A8,B2';   // _schedule.js Day 7 = 第1周测评与复盘，复读本阶段最卡三段
const EXP_TOTAL = 140;         // 周测日打卡项更多：LISTS 34 + ckPron 6 + 词表 100

let bad = 0;
const ok = m => console.log('   OK  ' + m);
const no = m => { bad++; console.log('   !!  ' + m); };

console.log('── Day-07.html ──');

/* 1. 标记块 */
['/*PRON_CSS_START*/', '/*PRON_CSS_END*/', '<!--PRON_MODULE_START-->', '<!--PRON_MODULE_END-->',
 '<!--PRON_JS_START-->', '<!--PRON_JS_END-->', 'id="prWrap"', 'id="ckPron"',
 'id="vocabBody"', 'id="vocab2Body"', 'id="rateWrap"', 'id="barAll"', 'id="statPct"',
 'id="ckSetup"', 'id="ckListen"', 'id="ckSpeak"', 'id="ckWrite"', 'id="ckWrap"']
  .forEach(m => html.indexOf(m) > -1 ? ok(m) : no('缺少 ' + m));

['/*PRON_CSS_START*/', '<!--PRON_MODULE_START-->', '<!--PRON_MODULE_END-->',
 '<!--PRON_JS_START-->', '<!--PRON_JS_END-->', 'id="prWrap"', 'id="ckPron"']
  .forEach(m => { const n = html.split(m).length - 1; if (n !== 1) no(m + ' 出现 ' + n + ' 次（应为 1）'); });

['ckSetup', 'ckListen', 'ckSpeak', 'ckWrite', 'ckWrap']
  .forEach(id => { const n = html.split('id="' + id + '"').length - 1; if (n !== 1) no('#' + id + ' 容器出现 ' + n + ' 次（应为 1）'); });

console.log('   单文件结构：<script> x' + (html.match(/<script>/g) || []).length +
            '　</script> x' + (html.match(/<\/script>/g) || []).length +
            '　嵌套 <script><script>: ' + ((html.match(/<script>\s*<script>/g) || []).length ? '有 !!' : '无'));
if ((html.match(/<script>/g) || []).length !== (html.match(/<\/script>/g) || []).length) no('<script> 与 </script> 数量不等');

/* 2. 模块编号顺序 */
const modOrder = [...html.matchAll(/<b>0\d<\/b><span>([A-Z]+)<\/span>/g)].map(m => m[1]);
console.log('   模块顺序：' + modOrder.join(' → '));
if (modOrder.join(',') !== 'WARMUP,LISTEN,VOCAB,PRON,SPEAK,WRITE') no('模块编号/顺序异常');

/* 3. 脚本语法 */
const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
scripts.forEach((s, i) => {
  try { new Function(s); ok('script #' + i + ' 语法通过（' + s.length + ' 字符）'); }
  catch (e) { no('script #' + i + ' 语法失败: ' + e.message); }
});

/* 4. 模拟渲染 */
function mkEl(id) {
  return {
    id, innerHTML: '', className: '', textContent: '', style: {}, dataset: {}, _kids: [],
    classList: {
      _s: new Set(),
      add(c) { this._s.add(c); }, remove(c) { this._s.delete(c); },
      toggle(c, v) { v ? this._s.add(c) : this._s.delete(c); }, contains(c) { return this._s.has(c); }
    },
    appendChild(c) { this._kids.push(c); }, addEventListener() {}, querySelectorAll() { return []; }
  };
}
const nodes = {};
const store = {};
const sandbox = {
  console,
  document: {
    getElementById: id => (nodes[id] = nodes[id] || mkEl(id)),
    querySelector: s => { const k = s.replace('#', ''); return (nodes[k] = nodes[k] || mkEl(s)); },
    querySelectorAll: () => [],
    createElement: t => Object.assign(mkEl(t), { tagName: t.toUpperCase() }),
    addEventListener() {}
  },
  localStorage: { getItem: k => store[k] || null, setItem: (k, v) => { store[k] = v; }, removeItem: k => { delete store[k]; } },
  window: {}, alert: () => {}
};
sandbox.window = sandbox; sandbox.globalThis = sandbox;
vm.createContext(sandbox);
try {
  scripts.forEach((s, i) => vm.runInContext(s, sandbox, { filename: 'script' + i }));
  ok('全部脚本执行通过');
} catch (e) { no('执行抛错: ' + e.message + '\n       ' + (e.stack || '').split('\n')[1]); }

/* 5. 数据断言 */
const W = sandbox.WORDS || [], E = sandbox.EXTRA || [];
console.log('   精讲 WORDS=' + W.length + '（期望 30）　拓展 EXTRA=' + E.length + '（期望 70）');
if (W.length !== 30) no('精讲条数不是 30');
if (E.length !== 70) no('拓展条数不是 70');
const dup = new Set([...W.map(x => x[0].toLowerCase()), ...E.map(x => x[0].toLowerCase())]);
console.log('   两档合计去重 = ' + dup.size + '（期望 100）');
if (dup.size !== 100) no('两档有重复或缺失');
W.forEach(w => { if (!w[1] || !w[2] || !w[3] || !w[4]) no('精讲条目字段缺失: ' + w[0]); });

/* 6. 音标格式与 HTML 标签配平 */
W.forEach(w => {
  if (!/^\/.+\/$/.test(String(w[1]).trim())) no('音标格式可疑: ' + w[0] + ' → ' + w[1]);
  const tip = String(w[5] || '');
  const open = (tip.match(/<b>/g) || []).length, close = (tip.match(/<\/b>/g) || []).length;
  if (open !== close) no('提示字段粗体不配平: ' + w[0] + ' (' + open + '/' + close + ')');
  if (/\/b>/.test(tip) && /[^<]\/b>/.test(tip)) no('提示字段含畸形标签: ' + w[0]);
});

const P = sandbox.PRON_DAY || [];
console.log('   内嵌朗读段 = ' + P.length + ' → ' + P.map(s => s.id).join(' / '));
if (P.map(s => s.id).join(',') !== EXP_SEGS) no('朗读段与 _schedule.js Day 7 不一致（期望 ' + EXP_SEGS + '）');
P.forEach(s => {
  if (!s.text || !s.points || !s.points.length || !s.zh) no(s.id + ' 数据不完整');
  if (!s.why) no(s.id + ' 缺「今天为什么读这段」');
});
console.log('   朗读总词数 = ' + P.reduce((a, s) => a + (s.words || 0), 0));

const wrap = nodes['prWrap'];
const ck = nodes['ckPron'];
if (!wrap) no('未渲染 #prWrap');
else {
  const nSeg = (wrap.innerHTML.match(/class="prseg"/g) || []).length;
  const nSay = (wrap.innerHTML.match(/data-say=/g) || []).length;
  const nSlow = (wrap.innerHTML.match(/data-slow=/g) || []).length;
  const leftU = (wrap.innerHTML.match(/_/g) || []).length;
  const leftS = (wrap.innerHTML.match(/\*/g) || []).length;
  const leftT = (wrap.innerHTML.match(/~/g) || []).length;
  console.log('   渲染：段=' + nSeg + ' 英式朗读按钮=' + nSay + ' 慢速按钮=' + nSlow +
              ' 残留标记 _/*/~ = ' + leftU + '/' + leftS + '/' + leftT);
  if (nSeg !== P.length) no('渲染段数与数据不符');
  if (leftU + leftS + leftT) no('渲染后有残留标记符');
  if (nSay !== P.length || nSlow !== P.length) no('朗读按钮数量与段数不符');
}
if (ck) console.log('   朗读打卡项 = ' + ck._kids.length + '（3 条通用 + 每段 1 条 = ' + (3 + P.length) + '）');
else no('未渲染 #ckPron');

/* 7. 打卡项总数 */
const L = sandbox.LISTS || {};
console.log('   打卡清单：' + Object.keys(L).map(k => k + '=' + L[k].length).join('  '));
const totalCk = Object.keys(L).reduce((a, k) => a + L[k].length, 0);
console.log('   打卡项合计 = ' + totalCk + '　+ 词表 100 = ' + (totalCk + 100) + '（期望 ' + EXP_TOTAL + '）');
if (totalCk + 100 !== EXP_TOTAL) no('总项数不是 ' + EXP_TOTAL);
if (html.indexOf('var LS = "ukce_day07"') < 0) no('localStorage 键不是 ukce_day07');
else ok('localStorage 键 ukce_day07');

/* 8. 周测日专项：跨日残留与测评结构 */
const stripped = html
  .replace(/<!--PRON_MODULE_START-->[\s\S]*?<!--PRON_MODULE_END-->/, '')
  .replace(/<!--PRON_JS_START-->[\s\S]*?<!--PRON_JS_END-->/, '');
['ukce_day06', 'Day-06 · ', 'Day 06 · '].forEach(k => {
  if (stripped.indexOf(k) > -1) no('残留前一日标识: ' + k);
});
if (!/第 1 周测评|周测/.test(html)) no('缺少「周测/测评」结构');
else ok('含周测日结构');

/* 9. 与 Anki 交叉校验 */
const snap = process.argv[2];
if (snap && fs.existsSync(snap)) {
  console.log('\n── 与 Anki 队列交叉校验 ──');
  const { execFileSync } = require('child_process');
  const pyFile = path.join(require('os').tmpdir(), '_verify_day07_anki.py');
  fs.writeFileSync(pyFile, `
# -*- coding: utf-8 -*-
import sqlite3, io, sys, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
con = sqlite3.connect(r"${snap.replace(/\\/g, '/')}")
con.create_collation("unicase", lambda a,b:(a.lower()>b.lower())-(a.lower()<b.lower()))
c = con.cursor()
rows = c.execute("select cd.due, n.sfld from cards cd join notes n on n.id=cd.nid where cd.type=0 and cd.queue=0 order by cd.due asc limit 100").fetchall()
print(json.dumps({"pos0": rows[0][0], "posN": rows[-1][0], "words": [r[1] for r in rows]}, ensure_ascii=False))
`, 'utf8');
  const PY = ['C:/Users/Administrator/.workbuddy/binaries/python/versions/3.13.12/python.exe', 'python', 'python3'];
  let out = null, errs = [];
  for (const bin of PY) {
    try { out = JSON.parse(execFileSync(bin, [pyFile], { encoding: 'utf8' }).trim()); break; }
    catch (e) { errs.push(bin + ': ' + String(e.message).split('\n')[0]); }
  }
  if (out) {
    console.log('   Anki 下一批 100 张 position：' + out.pos0 + ' ~ ' + out.posN + '（页面区间应为 500–599）');
    const page = new Set([...W.map(x => x[0]), ...E.map(x => x[0])]);
    const anki = new Set(out.words);
    const onlyPage = [...page].filter(x => !anki.has(x));
    const onlyAnki = [...anki].filter(x => !page.has(x));
    console.log('   页面有而Anki 没有：' + (onlyPage.length ? onlyPage.join(' | ') : '（空）'));
    console.log('   Anki 有而页面没有：' + (onlyAnki.length ? onlyAnki.join(' | ') : '（空）'));
    console.log('   集合完全一致：' + (page.size === anki.size && !onlyPage.length && !onlyAnki.length));
    if (onlyPage.length || onlyAnki.length) no('与 Anki 队列不一致');
  } else {
    console.log('   （Anki 快照读取失败，跳过：' + errs.join(' ｜ ') + '）');
  }
} else {
  console.log('\n（未提供 Anki 快照路径，跳过交叉校验）');
}

console.log('\n' + (bad ? '!! 有 ' + bad + ' 项未通过' : '全部通过'));
process.exit(bad ? 1 : 0);
