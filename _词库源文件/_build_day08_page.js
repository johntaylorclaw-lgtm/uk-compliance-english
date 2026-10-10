/* ============================================================
   生成 Day-08.html
   做法：以 Day-07.html 为「设计系统骨架」，只替换内容区块。
   模块 03 PRON 保持不动，由 _朗读源文件/_build_day_pron.js 覆盖注入。

   注：原脚本硬编码 D:/英语培训教程（原作者本机路径），
       此处改为 __dirname 向上两级，项目可整体搬移。
   ============================================================ */
const fs = require('fs');
const path = require('path');
const DIR = path.resolve(__dirname, '..');
const PARTS = path.join(DIR, '_词库源文件/_day8_parts');

const read = f => fs.readFileSync(path.join(PARTS, f), 'utf8').trimEnd() + '\n';

let h = fs.readFileSync(path.join(DIR, 'Day-07.html'), 'utf8');
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
/* 删除一个已注入的 <style id="..."> 块（本日无术语测，需去掉 Day-07 遗留样式） */
function dropStyle(id, label) {
  const re = new RegExp('\\n?<style id="' + id + '">[\\s\\S]*?</style>');
  if (!re.test(h)) { log.push('跳过（未找到）' + label); return; }
  h = h.replace(re, '');
  log.push('移除 ' + label);
}

const TITLE = 'Day 08 · 数据与隐私保护 I：主体权利与跨境传输 — 英国银行业合规英语强化';
const HEADLINE = 'Day 08 · 数据与隐私保护 I：主体权利与跨境传输';

const HERO_P = `<p>今天进入<b>第 2 周第 1 天</b>，主题是<b>数据与隐私保护</b>。词表第 701–800 行由两块拼成：<b>英美监管与市场行为 44 条</b>——监管检查与执法工具（SREP / OIREQ / 三类 notice / prohibition order / review of past business）、Consumer Duty 的四项消费者结果、市场滥用（MAR / insider list / closed period / PDMR）、MiFID II 与交易报告；以及<b>数据与隐私保护 56 条</b>——GDPR 基石、合法性基础、六大主体权利、72 小时泄露通报、三套跨境传输机制（SCCs / BCRs / IDTA）。<b>这是你入职英国银行后最可能「被叫进会议室」的第二条线</b>——不是因为你违规，而是因为某个客户问「你们拿我的数据做什么」，或者系统报警说「数据泄露了」。听力脚本 accordingly 换成一场<b>数据泄露的 72 小时作战会</b>：重点不是技术细节，而是<b>时钟从什么时候开始算、以及这段时间里谁签字</b>。</p>`;

const INFO_BOX = `<div class="info" style="margin-bottom:16px;">
  <b>今天的节奏安排：</b>回到正常节奏，<b>不设术语测</b>（昨天是周测日，今天是新词日）。30 个精讲名额的分配原则是<b>「义务词优先」</b>——因为数据保护这个词表的特点是<b>名词全是硬义务</b>：controller / processor / breach / notification / erasure，每一条都对应一个「谁必须做什么」。<b>所以精讲 30 个里有 12 个是「义务型名词」</b>（监管工具 7 + GDPR 基石 5），另外 18 个是定义型与市场型词汇放拓展档认读。<b>请按 00 → 01 → 02 → 03 → 04 → 05 的顺序做</b>。时间不够时优先砍模块 05 的写作，<b>模块 01 的 B 段（数据泄露 72 小时作战会）和模块 02 的义务词不能砍</b>。
</div>`;

/* ---------- 1. 头部 ---------- */
cut('<title>', '</title>', `<title>${TITLE}</title>`, 'title');
cut('<div class="crumb">', '</div>',
  '<div class="crumb"><a href="00-作战中心.html">← 返回作战中心</a>　·　第 2 周：数据与隐私 / 法律　·　<a href="Day-07.html">Day 07</a></div>', 'crumb');
cut('<h1>', '</h1>', '<h1>' + HEADLINE + '</h1>', 'h1');
cut('<p>今天是', '</p>', HERO_P, 'hero 段落');
once('<b>4 h 35 m</b><span>今日训练量</span>', '<b>4 h 15 m</b><span>今日训练量</span>', '训练量 4h35m → 4h15m（普通日，无术语测）');
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
  ${HEADLINE}　|　<a href="00-作战中心.html">作战中心</a>　·　<a href="01-听力系统.html">听力系统</a>　·　<a href="02-Anki复习系统.html">Anki 系统</a>　·　<a href="03-发音与朗读系统.html">朗读库</a>　·　<a href="Day-07.html">Day 07</a>　·　Day 09（待生成）
</footer>`, 'footer');

once('var LS = "ukce_day07";', 'var LS = "ukce_day08";', 'localStorage 键');

/* ---------- 5. 移除 Day-07 遗留的术语测样式（本日无测验） ---------- */
dropStyle('day7QuizCss', 'Day-07 术语测样式');

/* ---------- 6. 自检 ---------- */
/* 模块 03 PRON 的正文与脚本此刻仍是 Day-07 的旧内容（随后由 _build_day_pron.js 覆盖），
   检查残留时必须先把这两块挖掉，否则会误报 */
const stripped = h
  .replace(/<!--PRON_MODULE_START-->[\s\S]*?<!--PRON_MODULE_END-->/, '')
  .replace(/<!--PRON_JS_START-->[\s\S]*?<!--PRON_JS_END-->/, '');
const bad = [];
/* 真正残留：本日不该出现的 Day-07 标识与术语测构件 */
['ukce_day07', 'Day-07 · ', 'Day 07 · ',
 'quizTbl', 'quizGrade', 'quizScore', 'QUIZ_ANS', 'day7QuizCss'].forEach(k => {
  if (stripped.indexOf(k) > -1) bad.push(k);
});
/* 注：'Day07_' 是模块 05 里刻意写的「回看昨天作业文件名」，属合法跨日引用 */
if (stripped.indexOf('ukce_day08') < 0) bad.push('缺少 ukce_day08');
if (stripped.indexOf('<!-- 模块 3 PRON -->') < 0) bad.push('缺少 PRON 锚点');
/* 五个打卡容器各须恰好一次 */
['ckSetup', 'ckListen', 'ckSpeak', 'ckWrite', 'ckWrap'].forEach(id => {
  const n = (stripped.split('id="' + id + '"').length - 1);
  if (n !== 1) bad.push('#' + id + ' 容器出现 ' + n + ' 次（应为 1）');
});
/* 当日主题必须在场 */
if (!/数据与隐私|数据保护/.test(stripped)) bad.push('缺少「数据与隐私保护」当日主题');
/* 表格渲染容器 */
['id="vocabBody"', 'id="vocab2Body"', 'id="rateWrap"'].forEach(k => {
  if (stripped.indexOf(k) < 0) bad.push('缺少 ' + k);
});
/* 不应再有术语测输入框 */
if (/class="qin"/.test(h)) bad.push('仍残留术语测输入框');

const out = path.join(DIR, 'Day-08.html');
fs.writeFileSync(out, h, 'utf8');
console.log(log.join('\n'));
console.log('\n残留检查：' + (bad.length ? '!! 发现残留 → ' + bad.join(' | ') : '干净'));
console.log('已写入 ' + out + '（' + Buffer.byteLength(h, 'utf8') + ' 字节，' + h.split('\n').length + ' 行）');
if (bad.length) process.exit(1);
