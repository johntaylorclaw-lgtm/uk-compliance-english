const fs = require('fs');
const dir = 'D:/英语培训教程/_朗读源文件';
let src = '';
['_s1.js', '_s2.js', '_s3.js', '_s4.js'].forEach(f => { src += fs.readFileSync(dir + '/' + f, 'utf8') + '\n'; });

// 抓 points 数组体（从 points: [ 到 ], zh:）
const re = /points:\s*\[([\s\S]*?)\],\s*zh:/g;
let m, n = 0, star = 0, tilde = 0, under = 0;
while ((m = re.exec(src))) {
  const body = m[1];
  n++;
  const ctx = (c) => JSON.stringify((body.match(new RegExp('.{0,60}' + c + '.{0,60}')) || [''])[0]);
  if (body.indexOf('*') > -1) { star++; console.log('含 *  :', ctx('\\*')); }
  if (body.indexOf('~') > -1) { tilde++; console.log('含 ~  :', ctx('~')); }
  if (body.indexOf('_') > -1) { under++; console.log('含 _  :', ctx('_')); }
}
console.log('points 段数:', n, '| 含 * :', star, '| 含 ~ :', tilde, '| 含 _ :', under);
