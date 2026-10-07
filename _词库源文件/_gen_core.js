/* 生成 core 领域源分片：把 Day-01/02 的自编精讲词收入词库 */
const fs = require('fs');
const vm = require('vm');
const LIB = 'D:/英语培训教程/';

/* 词库现有词（用于去重） */
function loadCenter() {
  const h = fs.readFileSync(LIB + '00-作战中心.html', 'utf8');
  const js = h.match(/<script>([\s\S]*?)<\/script>/)[1];
  const ctx = {}; vm.createContext(ctx);
  vm.runInContext(js.slice(0, js.indexOf('var LS_KEY')), ctx);
  return ctx.VOCAB_DOMAINS;
}
const DOM = loadCenter();
const exist = new Set();
DOM.forEach(d => d.deck.forEach(v => exist.add(String(v[0]).toLowerCase())));

function loadDay(n) {
  const h = fs.readFileSync(LIB + 'Day-0' + n + '.html', 'utf8');
  const js = h.match(/<script>([\s\S]*?)<\/script>/)[1];
  return JSON.parse(js.match(/var WORDS = (\[[\s\S]*?\]);/)[1]);
}

const d1 = loadDay(1), d2 = loadDay(2);
console.log('Day-01 精讲:', d1.length, '| Day-02 精讲:', d2.length);

/* Day-02 的全部词名，用于确认 30 个 */
console.log('\nDay-01 精讲词表:');
d1.forEach((w, i) => console.log('  ' + (i + 1) + '. ' + w[0] + (exist.has(w[0].toLowerCase()) ? '   [词库已有]' : '')));
console.log('\nDay-02 精讲词表:');
d2.forEach((w, i) => console.log('  ' + (i + 1) + '. ' + w[0] + (exist.has(w[0].toLowerCase()) ? '   [词库已有]' : '')));

/* 生成 core 领域条目 */
const rows = [];
function push(w, grp) {
  const term = String(w[0]).trim();
  if (exist.has(term.toLowerCase())) return false;
  const ipa = w[1] || '';
  const zh = w[2] || '';
  const tip = w[5] || '';
  const parts = [];
  if (ipa) parts.push(ipa);
  if (tip) parts.push(tip);
  const note = parts.join('　');
  rows.push([term, zh, note, grp]);
  return true;
}
let s1 = 0, s2 = 0;
d1.forEach(w => { if (push(w, '基础')) s1++; });
d2.forEach(w => { if (push(w, '拼读')) s2++; });
console.log('\n=== 生成结果 ===');
console.log('Day-01 收入:', s1, '| Day-02 收入:', s2, '| 合计:', rows.length);
console.log('因词库已有而跳过:', (d1.filter(w => exist.has(w[0].toLowerCase())).map(w => w[0]).join(', ') || '无'));
console.log();
rows.forEach(r => console.log('  [' + r[3] + '] ' + r[0] + ' | ' + r[1] + ' | ' + r[2]));

/* 写出 _v12.js */
function q(s) { return JSON.stringify(String(s == null ? '' : s)); }
const body = rows.map(r => '[' + q(r[0]) + ',' + q(r[1]) + ',' + q(r[2]) + '],').join('\n');
const out = `/* ============================================================
   词库分片 v12 · core 核心词与拼读易错
   ------------------------------------------------------------
   来源：Day-01 的 22 个基础词 + Day-02 的 30 个拼读易错词。
   这些词原本只存在于每日课程页的「精讲 30」表格里，
   没有进入词库，导致 Anki 与课程页对不上。
   现统一收入词库，作为独立领域 core。
   ============================================================ */

VOCAB_DOMAINS.push(
{ id: "core", name: "核心词与拼读易错", desc: "金融英语地基词 + 中国人高频读错的合规词。全部要求练到脱口而出，且读音必须正确。", deck: [
${body}
]});
`;
fs.writeFileSync(LIB + '_词库源文件/_v12.js', out, 'utf8');
console.log('\n已写出 _v12.js，条数:', rows.length);
