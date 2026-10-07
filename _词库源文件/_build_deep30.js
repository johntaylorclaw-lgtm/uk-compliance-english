/* ============================================================
   生成「Day-05 精讲 30 词深度精讲页」
   设计系统直接复用 Day-05.html 的 <style> 块，保证视觉一致
   用法：node _词库源文件/_build_deep30.js
   ============================================================ */
const fs = require('fs');
const path = require('path');
const DIR = 'D:/英语培训教程';
const { groups, words } = require(path.join(DIR, '_词库源文件/_day5_deep.js'));

/* ---------- 取出 Day-05 的 CSS ---------- */
const day5 = fs.readFileSync(path.join(DIR, 'Day-05.html'), 'utf8');
const cssM = day5.match(/<style>([\s\S]*?)<\/style>/);
if (!cssM) { console.error('!! 未在 Day-05.html 里找到 <style>'); process.exit(1); }
const baseCss = cssM[1];

/* ---------- 校验数据完整性 ---------- */
let bad = 0;
const seen = new Set();
words.forEach((w, i) => {
  ['w', 'ipa', 'syl', 'stress', 'zh', 'hook', 'sent', 'sentZh', 'say', 'pit', 'use'].forEach(k => {
    if (w[k] === undefined || w[k] === null || w[k] === '') { console.log('!! 第 ' + (i + 1) + ' 条缺字段 ' + k + '（' + w.w + '）'); bad++; }
  });
  if (seen.has(w.w)) { console.log('!! 词面重复: ' + w.w); bad++; }
  seen.add(w.w);
  w.stress.forEach(s => { if (s >= w.syl.length) { console.log('!! 重音下标越界: ' + w.w); bad++; } });
  if (!groups.find(g => g.id === w.g)) { console.log('!! 分组不存在: ' + w.g + '（' + w.w + '）'); bad++; }
});
groups.forEach(g => {
  const n = words.filter(w => w.g === g.id).length;
  if (n !== g.n) { console.log('!! 分组 ' + g.id + ' 声明 ' + g.n + ' 条，实际 ' + n + ' 条'); bad++; }
});
if (bad) { console.log('\n校验未通过，未写入'); process.exit(1); }
console.log('数据校验通过：' + words.length + ' 词 / ' + groups.length + ' 组');

/* ---------- 工具 ---------- */
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
/* 音节行：重读音节高亮 */
function sylLine(w) {
  return w.syl.map((s, i) => w.stress.indexOf(i) > -1
    ? '<b class="hit">' + esc(s) + '</b>' : '<span class="pl-syl">' + esc(s) + '</span>'
  ).join('<span class="dot">·</span>');
}

function card(w, idx) {
  return `
<article class="wcard" id="w${idx}">
  <div class="whead">
    <div class="wno">${String(idx).padStart(2, '0')}</div>
    <div class="wmid">
      <h3 class="wterm">${esc(w.w)}</h3>
      <div class="wipa">${esc(w.ipa)}</div>
      <div class="wsyl">${sylLine(w)}</div>
    </div>
    <div class="wact">
      <button class="btn sm" data-say="${esc(w.w)}">▶ 词</button>
      <button class="btn sm" data-slow="${esc(w.w)}">▶ 慢</button>
      <button class="btn sm" data-say="${esc(w.sent)}">▶ 例句</button>
    </div>
  </div>
  <div class="wzh">${esc(w.zh)}</div>
  <div class="wrow"><div class="wk">本质</div><div class="wv">${w.hook}</div></div>
  <div class="wrow"><div class="wk">例句</div><div class="wv"><span class="en">${esc(w.sent)}</span><br><span class="zh">${esc(w.sentZh)}</span></div></div>
  <div class="wrow"><div class="wk">读音</div><div class="wv">${w.say}</div></div>
  <div class="wrow wpit"><div class="wk">易错</div><div class="wv">${w.pit}</div></div>
  <div class="wrow"><div class="wk">用法</div><div class="wv">${w.use}</div></div>
</article>`;
}

