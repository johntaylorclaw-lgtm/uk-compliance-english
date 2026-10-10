/* ============================================================
 * 把「每日朗读内容」注入到每一天的学习页（Day-NN.html）
 * ------------------------------------------------------------
 * 用法：node _build_day_pron.js [--dry]
 *   --dry → 只打印将要做的改动，不写盘
 *
 * 每个页面注入三块（都用标记包裹，可重复运行、幂等）：
 *   A. <style> 内    CSS 标记块      朗读模块样式
 *   B. <main> 内     模块正文标记块   正文 + #prWrap 容器
 *   C. </body> 前    脚本标记块       段落数据 + TTS + 打卡清单
 * 另外：
 *   · 同步修正「43 段」等与实际段数不符的旧文案
 *   · 把 42 天逐日朗读分配表写入 03-发音与朗读系统.html 与 _shell.html
 * ============================================================ */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');   // 原为硬编码 D:/英语培训教程（原作者本机路径）
const SRC  = path.join(ROOT, '_朗读源文件');
const DRY  = process.argv.includes('--dry');

/* ---------------- 1. 载入朗读段数据 ---------------- */
function loadSegments(){
  const names = { '_s1.js':'SEG_1', '_s2.js':'SEG_2', '_s3.js':'SEG_3', '_s4.js':'SEG_4' };
  let all = [];
  Object.keys(names).forEach(f => {
    const code = fs.readFileSync(path.join(SRC, f), 'utf8');
    const arr = new Function(code + '\n;return ' + names[f] + ';')();
    all = all.concat(arr);
  });
  return all.filter(s => s && s.id);
}

const SEGMENTS = loadSegments();
const BY_ID = {};
SEGMENTS.forEach(s => { BY_ID[s.id] = s; });

/* ---------------- 2. 载入逐日分配表 ---------------- */
const PRON_SCHEDULE = new Function(
  fs.readFileSync(path.join(SRC, '_schedule.js'), 'utf8') + '\n;return PRON_SCHEDULE;')();

/* ---------------- 3. 校验 ---------------- */
const problems = [];
const seenId = {};
SEGMENTS.forEach(s => {
  if(seenId[s.id]) problems.push('段 id 重复: ' + s.id);
  seenId[s.id] = 1;
  const t = s.text || '';
  if(((t.match(/\*/g) || []).length) % 2) problems.push(s.id + ' 的 text 中 * 未配对');
  if(((t.match(/_/g)  || []).length) % 2) problems.push(s.id + ' 的 text 中 _ 未配对');
  if(((t.match(/~/g)  || []).length) % 2) problems.push(s.id + ' 的 text 中 ~ 未配对');
  if(!s.points || !s.points.length) problems.push(s.id + ' 缺发音要点');
  if(!s.zh) problems.push(s.id + ' 缺中文译文');
});
Object.keys(PRON_SCHEDULE).forEach(d => {
  PRON_SCHEDULE[d].ids.forEach(id => {
    if(!BY_ID[id]) problems.push('Day ' + d + ' 引用了不存在的段: ' + id);
  });
});
if(problems.length){
  console.error('X 校验未通过：');
  problems.forEach(p => console.error('   - ' + p));
  process.exit(1);
}

const TOTAL_POINTS = SEGMENTS.reduce((a, s) => a + s.points.length, 0);
const TOTAL_WORDS  = SEGMENTS.reduce((a, s) => a + (s.words || 0), 0);
const GROUP_CN = { A:'音素校准', B:'合规专业', C:'职场口语', D:'生活场景', E:'语调与节奏' };
const GROUP_ROT = {
  1:'第 1 周轮换：A 组 2 段 + C 组 1 段',
  2:'第 2 周轮换：A 组 1 段热身 + B 组 2 段',
  3:'第 3 周轮换：A 组 1 段 + B 组 2 段 + D 组 1 段',
  4:'第 4 周轮换：C 组 2 段 + E 组 1 段',
  5:'第 5 周轮换：B / C 混合 3 段',
  6:'第 6 周轮换：B 组 3 段，读成会议发言强度'
};

/* 单日覆盖配置：days 里没有的，回落到 GROUP_ROT + 25 分钟 */
const PER_DAY = {
  3: {
    mins: '30 分钟',
    readMins: 30,
    steps: ['4 分钟', '10 分钟', '10 分钟', '6 分钟'],
    rot: '第 1 周·按当日主题加权：A 组 2 段（音素收尾）+ B 组 1 段（与今天词表同主题）'
  },
  4: {
    mins: '30 分钟',
    readMins: 30,
    steps: ['4 分钟', '10 分钟', '10 分钟', '6 分钟'],
    rot: '第 1 周·按当日主题加权：A 组 1 段（音素收尾，A 组今日读完）+ B 组 1 段（制裁筛查，与今天词表同主题）+ C 组 1 段（澄清与确认）'
  },
  5: {
    mins: '35 分钟',
    readMins: 35,
    steps: ['5 分钟', '12 分钟', '12 分钟', '6 分钟'],
    rot: '第 1 周·按当日主题加权：B 组 2 段（监管者演讲 + 对业务部门设限，与今天制裁与出口管制主题同源）+ C 组 1 段（委婉提出异议）——今天三段偏长（共 411 词），时长给到 35 分钟'
  },
  6: {
    mins: '30 分钟',
    readMins: 30,
    steps: ['4 分钟', '10 分钟', '10 分钟', '6 分钟'],
    rot: '第 1 周·按当日主题加权：B 组 1 段（向 MLRO 口头升级，与今天调查链条终点同源）+ C 组 1 段（汇报进度与坏消息，对应 B 段里业务方追问进度的场景）+ E 组 1 段（数字与编号——今天起首练 E 组）'
  },
  7: {
    mins: '30 分钟',
    readMins: 30,
    steps: ['4 分钟', '10 分钟', '10 分钟', '6 分钟'],
    rot: '第 1 周·<b>周测日复读</b>：A4 / A8 / B2——刻意重读本周最卡的三段，而不是换新段'
  },
  8: {
    mins: '30 分钟',
    readMins: 30,
    steps: ['4 分钟', '10 分钟', '10 分钟', '6 分钟'],
    rot: '第 2 周·按当日主题加权：A 组 1 段（音素收尾，今天押在 -tion 重音上）+ B 组 2 段（向 MLRO 口头升级 / 团队会议里的警报分级，与今天的数据泄露通报场景同源）'
  }
};

