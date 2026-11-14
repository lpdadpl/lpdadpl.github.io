// Genera una página estática a partir de la guía local, sin dependencias.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const escape = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const inline = s => escape(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2">$1</a>');
const lines = fs.readFileSync(path.join(root, 'Tuto_OhmyPosh/oh-my-posh-tutorial.md'), 'utf8').split(/\r?\n/);
let code = null, list = null, out = [];
const closeList = () => { if(list) {out.push(`</${list}>`); list = null;} };
for (const line of lines) {
  if (line.startsWith('```')) {
    if (code !== null) { out.push('<pre><code>' + escape(code.join('\n')) + '</code></pre>'); code = null; }
    else { closeList(); code = []; }
    continue;
  }
  if (code !== null) { code.push(line); continue; }
  if (!line.trim()) { closeList(); continue; }
  const heading = line.match(/^(#{1,6})\s+(.*)/);
  if(heading) {closeList(); out.push(`<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`); continue;}
  const item = line.match(/^\s*(- |\d+\. )(.*)/);
  if(item) { const type = item[1] === '- ' ? 'ul' : 'ol'; if(list !== type){closeList();list=type;out.push(`<${type}>`);}out.push(`<li>${inline(item[2])}</li>`);continue;}
  closeList(); out.push(`<p>${inline(line)}</p>`);
}
closeList();
fs.writeFileSync(path.join(root, 'Tuto_OhmyPosh/index.html'), `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Oh My Posh en Ubuntu — Alberto de Pablo</title><link rel="icon" href="../favicon.ico"><link rel="stylesheet" href="../hub.css"><link rel="stylesheet" href="../theme.css"></head><body><main class="wrap guide"><a href="../index.html">← Volver al hub</a><article>${out.join('\n')}</article><p><a href="oh-my-posh-tutorial.md">Ver guía original en Markdown ↗</a></p></main></body></html>\n`);
console.log('Guía Oh My Posh generada.');
