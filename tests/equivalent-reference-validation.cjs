// Keep published lookup examples and prose aligned with the documented equation.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const reference = fs.readFileSync(path.join(root, 'reference/equivalent-round-duct-diameter-table.html'), 'utf8');
const tool = fs.readFileSync(path.join(root, 'tool/equivalent-duct-diameter-calculator.html'), 'utf8');
const rows = [...reference.matchAll(/<tr><td>(\d+) × (\d+)<\/td><td>([\d.]+)<\/td><td>([\d.]+)<\/td><\/tr>/g)];
assert.equal(rows.length, 5, 'All five published lookup rows are tested');
for (const [, ws, hs, area, diameter] of rows) {
  const w = Number(ws), h = Number(hs);
  assert.equal(Number(area), w * h, `${w} × ${h}: face area`);
  const expected = 1.30 * Math.pow(w * h, 0.625) / Math.pow(w + h, 0.25);
  assert.equal(Number(diameter), Number(expected.toFixed(1)), `${w} × ${h}: rounded equivalent`);
}
assert.match(tool, /<strong>18\.3 in<\/strong>/, 'Tool example matches the 24 × 12 result');
assert.match(reference, /approximate 18\.3 in/, 'Reference interpretation matches its row');
assert.ok(!/18\.1 in/.test(tool + reference), 'Stale worked example removed');
console.log('PASS: 14 reference/prose checks; all five rows match the documented Huebscher equation.');