/* 42 天分配表的「周」表头（只影响 03 页的表格标题，不影响各日页面文案）
   注意：模板会自动在前面加「第 N 周　」，这里不要再写周次 */
const WEEK_HDR = {
  1: 'A 组音素校准打底（8 段走完一轮）+ B / C / D 逐日加入'
};
const DEF_STEPS = ['3 分钟', '8 分钟', '8 分钟', '6 分钟'];
function rotOf(day){ return (PER_DAY[day] && PER_DAY[day].rot) || GROUP_ROT[Math.ceil(day / 7)]; }
function minsOf(day){ return (PER_DAY[day] && PER_DAY[day].mins) || '25 分钟'; }
function readMinsOf(day){ return (PER_DAY[day] && PER_DAY[day].readMins) || 25; }
function stepMin(day, i){ return (PER_DAY[day] && PER_DAY[day].steps) ? PER_DAY[day].steps[i] : DEF_STEPS[i]; }

/* ---------------- 4. 每天「为什么读这段」 ---------------- */
const WHY = {
  1: {
    A6: '今天的自测要暴露<b>辅音</b>短板。/θ/ /ð/ 是中文母语者的头号问题，也是整份材料里<b>唯一能靠镜子当场验证</b>的音——读 think 时舌尖必须看得见，看不见就是读成了 /s/。',
    A7: '/v/ 与 /w/ 混用会让 very 听起来像 wery，而这两个音在银行场景里天天出现（value / vote / valuation）。这组靠体感就能自查：/v/ 咬下唇且有振动，/w/ 只圆唇、不碰牙。',
    C1: 'Day 1 要产出 3 分钟职业自述，先在 C1 里建立英语「开场」的语块和节奏——Good morning, everyone / thanks for joining / let me set out the shape of the call 就是这套骨架，明天自述的第一句可以直接照搬句式。'
  },
  2: {
    A1: '计划里点名的 <span class="mono">/ɑː/</span>。staff、task、draft、rather 这些词你每周都要说，读成美式 /æ/ 会立刻暴露你学的是哪套音。',
    A2: '计划里点名的 <span class="mono">/ɒ/</span>，英式专属元音。policy、monitor、compliance 全部踩这个音——按美式读就是错的。今天把口型固定下来，明天读词表时直接用。',
    A3: '计划里点名的 <span class="mono">/ʌ/</span>。A1（/ɑː/ /ʌ/）+ A2（/ɒ/）+ A3（/æ/ /e/ /ʌ/）连起来读完，前元音三角就补齐了，元音校准这一关算过。'
  },
  3: {
    A8: '今天的第 ③ 组音素就是它。<b>词尾辅音串是中国人丢分最多的一项</b>——thresholds、risks、flagged 这些词你其实都认识，问题全在词尾：加一个 /ɪ/ 就变成另一个词。A8 专门练 -s / -ed / -ths 的收尾，读完马上回到模块 01 的 A 段重测一遍。',
    A5: '/ɜː/ 与 /ɔː/ 是今天另外两条长音。work / firm / bird 的 <span class="mono">/ɜː/</span> 在英式里<b>不卷舌</b>；walk / board / form 的 <span class="mono">/ɔː/</span> 要圆唇。这两条音一混，董事会（board）会被听成小鸟（bird）——今天词表里 board reporting 是高频词。',
    B11: '这一段就是今天 100 词所在的场景：<b>团队会议里的警报分级讨论</b>。你刚在模块 01 的 B 段听过会议对话，现在把它读出来——<b>听过的句子再读，口腔记忆形成得最快</b>。它同时是模块 04 影子跟读的材料，读准了晚上跟读会轻松很多。'
  },
  4: {
    A4: '今天的核心地基词里，<b>短音 <span class="mono">/ɪ/</span> 是绝对主角</b>——debit / deposit / liquidity / liability / beneficiary / investigative 全都踩这个音；而 leave / feel / bead 这类长音一混，整套词的声音形状就散了。A4 读完，<b>A 组 8 段全部走完一轮</b>，元音校准这一关正式过。',
    B2: '这一段就是模块 01 的 B 段脚本的朗读版：<b>制裁筛查命中，到底该判真还是判假</b>。你刚在模块 01 听过它，现在把它读出来——<b>听过的句子再读，口腔记忆形成得最快</b>。它同时是模块 04 影子跟读的材料，读准了后面跟读会轻松很多。',
    C2: '今天的整段对话就是一场持续的「澄清与确认」：什么是潜在命中、什么才算真实命中、缺了什么才构成重大缺陷。C2 把这些问句的语调模式固定下来——<b>英式英语里，升调问句和降调陈述的差别，就是"我在问你"和"我已经定了"的差别</b>。合规场景里最不能含糊的，正是这两者。'
  },
  5: {
    B8: '今天词表的尾段全是 FCA / PRA / SFO / CPS 这些机构名，而 B8 就是<b>监管者的演讲腔</b>。它练的「对比结构 + 长句呼吸」，正是你今天写「装货前审查备忘」时会直接借用的句式骨架——<span class="mono">Our starting point is a conversation, not a fine</span> 这种「A，不是 B」的说法，你在监管文本里会反复遇到。<b>读完它，你就有了把两个对立的东西放进一句话的能力。</b>',
    B10: '这是今天模块 01 那场会议的<b>朗读版</b>——业务要放行、合规要拦下，双方都不翻脸。你今天口语模块要建立的「<b>设限四步</b>」骨架，源头就在这一段：<span class="mono">I understand the pressure</span>（先认压力）→ <span class="mono">I am not saying no</span>（再明确立场）→ 给条件。<b>听过的场景再读，口腔记忆形成得最快</b>，而且 B10 就是模块 04 影子跟读的材料，现在读准了，后面跟读会轻松很多。',
    C3: '今天的整场会议就是一连串「要拦住别人、又不树敌」的动作：Tom 想放行、Priya 想冻结、Maya 要落地。C3 把这类话的<b>语调模式</b>固定下来——<span class="mono">Can I push back on that, gently?</span> 用升调，意思是「我在提异议」而不是「我在否定你」；后半段用数据反驳（<span class="mono">rose by a third</span>），是合规场合最被尊重的反驳方式。<b>英式英语里，异议的强度是靠语调调的，不是靠词。</b>'
  },
  6: {
    B1: '今天整场会议讨论的终点，就是「什么情况下、怎么向 MLRO 报告」。<b>B1 正是这个动作的口语版</b>——它练的是「先说结论 → 再说依据 → 最后说边界」这个顺序，<b>和今天口语模块的「程序排序」骨架完全同构</b>。你在英国合规体系里的第一份正式工作，迟早就是这一次口头陈述。',
    C4: '今天 B 段里 Greg 问「要多久」，Maya 答「六周，然后做决定」；Ruth 说「外部律师从第一天就介入」。<b>C4 就是「把坏消息说出口」的技术</b>——先给结论、给依据、给时间表，<b>不铺垫、不解释太多、不道歉</b>。合规工作里最难的就是这一段：<span class="mono">the fact-finding will take six weeks, and here is what we can do in the meantime</span>。',
    E6: '今天的词表里数字无处不在——<span class="mono">section 2 notice / 1998 / five per cent / day one / day thirty / six weeks</span>。<b>E6 专门练数字、日期与编号的读法，今天起第一次练 E 组</b>。合规场景里数字读错就是事故：把 <span class="mono">fifty-eight</span> 读成 <span class="mono">fifty-eighth</span>，罚款金额就完全不同了。'
  },
  7: {
    A4: '<b>今天是周测日，重读而非换新段。</b>A4 是本周<b>短音 /ɪ/ 专段</b>——debit / deposit / liquidity / liability / beneficiary 这些词你Day-04 练过，如果今天读A4 时<b>还能保持两音节里的短音不拖长</b>，说明短音已经过关。这一段也是模块 04 影子跟读的材料，读准了后面跟读轻松很多。',
    A8: 'A8 专练<b>词尾辅音串</b>——thresholds、risks、flagged。<b>今天词表里的 threshold conditions 首音就是 /θ/</b>，而 thresholds 的复数尾是 /ðz/。周测日重读这一段，等于把 Day-03 的词尾弱项再清一次。<b>读完立刻回到模块 01 的 A 段重测一遍。</b>',
    B2: 'B2 是<b>制裁筛查命中该判真还是判假</b>的那段会议——Day-04 你听过它的朗读版。<b>今天重读它，是因为它是本周唯一一个「用事实与数据反驳对方」的完整范例</b>：<span class="mono">I am not saying no… What I am saying is…</span>。这段的语调模式<b>就是</b>今天模块 04「监管检查应答」骨架第④ 段的来源。<b>听过的场景再读，口腔记忆形成得最快。</b>'
  },
  8: {
    A4: '今天第 ① 组音素就是它。<b>短音 <span class="mono">/ɪ/</span> 仍是绝对主角</b>——而这个词表里最该练的是<b>「重音落在词尾」的 -tion 词</b>：<span class="mono">notification / categorisation / rectification</span>。A4 帮你把「短音不拖长」这个底子打好，<b>读完立刻回模块 01 的 A 段重测第 ③ 组</b>。',
    B1: '<b>这一段是今天 B 段的朗读版</b>——「向 MLRO 口头升级」。你刚在模块 01 听过数据泄露的通报电话会，现在把它读出来。<b>结构完全同构：先说结论 → 再说依据 → 最后说边界</b>，这正是今天口语模块「72 小时通报」骨架的来源。<b>听过的场景再读，口腔记忆形成得最快</b>，而且 B1 就是模块 04 影子跟读的材料。',
    B11: 'B11 是<b>团队会议里的警报分级讨论</b>，与今天的泄露通报同源——都是「在压力下把事情按优先级排出来」。<b>它的对比结构</b>（<span class="mono">This is urgent; that is not</span>）就是今天写作任务里「72 小时行动清单」要用的句式。<b>读完这段，你的口语里会多一种「排序」的语调。</b>'
  }
};

