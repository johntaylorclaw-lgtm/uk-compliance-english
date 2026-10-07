const fs = require("fs");
const DIR = "D:/英语培训教程";
const dayPath = DIR + "/Day-01.html";
const ctrPath = DIR + "/00-作战中心.html";

/* ---------- 1. 从作战中心取词库，构建 70 个拓展词 ---------- */
const ctr = fs.readFileSync(ctrPath, "utf8");
const cjs = ctr.match(/<script>([\s\S]*?)<\/script>/)[1];
const vm = require("vm");
const ctx = {};
vm.createContext(ctx);
vm.runInContext(cjs.slice(0, cjs.indexOf("var LS_KEY")), ctx);

const dict = {};
ctx.VOCAB_DOMAINS.forEach(d => d.deck.forEach(v => { if (!dict[v[0]]) dict[v[0]] = v[1]; }));

const PICK = [
  ["nostro account", "我行在他行开立的账户。Nostro =「我们的」，记法：钱在别人家的账上"],
  ["vostro account", "他行在我行开立的账户。Vostro =「你们的」，与 nostro 恰好互为镜像"],
  ["correspondent banking", "跨境汇款的主干通道，也是反洗钱尽调的重点对象"],
  ["letter of credit (L/C)", "银行以自身信用作出的付款承诺，凭相符单据付款"],
  ["trade finance", "贸易融资总称，包含信用证、保函、保理等工具"],
  ["syndicated loan", "银团贷款，多家银行按份额共同放款、共担风险"],
  ["underwriting", "承销；在保险语境下是「承保」，一词两义"],
  ["custody", "资产托管；做托管业务的机构叫 custodian"],
  ["derivative", "衍生品，价值来源于标的资产，本身不构成标的"],
  ["interest rate swap (IRS)", "利率互换，交换固定与浮动利率现金流"],
  ["FX spot / forward / swap", "外汇即期 / 远期 / 掉期，三大基础品种"],
  ["clearing house", "清算所，承担中央对手方角色，消除双边信用风险"],
  ["haircut", "押品估值折扣率，不是「理发」"],
  ["margin call", "追加保证金通知；一旦触发即升级为风险事件"],
  ["leverage ratio", "杠杆率，不依赖风险权重的资本底线指标"],
  ["capital adequacy", "资本充足性，审慎监管的第一命题"],
  ["Basel III", "巴塞尔协议 III，全球银行资本与流动性规则的框架"],
  ["CET1 (Common Equity Tier 1)", "核心一级资本，资本中质量最高的一层"],
  ["risk-weighted assets (RWA)", "风险加权资产，资本充足率的分母"],
  ["liquidity coverage ratio (LCR)", "流动性覆盖率，考察 30 天压力情景下的存活能力"],
  ["net stable funding ratio (NSFR)", "净稳定资金比率，考察一年期的结构性资金匹配"],
  ["ICAAP / ILAAP", "银行自行评估资本与流动性充足性的年度作业，须经监管审阅"],
  ["stress testing", "压力测试，检验极端情景下的承受力"],
  ["balance sheet", "资产负债表"],
  ["provisioning", "计提拨备，为预期损失预留在利润中反映"],
  ["impairment", "减值，资产账面价值高于可收回金额的部分"],
  ["non-performing loan (NPL)", "不良贷款，通常指逾期 90 天以上"],
  ["fiduciary duty", "受托义务。英式读音 /fɪˈdjuːʃəri/，重音在第二音节"],
  ["prospectus", "招股说明书，公开发行证券的法定披露文件"],
  ["ISDA Master Agreement", "场外衍生品主协议，全球衍生品交易的标准合同基础"],
  ["SWIFT MT103 / MT202", "客户汇款 / 银行间资金划转报文，跨境支付的两块基石"],
  ["IBAN / BIC", "国际银行账号 / 银行识别码，跨境汇款的必备要素"],
  ["CHAPS", "英国大额英镑清算系统，同日到账，主要用于高价值支付"],
  ["BACS", "英国批量自动清算系统，通常 3 个工作日到账，工资与直接借记常用"],
  ["Faster Payments", "英国小额实时支付系统，7×24 小时秒级到账"],
  ["SEPA", "单一欧元支付区，欧元区内跨境支付视同境内"],
  ["open banking", "开放银行，英国是全球首创并强制推行的法域"],
  ["ring-fencing", "业务隔离，英国自 2019 年起强制零售银行与投行业务分离"],
  ["resolution / bail-in", "处置 / 内部纾困，让债权人而非纳税人承担损失"],
  ["securitisation", "证券化，把资产打包成可在市场流通的证券"],
  ["repo (repurchase agreement)", "回购，金融机构短期融资的主力工具"],
  ["netting", "净额结算，把双向敞口轧差为单向净额"],
  ["facility / drawdown", "授信额度 / 提款，额度是「可借上限」，提款才是「真借了」"],
  ["covenant", "契约条款；违反财务契约即构成技术性违约"],
  ["RTGS (real-time gross settlement)", "实时全额结算，逐笔实时、不做轧差，CHAPS 属此类"],
  ["ISO 20022", "全球支付报文新标准，正在全面取代传统 SWIFT MT 格式"],
  ["payment versus payment (PvP)", "汇兑同步交收，彻底消除外汇结算的本金风险"],
  ["delivery versus payment (DvP)", "券款对付，证券与资金同步交收"],
  ["settlement risk", "结算风险，交易已执行但交收未完成期间的敞口"],
  ["Herstatt risk", "赫斯塔特风险，跨时区结算导致的单边本金损失风险"],
  ["revolving credit facility (RCF)", "循环授信，还款后额度可重复使用"],
  ["term loan", "定期贷款，一次性提款、按计划还款"],
  ["project finance", "项目融资，还款来源限定于项目自身现金流，追索有限"],
  ["asset-backed securities (ABS)", "资产支持证券，以资产池现金流为偿付来源"],
  ["covered bond", "担保债券，投资者对发行人与资产池有双追索权"],
  ["senior / subordinated debt", "高级 / 次级债，清偿顺序不同，定价差异明显"],
  ["event of default (EOD)", "违约事件，触发后可加速到期"],
  ["financial covenant", "财务契约，如杠杆率、利息覆盖倍数等指标承诺"],
  ["forbearance", "宽限 / 让步，监管高度关注其是否被用来掩盖真实不良"],
  ["expected credit loss (ECL)", "预期信用损失，IFRS 9 减值模型的核心概念"],
  ["IFRS 9", "国际财务报告准则第 9 号，金融工具会计处理的总纲"],
  ["risk appetite statement (RAS)", "风险偏好声明，董事会设定的可承受风险边界"],
  ["net interest income (NII)", "净利息收入，银行最核心的收入来源"],
  ["cost-income ratio", "成本收入比，衡量经营效率的关键指标"],
  ["return on equity (RoE)", "净资产收益率，股东最关心的盈利指标"],
  ["true sale", "真实出售，资产证券化出表的前提条件"],
  ["banking book / trading book", "银行账簿 / 交易账簿，两套资本计量与风险管理体系"],
  ["mark-to-market", "按市值计价，与 mark-to-model 相对"],
  ["initial margin / variation margin", "初始保证金 / 变动保证金，前者防未来风险，后者补当前损益"],
  ["central counterparty (CCP)", "中央对手方，介入买卖双方之间成为「所有人的对手方」"]
];

