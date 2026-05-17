#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const includeExt = new Set(['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.md']);

const forbidden = /(\btext-transparent\b|\bbg-clip-text\b|\bfrom-[^\s'"`]+\b|\bto-[^\s'"`]+\b|\bvia-[^\s'"`]+\b|\bbg-blue-[^\s'"`]+\b|\btext-blue-[^\s'"`]+\b)/i;

function walk(dir, cb) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.git') continue;
      walk(full, cb);
    } else {
      cb(full);
    }
  }
}

let found = false;
const hits = [];
walk(repoRoot, (file) => {
  const ext = path.extname(file).toLowerCase();
  if (!includeExt.has(ext)) return;
  let content;
  try {
    content = fs.readFileSync(file, 'utf8');
  } catch (e) {
    return;
  }
  const match = content.match(forbidden);
  if (match) {
    found = true;
    hits.push({ file, match: match[0] });
  }
});

if (found) {
  console.error('\nForbidden selectors found:');
  for (const h of hits) {
    console.error(` - ${path.relative(repoRoot, h.file)} : ${h.match}`);
  }
  console.error('\nPlease remove or replace forbidden selectors (see .github/agents/ui-generation-instructions.md).');
  process.exit(1);
} else {
  console.log('No forbidden selectors detected.');
  process.exit(0);
}