/* ---------------- 5. 生成片段 ---------------- */
function buildCss(){
  return `/*PRON_CSS_START*/
.btn.sm{font-size:12px;padding:5px 10px;border-radius:7px;}
.prhead{display:flex;align-items:flex-start;gap:10px;flex-wrap:wrap;margin:0 0 6px;}
.prno{flex:0 0 auto;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:11.5px;font-weight:700;color:#fff;background:var(--teal);border-radius:6px;padding:3px 8px;}
.prtt{font-size:15px;font-weight:700;flex:1;min-width:190px;color:var(--navy);}
.prmeta{font-size:11.5px;color:var(--ink-3);padding-top:4px;}
.prbox{background:#fbfcfd;border:1px solid var(--line-2);border-left:3px solid var(--teal);border-radius:10px;padding:15px 17px;font-size:15.2px;line-height:2.1;color:var(--ink);font-family:Georgia,"Times New Roman",-apple-system,"PingFang SC","Microsoft YaHei",serif;}
.prbox .pp{margin-bottom:9px;}
.prbox .pp:last-child{margin-bottom:0;}
.prbox b.ps{color:var(--red);font-weight:700;}
.prbox u.pl{text-decoration:none;background:#e9f1ff;border-radius:3px;padding:0 1px;}
.prbox em.px{font-style:normal;background:#fff2c9;border-radius:3px;padding:0 1px;}
.prbox .who{font-weight:700;color:var(--navy);font-family:-apple-system,"Segoe UI","Microsoft YaHei",sans-serif;font-size:13px;}
.prleg{display:flex;gap:14px;flex-wrap:wrap;font-size:12px;color:var(--ink-3);margin:9px 0 0;}
.prleg i{font-style:normal;padding:0 3px;border-radius:3px;}
.prwhy{font-size:12.3px;color:var(--ink-3);display:block;margin:8px 0 0;}
.prseg{border-top:1px dashed var(--line);padding-top:15px;margin-top:17px;}
.prseg:first-child{border-top:0;padding-top:0;margin-top:0;}
.przh{font-size:13.2px;color:var(--ink-2);background:var(--panel-2);border:1px solid var(--line-2);border-radius:9px;padding:12px 14px;line-height:1.9;}
/*PRON_CSS_END*/`;
}