const missing = PICK.filter(p => !dict[p[0]]);
if (missing.length) { console.log("!! 词库中缺少:", missing.map(m => m[0]).join(", ")); }

const EXTRA = PICK.map(p => [p[0], dict[p[0]] || "", p[1]]);
console.log("拓展词条数:", EXTRA.length, "| 其中无中文释义:", EXTRA.filter(e => !e[1]).length);

/* ---------- 2. 改写 Day-01.html ---------- */
let h = fs.readFileSync(dayPath, "utf8");
const before = h.length;

/* 2a. 模块标题与时长 */
h = h.replace(
  '<div class="mod-tt"><h3>词汇：第一批 30 个核心词</h3><p>带英式读音要点和合规场景例句</p></div>\n    <div class="mod-time">40 分钟</div>',
  '<div class="mod-tt"><h3>词汇：100 个核心词（30 精讲 + 70 拓展）</h3><p>精讲词带读音要点与英式例句，拓展词做认读铺量</p></div>\n    <div class="mod-time">50 分钟</div>'
);

/* 2b. 说明段 */
h = h.replace(
  '<b>今天的要求是"能用"，不是"认识"。</b>右上角的小方框是"造句打卡"——每学一个词，必须口头造一个和你自己工作相关的句子，然后才勾。只勾不造句，等于今天白练。',
  '<b>今天共 100 词，分两档处理。</b><b style="color:var(--red);">第一档 30 个精讲词</b>（下表）要求"能用"——每个词必须口头造一个和你自己工作相关的句子才能勾选造句框，只勾不造句等于白练。<b style="color:var(--teal);">第二档 70 个拓展词</b>（下方紧凑表）只要求"认识"——能在听力里认出来、在阅读里不卡住即可，不必强求主动使用。<br><br><b>为什么改成 100 词：</b>你的词库现在有 1881 条，按每天 100 条推进，约 19 天可以过完新词，剩下三周全部转为间隔重复的复习巩固。前期投入重、后期自动变轻，这是词汇量最快滚起来的路径。'
);

