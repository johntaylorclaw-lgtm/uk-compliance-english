/* ============================================================
   生成 Day-05.html
   做法：以 Day-04.html 为「设计系统骨架」，只替换内容区块：
     title / crumb / h1 / hero 段落 / 训练量统计 / 节奏说明
     模块 00 / 01 / 02 / 04 / 05
     词库推进地图 + 明日预告
     LISTS + RATES（打卡清单与自评项）
     footer / localStorage 键
   模块 03 PRON 保持不动，由 _朗读源文件/_build_day_pron.js 覆盖注入。
   ============================================================ */
const fs = require('fs');
const path = require('path');
const DIR = 'D:/英语培训教程';
const PARTS = path.join(DIR, '_词库源文件/_day5_parts');

const read = f => fs.readFileSync(path.join(PARTS, f), 'utf8').trimEnd() + '\n';

let h = fs.readFileSync(path.join(DIR, 'Day-04.html'), 'utf8');
const log = [];

/* 用 start…end（含）整段替换 */
function cut(start, end, repl, label) {
  const i = h.indexOf(start);
  if (i < 0) throw new Error('起点缺失：' + label + ' → ' + start.slice(0, 40));
  const j = h.indexOf(end, i);
  if (j < 0) throw new Error('终点缺失：' + label + ' → ' + end.slice(0, 40));
  h = h.slice(0, i) + repl + h.slice(j + end.length);
  log.push('替换 ' + label);
}
/* 全文唯一子串替换 */
function once(a, b, label) {
  const n = h.split(a).length - 1;
  if (n !== 1) throw new Error('期望唯一（实际 ' + n + ' 次）：' + label);
  h = h.split(a).join(b);
  log.push('改写 ' + label);
}

const TITLE = 'Day 05 · 制裁 II：名单机制与出口管制 + 金融犯罪开篇 — 英国银行业合规英语强化';

const HERO_P = `<p>今天处理的是<b>制裁领域的主体部分</b>。词表第 400–499 行由两块拼成：<b>71 条制裁与出口管制</b>（综合名单、50% 规则、股权穿透、许可与豁免、美国长臂、影子船队、价格上限），以及<b>29 条金融犯罪</b>（经济犯罪、未能预防、POCA、财富来源不明令、FCA / PRA / SFO）。昨天那场「潜在命中还是真实命中」的判断，今天要走到它的<b>下文</b>——如果名字对上了，接下来按哪张名单、走哪条许可、谁签字、留什么痕。听力脚本也从银行内部的两人对话，升级为<b>制裁官 + 贸易融资官 + 出口管制官的三方会议</b>，议题是一条装货前关闭了 AIS 的船。</p>`;

const INFO_BOX = `<div class="info" style="margin-bottom:16px;">
  <b>今天的节奏安排：</b>词表里的 71 条制裁词是<b>你未来岗位上每天都要动用的工具</b>——它们不是"知道就行"，而是要能在会议里脱口而出。所以模块 02 的 30 个精讲名额里，我给制裁花了 <b>24 个</b>、只给金融犯罪留了 <b>6 个</b>（其余 23 条今天先认读，Day-06 正面处理）。<b>请按 00 → 01 → 02 → 03 → 04 → 05 的顺序做</b>。时间不够时优先砍模块 05 的写作，<b>模块 01 的 B 段（三方会议）和模块 02 的名单机制词不能砍</b>。
</div>`;
const INFO_BOX_NEW = INFO_BOX;

/* ---------- 1. 头部 ---------- */
cut('<title>', '</title>', `<title>${TITLE}</title>`, 'title');
cut('<div class="crumb">', '</div>',
  '<div class="crumb"><a href="00-作战中心.html">← 返回作战中心</a>　·　第 1 周：地基与英式英语适应　·　<a href="Day-04.html">Day 04</a></div>', 'crumb');
cut('<h1>', '</h1>', '<h1>Day 05 · 制裁 II：名单机制与出口管制 + 金融犯罪开篇</h1>', 'h1');
cut('<p>今天是一次', '</p>', HERO_P, 'hero 段落');
once('<b>4 h 15 m</b><span>今日训练量</span>', '<b>4 h 20 m</b><span>今日训练量</span>', '训练量 4h15m → 4h20m');
cut('<div class="info" style="margin-bottom:16px;">', '</div>', INFO_BOX_NEW, '节奏说明');

/* ---------- 2. 内容模块 ---------- */
cut('<!-- 模块 0 -->', '<!-- 模块 1 -->', read('m0.html') + '\n<!-- 模块 1 -->', '模块 00');
cut('<!-- 模块 1 -->', '<!-- 模块 2 -->', read('m1.html') + '\n<!-- 模块 2 -->', '模块 01');
cut('<!-- 模块 2 -->', '<!-- 模块 3 PRON -->', read('m2.html') + '\n<!-- 模块 3 PRON -->', '模块 02');
cut('<!-- 模块 4 -->', '<!-- 模块 5 -->', read('m4.html') + '\n<!-- 模块 5 -->', '模块 04');
cut('<!-- 模块 5 -->', '<!-- 自评 -->', read('m5.html') + '\n<!-- 自评 -->', '模块 05');
cut('<!-- 词库推进地图 -->', '</main>', read('map.html'), '推进地图 + 预告');

/* ---------- 3. 打卡清单与自评项 ---------- */
cut('var LISTS = {', '\n(function renderLists', read('lists.js') + '\n(function renderLists', 'LISTS + RATES');

/* ---------- 4. 落款 ---------- */
cut('<footer>', '</footer>', `<footer>
  Day 05 · 制裁 II：名单机制与出口管制 + 金融犯罪开篇　|　<a href="00-作战中心.html">作战中心</a>　·　<a href="01-听力系统.html">听力系统</a>　·　<a href="02-Anki复习系统.html">Anki 系统</a>　·　<a href="03-发音与朗读系统.html">朗读库</a>　·　<a href="Day-04.html">Day 04</a>　·　Day 06（待生成）
</footer>`, 'footer');

once('var LS = "ukce_day04";', 'var LS = "ukce_day05";', 'localStorage 键');

/* ---------- 5. 自检 ---------- */
/* 模块 03 PRON 的正文与脚本此刻仍是 Day-04 的旧内容（随后由 _build_day_pron.js 覆盖），
   检查残留时必须先把这两块挖掉，否则会误报 */
const stripped = h
  .replace(/<!--PRON_MODULE_START-->[\s\S]*?<!--PRON_MODULE_END-->/, '')
  .replace(/<!--PRON_JS_START-->[\s\S]*?<!--PRON_JS_END-->/, '');
const bad = [];
['ukce_day04', 'Day-04 · ', 'proliferation financing', '制裁筛查命中', 'potential match', 'Day 04 ·'].forEach(k => {
  if (stripped.indexOf(k) > -1) bad.push(k);
});
if (h.indexOf('ukce_day05') < 0) bad.push('缺少 ukce_day05');
if (h.indexOf('<!-- 模块 3 PRON -->') < 0) bad.push('缺少 PRON 锚点');
if (h.indexOf('id="ckWrap"') < 0) bad.push('缺少 ckWrap 容器');

const out = path.join(DIR, 'Day-05.html');
fs.writeFileSync(out, h, 'utf8');
console.log(log.join('\n'));
console.log('\n残留检查：' + (bad.length ? '!! 发现残留 → ' + bad.join(' | ') : '干净'));
console.log('已写入 ' + out + '（' + Buffer.byteLength(h, 'utf8') + ' 字节，' + h.split('\n').length + ' 行）');