function buildInner(day){
  const n = PRON_SCHEDULE[day].ids.length;
  return `  <div class="info" style="margin-bottom:12px;">
    <b>今天的 ${n} 段朗读文本已经直接放在本页了，不用跳转。</b>
    点 <b>▶ 英式朗读</b> 听 en-GB 标准音，点 <b>▶ 慢速</b> 听 0.72 倍速。
    完整文本库（${SEGMENTS.length} 段 · ${TOTAL_POINTS} 条发音要点 · ${TOTAL_WORDS} 词）在 <a href="03-发音与朗读系统.html"><b>03-发音与朗读系统.html</b></a>，
    <b>42 天逐日分配表</b>见该页第六节。<br>
    <b>标注法：</b><span style="color:var(--red);font-weight:700;">红色 = 句子重音</span>　<span style="background:#e9f1ff;border-radius:3px;padding:0 3px;">蓝底 = 连读 / 弱读</span>　<span style="background:#fff2c9;border-radius:3px;padding:0 3px;">黄底 = 易错音</span>
  </div>

  <h4>今天的读法（照这个顺序走，${readMinsOf(day)} 分钟）</h4>
  <div class="rowline"><div class="t">① 先听后读</div><div class="m">每段先点「英式朗读」听 1 遍，<b>不跟读</b>，只听轮廓与重音落点。　<span class="mono">${stepMin(day, 0)}</span></div></div>
  <div class="rowline"><div class="t">② 看标注读</div><div class="m">把每个标记落实：红色落在哪、蓝色哪里连、黄色哪里别读错。<b>慢，但每个音要到位。</b>　<span class="mono">${stepMin(day, 1)}</span></div></div>
  <div class="rowline"><div class="t">③ 不看标注读</div><div class="m">把标注当透明，检验是否已经内化。卡住的位置就是今天的真实短板。　<span class="mono">${stepMin(day, 2)}</span></div></div>
  <div class="rowline"><div class="t">④ 站着读收尾</div><div class="m">站起来、用比平时大半格的音量读第 3 遍，模拟会议室强度，完后做体感自查。　<span class="mono">${stepMin(day, 3)}</span></div></div>

  <div class="note" style="margin:12px 0 4px;">
    <b>没有录音，怎么知道读对了（四点自查）：</b>① <b>喉结振动</b>——手贴喉结读 /v/ /ð/ /b/ /d/ /g/ 应明显振动，读 /f/ /θ/ /s/ 几乎不振动；② <b>嘴前气流</b>——/p/ /t/ /k/ 开头应感到气流；③ <b>对镜看舌尖</b>——/θ/ /ð/ 必须看得见舌尖；④ <b>中文回想</b>——读完合上文本用中文回想，想不起英文怎么说的位置就是卡壳点，记入错题本。
  </div>

  <h4 style="margin-top:16px;">今日朗读文本 <span style="font-size:12px;font-weight:400;color:var(--ink-3);">（${rotOf(day)}）</span></h4>
  <div id="prWrap"></div>
`;
}

function buildChecklist(){
  return `  <h4 style="margin-top:18px;">今日朗读打卡</h4>
  <div id="ckPron"></div>`;
}

function buildModuleHtml(day, mode){
  const n = PRON_SCHEDULE[day].ids.length;
  const inner = buildInner(day) + '\n' + buildChecklist() + '\n';
  if(mode === 'card'){
    return `<!--PRON_MODULE_START-->
<!-- 发音朗读模块（由 _朗读源文件/_build_day_pron.js 生成，勿手改） -->
<div class="card" style="border-left:4px solid var(--teal);">
  <div class="mod">
    <div class="mod-no" style="background:var(--teal);"><b>03</b><span>PRON</span></div>
    <div class="mod-tt"><h3>发音朗读：今日 ${n} 段文本（已内嵌）</h3><p>文本 + 标注 + 发音要点 + 中文译文 + 英式朗读按钮，全在本页</p></div>
    <div class="mod-time">${minsOf(day)}</div>
  </div>
${inner}</div>
<!--PRON_MODULE_END-->`;
  }
  return `<!--PRON_MODULE_START-->
  <h4 style="margin-top:16px;">第一步：朗读今日 ${n} 段文本（10 分钟）</h4>
${inner}<!--PRON_MODULE_END-->`;
}

