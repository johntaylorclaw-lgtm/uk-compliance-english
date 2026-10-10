/* ============================================================
   生成 Day-07.html
   做法：以 Day-06.html 为「设计系统骨架」，只替换内容区块。
   模块 03 PRON 保持不动，由 _朗读源文件/_build_day_pron.js 覆盖注入。

   注：原脚本硬编码 D:/英语培训教程（原作者本机路径），
       此处改为 __dirname 向上两级，项目可整体搬移。
   ============================================================ */
const fs = require('fs');
const path = require('path');
const DIR = path.resolve(__dirname, '..');
const PARTS = path.join(DIR, '_词库源文件/_day7_parts');

const read = f => fs.readFileSync(path.join(PARTS, f), 'utf8').trimEnd() + '\n';

let h = fs.readFileSync(path.join(DIR, 'Day-06.html'), 'utf8');
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
  if (n !== 1) throw new Error('期望唯一（实际 ' + n + ' 次）：' + label + ' → ' + a.slice(0, 50));
  h = h.split(a).join(b);
  log.push('改写 ' + label);
}

const TITLE = 'Day 07 · 第 1 周测评与复盘 + 英国监管架构与 FCA 手册 — 英国银行业合规英语强化';
const HEADLINE = 'Day 07 · 第 1 周测评与复盘 + 英国监管架构';

const HERO_P = `<p>今天是<b>第 1 周的最后一天，也是唯一一次「验收日」</b>。词表第 601–700 行顺延到了<b>英国监管与市场行为</b>——BoE、FPC、FCA 手册（PRIN / SYSC / COBS / CASS / SUP）、SM&amp;CR 责任制度、市场滥用三条线、美国监管（SEC / FINRA / CFTC / BSA / FCPA）、投诉赔付（FOS / FSCS / redress）、支付保护（confirmation of payee / SCA）。<b>但今天真正的重点不是这 100 个新词，而是回收前六天的 600 词。</b>听力脚本换成一场<b>监管检查开场会</b>——你入职英国银行后第一周最可能遇到的第二个场景，<b>重点不是答什么，而是「能给什么、欠什么、什么要先确认」</b>。今天还有一个硬指标：<b>第1 周术语测 100 题，目标 ≥ 85 分</b>。</p>`;

const INFO_BOX = `<div class="info" style="margin-bottom:16px;">
  <b>今天的节奏安排：</b>这是周测日，<b>模块 02 分成两半</b>——前半建新（今天的 100 词，精讲 30 个只求「认得 + 读准」），后半验收（<b>术语测 100 题，从前六天 600 词里等距抽取</b>）。今天的 30 个精讲名额分配原则是<b>「体系词优先」</b>：监管架构 5 个（FCA 全称 + PRIN / SYSC / COBS）、准入与客户义务 4 个（threshold conditions / Part 4A permission / Consumer Duty / vulnerable customer）、SM&amp;CR 4 个、市场滥用 6 个、处罚工具 3 个、客户资金与投诉 5 个、支付保障 3 个——<b>因为这 30 个词是听懂监管对话的最低门槛</b>，不认识PRIN / SYSC / COBS，FCA 说什么你都听不出来。<b>请按 00 → 01 → 02 → 03 → 04 → 05 的顺序做</b>，<b>顺序不能改</b>：术语测要检验的正是模块 01 练出来的东西，先做术语测会低估自己。时间不够时优先砍模块 05 的写作，<b>模块 01 的 A/B 段和模块 02 的术语测不能砍</b>。
</div>`;

/* ---------- 1. 头部 ---------- */
cut('<title>', '</title>', `<title>${TITLE}</title>`, 'title');
cut('<div class="crumb">', '</div>',
  '<div class="crumb"><a href="00-作战中心.html">← 返回作战中心</a>　·　第 1 周：地基与英式英语适应（今天是第 1 周最后一天）　·　<a href="Day-06.html">Day 06</a></div>', 'crumb');
cut('<h1>', '</h1>', '<h1>' + HEADLINE + '</h1>', 'h1');
cut('<p>今天开始', '</p>', HERO_P, 'hero 段落');
once('<b>4 h 15 m</b><span>今日训练量</span>', '<b>4 h 35 m</b><span>今日训练量</span>', '训练量 4h15m → 4h35m（周测日：术语测 20 分钟 + D 段无字幕验收）');
cut('<div class="info" style="margin-bottom:16px;">', '</div>', INFO_BOX, '节奏说明');

/* ---------- 2. 内容模块 ---------- */
cut('<!-- 模块 0 -->', '<!-- 模块 1 -->', read('m0.html') + '\n<!-- 模块 1 -->', '模块 00');
cut('<!-- 模块 1 -->', '<!-- 模块 2 -->', read('m1.html') + '\n<!-- 模块 2 -->', '模块 01');
cut('<!-- 模块 2 -->', '<!-- 模块 3 PRON -->', read('m2.html') + '\n<!-- 模块 3 PRON -->', '模块 02');
cut('<!-- 模块 4 -->', '<!-- 模块 5 -->', read('m4.html') + '\n<!-- 模块 5 -->', '模块 04');
cut('<!-- 模块 5 -->', '<!-- 自评 -->', read('m5.html') + '\n<!-- 自评 -->', '模块 05');
cut('<!-- 词库推进地图 -->', '</main>', read('map.html'), '推进地图 + 预告');

