// Dependency-free numeric fixtures. --production tests the public HTML and asset;
// this is script execution with DOM stubs, not browser or native-validity QA.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const pages = [
  'duct-size-calculator', 'rectangular-duct-size-calculator',
  'equivalent-duct-diameter-calculator', 'duct-velocity-calculator',
  'duct-friction-loss-calculator'
];
const root = path.join(__dirname, '..');
const normal = text => text.replace(/\r\n/g, '\n').trim();
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(m => [m[1], m[2]]));

function control(spec) {
  return {
    value: spec.value || '',
    validityOverride: true,
    events: {},
    checkValidity() {
      const v = Number(this.value);
      if (!this.validityOverride || this.value.trim() === '' || !Number.isFinite(v)) return false;
      if (spec.min !== undefined && v < Number(spec.min)) return false;
      if (spec.max !== undefined && v > Number(spec.max)) return false;
      if (spec.step && spec.step !== 'any') {
        const steps = (v - Number(spec.min ?? spec.value ?? 0)) / Number(spec.step);
        if (Math.abs(steps - Math.round(steps)) > 1e-8) return false;
      }
      return true;
    },
    addEventListener(event, callback) { this.events[event] = callback; }
  };
}

function calculator(source, mode, specs) {
  const events = {};
  const output = { value: '', textContent: '' };
  const note = { textContent: '' };
  const inputs = specs.map(control);
  const form = {
    dataset: { duct: mode, airflow: mode },
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
    input(index, value) { inputs[index].value = String(value); inputs[index].events.input(); },
    reset() { inputs.forEach((input, i) => { input.value = specs[i].value; input.validityOverride = true; }); events.reset(); }
  };
}