function buildScript(day){
  const data = PRON_SCHEDULE[day].ids.map(id => {
    const s = BY_ID[id];
    return {
      id: s.id, title: s.title, words: s.words, mins: s.mins, focus: s.focus,
      text: s.text, points: s.points, zh: s.zh,
      why: (WHY[day] && WHY[day][id]) ? WHY[day][id] : ''
    };
  });
  const json = JSON.stringify(data);
  if(/<\/script/i.test(json)) throw new Error('段数据中出现 </script，需转义');

  const general = [
    '走完四步：先听 → 看标注读 → 不看标注读 → 站起来加大音量读（<b>不许只读 1 遍就勾</b>）',
    '每段读完后做体感自查：喉结振动 / 嘴前气流 / 对镜看舌尖 / 非重读 r 不卷舌',
    '读完立刻合上文本用中文回想一遍，凡想不起英文怎么说的位置记入 <span class="mono">错题本.md</span>'
  ];

  return `<!--PRON_JS_START-->
<script>
/* 发音朗读模块（由 _朗读源文件/_build_day_pron.js 生成，勿手改） */
var PRON_DAY = ${json};

(function(){
  var GROUP_CN = ${JSON.stringify(GROUP_CN)};

  function markup(t){
    return String(t)
      .replace(/\\*(.+?)\\*/g, '<b class="ps">$1</b>')
      .replace(/(^|[^_])_([^_]+?)_(?=[^_]|$)/g, '$1<u class="pl">$2</u>')
      .replace(/~(.+?)~/g, '<em class="px">$1</em>');
  }
  function plain(t){
    return String(t)
      .replace(/\\*(.+?)\\*/g, '$1')
      .replace(/(^|[^_])_([^_]+?)_(?=[^_]|$)/g, '$1$2')
      .replace(/~(.+?)~/g, '$1')
      .replace(/<span[^>]*>/g, '').replace(/<\\/span>/g, '')
      .replace(/<br\\s*\\/?>/g, '. ');
  }

  /* ---------- 语音合成（en-GB） ---------- */
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
    u.rate = rate || 0.95;
    u.pitch = 1.0;
    speechSynthesis.speak(u);
  }

  /* ---------- 渲染今日段落 ---------- */
  var wrap = document.getElementById('prWrap');
  wrap.innerHTML = PRON_DAY.map(function(s, i){
    var paras = markup(s.text).split('\\n').map(function(p){ return '<div class="pp">' + p + '</div>'; }).join('');
    var pts = s.points.map(function(p){
      return '<tr><td class="ph">' + markup(p[0]) + '</td><td class="ex">' + markup(p[1]) + '</td></tr>';
    }).join('');
    var zh = String(s.zh).replace(/\\n/g, '<br>');
    var g = s.id.charAt(0);
    return '<div class="prseg">' +
      '<div class="prhead">' +
        '<span class="prno">' + s.id + '</span>' +
        '<span class="prtt">' + s.title + '</span>' +
        '<span class="prmeta">' + s.words + ' 词 · 约 ' + s.mins + ' 分钟 · ' + g + ' 组 ' + (GROUP_CN[g] || '') + ' · ' + s.focus + '</span>' +
      '</div>' +
      '<div style="margin:8px 0 9px;">' +
        '<button class="btn sm primary" data-say="' + i + '">▶ 英式朗读</button> ' +
        '<button class="btn sm" data-slow="' + i + '">▶ 慢速</button>' +
      '</div>' +
      (s.why ? '<span class="prwhy"><b>今天为什么读这段：</b>' + s.why + '</span>' : '') +
      '<div class="prbox">' + paras + '</div>' +
      '<div class="prleg">' +
        '<span><i style="background:#fff2c9;">黄底</i> 易错音</span>' +
        '<span><i style="background:#e9f1ff;">蓝底</i> 连读 / 弱读</span>' +
        '<span style="color:var(--red);">红色 = 句子重音</span>' +
        '<span>' + s.points.length + ' 条发音要点</span>' +
      '</div>' +
      '<div class="reveal"><button class="btn sm" onclick="tog(this)">发音要点（' + s.points.length + ' 条）</button>' +
        '<div class="revbd"><div class="tblwrap"><table><thead><tr><th style="width:200px;">词 / 短语</th><th>为什么容易读错 · 怎么改</th></tr></thead><tbody>' + pts + '</tbody></table></div></div>' +
      '</div>' +
      '<div class="reveal"><button class="btn sm" onclick="tog(this)">中文译文</button>' +
        '<div class="revbd"><div class="przh">' + zh + '</div></div>' +
      '</div>' +
    '</div>';
  }).join('');

  Array.prototype.forEach.call(wrap.querySelectorAll('[data-say]'), function(b){
    b.onclick = function(){ speak(plain(PRON_DAY[+b.getAttribute('data-say')].text), 0.95); };
  });
  Array.prototype.forEach.call(wrap.querySelectorAll('[data-slow]'), function(b){
    b.onclick = function(){ speak(plain(PRON_DAY[+b.getAttribute('data-slow')].text), 0.72); };
  });

  /* ---------- 打卡清单（并入当日总进度） ---------- */
  var GENERAL = ${JSON.stringify(general)};
  var box = document.getElementById('ckPron');
  if(typeof LISTS !== 'undefined' && box && typeof state !== 'undefined'){
    LISTS.ckPron = GENERAL.concat(PRON_DAY.map(function(s){
      return s.id + ' ' + s.title + ' —— 三遍读完（听 → 看标注 → 不看标注 → 站着读），并做完体感自查';
    }));
    LISTS.ckPron.forEach(function(txt, i){
      var key = 'ckPron_' + i;
      var el = document.createElement('div');
      el.className = 'ck' + (state.ck[key] ? ' on' : '');
      el.innerHTML = '<div class="bx"></div><div class="tx">' + txt + '</div>';
      el.addEventListener('click', function(){
        if(state.ck[key]){ delete state.ck[key]; } else { state.ck[key] = true; }
        el.classList.toggle('on', !!state.ck[key]);
        save(); sync();
      });
      box.appendChild(el);
    });
    if(typeof sync === 'function'){ sync(); }
  }
})();
</` + `script>
<!--PRON_JS_END-->`;
}