const groupBlock = g => {
  const list = words.map((w, i) => ({ w, i: words.indexOf(w) + 1 })).filter(x => x.w.g === g.id);
  return `
<section class="gsec" id="g${g.id}">
  <div class="card ghead">
    <div class="gtag">GROUP ${String(g.id).padStart(2, '0')}</div>
    <h3>${esc(g.name)}　<span style="font-weight:400;font-size:13px;color:var(--ink-3);">${g.n} 词</span></h3>
    <p class="sub" style="margin:6px 0 0;">${esc(g.why)}</p>
    <div class="gwords">${list.map(x => '<a href="#w' + x.i + '">' + esc(x.w.w) + '</a>').join('')}</div>
  </div>
  ${list.map(x => card(x.w, x.i)).join('\n')}
</section>`;
};

const nav = groups.map(g => '<a href="#g' + g.id + '">' + String(g.id).padStart(2, '0') + ' ' + esc(g.name) + '</a>').join('');

/* ---------- 自测清单 ---------- */
const selfTest = [
  { t: '一、读音自测（对着音标读，读顺再往下）', items: words.map((w, i) => `${String(i + 1).padStart(2, '0')}　${w.w}　${w.ipa}`) },
  { t: '二、词义自测（中→英，遮住页面先写）', items: [
    '所有权与控制判定', '综合制裁名单', '英国制裁名单', '50% 规则', '股权链条', '以其他方式控制', '一般许可',
    '规避（制裁）', '制裁规避（违法）', '严格责任', '自愿披露', '域外效力',
    '名单筛查', '支付筛查', '警报处置结论', '阈值 / 灵敏度', '制裁关联点',
    '美国出口管理条例', '（美国）实体清单', '兜底管制', '视同出口',
    '暗船队', '船对船过驳', '价格上限',
    '经济犯罪', '未能预防（罪）', '充分程序（抗辩）', '2002 年犯罪所得法', '怀疑（法定门槛）', '财富来源不明令'
  ]},
  { t: '三、场景自测（每组说一句话，必须出声）', items: [
    '① 用 ownership and control test + 50 per cent rule 说出「为什么这笔交易要停」',
    '② 用 consolidated list / UK Sanctions List 说出两张名单的区别',
    '② 用 catch-all control + deemed export 说出「没有管制编号为什么还要卡」',
    '③ 用 sanctions evasion + strict liability 说出「故意不重要，为什么」',
    '④ 用 dark fleet + ship-to-ship transfer + price cap 描述一条可疑船的时间线',
    '⑤ 用 economic crime + failure to prevent + adequate procedures 说出公司的抗辩逻辑',
    '⑥ 用 suspicion + unexplained wealth order 说出「怀疑」与「证明」的分界',
    '⑦ 用 voluntary self-disclosure + extraterritorial reach 说出减罚与域外风险'
  ]}
];

/* ---------- 拼装 ---------- */
const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<title>Day 05 · 精讲 30 词深度精讲 — 英国银行业合规英语强化</title>
<style>${baseCss}

