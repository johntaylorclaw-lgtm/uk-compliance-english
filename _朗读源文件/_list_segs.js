const fs = require('fs');
const dir = 'D:/英语培训教程/_朗读源文件';
let src = '';
['_s1.js', '_s2.js', '_s3.js', '_s4.js'].forEach(f => { src += fs.readFileSync(dir + '/' + f, 'utf8') + '\n'; });

const re = /\{id:"([A-E]\d+)",\s*g:"([A-E])",\s*title:"([^"]*)",[\s\S]*?words:(\d+)/g;
let m, all = [];
while ((m = re.exec(src))) all.push({ id: m[1], g: m[2], title: m[3], words: +m[4] });
console.log('抓到 ' + all.length + ' 段（含空槽位已过滤）');
const order = { A: 1, B: 2, C: 3, D: 4, E: 5 };
all.sort((a, b) => (order[a.g] - order[b.g]) || (parseInt(a.id.slice(1), 10) - parseInt(b.id.slice(1), 10)));
all.forEach(s => console.log(String(s.id).padEnd(5) + String(s.words).padStart(4) + '词  ' + s.title));