/* ---------------- 6. 注入工具 ---------------- */
function escRe(s){ return s.replace(/[.*+?^${}()|[\]\\\/]/g, m => '\\' + m); }

function replaceMarked(html, startMark, endMark, payload, anchor, label){
  const re = new RegExp('\\n?' + escRe(startMark) + '[\\s\\S]*?' + escRe(endMark));
  if(re.test(html)){
    return { out: html.replace(re, () => '\n' + payload), mode: '替换旧块' };
  }
  const n = html.split(anchor).length - 1;
  if(n === 0) throw new Error('找不到锚点：' + label + ' → ' + anchor);
  if(n > 1)  throw new Error('锚点不唯一（出现 ' + n + ' 次）：' + label + ' → ' + anchor);
  return { out: html.replace(anchor, () => payload + '\n' + anchor), mode: '新增' };
}

const CSS_START = '/*PRON_CSS_START*/', CSS_END = '/*PRON_CSS_END*/';
const MOD_START = '<!--PRON_MODULE_START-->', MOD_END = '<!--PRON_MODULE_END-->';
const JS_START  = '<!--PRON_JS_START-->', JS_END = '<!--PRON_JS_END-->';

function inject(day, file, mode, anchor, renumber){
  const p = path.join(ROOT, file);
  let html = fs.readFileSync(p, 'utf8');
  const log = [];

  let r = replaceMarked(html, CSS_START, CSS_END, buildCss(), '</style>', file + ' CSS');
  html = r.out; log.push('样式 ' + r.mode);

  r = replaceMarked(html, MOD_START, MOD_END, buildModuleHtml(day, mode), anchor, file + ' 模块');
  html = r.out; log.push('模块正文 ' + r.mode);

  r = replaceMarked(html, JS_START, JS_END, buildScript(day), '</body>', file + ' 脚本');
  html = r.out; log.push('页面脚本 ' + r.mode);

  if(renumber){
    const pairs = [['<b>05</b><span>WRAP</span>','<b>06</b><span>WRAP</span>'],
                   ['<b>04</b><span>WRITE</span>','<b>05</b><span>WRITE</span>'],
                   ['<b>03</b><span>SPEAK</span>','<b>04</b><span>SPEAK</span>'],
                   ['<!-- 模块 5 -->','<!-- 模块 6 -->'],
                   ['<!-- 模块 4 -->','<!-- 模块 5 -->'],
                   ['<!-- 模块 3 -->','<!-- 模块 4 -->']];
    pairs.forEach(pair => {
      if(html.indexOf(pair[1]) > -1){ return; }
      if(html.indexOf(pair[0]) === -1) throw new Error(file + ' 重编号锚点缺失: ' + pair[0]);
      html = html.replace(pair[0], pair[1]);
    });
    html = html.replace('<!--PRON_MODULE_START-->', '<!-- 模块 3 PRON -->\n<!--PRON_MODULE_START-->');
    log.push('模块编号重排 03→04 / 04→05 / 05→06');
    if(html.indexOf('<b>6</b><span>训练模块</span>') === -1){
      html = html.replace('<b>5</b><span>训练模块</span>', '<b>6</b><span>训练模块</span>');
      log.push('头部：训练模块 5 → 6');
    }
    if(html.indexOf('<b>4 h 15 m</b>') === -1 && html.indexOf('<b>3 h 50 m</b>') > -1){
      html = html.replace('<b>3 h 50 m</b>', '<b>4 h 15 m</b>');
      log.push('头部：训练量 3h50m → 4h15m');
    }
  }

  if(!DRY) fs.writeFileSync(p, html, 'utf8');
  return { log, html };
}

/* ---------------- 7. 文案口径修正 ---------------- */
function fixLabel(file, pairs){
  const p = path.join(ROOT, file);
  let html = fs.readFileSync(p, 'utf8');
  let n = 0;
  pairs.forEach(pair => {
    const times = html.split(pair[0]).length - 1;
    if(times){ html = html.split(pair[0]).join(pair[1]); n += times; }
  });
  if(n && !DRY) fs.writeFileSync(p, html, 'utf8');
  return n;
}

/* ---------------- 8. 42 天分配表写入 03 页 ---------------- */
const SCHED_START = '<!--PRON_SCHED_START-->', SCHED_END = '<!--PRON_SCHED_END-->';