function forms(html) {
  return [...html.matchAll(/<form\b([^>]*data-duct="[^"]+"[^>]*)>([\s\S]*?)<\/form>/g)]
    .map(m => ({ mode: attrs(m[1])['data-duct'], specs: [...m[2].matchAll(/<input\b[^>]*>/g)].map(i => attrs(i[0])) }));
}

async function load() {
  const publicMode = process.argv.includes('--production') || process.argv.includes('--reproduce');
  const get = async route => {
    if (!publicMode) return fs.readFileSync(path.join(root, route.split('?')[0]), 'utf8');
    const response = await fetch('https://hvactoolshub.com/' + route);
    assert.equal(response.status, 200, route + ': HTTP 200');
    assert.equal(new URL(response.url).origin, 'https://hvactoolshub.com');
    return response.text();
  };
  const html = await Promise.all(pages.map(page => get('tool/' + page + '.html')));
  const sourceRoute = html[0].match(/src="(\/assets\/js\/duct\.js[^" ]*)"/)[1].slice(1);
  const source = await get(sourceRoute);
  if (publicMode) {
    assert.equal(normal(source), normal(fs.readFileSync(path.join(root, 'assets/js/duct.js'), 'utf8')), 'Public asset matches repository');
    html.forEach((s, i) => assert.equal(normal(s), normal(fs.readFileSync(path.join(root, 'tool/' + pages[i] + '.html'), 'utf8')), pages[i] + ': public HTML matches repository'));
  }
  return {source, html, get};
}

async function main() {
  const {source, html, get} = await load();
  const definitions = html.flatMap(forms);
  if (process.argv.includes('--reproduce')) {
    const results = [];
    for (const mode of ['friction', 'velocity-round', 'equivalent']) {
      const definition = definitions.find(d => d.mode === mode);
      const calc = calculator(source, mode, definition.specs);
      const initial = calc.output.value;
      const invalidDefaults = calc.inputs.filter(i => !i.checkValidity()).length;
      calc.input(0, '1e308');
      results.push({mode, initial, defaultConstraintFailures:invalidDefaults, extremeResult:calc.output.value, note:calc.note.textContent});
    }
    const healthy = calculator(await get('assets/js/airflow.js'), 'ach', [20,15,8,240].map(value=>({value:String(value),min:'0.000001',step:'any'})));
    healthy.inputs[3].value='1e308'; healthy.calculate();
    assert.equal(healthy.output.value, '', 'Healthy ACH control rejects overflow');
    console.log(JSON.stringify({source:'Public HTTP asset, Node VM, DOM stubs; not a browser',results,healthyControl:{mode:'ach',result:healthy.output.value,note:healthy.note.textContent}},null,2));
    return;
  }

  let assertions = 0;
  const eq = (actual, expected, message) => {assert.equal(actual,expected,message);assertions++;};
  const ok = (value,message) => {assert.ok(value,message);assertions++;};
  const fixtures = [
    ['size',[1000,1000],'13.54'], ['round',[1000,1000],'13.54'],
    ['rectangular',[1000,1000,2],'17 × 8.5'],
    ['equivalent',[18,8],'12.86'],
    ['velocity-round',[600,14],'561.26'], ['velocity-rect',[600,18,8],'600'],
    ['area-round',[12],'0.79'], ['area-rect',[18,18],'2.25'],
    ['friction',[800,16,100,1.2,0.02],'0.03']
  ];
  for (const [mode, values, expected] of fixtures) {
    const specs = values.map(value => ({value:String(value),min:'0.000001',step:'any'}));
    const calc = calculator(source,mode,specs);
    eq(calc.output.value,expected,mode+': independent fixture');
    ok(!/NaN|Infinity|∞/.test(calc.note.textContent),mode+': finite details');
    for (let index=0;index<specs.length;index++) {
      for (const invalid of ['', '0','-1','NaN','Infinity','1e-7','abc']) {
        calc.input(index,invalid);
        eq(calc.output.value,'',mode+': clear invalid input '+index+'/'+invalid);
        ok(calc.note.textContent.length,mode+': explains invalid input');
        calc.reset(); eq(calc.output.value,expected,mode+': Reset restores fixture');
      }
      calc.inputs[index].validityOverride=false;
      calc.calculate(); eq(calc.output.value,'',mode+': applies native validity '+index);
      calc.reset();
    }
    calc.input(0,'0.000001'); ok(calc.output.value !== '',mode+': accepts minimum with finite calculation');
    calc.reset();
  }

  for (const definition of definitions) {
    const calc = calculator(source,definition.mode,definition.specs);
    ok(calc.inputs.every(i=>i.checkValidity()),definition.mode+': public default constraints');
    ok(calc.output.value !== '',definition.mode+': default calculation exists');
    ok(!/NaN|Infinity|∞/.test(calc.output.value+calc.note.textContent),definition.mode+': default finite');
  }
  const overflow = [
    ['size',[1e308,0.000001]],['round',[1e308,0.000001]],
    ['rectangular',[1e308,1,2]],['equivalent',[1e200,1e200]],['equivalent',[1e308,12]],
    ['velocity-round',[600,1e200]],['velocity-round',[1e308,0.000001]],
    ['velocity-rect',[600,1e200,1e200]],['velocity-rect',[1e308,0.000001,0.000001]],
    ['area-round',[1e200]],['area-rect',[1e200,1e200]],
    ['friction',[1e308,16,100,1.2,0.02]],['friction',[800,1e200,100,1.2,0.02]],
    ['friction',[800,16,100,1.2,1e308]]
  ];
  for (const [mode,values] of overflow) {
    const calc=calculator(source,mode,values.map(value=>({value:String(value),min:'0.000001',step:'any'})));
    eq(calc.output.value,'',mode+': rejects overflow/underflow');
    ok(/unsupported/i.test(calc.note.textContent),mode+': explains unsupported result');
  }
  for (const [mode,values,expected] of [
    ['velocity-rect',[10000,120,120],'100'],
    ['size',[1000000,1000],'428.19'],
    ['rectangular',[800,700,2.25],'19.2 × 8.6'],
    ['friction',[800,16,100,1.2345,0.0205],'0.03']
  ]) {
    const calc=calculator(source,mode,values.map(value=>({value:String(value),min:'0.000001',step:'any'})));
    eq(calc.output.value,expected,mode+': larger/fractional valid fixture');
  }
  console.log(`PASS: ${assertions} assertions; nine Duct calculation modes, five maintained pages (${process.argv.includes('--production')?'public asset':'local asset'}). Browser QA remains separate.`);
}

main().catch(error=>{console.error(error);process.exitCode=1;});