/* ===== 本页专用 ===== */
.hit{color:var(--red);font-weight:700;}
.pl-syl{color:var(--ink-3);font-weight:400;}
.wsyl .dot{color:var(--ink-3);margin:0 1px;}
.gsec{margin-bottom:8px;}
.ghead{border-left:4px solid var(--navy);margin-bottom:12px;}
.gtag{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:11px;font-weight:700;color:#fff;background:var(--navy);display:inline-block;border-radius:5px;padding:2px 7px;margin-bottom:6px;}
.gwords{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;}
.gwords a{font-size:11.5px;font-family:ui-monospace,Menlo,Consolas,monospace;color:var(--navy);background:#eef3fb;border:1px solid #d5def5;border-radius:20px;padding:2px 9px;text-decoration:none;}
.gwords a:hover{background:var(--navy);color:#fff;}
.wcard{background:#fff;border:1px solid var(--line,#e3e8ef);border-radius:12px;padding:14px 16px;margin-bottom:10px;box-shadow:0 1px 2px rgba(20,40,80,.05);}
.whead{display:flex;align-items:flex-start;gap:12px;flex-wrap:wrap;}
.wno{flex:0 0 auto;width:34px;height:34px;border-radius:9px;background:var(--navy);color:#fff;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center;}
.wmid{flex:1;min-width:240px;}
.wterm{margin:0;font-size:16.5px;font-weight:700;color:var(--navy);letter-spacing:.01em;}
.wipa{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12.5px;color:var(--teal);margin-top:2px;}
.wsyl{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12.5px;margin-top:3px;letter-spacing:.02em;}
.wact{display:flex;gap:6px;flex-wrap:wrap;align-items:center;}
.wzh{margin:9px 0 4px;font-size:14px;font-weight:700;color:var(--ink);}
.wrow{display:flex;gap:10px;padding:6px 0;border-top:1px dashed #e8edf4;}
.wk{flex:0 0 46px;font-size:11.5px;font-weight:700;color:var(--ink-3);letter-spacing:.06em;padding-top:2px;}
.wv{flex:1;font-size:13.2px;line-height:1.75;}
.wv .en{font-size:13.5px;}
.wv .zh{color:var(--ink-3);font-size:12.8px;}
.wpit{background:#fff6f5;border-radius:8px;padding:6px 10px;margin:4px -10px;border-top:1px dashed #f0d5d1;}
.wpit .wk{color:var(--red);}
.mono{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:.94em;background:#eef3fb;padding:0 3px;border-radius:3px;}
.two{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
@media(max-width:760px){.two{grid-template-columns:1fr;}}
.st{background:#fff;border:1px solid #e3e8ef;border-radius:12px;padding:12px 16px;margin-bottom:10px;}
.st h4{margin:0 0 6px;font-size:14px;color:var(--navy);}
.st ol{margin:0;padding-left:22px;}
.st li{font-size:13px;line-height:1.9;}
.st code,.st .mono{background:#eef3fb;padding:0 3px;border-radius:3px;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12.4px;}
.jump{position:sticky;top:0;z-index:20;background:rgba(255,255,255,.96);backdrop-filter:blur(6px);border-bottom:1px solid #e3e8ef;padding:8px 0;margin-bottom:12px;}
.jump .inner{max-width:1080px;margin:0 auto;padding:0 20px;display:flex;gap:6px;flex-wrap:wrap;align-items:center;}
.jump a{font-size:11.5px;color:var(--navy);background:#eef3fb;border:1px solid #d5def5;border-radius:20px;padding:3px 10px;text-decoration:none;}
.jump a:hover{background:var(--navy);color:#fff;}
.jump .lbl{font-size:11px;color:var(--ink-3);letter-spacing:.06em;margin-right:4px;}
</style>
</head>
<body>

<div class="hero">
  <div class="hero-inner">
    <div class="crumb"><a href="00-作战中心.html">← 返回作战中心</a>　·　<a href="Day-05.html">Day 05 课程页</a></div>
    <h1>Day 05 · 精讲 30 词深度精讲</h1>
    <p>今天 100 词里挑出的 <b>30 个精讲词</b>，每一个都拆成七层：<b>音节与重音 · 音标 · 本质（这个概念在解决什么合规问题）· 例句与译文 · 读音要点 · 中国人最常犯的具体错误 · 会议里的实际用法</b>。<b>红色标记的是重读音节</b>，等宽字体是音标与词面。</p>
    <div class="stats">
      <div class="stat"><b>30</b><span>精讲词</span></div>
      <div class="stat"><b>6</b><span>教学分组</span></div>
      <div class="stat"><b>411</b><span>配套朗读词</span></div>
      <div class="stat"><b>0</b><span>录音留档</span></div>
    </div>
  </div>
</div>

<main>

<div class="jump"><div class="inner">
  <span class="lbl">跳到</span>
  ${nav}
  <a href="#selftest">自测清单</a>
</div></div>

<div class="card" style="border-left:4px solid var(--amber);">
  <h3>怎么用这一页（重要）</h3>
  <div class="two">
    <div>
      <b>第一遍：只看「本质」和「例句」</b><br>
      先不管音标。目的是搞清<b>这 30 个概念分别在解决什么合规问题</b>。制裁工作里，判断力比口音值钱——<b>先能说清，再能读准</b>。
    </div>
    <div>
      <b>第二遍：只练「音节行」和「易错」</b><br>
      音节行里<b>红色的是重读音节</b>，其他都是弱读。逐词读三遍：慢速 → 正常 → 只打重音。<b>「易错」那一栏是中国学习者的高发区</b>，逐条对着自查。
    </div>
  </div>
  <div class="note" style="margin-top:12px;">
    <b>三条硬规则（今天新增）：</b>① <b>名词与动词靠重音区分</b>：<span class="mono">EXport / exPORT</span>、<span class="mono">TRANSfer / transFER</span> —— <span class="mono">deemed export</span> 和 <span class="mono">ship-to-ship transfer</span> 里都是<b>名词</b>，重音在首；② <b>缩写两套规则并存</b>：逐字母（EAR / FCA / PRA / SFO / AIS / UWO / ECCN）vs 读成词（ITAR / POCA / OFAC），靠记不靠推理；③ <b>/θ/ 一律舌尖伸出齿间</b>：<span class="mono">threshold / wealth</span> 今天两次出现，可对镜自查。
  </div>
</div>

<div class="card" style="border-left:4px solid var(--teal);">
  <h3>精讲进度（30 词）</h3>
  <div class="bar"><i id="dp" style="width:0%"></i></div>
  <div class="tagline"><span id="dtxt">0 / 30 个词已完成七层精讲</span></div>
</div>

${groups.map(groupBlock).join('\n')}

<div class="card" id="selftest" style="border-left:4px solid var(--teal);">
  <h3>自测清单（做完再对答案）</h3>
  <p class="sub">先在纸上写，写完再点开对照。<b>三组都要出声做第二、三组。</b></p>
  ${selfTest.map(g => `
  <div class="reveal" style="margin-top:10px;">
    <button class="btn" onclick="tog(this)">${esc(g.t)}</button>
    <div class="revbd"><ol class="tight">${g.items.map(i => '<li>' + i + '</li>').join('')}</ol></div>
  </div>`).join('')}
  <div class="note" style="margin-top:14px;">
    <b>判读标准：</b>第一组（读音）能顺下来 24 个以上 = 合格；<b>第二组（中→英）能写出 20 个以上 = 合格</b>；第三组（场景）能<b>不卡壳地说完 5 句以上</b> = 合格。达不到就把对应的词挑出来，明天模块 03 朗读前先过一遍。
  </div>
</div>

</main>

<footer>
  Day 05 · 精讲 30 词深度精讲　|　<a href="00-作战中心.html">作战中心</a>　·　<a href="Day-05.html">Day 05 课程页</a>　·　<a href="03-发音与朗读系统.html">朗读库</a>　·　<a href="02-Anki复习系统.html">Anki 系统</a>
</footer>

<script>
/* ---------- 折叠 ---------- */
function tog(btn){
  var bd = btn.nextElementSibling;
  bd.classList.toggle("on");
  if(!btn.dataset.base){ btn.dataset.base = btn.textContent; }
  btn.textContent = bd.classList.contains("on") ? "收起" : btn.dataset.base;
}

/* ---------- 英式朗读 ---------- */
var gbVoice = null;
function pickVoice(){
  if(!window.speechSynthesis){ return; }
  var vs = speechSynthesis.getVoices() || [];
  var pref = ['Google UK English Female','Google UK English Male','Libby','Sonia','Ryan','George','Hazel','Microsoft Libby','Microsoft Sonia'];
  gbVoice = null;
  for(var i = 0; i < pref.length && !gbVoice; i++){
    gbVoice = vs.filter(function(v){ return v.name.indexOf(pref[i]) > -1; })[0] || null;
  }
  if(!gbVoice){ gbVoice = vs.filter(function(v){ return /^en-GB/i.test(v.lang); })[0] || null; }
  if(!gbVoice){ gbVoice = vs.filter(function(v){ return /^en/i.test(v.lang); })[0] || null; }
}
if(window.speechSynthesis){ pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
function speak(txt, rate){
  if(!window.speechSynthesis){ alert('当前浏览器不支持朗读，请用 Edge 或 Chrome 打开本页。'); return; }
  speechSynthesis.cancel();
  var u = new SpeechSynthesisUtterance(txt);
  u.lang = 'en-GB';
  if(gbVoice){ u.voice = gbVoice; }
  u.rate = rate || 0.95; u.pitch = 1.0;
  speechSynthesis.speak(u);
}
document.addEventListener('click', function(e){
  var b = e.target.closest ? e.target.closest('button') : null;
  if(!b) return;
  if(b.hasAttribute('data-say')){ speak(b.getAttribute('data-say'), 0.95); }
  else if(b.hasAttribute('data-slow')){ speak(b.getAttribute('data-slow'), 0.68); }
});

/* ---------- 进度：读到第几个词（按浏览位置粗算） ---------- */
var cards = [].slice.call(document.querySelectorAll('.wcard'));
var seen = {};
var LS = 'ukce_deep30';
try{ seen = JSON.parse(localStorage.getItem(LS) || '{}') || {}; }catch(e){}
var dp = document.getElementById('dp'), dtxt = document.getElementById('dtxt');
function upd(){
  var n = Object.keys(seen).length;
  if(dp){ dp.style.width = (n / cards.length * 100) + '%'; }
  if(dtxt){ dtxt.textContent = n + ' / ' + cards.length + ' 个词已完成七层精讲'; }
}
cards.forEach(function(c){
  var id = c.id;
  var mark = document.createElement('div');
  mark.style.cssText = 'margin-top:8px;';
  var box = document.createElement('span');
  box.className = 'ck' + (seen[id] ? ' on' : '');
  box.innerHTML = '<div class="bx"></div><div class="tx">这个词的七层都过了一遍（音节重音 + 本质 + 例句 + 易错 + 用法）</div>';
  box.addEventListener('click', function(){
    if(seen[id]){ delete seen[id]; } else { seen[id] = 1; }
    box.classList.toggle('on', !!seen[id]);
    try{ localStorage.setItem(LS, JSON.stringify(seen)); }catch(e){}
    upd();
  });
  mark.appendChild(box);
  c.appendChild(mark);
});
upd();
</script>
</body>
</html>
`;

const out = path.join(DIR, 'Day-05_精讲30词.html');
fs.writeFileSync(out, html, 'utf8');
console.log('已写入 ' + out + '（' + Buffer.byteLength(html, 'utf8') + ' 字节）');

/* ---------- 语法自检 ---------- */
const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
scripts.forEach((s, i) => {
  try { new Function(s); console.log('   OK  script #' + i + ' 语法通过（' + s.length + ' 字符）'); }
  catch (e) { console.log('   !!  script #' + i + ' 语法失败: ' + e.message); process.exitCode = 1; }
});
console.log('   卡片数：' + (html.match(/class="wcard"/g) || []).length + '（期望 30）');
console.log('   朗读按钮：' + (html.match(/data-say=/g) || []).length + ' 词+例句 / ' + (html.match(/data-slow=/g) || []).length + ' 慢速');
console.log('   分组锚点：' + (html.match(/id="g\d"/g) || []).length + '（期望 6）');
