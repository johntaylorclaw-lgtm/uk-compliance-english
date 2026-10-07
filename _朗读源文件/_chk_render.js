const fs = require('fs'), vm = require('vm');
const file = process.argv[2] || 'D:/英语培训教程/03-发音与朗读系统.html';
const html = fs.readFileSync(file, 'utf8');
const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
console.log(file);
console.log('script 块数 = ' + scripts.length);
scripts.forEach((s, i) => {
  try { new Function(s); console.log('  #' + i + ' 语法通过  (' + s.length + ' 字符)'); }
  catch (e) { console.log('  #' + i + ' 语法失败: ' + e.message); }
});

const m = html.match(/var SEG_1 = (\[[\s\S]*?\]);\nvar SEG_2 = (\[[\s\S]*?\]);\nvar SEG_3 = (\[[\s\S]*?\]);\nvar SEG_4 = (\[[\s\S]*?\]);\n/);
if (m) {
  let tot = 0, nul = 0;
  [1, 2, 3, 4].forEach(k => { const a = JSON.parse(m[k]); tot += a.length; nul += a.filter(x => x === null).length; });
  console.log('  SEG_1..4 槽位 = ' + tot + '　其中 null = ' + nul);
}

const nodes = {};
function mk(id) {
  return nodes[id] || (nodes[id] = { id, innerHTML: '', textContent: '', className: '', style: {}, dataset: {},
    classList: { _s: new Set(), add(c){this._s.add(c);}, remove(c){this._s.delete(c);},
                 toggle(c, v){ v ? this._s.add(c) : this._s.delete(c); }, contains(c){ return this._s.has(c); } },
    appendChild(){}, addEventListener(){}, querySelectorAll(){ return []; } });
}
const sandbox = {
  console,
  document: {
    getElementById: id => mk(id),
    querySelector: s => mk(String(s).replace('#', '')),
    querySelectorAll: () => [],
    createElement: () => ({ innerHTML: '', style: {}, classList: { add(){} }, appendChild(){}, addEventListener(){} }),
    addEventListener(){}
  },
  localStorage: { getItem: () => null, setItem(){} },
  alert: () => {}
};
sandbox.window = sandbox;
vm.createContext(sandbox);
try {
  scripts.forEach(s => vm.runInContext(s, sandbox));
  console.log('  执行结果: 通过');
  const w = nodes['segWrap'];
  console.log('  #segWrap 长度 = ' + (w ? w.innerHTML.length : 'n/a') +
              '　渲染段数 = ' + (w ? (w.innerHTML.match(/class="segno"/g) || []).length : 'n/a'));
  if (nodes['statAll']) { console.log('  statAll = ' + nodes['statAll'].textContent + '　statDone = ' + nodes['statDone'].textContent); }
  if (nodes['indexBody']) { console.log('  indexBody 行数 = ' + (nodes['indexBody'].innerHTML.match(/<tr>/g) || []).length); }
} catch (e) {
  console.log('  !! 执行抛错: ' + e.message);
  console.log('     ' + String(e.stack).split('\n')[1]);
}
