/* Day-07 术语测自动判分的独立测试（不进verify 脚本，仅本地验证用）
   用法：node _test_quiz07.js   —— 在项目根目录执行 */
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const DIR = path.resolve(__dirname);
const html = fs.readFileSync(path.join(DIR, 'Day-07.html'), 'utf8');

const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const inputs = [...html.matchAll(/<input class="qin" data-q="(\d+)"/g)].map(m => +m[1]);
const ress = [...html.matchAll(/class="qres" data-res="(\d+)"/g)].map(m => +m[1]);
console.log('解析到 input ' + inputs.length + ' 个，qres ' + ress.length + ' 个');
if (inputs.length !== 100 || ress.length !== 100) { console.log('!! 数量不是 100'); process.exit(1); }

function mkEl(id, dataq) {
  return {
    id, innerHTML: '', value: '', textContent: '', style: { cssText: '' }, _h: {}, _kids: [],
    'data-q': dataq,
    setAttribute(k, v) { this[k] = v; },
    getAttribute(k) { return this['data-' + k.replace(/^data-/, '')]; },
    classList: {
      _s: new Set(),
      add(c) { this._s.add(c); }, remove(c) { this._s.delete(c); },
      toggle(c, v) { v ? this._s.add(c) : this._s.delete(c); }, contains(c) { return this._s.has(c); }
    },
    appendChild(c) { this._kids.push(c); },
    addEventListener(t, f) { this._h[t] = f; },
    querySelectorAll() { return []; }
  };
}

const nodes = {}, store = {};
const doc = {
  getElementById: id => (nodes[id] = nodes[id] || mkEl(id)),
  querySelector: s => {
    const m = s.match(/data-res="(\d+)"/);
    if (m) { const k = 'qr' + m[1]; return nodes[k] = nodes[k] || mkEl(k); }
    const k = s.replace('#', '');
    return nodes[k] = nodes[k] || mkEl(s);
  },
  querySelectorAll: sel => sel === '.qin'
    ? inputs.map(i => nodes['qin' + i] = nodes['qin' + i] || mkEl('qin' + i, i))
    : sel === '.qres' ? ress.map(i => nodes['qr' + i] = nodes['qr' + i] || mkEl('qr' + i)) : [],
  createElement: t => Object.assign(mkEl(t), { tagName: t.toUpperCase() }),
  addEventListener() {}
};
const sb = {
  console, document: doc,
  localStorage: { getItem: k => store[k] || null, setItem: (k, v) => { store[k] = v; }, removeItem: k => { delete store[k]; } },
  window: {}, alert: () => {}
};
sb.window = sb; sb.globalThis = sb;
vm.createContext(sb);
scripts.forEach((s, i) => vm.runInContext(s, sb, { filename: 's' + i }));

console.log('QUIZ_ANS 长度 =', sb.QUIZ_ANS.length, '　前 3 =', sb.QUIZ_ANS.slice(0, 3).join(' / '));

let bad = 0;
function scenario(name, fill) {
  nodes['quizClear']._h.click();
  inputs.forEach(i => { nodes['qin' + i].value = fill(i); });
  nodes['quizGrade']._h.click();
  const out = nodes['quizScore'].textContent;
  console.log(('  ' + name).padEnd(22) + '→ ' + out);
  return out;
}
console.log('\n判分场景：');
const s1 = scenario('全对', i => sb.QUIZ_ANS[i]);
const s2 = scenario('90 对 10 错', i => i < 90 ? sb.QUIZ_ANS[i] : '错的');
const s3 = scenario('85 对 15 错', i => i < 85 ? sb.QUIZ_ANS[i] : '错的');
const s4 = scenario('78 对 22 错', i => i < 78 ? sb.QUIZ_ANS[i] : '错的');
const s5 = scenario('62 对 38 错', i => i < 62 ? sb.QUIZ_ANS[i] : '错的');
const s6 = scenario('全错', () => '错的');
const s7 = scenario('全空', () => '');
const s8 = scenario('只答 40 题全对', i => i < 40 ? sb.QUIZ_ANS[i] : '');

/* 宽松判定：答案含「可疑交易与指令报告」，只写「可疑交易报告」应算对 */
console.log('\n宽松判定测试：');
const idx = sb.QUIZ_ANS.findIndex(a => a.includes('/'));
if (idx >= 0) {
  const ans = sb.QUIZ_ANS[idx];
  const key = ans.split('/')[0].trim();
  nodes['quizClear']._h.click();
  inputs.forEach(i => { nodes['qin' + i].value = i === idx ? key : (i < 90 ? sb.QUIZ_ANS[i] : '错的'); });
  nodes['quizGrade']._h.click();
  console.log('  原答案「' + ans + '」只写「' + key + '」→ ' + nodes['quizScore'].textContent);
}

/* 断言 */
console.log('\n断言：');
const chk = (cond, msg) => { console.log((cond ? '   OK  ' : '   !!  ') + msg); if (!cond) bad++; };
chk(/100 \/ 100/.test(s1), '全对 → 100 / 100');
chk(/90 \/ 100/.test(s2), '90 对 → 90 / 100');
chk(/通过/.test(s1) && /通过/.test(s2), '85 分以上判为「第 1 周通过」');
chk(/85 分以下|加 20 分钟/.test(s4), '78 分 → 提示加练');
chk(/放慢/.test(s5), '62 分 → 提示放慢');
chk(/0 \/ 100/.test(s6), '全错 → 0 / 100');
chk(/已答 0 题|还没写任何答案/.test(s7), '全空 → 提示未作答');
chk(/已答 40 题/.test(s8), '部分作答 → 只统计已答题数');

console.log('\n' + (bad ? '!! 有 ' + bad + ' 项断言未通过' : '全部断言通过'));
process.exit(bad ? 1 : 0);