/* 2c. 在精讲表后插入拓展表 */
const anchor = `  <div class="tblwrap">
    <table id="vocabTbl">
      <thead><tr><th style="width:34px;">造句</th><th>英文</th><th>读音要点</th><th>释义</th><th>英式例句</th></tr></thead>
      <tbody id="vocabBody"></tbody>
    </table>
  </div>
`;
const extraBlock = `
  <h4 style="margin:20px 0 8px;">第二档｜拓展词 70 个（认读即可）</h4>
  <div class="note" style="margin-bottom:10px;">
    这 70 个词同样进 Anki。要求降到最低：<b>看到英文能想起中文、听到能反应过来</b>就行。不要在这里花时间造句，把时间留给上面 30 个精讲词。
  </div>
  <div class="tblwrap">
    <table id="vocab2Tbl">
      <thead><tr><th style="width:34px;">打卡</th><th style="width:26%;">英文</th><th style="width:20%;">中文</th><th>备注（用途与易错点）</th></tr></thead>
      <tbody id="vocab2Body"></tbody>
    </table>
  </div>
`;
if (h.indexOf(anchor) < 0) { console.log("!! 未找到精讲表锚点"); }
else { h = h.replace(anchor, anchor + extraBlock); }

/* 2d. 插入 EXTRA 数据并渲染 */
const dataAnchor = "(function renderVocab(){";
const extraJs = "var EXTRA = " + JSON.stringify(EXTRA, null, 0) + ";\n\n";
if (h.indexOf(dataAnchor) < 0) { console.log("!! 未找到渲染锚点"); }
else {
  h = h.replace(dataAnchor, extraJs +
`(function renderVocab2(){
  var tb = $("#vocab2Body");
  EXTRA.forEach(function(w, i){
    var tr = document.createElement("tr");
    var on = state.voc2[i] ? " on" : "";
    tr.innerHTML =
      '<td><span class="vck' + on + '" data-j="' + i + '"></span></td>' +
      '<td class="en">' + w[0] + '</td>' +
      '<td>' + w[1] + '</td>' +
      '<td class="ex" style="font-size:12px;">' + w[2] + '</td>';
    tb.appendChild(tr);
  });
  tb.addEventListener("click", function(e){
    var el = e.target;
    if(!el.classList.contains("vck")){ return; }
    var i = el.getAttribute("data-j");
    if(state.voc2[i]){ delete state.voc2[i]; } else { state.voc2[i] = true; }
    el.classList.toggle("on", !!state.voc2[i]);
    save(); sync();
  });
})();

` + dataAnchor);
}

/* 2e. state 增加 voc2 */
h = h.replace('voc:{}, voc2:{},', 'voc:{}, voc2:{},');
if (h.indexOf('voc2') < 0 || h.indexOf('voc:{}, voc2:{}') < 0) {
  h = h.replace(/voc:\{\}/, 'voc:{}, voc2:{}');
}

