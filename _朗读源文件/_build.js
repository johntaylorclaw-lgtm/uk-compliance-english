/* 构建脚本：把朗读材料分片注入页面骨架，生成 03-发音与朗读系统.html */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const DIR = __dirname;                       // _朗读源文件
const OUT = path.join(DIR, "..", "03-发音与朗读系统.html");
const SHELL = path.join(DIR, "_shell.html");
const PARTS = ["_s1.js", "_s2.js", "_s3.js", "_s4.js"];

/* ---------- 载入分片 ---------- */
let src = PARTS.map(function (f) { return fs.readFileSync(path.join(DIR, f), "utf8"); }).join("\n");
const ctx = {};
vm.createContext(ctx);
vm.runInContext(src, ctx, { filename: "segments.js" });

const SEGMENTS = [].concat(ctx.SEG_1, ctx.SEG_2, ctx.SEG_3, ctx.SEG_4).filter(function (s) { return s && s.id; });
const GROUPNAME = { A: "音素校准", B: "合规专业", C: "职场口语", D: "生活场景", E: "语调与节奏" };

/* 清理分片里的空槽位（源文件里用了 `, ,` 形式的空位，JSON 会变成 null） */
function clean(a) { return (a || []).filter(function (s) { return s && s.id; }); }
const SLOTS = (ctx.SEG_1 || []).length + (ctx.SEG_2 || []).length + (ctx.SEG_3 || []).length + (ctx.SEG_4 || []).length;
if (SLOTS !== SEGMENTS.length) {
  console.log("!! 注意：分片共有 " + SLOTS + " 个槽位，其中 " + (SLOTS - SEGMENTS.length) +
              " 个是空位（未写入内容），实际可用 " + SEGMENTS.length + " 段。");
}

/* ---------- 校验 ---------- */
let bad = [];
const seen = {};

SEGMENTS.forEach(function (s) {
  if (seen[s.id]) bad.push("重复 id: " + s.id);
  seen[s.id] = 1;

  if (!GROUPNAME[s.g]) bad.push(s.id + " 的分组 " + s.g + " 未定义");

  ["text", "zh"].forEach(function (k) {
    const v = s[k] || "";
    if (v.indexOf("**") > -1) bad.push(s.id + "." + k + " 含 ** ");
    ["*", "_", "~"].forEach(function (ch) {
      const n = v.split(ch).length - 1;
      if (n % 2 !== 0) bad.push(s.id + "." + k + " 的 " + ch + " 标记不配对（" + n + " 个）");
    });
  });

  if (!s.points || !s.points.length) bad.push(s.id + " 缺少 points");
  if (!s.words || !s.mins) bad.push(s.id + " 缺少 words/mins");
  if (!s.title || !s.focus) bad.push(s.id + " 缺少 title/focus");
});

/* 每组第一段必须有 desc（索引表要取） */
["A", "B", "C", "D", "E"].forEach(function (g) {
  const list = SEGMENTS.filter(function (s) { return s.g === g; });
  if (!list.length) { bad.push("分组 " + g + " 没有内容"); return; }
  if (!list[0].desc) bad.push("分组 " + g + " 的第一段缺少 desc");
});

/* id 顺序格式 */
SEGMENTS.forEach(function (s) {
  if (!/^[A-E]\d+$/.test(s.id)) bad.push("id 格式异常: " + s.id);
});

/* ---------- 统计 ---------- */
const stat = {};
["A", "B", "C", "D", "E"].forEach(function (g) {
  const l = SEGMENTS.filter(function (s) { return s.g === g; });
  stat[g] = { n: l.length, w: l.reduce(function (a, b) { return a + b.words; }, 0),
              m: l.reduce(function (a, b) { return a + b.mins; }, 0) };
});

console.log("=== 朗读材料统计 ===");
["A", "B", "C", "D", "E"].forEach(function (g) {
  console.log("  " + g + "  " + GROUPNAME[g].padEnd(12) + " " +
    String(stat[g].n).padStart(2) + " 段  " +
    String(stat[g].w).padStart(4) + " 词  约 " + stat[g].m.toFixed(1) + " 分钟（读一遍）");
});
const TOTAL = SEGMENTS.length;
const TOTALW = SEGMENTS.reduce(function (a, b) { return a + b.words; }, 0);
const TOTALP = SEGMENTS.reduce(function (a, b) { return a + b.points.length; }, 0);
console.log("  ------------------------------------------");
console.log("  合计 " + TOTAL + " 段 / " + TOTALW + " 词");
console.log("  points 条目总数: " + TOTALP);

if (bad.length) {
  console.log("\n!! 校验未通过:");
  bad.forEach(function (b) { console.log("   - " + b); });
  process.exit(1);
}
console.log("\n校验全部通过 ✓");

/* ---------- 注入骨架 ---------- */
let html = fs.readFileSync(SHELL, "utf8");

const dataBlock =
  "/* ============ 数据（由 _build.js 自动生成，请勿手改本区块）============ */\n" +
  "var SEG_1 = " + JSON.stringify(clean(ctx.SEG_1), null, 0) + ";\n" +
  "var SEG_2 = " + JSON.stringify(clean(ctx.SEG_2), null, 0) + ";\n" +
  "var SEG_3 = " + JSON.stringify(clean(ctx.SEG_3), null, 0) + ";\n" +
  "var SEG_4 = " + JSON.stringify(clean(ctx.SEG_4), null, 0) + ";\n" +
  "var SEGMENTS = SEG_1.concat(SEG_2, SEG_3, SEG_4);\n" +
  "var GROUPNAME = " + JSON.stringify(GROUPNAME) + ";\n";

if (html.indexOf("/*__DATA__*/") < 0) { console.log("!! 骨架里找不到 /*__DATA__*/ 占位符"); process.exit(1); }
html = html.replace("/*__DATA__*/", dataBlock);
html = html.split("__TOTAL__").join(String(TOTAL));
html = html.split("__POINTS__").join(String(TOTALP));
html = html.split("__GROUPNAME__").join(JSON.stringify(GROUPNAME));

fs.writeFileSync(OUT, html, "utf8");
console.log("\n已生成: " + path.basename(OUT) + "  (" + (html.length / 1024).toFixed(0) + " K 字符)");

/* ---------- 复核产物 ---------- */
const out = fs.readFileSync(OUT, "utf8");
const js = out.match(/<script>([\s\S]*?)<\/script>/)[1];
try { new Function(js); console.log("产物 JS 语法: 通过"); }
catch (e) { console.log("产物 JS 语法错误: " + e.message); }

const c = {};
vm.createContext(c);
vm.runInContext(js.slice(0, js.indexOf("/* ---------- 渲染")), c);
console.log("产物内 SEGMENTS: " + c.SEGMENTS.length + " 段 | 分组: " + Object.keys(c.GROUPNAME).join(","));
console.log("残留占位符: " + (out.indexOf("__TOTAL__") > -1 || out.indexOf("__POINTS__") > -1 || out.indexOf("__GROUPNAME__") > -1 ? "有 !!" : "无"));
