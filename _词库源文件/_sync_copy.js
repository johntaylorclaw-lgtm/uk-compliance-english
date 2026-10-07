/* 同步 Day-01 / Day-02 / 作战中心的文案，反映「课程 = Anki 队列」与 1932 条词库 */
const fs = require('fs');
const path = require('path');
const DIR = 'D:/英语培训教程';

function rep(file, pairs) {
  const p = path.join(DIR, file);
  let h = fs.readFileSync(p, 'utf8');
  let ok = 0; const bad = [];
  pairs.forEach(([a, b]) => {
    if (h.indexOf(a) < 0) { bad.push(a.slice(0, 46).replace(/\n/g, ' ')); return; }
    h = h.split(a).join(b); ok++;
  });
  fs.writeFileSync(p, h, 'utf8');
  console.log(file.padEnd(20), '替换 ' + ok + '/' + pairs.length + (bad.length ? '  未命中: ' + bad.join(' || ') : ''));
}

/* ---------- Day-01 ---------- */
rep('Day-01.html', [
  ['<b>为什么改成 100 词：</b>你的词库现在有 1881 条，按每天 100 条推进，约 19 天可以过完新词，剩下三周全部转为间隔重复的复习巩固。前期投入重、后期自动变轻，这是词汇量最快滚起来的路径。',
   '<b style="color:var(--navy);">下面这 100 词，就是今天 Anki 会发给你的那 100 张卡，一字不差。</b>课程页与 Anki 从此共用同一个顺序：词库现共 <b>1932 条</b>，每天推进 100 条，约 20 天过完新词，之后全部转为间隔重复的复习巩固。前期投入重、后期自动变轻，这是词汇量最快滚起来的路径。'],
  ['导入同目录下的 <span class=\'mono\'>词表-Anki导入.csv</span>（1881 条）',
   '导入同目录下的 <span class=\'mono\'>词表-Anki导入.csv</span>（1932 条）']
]);

/* ---------- Day-02 ---------- */
rep('Day-02.html', [
  ['<b>今天这 100 词是从昨天的 1881 条词库里顺延出来的，不重复。</b>',
   '<b>今天这 100 词就是词库第 101–200 行，= 今天 Anki 会发给你的那 100 张卡，与昨天不重复。</b>'],
  ['<h3>词库推进地图（1881 条 · 每日 100 条 · 约 19 天）</h3>',
   '<h3>词库推进地图（1932 条 · 每日 100 条 · 约 20 天）</h3>']
]);

/* Day-02 推进地图表格整体重写 */
(function () {
  const p = path.join(DIR, 'Day-02.html');
  let h = fs.readFileSync(p, 'utf8');
  const s = h.indexOf('<thead><tr><th style="width:12%;">日程</th>');
  const e = h.indexOf('</tbody>', s);
  if (s < 0 || e < 0) { console.log('Day-02 地图表格定位失败'); return; }
  const rows = [
    ['Day 01', '1–100', '银行业与国际金融市场 <b>1–100</b>（nostro / L/C / Basel III / SWIFT / CHAPS …）', '已完成'],
    ['Day 02', '101–200', '银行业 <b>101–173</b> + AML <b>1–27</b>（支付报文、货币市场基准、资本监管指标、AML 开篇）', '已完成'],
    ['Day 03', '201–300', 'AML / KYC <b>28–127</b>（监测、分诊、风险评级、MLR 2017、JMLSG）', '当期'],
    ['Day 04', '301–400', 'AML 尾部 <b>19 条</b> + <b>核心词 51 条</b>（account / compliance / proportionate / escalate …）+ 制裁 <b>30 条</b>', ''],
    ['Day 05 起', '401–', '制裁 → 金融犯罪 → 金融产品 → 英美监管 → 数据隐私 …… 一路顺延', ''],
    ['Day 19–20', '1801–1932', '伦敦地标与交通收尾 + 英国文化与社交 <b>最后 33 条</b>', '']
  ];
  const tbody = rows.map((r, i) => {
    const cur = r[3] === '当期';
    return '        <tr' + (cur ? ' style="background:#f4f8ff;"' : '') + '>\n' +
      '          <td class="en">' + r[0] + (cur ? ' <span class="pill navy">当前</span>' : '') + '</td>\n' +
      '          <td class="mono" style="font-size:12px;">' + r[1] + '</td>\n' +
      '          <td class="ex">' + r[2] + '</td>\n' +
      '        </tr>';
  }).join('\n');
  const head = '<thead><tr><th style="width:13%;">日程</th><th style="width:13%;">词表行号</th><th>内容</th></tr></thead>\n      <tbody>\n';
  h = h.slice(0, s) + head + tbody + '\n      ' + h.slice(e);
  fs.writeFileSync(p, h, 'utf8');
  console.log('Day-02 推进地图已重写');
})();

/* Day-02 地图下方说明 */
rep('Day-02.html', [
  ['<b>关于精讲词的一个灵活处理：</b>精讲词我按"当天主题"从全库精选，不严格按领域顺序取——因为要求"造句"的词必须是<b>你当天就会用到的</b>。拓展词则严格按顺序推进，保证 19 天内不重不漏。',
   '<b>对齐规则（从今天起固定）：</b>每天 100 词的取材顺序，与 Anki 发放新卡的顺序<b>完全一致</b>——Anki 按 position 升序发卡，position 就是从词表行号换算来的。所以你只要打开 Anki，看到的必然是这张表上今天那一行。<br><br><b>精讲 30 词怎么挑：</b>在当天那 100 词里挑出读音最易错、或日常最高频的 30 个重点讲，其余 70 个做认读。<span class="mono">Day 04</span> 会补上 <b>51 个核心词</b>（account / compliance / proportionate / escalate 这类地基词与拼读易错词），它们原本只在课程页出现、Anki 里没有，现已收入词库并排进队列。']
]);

/* ---------- 作战中心 ---------- */
rep('00-作战中心.html', [
  ['导入本目录下的 CSV 词表（1881 条）', '导入本目录下的 CSV 词表（1932 条）'],
  ['按 100 条/天推进，约 19 天可过完全部新词', '按 100 条/天推进，约 20 天可过完全部新词']
]);
