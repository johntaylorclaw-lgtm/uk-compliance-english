/* ============================================================
   生成 Day-04（词表第 300–399 行 = Anki 第 4 批 100 张新卡）
   1) 校验：30 精讲 ⊂ 当日区间；拓展 = 区间内其余 70 条；合计去重 = 100
   2) 注入 Day-04.html 的 var WORDS / var EXTRA
   3) 生成 词表-Day04.csv（带表头）与 词表-Day04-Anki导入.csv（无表头）
   ============================================================ */
const fs = require('fs');
const path = require('path');
const DIR = 'D:/英语培训教程';
const { FOCUS } = require(path.join(DIR, '_词库源文件/_day4_words.js'));

const LO = 300, HI = 399;          // 词表行号区间（1 基，闭区间）
const DAY = 4;

/* ---------- 读词表 ---------- */
function parseCSV(text) {
  const out = [];
  let row = [], cur = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else q = false; }
      else cur += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(cur); cur = ''; }
    else if (c === '\n') { row.push(cur); cur = ''; out.push(row); row = []; }
    else if (c === '\r') { }
    else cur += c;
  }
  if (cur || row.length) { row.push(cur); out.push(row); }
  return out.filter(r => r.length && r[0].trim());
}

const rows = parseCSV(fs.readFileSync(path.join(DIR, '词表-Anki导入.csv'), 'utf8').replace(/^\ufeff/, ''));
console.log('词表总行数:', rows.length);

const slice = rows.slice(LO - 1, HI).map(r => ({
  t: r[0].trim(), zh: (r[1] || '').trim(), dom: (r[2] || '').trim(), note: (r[3] || '').trim()
}));
const focus = FOCUS[DAY];

console.log('\n=== Day-0' + DAY + ' ===');
console.log('词表区间 ' + LO + '-' + HI + '：' + slice.length + ' 条 | 精讲 ' + focus.length + ' 条');

let pass = true;
if (slice.length !== 100) { console.log('  !! 区间不是 100 条'); pass = false; }

const set = new Set(slice.map(x => x.t.toLowerCase()));
const fk = new Set(focus.map(x => x[0].toLowerCase()));
if (fk.size !== focus.length) { console.log('  !! 精讲词内部重复'); pass = false; }
const miss = focus.filter(x => !set.has(x[0].toLowerCase())).map(x => x[0]);
if (miss.length) { console.log('  !! 精讲词不在当日区间: ' + miss.join(' | ')); pass = false; }

const extra = slice.filter(x => !fk.has(x.t.toLowerCase()));
console.log('  拓展：' + extra.length + ' 条');
if (extra.length !== 70) { console.log('  !! 拓展词不是 70 条'); pass = false; }

const union = new Set([...focus.map(x => x[0].toLowerCase()), ...extra.map(x => x.t.toLowerCase())]);
console.log('  去重后覆盖: ' + union.size + ' / 100');
if (union.size !== 100) { console.log('  !! 覆盖不全或有重复'); pass = false; }

/* 精讲条目字段完整性 */
focus.forEach(f => {
  if (f.length < 6) { console.log('  !! 精讲条目字段不足: ' + f[0]); pass = false; }
  else if (!/^\/.+\/$/.test(String(f[1]).split('·')[0].trim())) { console.log('  !! 音标格式可疑: ' + f[0] + ' → ' + f[1]); pass = false; }
});

const domCount = {};
slice.forEach(x => { domCount[x.dom] = (domCount[x.dom] || 0) + 1; });
console.log('  领域分布:', JSON.stringify(domCount));

if (!pass) { console.log('\n!! 校验未通过，未写入'); process.exit(1); }
console.log('\n全部校验通过');

/* ---------- 注入页面 ---------- */
const page = path.join(DIR, 'Day-0' + DAY + '.html');
let html = fs.readFileSync(page, 'utf8');

function injectVar(h, name, arr) {
  const re = new RegExp('var ' + name + ' = (?:\\/\\*[^*]*\\*\\/)?\\[[\\s\\S]*?\\];');
  if (!re.test(h)) { console.log('!! 未匹配到 ' + name); return { h, ok: false }; }
  return { h: h.replace(re, 'var ' + name + ' = ' + JSON.stringify(arr).replace(/\],\[/g, '],\n[') + ';'), ok: true };
}

/* 精讲词表：渲染层用 [英, 音标, 释义, 例句, 译文, 提示] */
const w = injectVar(html, 'WORDS', focus);
/* 拓展词表：渲染层用 [英, 中, 备注] */
const e = injectVar(w.h, 'EXTRA', extra.map(x => [x.t, x.zh, x.note]));
console.log('注入 WORDS:' + (w.ok ? '成功' : '失败') + '　EXTRA:' + (e.ok ? '成功' : '失败'));
fs.writeFileSync(page, e.h, 'utf8');

/* ---------- 生成当日词表 ---------- */
function q(s) {
  s = String(s == null ? '' : s);
  if (/[",\n\r]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}
const out = slice.map(x => [q(x.t), q(x.zh), q(x.dom), q(x.note)].join(','));
fs.writeFileSync(path.join(DIR, '词表-Day0' + DAY + '.csv'),
  '\ufeff' + ['英文,中文,领域,补充说明'].concat(out).join('\r\n'), 'utf8');
fs.writeFileSync(path.join(DIR, '词表-Day0' + DAY + '-Anki导入.csv'),
  '\ufeff' + out.join('\r\n'), 'utf8');
console.log('【词表】词表-Day0' + DAY + '.csv / 词表-Day0' + DAY + '-Anki导入.csv　数据行:' + out.length);
