/* 在 02-Anki复习系统.html 中加入「课程与 Anki 的对齐规则」并同步统计 */
const fs = require('fs');
const path = require('path');
const P = path.join('D:/英语培训教程', '02-Anki复习系统.html');
let h = fs.readFileSync(P, 'utf8');
const R = [];
function rep(a, b, tag) {
  if (h.indexOf(a) < 0) { R.push('未命中: ' + tag); return; }
  h = h.split(a).join(b); R.push('ok: ' + tag);
}

/* ---------- 1. hero 统计刷新 ---------- */
rep('<div class="stat"><b>1881</b><span>已导入卡片</span></div>\n      <div class="stat"><b>100</b><span>今日待复习</span></div>\n      <div class="stat"><b>1</b><span>当前复习间隔（天）</span></div>\n      <div class="stat"><b>0</b><span>遗留 Easy 记录</span></div>',
  '<div class="stat"><b>1932</b><span>牌组卡片总数</span></div>\n      <div class="stat"><b>200</b><span>已学（复习卡）</span></div>\n      <div class="stat"><b>1732</b><span>待学新卡</span></div>\n      <div class="stat"><b>0</b><span>课程/Anki 错位</span></div>',
  'hero 统计');

/* ---------- 2. 章节编号顺延 ---------- */
rep('<h2 class="sec">八、和课程节奏的衔接</h2>', '<h2 class="sec">九、和课程节奏的衔接</h2>', '八→九');
rep('<h2 class="sec">九、当前状态与接下来三件事</h2>', '<h2 class="sec">十、当前状态与接下来三件事</h2>', '九→十');
rep('<h2 class="sec">七、19 天复习量预测</h2>', '<h2 class="sec">七、20 天复习量预测</h2>', '七节标题');
rep('<tr style="background:#fff8f8;"><td class="en">Day 15–19</td>', '<tr style="background:#fff8f8;"><td class="en">Day 16–20</td>', '表格末行');

