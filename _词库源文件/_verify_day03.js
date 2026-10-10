/* ============================================================
   Day-03 复核：脚本语法 / 词表条数 / 朗读内嵌 / 模拟渲染 / 打卡项
   用法：node _verify_day03.js
   ============================================================ */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const DIR = path.resolve(__dirname, '..');   // 原为硬编码 D:/英语培训教程（原作者本机路径）
const FILE = path.join(DIR, 'Day-03.html');
const html = fs.readFileSync(FILE, 'utf8');

let bad = 0;
const ok = m => console.log('   OK  ' + m);
const no = m => { bad++; console.log('   !!  ' + m); };

console.log('── Day-03.html ──');

/* 1. 标记块 */
['/*PRON_CSS_START*/', '<!--PRON_MODULE_START-->', '<!--PRON_JS_START-->',
 'id="prWrap"', 'id="ckPron"'].forEach(m => html.indexOf(m) > -1 ? ok(m) : no('缺少 ' + m));
console.log('   单文件结构：<script> x' + (html.match(/<script>/g) || []).length +
            '　</script> x' + (html.match(/<\/script>/g) || []).length +
            '　嵌套 <script><script>: ' + ((html.match(/<script>\s*<script>/g) || []).length ? '有 !!' : '无'));

/* 2. 脚本语法 */
const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
scripts.forEach((s, i) => {
  try { new Function(s); ok('script #' + i + ' 语法通过（' + s.length + ' 字符）'); }
  catch (e) { no('script #' + i + ' 语法失败: ' + e.message); }
});

/* 3. 模拟渲染 */
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
    querySelector: s => (nodes[s.replace('#', '')] = nodes[s.replace('#', '')] || mkEl(s)),
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

/* 4. 数据断言 */
const W = sandbox.WORDS || [], E = sandbox.EXTRA || [];
console.log('   精讲 WORDS=' + W.length + '（期望 30）　拓展 EXTRA=' + E.length + '（期望 70）');
if (W.length !== 30) no('精讲条数不是 30');
if (E.length !== 70) no('拓展条数不是 70');
const dup = new Set([...W.map(x => x[0].toLowerCase()), ...E.map(x => x[0].toLowerCase())]);
console.log('   两档合计去重 = ' + dup.size + '（期望 100）');
if (dup.size !== 100) no('两档有重复或缺失');

const P = sandbox.PRON_DAY || [];
console.log('   内嵌朗读段 = ' + P.length + ' → ' + P.map(s => s.id).join(' / '));
if (P.map(s => s.id).join(',') !== 'A8,A5,B11') no('朗读段与 _schedule.js Day 3 不一致');
P.forEach(s => {
  if (!s.text || !s.points || !s.points.length || !s.zh) no(s.id + ' 数据不完整');
  if (!s.why) no(s.id + ' 缺「今天为什么读这段」');
});
const rawW = P.reduce((a, s) => a + (s.words || 0), 0);
console.log('   朗读总词数 = ' + rawW);

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
}
if (ck) console.log('   朗读打卡项 = ' + ck._kids.length + '（3 条通用 + 每段 1 条 = ' + (3 + P.length) + '）');
else no('未渲染 #ckPron');

const L = sandbox.LISTS || {};
console.log('   打卡清单：' + Object.keys(L).map(k => k + '=' + L[k].length).join('  '));
console.log('   进度：' + (nodes['progText'] ? nodes['progText'].textContent : '(无)'));
console.log('   localStorage 键：' + Object.keys(store).join(', '));

console.log('\n' + (bad ? '!! 有 ' + bad + ' 项未通过' : '全部通过'));
process.exit(bad ? 1 : 0);