function buildSchedCard(usePlaceholder){
  const TOT = usePlaceholder ? '__TOTAL__' : String(SEGMENTS.length);
  const PTS = usePlaceholder ? '__POINTS__' : String(TOTAL_POINTS);
  const PILL = { A:'amber', B:'navy', C:'teal', D:'green', E:'purple' };
  let rows = '';
  let prevW = 0;
  Object.keys(PRON_SCHEDULE).map(Number).sort((a, b) => a - b).forEach(d => {
    const sch = PRON_SCHEDULE[d];
    const w = Math.ceil(d / 7);
    const badge = (w !== prevW)
      ? '<tr style="background:#f4f8ff;"><td colspan="4" style="font-size:12px;font-weight:700;color:var(--navy);padding:7px 9px;">第 ' + w + ' 周　' + (WEEK_HDR[w] || GROUP_ROT[w]) + '</td></tr>'
      : '';
    prevW = w;
    const pills = sch.ids.map(id => {
      const s = BY_ID[id];
      return '<span class="pill ' + PILL[s.g] + '">' + id + ' ' + s.title + '</span>';
    }).join('');
    rows += badge +
      '<tr><td class="en">Day ' + String(d).padStart(2, '0') + '</td>' +
      '<td class="ex">' + sch.theme + '</td>' +
      '<td style="font-size:12px;">' + sch.ids.join(' · ') + '</td>' +
      '<td>' + pills + '</td></tr>';
  });

  return SCHED_START + `
<h2 class="sec">六·B、42 天逐日朗读分配表</h2>
<p class="sub">把上面的六周轮换表落到每一天。<b>每天 3 段（第 1、2 周 3 段，第 3 周 4 段）</b>，合计 25 分钟。分配依据是《00-作战中心》42 天计划的当日主题：主题是 AML 就配 AML 段，主题是会议就配职场段。<b>每周第 7 天（周测日）安排前一阶段最卡的段重读</b>——重读比每天换新段有效得多。</p>

<div class="card">
  <div class="tblwrap" style="max-height:640px;">
    <table>
      <thead><tr><th style="width:74px;">日程</th><th style="width:200px;">当日主题</th><th style="width:104px;">段号</th><th>今日朗读的 ${TOT} 段库中选段</th></tr></thead>
      <tbody>
${rows}
      </tbody>
    </table>
  </div>
  <div class="info" style="margin-top:12px;">
    <b>这份表怎么用：</b>从 <b>Day 01</b> 起，每天课程页（<span class="mono">Day-NN.html</span>）的「发音朗读」模块里已经把当天这几段的<b>全文、标注、发音要点、中文译文和英式朗读按钮直接内嵌</b>，不需要再跳回本页找。<br>
    本页是<b>总库与索引</b>：想通读全部 ${TOT} 段 / ${PTS} 条发音要点、按 A–E 组浏览，或核对某一天该读哪几段，看这里。
  </div>
</div>
` + SCHED_END;
}

function injectSchedule(file, usePlaceholder){
  const p = path.join(ROOT, file);
  if(!fs.existsSync(p)) return '文件不存在，跳过';
  let html = fs.readFileSync(p, 'utf8');
  const anchor = '<h2 class="sec">七、分组材料索引</h2>';
  const re = new RegExp('\\n?' + escRe(SCHED_START) + '[\\s\\S]*?' + escRe(SCHED_END));
  let out, mode;
  if(re.test(html)){
    out = html.replace(re, () => '\n' + buildSchedCard(usePlaceholder)); mode = '替换旧块';
  } else {
    const n = html.split(anchor).length - 1;
    if(n === 0) return '未找到锚点（跳过）';
    if(n > 1)  return '锚点不唯一（跳过）';
    out = html.replace(anchor, () => buildSchedCard(usePlaceholder) + '\n' + anchor); mode = '新增';
  }
  if(!DRY) fs.writeFileSync(p, out, 'utf8');
  return mode;
}

/* ---------------- 9. 执行 ---------------- */
console.log('朗读段总数：' + SEGMENTS.length + '　发音要点：' + TOTAL_POINTS + ' 条　总词数：' + TOTAL_WORDS);
const groups = {};
SEGMENTS.forEach(s => { groups[s.g] = (groups[s.g] || 0) + 1; });
console.log('分组：' + ['A','B','C','D','E'].map(g => g + '=' + (groups[g] || 0)).join('  '));
console.log('');

/* Day-01：新增独立模块 */
{
  const html = fs.readFileSync(path.join(ROOT, 'Day-01.html'), 'utf8');
  const r = html.indexOf(MOD_START) > -1
    ? inject(1, 'Day-01.html', 'card', null, false)
    : inject(1, 'Day-01.html', 'card', '<!-- 模块 3 -->', true);
  console.log('Day-01.html');
  r.log.forEach(l => console.log('   · ' + l));
}

/* Day-02：嵌入既有「发音与朗读」卡片 */
{
  const D2_ANCHOR = '<h4>第一步：影子跟读（Shadowing）三个层次（15 分钟）</h4>';
  const html = fs.readFileSync(path.join(ROOT, 'Day-02.html'), 'utf8');
  const r = html.indexOf(MOD_START) > -1
    ? inject(2, 'Day-02.html', 'section', null, false)
    : inject(2, 'Day-02.html', 'section', D2_ANCHOR, false);
  console.log('Day-02.html');
  r.log.forEach(l => console.log('   · ' + l));
}

/* Day-02 收尾：步骤顺延 + 时长 + 旧文案 */
{
  const p = path.join(ROOT, 'Day-02.html');
  let html = fs.readFileSync(p, 'utf8');
  const acts = [];

  [['<h4>第一步：影子跟读（Shadowing）三个层次（15 分钟）</h4>',
    '<h4 style="margin-top:22px;">第二步：影子跟读（Shadowing）三个层次（15 分钟）</h4>'],
   ['<h4 style="margin-top:16px;">第二步：今日必练的 3 组绕口句（10 分钟）</h4>',
    '<h4 style="margin-top:16px;">第三步：今日必练的 3 组绕口句（10 分钟）</h4>'],
   ['<h4 style="margin-top:16px;">第三步：英式语调（5 分钟）</h4>',
    '<h4 style="margin-top:16px;">第四步：英式语调（5 分钟）</h4>']
  ].forEach(pair => {
    if(html.indexOf(pair[0]) > -1){ html = html.replace(pair[0], pair[1]); acts.push('步骤顺延'); }
  });

  [['<div class="mod-time">30 分钟</div>', '<div class="mod-time">40 分钟</div>', '模块时长 30 → 40 分钟'],
   ['<b>4 h 00 m</b>', '<b>4 h 10 m</b>', '训练量 4h00m → 4h10m'],
   ['43 段可直接朗读的文本、211 条发音要点、内嵌英式朗读按钮。',
    SEGMENTS.length + ' 段可直接朗读的文本、' + TOTAL_POINTS + ' 条发音要点、内嵌英式朗读按钮。',
    '朗读库口径 43 段 / 211 条 → ' + SEGMENTS.length + ' 段 / ' + TOTAL_POINTS + ' 条'],
   ['本模块的三步是<b>方法</b>，那份文档是<b>材料</b>。每天从里面挑 2～3 段读，比自己找文章有效得多。',
    '本模块的<b>材料</b>（今天这 ' + PRON_SCHEDULE[2].ids.length + ' 段）已经内嵌在上面的第一步里，<b>不用跳转</b>；下面第二至第四步是<b>方法</b>，两者配合用。',
    '朗读说明改为指向内嵌内容']
  ].forEach(t => {
    if(html.indexOf(t[0]) > -1){ html = html.replace(t[0], t[1]); acts.push(t[2]); }
  });

  if(acts.length && !DRY) fs.writeFileSync(p, html, 'utf8');
  acts.forEach(a => console.log('   · ' + a));
}

