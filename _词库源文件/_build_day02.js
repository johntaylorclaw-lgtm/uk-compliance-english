/* Day-02 构建脚本：注入 70 条拓展词 + 生成当日词表 CSV */
const fs = require("fs");
const path = require("path");
const ROOT = "D:/英语培训教程";

/* ---- 1. 读取作战中心词库 ---- */
const center = fs.readFileSync(path.join(ROOT, "00-作战中心.html"), "utf8");
const js = center.match(/<script>([\s\S]*?)<\/script>/)[1];
const vm = require("vm");
const ctx = {};
vm.createContext(ctx);
vm.runInContext(js.slice(0, js.indexOf("var LS_KEY")), ctx);

/* ---- 2. 计算 Day-01 已用词 ---- */
const day1 = fs.readFileSync(path.join(ROOT, "Day-01.html"), "utf8");
const j1 = day1.match(/<script>([\s\S]*?)<\/script>/)[1];
const used = new Set();
JSON.parse(j1.match(/var WORDS = (\[[\s\S]*?\]);/)[1]).forEach(v => used.add(String(v[0]).toLowerCase()));
JSON.parse(j1.match(/var EXTRA = (\[[\s\S]*?\]);/)[1]).forEach(v => used.add(String(v[0]).toLowerCase()));

/* ---- 3. 取「银行业与国际金融市场」未用词 ---- */
const bank = ctx.VOCAB_DOMAINS.find(d => d.id === "bank");
/* 与 Day-01 概念重复的近义词，手动排除 */
const BLACK = new Set([
  "counterparty / counterparty risk",   /* Day-01 精讲有 counterparty */
  "special purpose vehicle (SPV)",      /* 保留 SPV 版，避免同概念两卡 */
  "RTGS",                               /* Day-01 有 RTGS (real-time gross settlement) */
  "SWIFT MT103",                        /* Day-01 有 SWIFT MT103 / MT202 */
  "correspondent bank",                 /* Day-01 有 correspondent banking */
  "IBAN",                               /* Day-01 有 IBAN / BIC */
  "repo / reverse repo",                /* Day-02 已含 reverse repo */
  "ALM"                                 /* Day-02 已含 ALM (asset-liability management) */
].map(s => s.toLowerCase()));

const rest = bank.deck.filter(v => {
  const k = String(v[0]).toLowerCase();
  return !used.has(k) && !BLACK.has(k);
});
const extra70 = rest.slice(0, 70);
console.log("【拓展词】bank 未用:", rest.length, "→ 取前:", extra70.length);
extra70.forEach((v, i) => console.log("  " + (i + 1) + ". " + v[0] + " | " + v[1]));

/* ---- 4. 注入 Day-02 页面 ---- */
const page = path.join(ROOT, "Day-02.html");
let html = fs.readFileSync(page, "utf8");
const marker = "/*EXTRA70*/[]";
if (html.indexOf(marker) < 0) { console.log("!! 未找到占位符，可能已注入"); }
else {
  html = html.replace(marker, "/*EXTRA70*/" + JSON.stringify(extra70));
  fs.writeFileSync(page, html, "utf8");
  console.log("占位符已替换");
}

/* ---- 5. 生成当日词表 CSV ---- */
const j2 = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const W = JSON.parse(j2.match(/var WORDS = (\[[\s\S]*?\]);/)[1]);
const E = JSON.parse(j2.match(/var EXTRA = (?:\/\*EXTRA70\*\/)?(\[[\s\S]*?\]);/)[1]);
console.log("【校验】精讲:", W.length, "拓展:", E.length, "合计:", W.length + E.length);

function q(s) {
  s = String(s == null ? "" : s);
  if (/[",\n\r]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}
const rows = [];
W.forEach(v => rows.push([q(v[0]), q(v[2]), q("发音专项"), q(v[1] + "　" + (v[5] || ""))].join(",")));
E.forEach(v => rows.push([q(v[0]), q(v[1]), q("银行业与国际金融"), q(v[2] || "")].join(",")));
fs.writeFileSync(path.join(ROOT, "词表-Day02.csv"), "\ufeff" + ["英文,中文,领域,补充说明"].concat(rows).join("\r\n"), "utf8");
fs.writeFileSync(path.join(ROOT, "词表-Day02-Anki导入.csv"), "\ufeff" + rows.join("\r\n"), "utf8");
console.log("【词表】已生成 词表-Day02.csv / 词表-Day02-Anki导入.csv，数据行:", rows.length);
