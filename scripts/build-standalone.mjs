import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const entry = 'src/main.js';
const modules = new Map();

function resolveImport(from, specifier) {
  const normalized = path.posix.normalize(path.posix.join(path.posix.dirname(from), specifier));
  return normalized.startsWith('.') ? normalized.slice(2) : normalized;
}

function collect(id) {
  if (modules.has(id)) return;
  const filename = path.join(root, id);
  let source = fs.readFileSync(filename, 'utf8').replace(/^\uFEFF/, '');
  const imports = [];
  source = source.replace(/^import\s+\{([^}]+)\}\s+from\s+['"]([^'"]+)['"]\s*;?\s*$/gm, (_match, names, specifier) => {
    const dep = resolveImport(id, specifier);
    imports.push(`const { ${names.trim()} } = __require(${JSON.stringify(dep)});`);
    collect(dep);
    return '';
  });
  if (/^\s*import\s/m.test(source)) throw new Error(`Unsupported import syntax in ${id}`);
  const exported = [];
  source = source.replace(/^export\s+(?=(?:const|let|var|function|class)\b)/gm, '');
  const declarations = [...source.matchAll(/^(?:const|let|var|function|class)\s+([A-Za-z_$][\w$]*)/gm)];
  const exportLines = fs.readFileSync(filename, 'utf8').match(/^export\s+(?:const|let|var|function|class)\s+([A-Za-z_$][\w$]*)/gm) || [];
  for (const line of exportLines) {
    const name = line.match(/^(?:export\s+)(?:const|let|var|function|class)\s+([A-Za-z_$][\w$]*)/)[1];
    if (!exported.includes(name)) exported.push(name);
  }
  modules.set(id, { source: `${imports.join('\n')}\n${source}`, exported });
}

collect(entry);
const chunks = [];
for (const [id, mod] of modules) {
  chunks.push(`${JSON.stringify(id)}: function(__require) {\n${mod.source}\nreturn { ${mod.exported.join(', ')} };\n}`);
}
const bundle = `/* Naruto Enot Garem — generated standalone runtime. Edit src/ modules, then run: node scripts/build-standalone.mjs */\n(function(){\n'use strict';\nconst __factories = {\n${chunks.join(',\n')}\n};\nconst __cache = Object.create(null);\nfunction __require(id){\n  if (__cache[id]) return __cache[id];\n  const factory = __factories[id];\n  if (!factory) throw new Error('Missing bundled module: ' + id);\n  const exports = factory(__require);\n  __cache[id] = exports;\n  return exports;\n}\ntry { __require(${JSON.stringify(entry)}); } catch (error) {\n  console.error('Naruto Enot Garem failed to start:', error);\n  const panel = document.createElement('section');\n  panel.style.cssText = 'position:fixed;z-index:99999;inset:16px;padding:22px;background:#1b2a22;color:#fff;border:1px solid #9ab17f;border-radius:16px;font:14px/1.5 system-ui;overflow:auto';\n  const title = document.createElement('h2'); title.textContent = 'Не удалось запустить игру';\n  const help = document.createElement('p'); help.textContent = 'Обнови папку игры целиком. При повторной ошибке проверь, что рядом с index.html лежит standalone.js.';\n  const details = document.createElement('pre'); details.style.cssText = 'white-space:pre-wrap;color:#e7c9a7'; details.textContent = String(error && (error.stack || error.message) || error);\n  panel.append(title, help, details); document.body.append(panel);\n}\n})();\n`;
fs.writeFileSync(path.join(root, 'standalone.js'), bundle, 'utf8');
console.log(`Built standalone.js from ${modules.size} modules (${Buffer.byteLength(bundle)} bytes).`);