/* ---------- 3. 打卡清单与自评项 ---------- */
cut('var LISTS = {', '\n(function renderLists', read('lists.js') + '\n(function renderLists', 'LISTS + RATES + 术语测判分');

/* ---------- 4. 落款 ---------- */
cut('<footer>', '</footer>', `<footer>
  ${HEADLINE}　|　<a href="00-作战中心.html">作战中心</a>　·　<a href="01-听力系统.html">听力系统</a>　·　<a href="02-Anki复习系统.html">Anki 系统</a>　·　<a href="03-发音与朗读系统.html">朗读库</a>　·　<a href="Day-06.html">Day 06</a>　·　Day 08（待生成）
</footer>`, 'footer');

once('var LS = "ukce_day06";', 'var LS = "ukce_day07";', 'localStorage 键');

/* ---------- 5. 术语测所需样式（输入框 / 对错标记） ---------- */
const QUIZ_CSS = `<style id="day7QuizCss">
/* 第1 周术语测（由 _build_day07_page.js 注入） */
#quizTbl .qin{width:100%;padding:5px 7px;border:1px solid var(--line-2);border-radius:6px;font-size:12.5px;font-family:inherit;background:#fff;color:var(--ink);}
#quizTbl .qin:focus{outline:none;border-color:var(--teal);box-shadow:0 0 0 2px rgba(0,150,136,.12);}
#quizTbl .qres{text-align:center;font-size:14px;font-weight:700;}
#quizTbl .qtag{display:inline-block;margin-left:7px;padding:1px 6px;border-radius:5px;background:var(--panel-2);border:1px solid var(--line-2);font-size:10.5px;color:var(--ink-3);font-family:ui-monospace,Menlo,Consolas,monospace;vertical-align:1px;}
#quizTbl td.zh{font-size:12.5px;color:var(--ink-2);}
#quizTbl tr.rw{background:#fffdf5;}
</style>`;
{
  const i = h.lastIndexOf('</style>');
  if (i < 0) throw new Error('找不到 </style> 锚点');
  h = h.slice(0, i + 8) + '\n' + QUIZ_CSS + h.slice(i + 8);
  log.push('注入 术语测样式');
}

/* ---------- 6. 自检 ---------- */
/* 模块 03 PRON 的正文与脚本此刻仍是 Day-06 的旧内容（随后由 _build_day_pron.js 覆盖），
   检查残留时必须先把这两块挖掉，否则会误报 */
const stripped = h
  .replace(/<!--PRON_MODULE_START-->[\s\S]*?<!--PRON_MODULE_END-->/, '')
  .replace(/<!--PRON_JS_START-->[\s\S]*?<!--PRON_JS_END-->/, '');
const bad = [];
/* 真正残留：本日不该出现的 Day-06 标识 */
['ukce_day06', 'Day-06 · ', 'Day 06 · ', 'Day06_'].forEach(k => {
  if (stripped.indexOf(k) > -1) bad.push(k);
});
/* 允许的跨日引用：模块 00/01/05 里刻意写的「回看 Day-06 错题本」提示 */
const expect = ['detriment', 'Upjohn warning', 'regulatory referral', 'preservation notice']
  .filter(k => stripped.indexOf(k) > -1);
if (stripped.indexOf('ukce_day07') < 0) bad.push('缺少 ukce_day07');
if (stripped.indexOf('<!-- 模块 3 PRON -->') < 0) bad.push('缺少 PRON 锚点');
if (stripped.indexOf('id="ckWrap"') < 0) bad.push('缺少 ckWrap 容器');
/* 术语测三件套 */
['id="quizTbl"', 'id="quizGrade"', 'id="quizScore"', 'id="vocabBody"', 'id="vocab2Body"', 'id="rateWrap"']
  .forEach(k => { if (stripped.indexOf(k) < 0) bad.push('缺少 ' + k); });
/* 100 道题 */
const qn = (h.match(/class="qin"/g) || []).length;
if (qn !== 100) bad.push('术语测题目数不是 100（实际 ' + qn + '）');
else log.push('术语测题目 100 道');

const out = path.join(DIR, 'Day-07.html');
fs.writeFileSync(out, h, 'utf8');
console.log(log.join('\n'));
console.log('\n跨日引用（预期保留，模块 00 的昨日回顾）：' + (expect.length ? expect.join(' | ') : '无'));
console.log('残留检查：' + (bad.length ? '!! 发现残留 → ' + bad.join(' | ') : '干净'));
console.log('已写入 ' + out + '（' + Buffer.byteLength(h, 'utf8') + ' 字节，' + h.split('\n').length + ' 行）');
if (bad.length) process.exit(1);
