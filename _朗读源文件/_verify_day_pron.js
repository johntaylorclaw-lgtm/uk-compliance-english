/* 注入结果复核：脚本语法 + 结构 + 打卡清单覆盖 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ROOT = path.resolve(__dirname, '..');   // 原为硬编码 D:/英语培训教程（原作者本机路径）

/* 自动发现所有已生成的 Day-NN.html（不再硬编码清单，新增一天无需改这里） */
const DAY_FILES = fs.readdirSync(ROOT)
  .filter(f => /^Day-\d\d\.html$/.test(f))
  .sort();
const OTHER = ['03-发音与朗读系统.html', '00-作战中心.html'];
let bad = 0;

DAY_FILES.concat(OTHER).forEach(f => {
  const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const scripts = [];
  const re = /<script[^>]*>([\s\S]*?)<\/script>/g;
  let m;
  while((m = re.exec(html))) scripts.push(m[1]);

  let ok = true, err = '';
  scripts.forEach((s, i) => {
    try { new Function(s); } catch(e){ ok = false; err = 'script#' + i + ' → ' + e.message; }
  });

  const marks = {
    'PRON_CSS':      html.indexOf('/*PRON_CSS_START*/') > -1,
    'PRON_MODULE':   html.indexOf('<!--PRON_MODULE_START-->') > -1,
    'PRON_JS':   html.indexOf('<!--PRON_JS_START-->') > -1,
    '#prWrap':       html.indexOf('id="prWrap"') > -1,
    '#ckPron':       html.indexOf('id="ckPron"') > -1,
    'PRON_SCHED':    html.indexOf('<!--PRON_SCHED_START-->') > -1,
    '残留43段文案':   /43 段可/.test(html) || /<b>43<\/b> 段/.test(html),
    '残留占位符':     html.indexOf('__TOTAL__') > -1 || html.indexOf('__POINTS__') > -1
  };
  console.log('── ' + f + ' ──  脚本语法: ' + (ok ? '通过' : '失败 ' + err));
  if(!ok) bad++;
  Object.keys(marks).forEach(k => {
    const v = marks[k];
    const isBad = (k === '残留43段文案' || k === '残留占位符');
    if(isBad && v){ console.log('   !!  ' + k); bad++; }
    else if(!isBad && !v && /^(PRON_CSS|PRON_MODULE|PRON_JS|#prWrap|#ckPron)$/.test(k)){
      /* 只有当日页面才必须有这五项；03/00 页不参与 */
      if(DAY_FILES.indexOf(f) > -1){ console.log('   !!  缺少 ' + k); bad++; }
    }
    else if(!isBad && v) console.log('   OK  ' + k);
  });
});
console.log('\n共检查 ' + (DAY_FILES.length + OTHER.length) + ' 个文件（Day 页 ' + DAY_FILES.length + ' 个：' + DAY_FILES.join(', ') + '）');

/* 校验生成的 PRON_DAY 数据与打卡清单数量 */
DAY_FILES.forEach(f => {
  const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const m = html.match(/var PRON_DAY = (\[[\s\S]*?\]);\n/);
  if(!m){ console.log('\n' + f + ': 找不到 PRON_DAY'); bad++; return; }
  const arr = JSON.parse(m[1]);
  const ctx = { document:{ getElementById:()=>null, querySelectorAll:()=>[] }, window:{}, alert:()=>{} };
  const js = html.match(/var LS = "([^"]+)"/)[1];
  const day = f.match(/Day-(\d\d)/)[1];
  console.log('\n' + f + '  段数=' + arr.length + '  ' +
    arr.map(s => s.id + '(' + s.points.length + '点/' + s.words + '词)').join('  '));
  /* 段号必须与 _schedule.js 当日分配一致 */
  const SCHED = new Function(fs.readFileSync(path.join(ROOT, '_朗读源文件/_schedule.js'), 'utf8') + '\n;return PRON_SCHEDULE;')();
  const want = (SCHED[+day] ? SCHED[+day].ids : []).join(',');
  const got = arr.map(s => s.id).join(',');
  if(want !== got){ console.log('   !! 段号与 _schedule.js 不一致：期望 ' + want + '，实际 ' + got); bad++; }
  else { console.log('   OK  段号与 _schedule.js Day ' + day + ' 一致（' + want + '）'); }
  arr.forEach(s => {
    const t = (s.text.match(/\*/g) || []).length;
    const u = (s.text.match(/_/g) || []).length;
    const w = (s.text.match(/~/g) || []).length;
    if(t % 2 || u % 2 || w % 2){ console.log('   !! ' + s.id + ' 标记不配对 *' + t + ' _' + u + ' ~' + w); bad++; }
    if(!s.why){ console.log('   !! ' + s.id + ' 缺「今天为什么读这段」'); bad++; }
  });
  console.log('   总词 ' + arr.reduce((a,s)=>a+s.words,0) + ' · 要点 ' + arr.reduce((a,s)=>a+s.points.length,0) + ' · localStorage=' + js);
});

console.log('\n' + (bad ? '!! 有 ' + bad + ' 项未通过' : '全部通过'));
process.exit(bad ? 1 : 0);