/* Day-03：独立「发音朗读」卡片（页面已预留标记） */
{
  const p3 = path.join(ROOT, 'Day-03.html');
  if (fs.existsSync(p3)) {
    const html = fs.readFileSync(p3, 'utf8');
    const r = html.indexOf(MOD_START) > -1
      ? inject(3, 'Day-03.html', 'card', null, false)
      : inject(3, 'Day-03.html', 'card', '<!-- 模块 4 -->', false);
    console.log('Day-03.html');
    r.log.forEach(l => console.log('   · ' + l));
  } else {
    console.log('Day-03.html（不存在，跳过）');
  }
}

/* Day-04：独立「发音朗读」卡片（页面已预留标记） */
{
  const p4 = path.join(ROOT, 'Day-04.html');
  if (fs.existsSync(p4)) {
    const html = fs.readFileSync(p4, 'utf8');
    const r = html.indexOf(MOD_START) > -1
      ? inject(4, 'Day-04.html', 'card', null, false)
      : inject(4, 'Day-04.html', 'card', '<!-- 模块 4 -->', false);
    console.log('Day-04.html');
    r.log.forEach(l => console.log('   · ' + l));
  } else {
    console.log('Day-04.html（不存在，跳过）');
  }
}

/* Day-05：独立「发音朗读」卡片（页面已预留标记） */
{
  const p5 = path.join(ROOT, 'Day-05.html');
  if (fs.existsSync(p5)) {
    const html = fs.readFileSync(p5, 'utf8');
    const r = html.indexOf(MOD_START) > -1
      ? inject(5, 'Day-05.html', 'card', null, false)
      : inject(5, 'Day-05.html', 'card', '<!-- 模块 4 -->', false);
    console.log('Day-05.html');
    r.log.forEach(l => console.log('   · ' + l));
  } else {
    console.log('Day-05.html（不存在，跳过）');
  }
}

/* Day-06：独立「发音朗读」卡片（页面已预留标记） */
{
  const p6 = path.join(ROOT, 'Day-06.html');
  if (fs.existsSync(p6)) {
    const html = fs.readFileSync(p6, 'utf8');
    const r = html.indexOf(MOD_START) > -1
      ? inject(6, 'Day-06.html', 'card', null, false)
      : inject(6, 'Day-06.html', 'card', '<!-- 模块 4 -->', false);
    console.log('Day-06.html');
    r.log.forEach(l => console.log('   · ' + l));
  } else {
    console.log('Day-06.html（不存在，跳过）');
  }
}

/* Day-07：独立「发音朗读」卡片（周测日：复读本周最卡三段） */
{
  const p7 = path.join(ROOT, 'Day-07.html');
  if (fs.existsSync(p7)) {
    const html = fs.readFileSync(p7, 'utf8');
    const r = html.indexOf(MOD_START) > -1
      ? inject(7, 'Day-07.html', 'card', null, false)
      : inject(7, 'Day-07.html', 'card', '<!-- 模块 4 -->', false);
    console.log('Day-07.html');
    r.log.forEach(l => console.log('   · ' + l));
  } else {
    console.log('Day-07.html（不存在，跳过）');
  }
}

/* Day-08：独立「发音朗读」卡片 */
{
  const p8 = path.join(ROOT, 'Day-08.html');
  if (fs.existsSync(p8)) {
    const html = fs.readFileSync(p8, 'utf8');
    const r = html.indexOf(MOD_START) > -1
      ? inject(8, 'Day-08.html', 'card', null, false)
      : inject(8, 'Day-08.html', 'card', '<!-- 模块 4 -->', false);
    console.log('Day-08.html');
    r.log.forEach(l => console.log('   · ' + l));
  } else {
    console.log('Day-08.html（不存在，跳过）');
  }
}

/* 03 页 + 00 页：段数口径 + 分配表 */
const n3 = fixLabel('03-发音与朗读系统.html', [
  ['<b>43 段可直接朗读的英文文本</b>', '<b>' + SEGMENTS.length + ' 段可直接朗读的英文文本</b>'],
  ['<div class="stat"><b>43</b><span>朗读文本段落</span></div>', '<div class="stat"><b>' + SEGMENTS.length + '</b><span>朗读文本段落</span></div>'],
  ['共 <b>43</b> 段，分 5 个模块。', '共 <b>' + SEGMENTS.length + '</b> 段，分 5 个模块。']
]);
console.log('\n03-发音与朗读系统.html　段数口径修正 ' + n3 + ' 处');

const n0 = fixLabel('00-作战中心.html', [
  ['43 段可朗读文本 · 211 条发音要点 · 内嵌英式朗读',
   SEGMENTS.length + ' 段可朗读文本 · ' + TOTAL_POINTS + ' 条发音要点 · 内嵌英式朗读']
]);
console.log('00-作战中心.html　　　段数口径修正 ' + n0 + ' 处');

console.log('\n分配表写入');
console.log('   · 03-发音与朗读系统.html：' + injectSchedule('03-发音与朗读系统.html', false));
console.log('   · _shell.html　　　　　：' + injectSchedule('_朗读源文件/_shell.html', true));

console.log('\n完成。' + (DRY ? '（--dry 模式，未落盘）' : ''));
