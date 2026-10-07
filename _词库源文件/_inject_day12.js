/* ============================================================
   把词表第 1-100 行 / 101-200 行注入 Day-01 / Day-02 词汇模块
   —— 使课程页的 100 词与 Anki 当日队列完全一致
   ============================================================ */
const fs = require('fs');
const path = require('path');
const DIR = 'D:/英语培训教程';
const { FOCUS } = require(path.join(DIR, '_词库源文件/_day12_words.js'));

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
console.log('词表行数:', rows.length);

const days = [
  { n: 1, lo: 1, hi: 100 },
  { n: 2, lo: 101, hi: 200 }
];

let allPass = true;
days.forEach(d => {
  const slice = rows.slice(d.lo - 1, d.hi).map(r => ({ t: r[0].trim(), zh: (r[1] || '').trim(), note: (r[3] || '').trim() }));
  const focus = FOCUS[d.n];
  console.log('\n=== Day-0' + d.n + ' ===');
  console.log('词表区间 ' + d.lo + '-' + d.hi + '：', slice.length, '条 | 精讲:', focus.length, '条');

  const set = new Set(slice.map(x => x.t.toLowerCase()));
  const focusKeys = new Set(focus.map(x => x[0].toLowerCase()));
  const miss = focus.filter(x => !set.has(x[0].toLowerCase())).map(x => x[0]);
  if (miss.length) { console.log('  !! 精讲词不在当日区间:', miss.join(', ')); allPass = false; }
  if (focusKeys.size !== focus.length) { console.log('  !! 精讲词内部重复'); allPass = false; }

  const extra = slice.filter(x => !focusKeys.has(x.t.toLowerCase()));
  console.log('  拓展:', extra.length, '条');
  if (extra.length !== 70) { console.log('  !! 拓展词数量不是 70'); allPass = false; }

  // 顺序校验：精讲 + 拓展 是否覆盖区间内全部 100 个词，且无遗漏
  const union = new Set([...focus.map(x => x[0].toLowerCase()), ...extra.map(x => x.t.toLowerCase())]);
  console.log('  去重后覆盖:', union.size, '/ 100');
  if (union.size !== 100) { console.log('  !! 覆盖不全或有重复'); allPass = false; }

  d.slice = slice; d.focus = focus; d.extra = extra;
});

if (!allPass) { console.log('\n!! 校验未通过，未写入'); process.exit(1); }
console.log('\n全部校验通过');

/* ---------- 注入 ---------- */
function inject(file, varName, arr) {
  let h = fs.readFileSync(file, 'utf8');
  const re = new RegExp('var ' + varName + ' = (?:\\/\\*[^*]*\\*\\/)?\\[[\\s\\S]*?\\];');
  if (!re.test(h)) { console.log('!! 未匹配到 ' + varName + ' @ ' + path.basename(file)); return false; }
  h = h.replace(re, 'var ' + varName + ' = ' + JSON.stringify(arr, null, 0).replace(/\],\[/g, '],\n[') + ';');
  fs.writeFileSync(file, h, 'utf8');
  return true;
}

days.forEach(d => {
  const f = path.join(DIR, 'Day-0' + d.n + '.html');
  const extraArr = d.extra.map(x => [x.t, x.zh, x.note]);   // 渲染层期望 [英文, 中文, 备注]
  const ok1 = inject(f, 'WORDS', d.focus);
  const ok2 = inject(f, 'EXTRA', extraArr);
  console.log('Day-0' + d.n + ' 注入:', ok1 && ok2 ? '成功' : '失败');
});
