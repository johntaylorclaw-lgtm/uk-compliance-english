/* 诊断：Day-01 / Day-02 的单词与词库（Anki 导入顺序）是否对齐 */
const fs = require('fs');
const vm = require('vm');
const DIR = 'D:/英语培训教程/';

function loadCenter() {
  const h = fs.readFileSync(DIR + '00-作战中心.html', 'utf8');
  const js = h.match(/<script>([\s\S]*?)<\/script>/)[1];
  const ctx = {}; vm.createContext(ctx);
  vm.runInContext(js.slice(0, js.indexOf('var LS_KEY')), ctx);
  return ctx.VOCAB_DOMAINS;
}
function loadDay(n) {
  const h = fs.readFileSync(DIR + 'Day-0' + n + '.html', 'utf8');
  const js = h.match(/<script>([\s\S]*?)<\/script>/)[1];
  const W = JSON.parse(js.match(/var WORDS = (\[[\s\S]*?\]);/)[1]);
  const E = JSON.parse(js.match(/var EXTRA = (\[[\s\S]*?\]);/)[1]);
  return { h, js, W, E };
}

const DOM = loadCenter();
const libOrder = [];
const libIdx = {};
DOM.forEach(d => d.deck.forEach(v => {
  const k = String(v[0]).toLowerCase();
  if (!(k in libIdx)) { libIdx[k] = libOrder.length; }
  libOrder.push({ term: v[0], zh: v[1], dom: d.id, domName: d.name, note: v[2] || '' });
}));
console.log('=== 词库总览 ===');
console.log('领域数:', DOM.length, '| 总条数:', libOrder.length);
DOM.forEach((d, i) => console.log('  ' + String(i + 1).padStart(2) + '. ' + d.id.padEnd(7) + d.name.padEnd(26) + d.deck.length));
console.log();
console.log('=== 词库前 10 条（= Anki 导入后最先出现的新卡）===');
libOrder.slice(0, 10).forEach((v, i) => console.log('  ' + (i + 1) + '. ' + v.term + ' | ' + v.zh + ' | ' + v.dom));
console.log('--- 第 91-110 条 ---');
libOrder.slice(90, 110).forEach((v, i) => console.log('  ' + (91 + i) + '. ' + v.term + ' | ' + v.zh));
console.log('--- 第 191-210 条 ---');
libOrder.slice(190, 210).forEach((v, i) => console.log('  ' + (191 + i) + '. ' + v.term + ' | ' + v.zh));
console.log();

const d1 = loadDay(1), d2 = loadDay(2);
function report(name, d) {
  console.log('=== ' + name + ' ===');
  const all = d.W.map(v => ({ t: v[0], kind: '精讲' })).concat(d.E.map(v => ({ t: v[0], kind: '拓展' })));
  console.log('精讲 ' + d.W.length + ' + 拓展 ' + d.E.length + ' = ' + all.length);
  let notInLib = [], idxs = [];
  all.forEach(x => {
    const k = x.t.toLowerCase();
    if (!(k in libIdx)) notInLib.push(x.t);
    else idxs.push(libIdx[k]);
  });
  console.log('不在词库中（Anki 里根本没有这些卡）:', notInLib.length ? notInLib.join(', ') : '无');
  if (idxs.length) {
    const sorted = idxs.slice().sort((a, b) => a - b);
    console.log('在词库中的下标范围: ' + (sorted[0] + 1) + ' ~ ' + (sorted[sorted.length - 1] + 1) + '（共 ' + sorted.length + ' 条）');
    console.log('是否连续: ' + (sorted[sorted.length - 1] - sorted[0] + 1 === sorted.length ? '连续 ✓' : '不连续 ✗'));
    // 展示前 12 个词的实际下标
    console.log('前 12 词的词库位置:');
    all.slice(0, 12).forEach(x => {
      const k = x.t.toLowerCase();
      console.log('   ' + x.kind + ' ' + String((k in libIdx ? libIdx[k] + 1 : '—')).padStart(5) + '  ' + x.t);
    });
  }
  console.log();
}
report('Day-01', d1);
report('Day-02', d2);

console.log('=== 按词库顺序看，前 200 条应属于哪些天 ===');
console.log('（Day-01 用到的词在词库中的位置分布 / Day-02 同）');
[1, 2].forEach(n => {
  const d = n === 1 ? d1 : d2;
  const all = d.W.concat(d.E).map(v => v[0].toLowerCase()).filter(k => k in libIdx);
  const buckets = {};
  all.forEach(k => { const b = Math.floor(libIdx[k] / 50) * 50 + 1; buckets[b] = (buckets[b] || 0) + 1; });
  console.log('Day-0' + n + ': ' + Object.keys(buckets).sort((a, b) => a - b).map(b => '第' + b + '-' + (+b + 49) + '条:' + buckets[b]).join('  '));
});

console.log();
console.log('=== CSV 前 100 行（Anki 实际导入顺序）===');
const csv = fs.readFileSync(DIR + '词表-Anki导入.csv', 'utf8').replace(/^\ufeff/, '').split(/\r?\n/);
console.log('CSV 行数:', csv.length);
csv.slice(0, 8).forEach((l, i) => console.log('  ' + (i + 1) + '. ' + l));
console.log('  ...');
csv.slice(96, 104).forEach((l, i) => console.log('  ' + (97 + i) + '. ' + l));
