const fs = require('fs');
const dir = 'D:/英语培训教程/_朗读源文件';
let src = '';
['_s1.js', '_s2.js', '_s3.js', '_s4.js'].forEach(f => { src += fs.readFileSync(dir + '/' + f, 'utf8') + '\n'; });

['B8', 'B10', 'C3'].forEach(id => {
  const i = src.indexOf('{id:"' + id + '"');
  const j = src.indexOf('{id:"', i + 5);
  const blk = src.slice(i, j > 0 ? j : i + 2000);
  const t = blk.match(/title:"([^"]*)"/);
  const f = blk.match(/focus:"([^"]*)"/);
  const d = blk.match(/desc:"([^"]*)"/);
  const w = blk.match(/words:(\d+)/);
  const tx = blk.match(/text:"([\s\S]{0,260})/);
  console.log('=== ' + id + ' | ' + (t ? t[1] : '?') + ' | ' + (w ? w[1] : '?') + '词 | focus: ' + (f ? f[1] : '-'));
  console.log('desc: ' + (d ? d[1] : '-'));
  console.log('text: ' + (tx ? tx[1].replace(/\\n/g, ' ⏎ ') : '-'));
  console.log('');
});
