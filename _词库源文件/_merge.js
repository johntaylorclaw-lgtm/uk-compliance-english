const fs = require("fs");
const path = require("path");
const DIR = "D:/英语培训教程";

const DOMAINS_DECL = `var VOCAB_DOMAINS = [
  {id:"bank",   name:"银行业与国际金融市场",      deck:[]},
  {id:"aml",    name:"反洗钱与客户尽调 AML/KYC",   deck:[]},
  {id:"sanc",   name:"制裁与出口管制",             deck:[]},
  {id:"priv",   name:"数据与隐私保护",             deck:[]},
  {id:"reg",    name:"英美监管与市场行为",         deck:[]},
  {id:"work",   name:"合规职场与会议口语",         deck:[]},
  {id:"org",    name:"银行组织、职位与部门",       deck:[]},
  {id:"sup",    name:"监管检查、审计与调查",       deck:[]},
  {id:"legal",  name:"合同与法律英语",             deck:[]},
  {id:"fin",    name:"财务会计与报表",             deck:[]},
  {id:"trade",  name:"贸易融资与贸易洗钱",         deck:[]},
  {id:"digi",   name:"数字资产与金融科技合规",     deck:[]},
  {id:"life",   name:"英国日常生活：食品与日用品", deck:[]},
  {id:"london", name:"伦敦地标与交通",             deck:[]},
  {id:"crime",  name:"金融犯罪、欺诈与执法",       deck:[]},
  {id:"prod",   name:"金融产品与市场工具",         deck:[]},
  {id:"risk",   name:"风险管理与内部控制",         deck:[]},
  {id:"esg",    name:"ESG 与可持续金融合规",       deck:[]},
  {id:"tax",    name:"税务合规与信息交换",         deck:[]},
  {id:"cyber",  name:"网络安全与运营韧性",         deck:[]},
  {id:"civi",   name:"英国生活事务：租房、医疗与开户", deck:[]},
  {id:"soc",    name:"英国文化与社交",             deck:[]},
  {id:"core",   name:"核心词与拼读易错",           deck:[]}
];

`;

const FILES = ["_v1.js","_v2.js","_v3.js","_v4.js","_v5.js","_v6.js","_v7.js","_v8.js","_v9.js","_v10.js","_v11.js","_v12.js"];

/* 领域展示顺序：专业合规在前，生活文化在后 */
const REORDER = `

/* ---- 领域展示顺序 + 全局去重（保留首次出现） ---- */
(function(){
  var ORDER = "bank,aml,core,sanc,crime,prod,reg,priv,legal,sup,risk,esg,cyber,tax,org,fin,trade,digi,work,life,civi,london,soc".split(",");
  VOCAB_DOMAINS.sort(function(a, b){ return ORDER.indexOf(a.id) - ORDER.indexOf(b.id); });
  var seen = {}, dropped = 0, enriched = 0;
  VOCAB_DOMAINS.forEach(function(d){
    d.deck = d.deck.filter(function(v){
      var k = String(v[0]).toLowerCase();
      if (seen[k]) {
        if (!seen[k][2] && v[2]) { seen[k][2] = v[2]; enriched++; }
        dropped++; return false;
      }
      seen[k] = v; return true;
    });
  });
  if (dropped) console.log("合并时自动去重: " + dropped + " 条（其中 " + enriched + " 条补充了注释）");
})();

`;

const newBlock = DOMAINS_DECL
  + FILES.map(f => {
      const p = path.join(DIR, "_词库源文件", f);
      if (!fs.existsSync(p)) { console.log("!! 缺少分片:", f); process.exit(1); }
      return fs.readFileSync(p, "utf8").trim();
    }).join("\n\n")
  + REORDER;

const targets = [
  path.join(DIR, "00-作战中心.html"),
  "C:/Users/Administrator/WorkBuddy/2026-10-02-11-56-57/UK-Compliance-English/index.html"
];

const START = "var VOCAB_DOMAINS = [";
const END = "/* ============ 45 天计划 ============ */";

for (const t of targets) {
  if (!fs.existsSync(t)) { console.log("-- 跳过（不存在）:", t); continue; }
  let html = fs.readFileSync(t, "utf8");
  const s = html.indexOf(START);
  const e = html.indexOf(END);
  if (s < 0 || e < 0 || e < s) { console.log("!! 定位失败:", t, s, e); continue; }
  html = html.slice(0, s) + newBlock + html.slice(e);
  fs.writeFileSync(t, html, "utf8");
  console.log("已更新:", path.basename(t), "->", (fs.statSync(t).size / 1024).toFixed(1) + " KB");
}

/* 校验：抽取数据段并在沙箱中执行 */
const html = fs.readFileSync(path.join(DIR, "00-作战中心.html"), "utf8");
const js = html.match(/<script>([\s\S]*?)<\/script>/)[1];
try { new Function(js); console.log("整页 JS 语法: 通过"); }
catch (err) { console.log("!! 语法错误:", err.message); }

const vm = require("vm");
const ctx = {};
vm.createContext(ctx);
vm.runInContext(js.slice(0, js.indexOf("var LS_KEY")), ctx);

let total = 0;
ctx.VOCAB_DOMAINS.forEach(d => { total += d.deck.length; console.log("  " + d.name.padEnd(32) + d.deck.length); });
console.log("==== 领域数: " + ctx.VOCAB_DOMAINS.length + " | 词条合计: " + total);

const seen = {};
let dup = 0;
ctx.VOCAB_DOMAINS.forEach(d => d.deck.forEach(v => {
  const k = v[0].toLowerCase();
  if (seen[k]) { console.log("  [重复] " + v[0] + "  (" + seen[k] + " / " + d.name + ")"); dup++; }
  seen[k] = d.name;
}));
console.log("重复词条: " + dup);

/* 检查空释义与异常字段 */
let badField = 0;
ctx.VOCAB_DOMAINS.forEach(d => d.deck.forEach(v => {
  if (!v[0] || !v[1]) { console.log("  [字段缺失] " + JSON.stringify(v)); badField++; }
}));
console.log("字段异常: " + badField);

/* 重新生成两个版本的词表 */
function q(s) { s = String(s == null ? "" : s); return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }
const rows = [];
ctx.VOCAB_DOMAINS.forEach(d => d.deck.forEach(v => rows.push([q(v[0]), q(v[1]), q(d.name), q(v[2] || "")].join(","))));
fs.writeFileSync(path.join(DIR, "词表-Anki导入.csv"), "\ufeff" + rows.join("\r\n"), "utf8");
fs.writeFileSync(path.join(DIR, "词表-浏览版.csv"), "\ufeff" + ["英文,中文,领域,补充说明"].concat(rows).join("\r\n"), "utf8");
console.log("词表已重新生成，Anki 版 " + rows.length + " 行（无表头）");