/* 2f. 进度统计纳入 EXTRA */
h = h.replace(
`  total += WORDS.length;
  done += Object.keys(state.voc).length;`,
`  total += WORDS.length + EXTRA.length;
  done += Object.keys(state.voc).length + Object.keys(state.voc2).length;`
);
h = h.replace(
`  var vocN = Object.keys(state.voc).length;
  $("#progText").textContent = c.done + " / " + c.total + " 项已完成　·　其中造句打卡 " + vocN + " / " + WORDS.length;`,
`  var vocN = Object.keys(state.voc).length, vocN2 = Object.keys(state.voc2).length;
  $("#progText").textContent = c.done + " / " + c.total + " 项已完成　·　精讲词造句 " + vocN + " / " + WORDS.length + "　·　拓展词认读 " + vocN2 + " / " + EXTRA.length;`
);

/* 2g. 文案里的 30 → 100 */
h = h.replace('查看 30 词的「合规场景进阶搭配」', '查看 30 个精讲词的「合规场景进阶搭配」');
h = h.replace('"30 个核心词全部口头造句一遍，造句打卡已勾选"', '"100 个核心词过完一遍：30 个精讲词已完成口头造句打卡，70 个拓展词已在 Anki 中完成首轮"');

fs.writeFileSync(dayPath, h, "utf8");
console.log("Day-01.html:", before, "->", h.length);

/* ---------- 3. 作战中心：时间块 + 每日词汇量 ---------- */
let c2 = fs.readFileSync(ctrPath, "utf8");
const c2before = c2.length;

const oldTable = `<h3>每日 3 小时时间块（核心模板）</h3>
      <div class="rowline"><div class="t">0:00 – 0:30 精听</div><div class="m">英式材料影子跟读（Shadowing）<em>BBC / FT / FCA 音频，一句一停，跟读复述</em></div></div>
      <div class="rowline"><div class="t">0:30 – 1:00 术语</div><div class="m">间隔重复闪卡 + 主动造句<em>每天 25–30 张，必须口头造句，不能只认读</em></div></div>
      <div class="rowline"><div class="t">1:00 – 1:45 精读</div><div class="m">监管文本与合规文件<em>逐段标注 + 合上资料用英文复述大意</em></div></div>
      <div class="rowline"><div class="t">1:45 – 2:30 口语</div><div class="m">录音输出 + 自评 + 重录<em>每段录音听两遍：第一遍记卡壳处，第二遍重录</em></div></div>
      <div class="rowline"><div class="t">2:30 – 3:00 写作</div><div class="m">邮件 / 备忘 / 意见书<em>写完必做一步：朗读自己的英文，改掉拗口处</em></div></div>`;
const newTable = `<h3>每日 3.5 小时时间块（核心模板）</h3>
      <div class="rowline"><div class="t">0:00 – 0:30 精听</div><div class="m">英式材料影子跟读（Shadowing）<em>BBC / FT / FCA 音频，一句一停，跟读复述</em></div></div>
      <div class="rowline"><div class="t">0:30 – 1:20 术语</div><div class="m">间隔重复闪卡 + 主动造句<em>每天 100 张。其中约 30 张为「精讲词」须口头造句，其余为「拓展词」只做认读</em></div></div>
      <div class="rowline"><div class="t">1:20 – 2:05 精读</div><div class="m">监管文本与合规文件<em>逐段标注 + 合上资料用英文复述大意</em></div></div>
      <div class="rowline"><div class="t">2:05 – 2:50 口语</div><div class="m">录音输出 + 自评 + 重录<em>每段录音听两遍：第一遍记卡壳处，第二遍重录</em></div></div>
      <div class="rowline"><div class="t">2:50 – 3:20 写作</div><div class="m">邮件 / 备忘 / 意见书<em>写完必做一步：朗读自己的英文，改掉拗口处</em></div></div>`;
if (c2.indexOf(oldTable) < 0) { console.log("!! 未找到时间块表格"); }
else { c2 = c2.replace(oldTable, newTable); }

/* 每日计划里的「N 张」统一改为 100 张 */
const beforeCnt = (c2.match(/\d+\s*张/g) || []).length;
c2 = c2.replace(/(\d+)\s*张/g, "100 张");
console.log("计划表内词卡数量替换:", beforeCnt, "处");

/* 词库卡片区的数量文案同步 */
c2 = c2.replace(/353 条|353个|353 个/g, "1881 条");

fs.writeFileSync(ctrPath, c2, "utf8");
console.log("00-作战中心.html:", c2before, "->", c2.length);