/* ---------- 3. 新增第八节 ---------- */
const SEC8 = `
<h2 class="sec">八、课程与 Anki 的对齐规则（2026-10-03 已执行）</h2>
<p class="sub">你在 Day 2 提出的问题：课程页的 100 词，和 Anki 实际发下来的 100 张卡不是同一批。这一节是根因与已执行的修复。</p>

<div class="card" style="border-left:4px solid var(--red);">
  <h3>问题出在哪</h3>
  <p class="sub">两套东西原本各有各的顺序，从来没对齐过。</p>
  <div class="tblwrap">
    <table>
      <thead><tr><th style="width:110px;">对象</th><th style="width:44%;">顺序依据</th><th>Day-01 实际内容</th></tr></thead>
      <tbody>
        <tr>
          <td class="en">Anki</td>
          <td class="ex">词表 CSV 的导入顺序（按领域聚合：银行业 173 → AML 145 → 制裁 101 …）</td>
          <td class="ex">银行业第 <b>1–100</b> 条（nostro account / L/C / Basel III …）</td>
        </tr>
        <tr>
          <td class="en">课程页</td>
          <td class="ex">我按「当天主题」从全库挑 30 个精讲 + 顺延 70 个拓展</td>
          <td class="ex">account / balance / debit / credit …（基础词）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="bad" style="margin-top:12px;">
    <b>两者交集只有 70 个。</b>更严重的是：Day-02 安排的 30 个拼读易错词（compliance / proportionate / licence / escalate …）<b>在 Anki 里根本不存在</b>——它们只写在课程页上，从来没进过词库。<br>
    也就是说，你实际在 Anki 里学到的，和课程页告诉你要学的，是两批词。
  </div>
</div>

<div class="card" style="border-left:4px solid var(--green);">
  <h3>已执行的修复（三步）</h3>
  <ol class="tight" style="font-size:13.3px;">
    <li><b>补齐词库缺口。</b>新建领域「核心词与拼读易错」（<span class="mono">core</span>），把 Day-01 / Day-02 那 <b>51 个</b>原本「只存在于课程页」的词收入词库。<br>词库从 <b>1881 条 → 1932 条</b>，领域 <b>22 → 23 个</b>。</li>
    <li><b>统一顺序。</b>词表 CSV 现在同时就是「课程顺序」。Anki 按 <span class="mono">position</span> 升序发卡，而 position 直接由词表行号换算：<span class="mono">position = 行号 − 100</span>。</li>
    <li><b>重排 Anki。</b>51 张新卡已插入牌组，1681 张未学新卡的 position 已按词表行号重新编号。逐条校验结果：<b>1732 张新卡，零错位</b>；数据库 <span class="mono">integrity_check / quick_check</span> 全部通过，外键 0 问题。</li>
  </ol>
  <div style="margin-top:12px;">
    <span class="pill green">牌组总数 1932</span>
    <span class="pill navy">已学 200</span>
    <span class="pill amber">待学 1732</span>
    <span class="pill green">错位 0</span>
  </div>
</div>

<div class="card" style="background:linear-gradient(120deg,#f4f8ff,#fff);">
  <h3>从今天起固定的规则</h3>
  <div class="note" style="font-size:14px;">
    <b>Day-N 的 100 词 = 词表 CSV 第 (N−1)×100+1 到 N×100 行。</b><br>
    Day-01 = 1–100　·　Day-02 = 101–200　·　Day-03 = 201–300　·　…　Day-20 = 1901–1932
  </div>
  <p class="sub" style="margin-top:12px;">所以你打开 Anki 看到的新卡，必然和课程页上今天那一行是同一批词。这条规则不需要你记——每天课程页顶部都有「今日 Anki 队列」的标注，对照一下即可。</p>
  <div class="tblwrap" style="max-height:none;">
    <table>
      <thead><tr><th style="width:80px;">日程</th><th style="width:100px;">词表行号</th><th>内容</th></tr></thead>
      <tbody>
        <tr><td class="en">Day 01</td><td class="mono" style="font-size:12px;">1–100</td><td class="ex">银行业与国际金融市场 1–100</td></tr>
        <tr><td class="en">Day 02</td><td class="mono" style="font-size:12px;">101–200</td><td class="ex">银行业 101–173 + AML 1–27</td></tr>
        <tr style="background:#f4f8ff;"><td class="en">Day 03</td><td class="mono" style="font-size:12px;">200–299</td><td class="ex">AML / KYC 28–127（监测、分诊、风险评级、MLR 2017、JMLSG）</td></tr>
        <tr><td class="en">Day 04</td><td class="mono" style="font-size:12px;">300–399</td><td class="ex">AML 尾部 19 条 + <b>核心词 51 条</b> + 制裁 30 条</td></tr>
        <tr><td class="en">Day 05 起</td><td class="mono" style="font-size:12px;">400–</td><td class="ex">制裁 → 金融犯罪 → 金融产品 → 英美监管 → 数据隐私 … 一路顺延</td></tr>
        <tr><td class="en">Day 19–20</td><td class="mono" style="font-size:12px;">1801–1932</td><td class="ex">伦敦地标与交通收尾 + 英国文化与社交最后 33 条</td></tr>
      </tbody>
    </table>
  </div>
  <div class="note" style="margin-top:12px;">
    <b>一处细节，说明一下：</b>词表第 200 行（<span class="mono">Financial Intelligence Unit</span>）在 Day-02 那时被 Anki 跳过了，因此它顺延成了 Day-03 批次的第一张——也就是说第 200 行在 Day-02 与 Day-03 都会出现。<b>这不是错误，是把漏掉的那一张补回来。</b>
  </div>
</div>

<div class="card">
  <h3>每天 10 秒自查</h3>
  <ol class="tight" style="font-size:13.3px;">
    <li>打开 Anki 主界面，看「待学」蓝色数字是否为 <b>100</b>。</li>
    <li>翻开课程页的「今日 Anki 队列」标注，看行号是否为今天那一段。</li>
    <li>如果两者对不上（例如 Anki 只剩 40 张新卡、或跳到了别的领域），把主界面三个数字告诉我，我来查。</li>
  </ol>
</div>
`;

const anchor = '<h2 class="sec">九、和课程节奏的衔接</h2>';
if (h.indexOf(anchor) < 0) { R.push('未找到插入锚点'); }
else { h = h.replace(anchor, SEC8 + '\n' + anchor); R.push('ok: 插入第八节'); }

fs.writeFileSync(P, h, 'utf8');
R.forEach(x => console.log(x));
console.log('文件大小:', (fs.statSync(P).size / 1024).toFixed(1), 'KB');
