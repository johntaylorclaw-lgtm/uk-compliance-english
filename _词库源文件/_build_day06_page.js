/* ============================================================
   生成 Day-06.html
   做法：以 Day-05.html 为「设计系统骨架」，只替换内容区块。
   模块 03 PRON 保持不动，由 _朗读源文件/_build_day_pron.js 覆盖注入。
   ============================================================ */
const fs = require('fs');
const path = require('path');
const DIR = 'D:/英语培训教程';
const PARTS = path.join(DIR, '_词库源文件/_day6_parts');

const read = f => fs.readFileSync(path.join(PARTS, f), 'utf8').trimEnd() + '\n';

let h = fs.readFileSync(path.join(DIR, 'Day-05.html'), 'utf8');
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

const TITLE = 'Day 06 · 金融犯罪与执法续：调查 × 特权 × 举报 + 金融产品开篇 — 英国银行业合规英语强化';
const HEADLINE = 'Day 06 · 金融犯罪与执法续 + 金融产品开篇';

const HERO_P = `<p>今天开始<b>第二条线</b>。词表第 500–599 行由两块拼成：<b>40 条金融犯罪与执法</b>——DPA、企业犯罪、同一性原则、搜查令、Mareva 禁令、legal hold / e-discovery、<b>三种 privilege 与 Upjohn warning</b>、举报与 detriment、纪律与监管移送；以及<b>60 条金融产品与市场工具</b>（股 / 债 / 并购 / 基金 / 衍生品）。前 40 条连起来就是<b>「从一条举报到一个决定」的完整执法链</b>——这是你入职后最可能第一周就碰上的场景。听力脚本 accordingly 换成一场内部会议：<b>举报进来之后，团队第一天要做什么</b>——重点不是谁对谁错，而是<b>顺序和边界</b>。</p>`;

const INFO_BOX = `<div class="info" style="margin-bottom:16px;">
  <b>今天的节奏安排：</b>前 40 条执法词里藏着一整套你将来每天都要走的流程（<b>举报 → 留置 → 调查 → 特权 → 纪律 → 移送</b>），这些词<b>不背就会卡在流程上</b>，所以模块 02 的 30 个精讲名额里我给了执法 <b>25 个</b>；后 60 条产品词量大面广，今天只用 <b>equity / preference share / gilt / high-yield bond / investment grade</b> 这 5 个骨架词搭框架，其余 55 条进拓展档认读，<b>第 2 周按「股 → 债 → 并购 → 基金 → 衍生品」五个子主题回炉</b>。<b>请按 00 → 01 → 02 → 03 → 04 → 05 的顺序做</b>。时间不够时优先砍模块 05 的写作，<b>模块 01 的 B 段（内部调查会议）和模块 02 的流程词不能砍</b>。
</div>`;

/* ---------- 1. 头部 ---------- */
cut('<title>', '</title>', `<title>${TITLE}</title>`, 'title');
cut('<div class="crumb">', '</div>',
  '<div class="crumb"><a href="00-作战中心.html">← 返回作战中心</a>　·　第 1 周：地基与英式英语适应　·　<a href="Day-05.html">Day 05</a></div>', 'crumb');
cut('<h1>', '</h1>', '<h1>' + HEADLINE + '</h1>', 'h1');
cut('<p>今天处理的是', '</p>', HERO_P, 'hero 段落');
once('<b>4 h 20 m</b><span>今日训练量</span>', '<b>4 h 15 m</b><span>今日训练量</span>', '训练量 4h20m → 4h15m（今日朗读 30 分钟）');
cut('<div class="info" style="margin-bottom:16px;">', '</div>', INFO_BOX, '节奏说明');

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
  ${HEADLINE}　|　<a href="00-作战中心.html">作战中心</a>　·　<a href="01-听力系统.html">听力系统</a>　·　<a href="02-Anki复习系统.html">Anki 系统</a>　·　<a href="03-发音与朗读系统.html">朗读库</a>　·　<a href="Day-05.html">Day 05</a>　·　Day 07（待生成）
</footer>`, 'footer');

once('var LS = "ukce_day05";', 'var LS = "ukce_day06";', 'localStorage 键');

/* ---------- 5. 自检 ---------- */
/* 模块 03 PRON 的正文与脚本此刻仍是 Day-05 的旧内容（随后由 _build_day_pron.js 覆盖），
   检查残留时必须先把这两块挖掉，否则会误报 */
const stripped = h
  .replace(/<!--PRON_MODULE_START-->[\s\S]*?<!--PRON_MODULE_END-->/, '')
  .replace(/<!--PRON_JS_START-->[\s\S]*?<!--PRON_JS_END-->/, '');
const bad = [];
/* 真正残留：本日不该出现的 Day-05 标识 */
['ukce_day05', 'Day-05 · ', 'Day 05 · ', 'Day-05_精讲30词.html']
  .forEach(k => { if (stripped.indexOf(k) > -1) bad.push(k); });
/* 允许的跨日引用：模块 00/01 里刻意写的「回看 Day-05 错题本」提示 */
const expect = ['ownership and control test', 'catch-all control', 'dark fleet']
  .filter(k => stripped.indexOf(k) > -1);
if (stripped.indexOf('ukce_day06') < 0) bad.push('缺少 ukce_day06');
if (stripped.indexOf('<!-- 模块 3 PRON -->') < 0) bad.push('缺少 PRON 锚点');
if (stripped.indexOf('id="ckWrap"') < 0) bad.push('缺少 ckWrap 容器');

const out = path.join(DIR, 'Day-06.html');
fs.writeFileSync(out, h, 'utf8');
console.log(log.join('\n'));
console.log('\n跨日引用（预期保留，模块 00 的昨日回顾）：' + (expect.length ? expect.join(' | ') : '无'));
console.log('残留检查：' + (bad.length ? '!! 发现残留 → ' + bad.join(' | ') : '干净'));
console.log('已写入 ' + out + '（' + Buffer.byteLength(h, 'utf8') + ' 字节，' + h.split('\n').length + ' 行）');
