// Run with Node; no package installation or browser dependency is required.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../assets/js/airflow.js'), 'utf8');

function calculator(mode, defaults) {
  const events = {};
  const output = { value: '', textContent: '' };
  const note = { textContent: '' };
  const inputs = defaults.map(value => ({
    value: String(value),
    checkValidity() { return this.value !== '' && Number(this.value) >= 0.000001; },
    addEventListener() {}
  }));
  const form = {
    dataset: { airflow: mode },
    matches: () => false,
    querySelectorAll: () => inputs,
    querySelector: selector => selector === '[data-output]' ? output : note,
    addEventListener: (event, callback) => { events[event] = callback; }
  };
  vm.runInNewContext(source, {
    document: { querySelectorAll: () => [form] },
    Intl, setTimeout: callback => callback()
  });
  return {
    inputs, output, note,
    calculate() { events.submit({ preventDefault() {} }); },
    reset() { inputs.forEach((input, i) => { input.value = String(defaults[i]); }); events.reset(); }
  };
}

const cases = [
  ['ach', [20, 15, 8, 240], '6'],
  ['per-square-foot', [300, 240], '0.8'],
  ['cfm-to-m3h', [100], '169.9'],
  ['m3h-to-cfm', [169.901082], '100']
];
let assertions = 0;
for (const [mode, defaults, expected] of cases) {
  const calc = calculator(mode, defaults);
  assert.equal(calc.output.value, expected, `${mode}: default fixture`); assertions++;
  for (const invalid of ['', '0', '-1', 'NaN', 'Infinity', '0.0000001']) {
    calc.inputs[0].value = invalid;
    calc.calculate();
    assert.equal(calc.output.value, '', `${mode}: reject ${JSON.stringify(invalid)}`); assertions++;
    assert.ok(calc.note.textContent.length, `${mode}: validation message`); assertions++;
    calc.reset();
    assert.equal(calc.output.value, expected, `${mode}: reset after invalid`); assertions++;
  }
}
for (const [mode, values] of [
  ['ach', [20, 15, 8, 1e308]],
  ['ach', [1e200, 1e200, 8, 240]],
  ['per-square-foot', [0.000001, 1e308]],
  ['cfm-to-m3h', [1.7e308]]
]) {
  const calc = calculator(mode, values);
  assert.equal(calc.output.value, '', `${mode}: overflow must not be a result`); assertions++;
  assert.match(calc.note.textContent, /unsupported/i); assertions++;
}
// The reciprocal converter can legitimately keep a large finite result.
const finite = calculator('m3h-to-cfm', [1e308]);
assert.ok(finite.output.value && !/[∞]|Infinity|NaN/.test(finite.output.value)); assertions++;
console.log(`PASS: ${assertions} assertions across four maintained legacy Airflow modes.`);
