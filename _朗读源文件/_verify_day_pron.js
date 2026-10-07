/* 注入结果复核：脚本语法 + 结构 + 打卡清单覆盖 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ROOT = 'D:/英语培训教程';

['Day-01.html', 'Day-02.html', '03-发音与朗读系统.html', '00-作战中心.html'].forEach(f => {
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
  Object.keys(marks).forEach(k => {
    const v = marks[k];
    const bad = (k === '残留43段文案' || k === '残留占位符');
    if(bad && v) console.log('   !!  ' + k);
    else if(!bad && v) console.log('   OK  ' + k);
  });
});

/* 校验生成的 PRON_DAY 数据与打卡清单数量 */
['Day-01.html','Day-02.html'].forEach(f => {
  const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const m = html.match(/var PRON_DAY = (\[[\s\S]*?\]);\n/);
  if(!m){ console.log('\n' + f + ': 找不到 PRON_DAY'); return; }
  const arr = JSON.parse(m[1]);
  const ctx = { document:{ getElementById:()=>null, querySelectorAll:()=>[] }, window:{}, alert:()=>{} };
  const js = html.match(/var LS = "([^"]+)"/)[1];
  console.log('\n' + f + '  段数=' + arr.length + '  ' +
    arr.map(s => s.id + '(' + s.points.length + '点/' + s.words + '词)').join('  '));
  arr.forEach(s => {
    const t = (s.text.match(/\*/g) || []).length;
    const u = (s.text.match(/_/g) || []).length;
    const w = (s.text.match(/~/g) || []).length;
    if(t % 2 || u % 2 || w % 2) console.log('   !! ' + s.id + ' 标记不配对 *' + t + ' _' + u + ' ~' + w);
  });
  console.log('   总词 ' + arr.reduce((a,s)=>a+s.words,0) + ' · 要点 ' + arr.reduce((a,s)=>a+s.points.length,0) + ' · localStorage=' + js);
});
