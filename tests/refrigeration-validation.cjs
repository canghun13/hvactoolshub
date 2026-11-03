// Dependency-free fixtures; real browser validity, clipboard and Print are tested separately.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'assets/js/refrigeration.js'), 'utf8');
const files = {capacity:'refrigeration-capacity-calculator',superheat:'refrigerant-superheat-calculator',subcooling:'refrigerant-subcooling-calculator'};
let checks=0;
const eq=(actual, expected, label)=>{assert.equal(actual,expected,label);checks++;};
const ok=(condition,label)=>{assert.ok(condition,label);checks++;};
const numeric=value=>Number(value.replaceAll(',',''));
function fixture(type) {
  const html=fs.readFileSync(path.join(root,'tool',files[type]+'.html'),'utf8');
  const elements={}, outputs={}, labels={}, message={textContent:''}, events={};
  for (const match of html.matchAll(/<input\b[^>]*>/g)) {
    const attrs=Object.fromEntries([...match[0].matchAll(/([\w-]+)="([^"]*)"/g)].map(m=>[m[1],m[2]]));
    elements[attrs.name]={value:attrs.value,tagName:'INPUT',events:{},
      checkValidity(){const n=Number(this.value);return this.value.trim()!==''&&Number.isFinite(n)&&n>=Number(attrs.min)&&n<=Number(attrs.max);},
      addEventListener(event,callback){this.events[event]=callback;}};
  }
  elements.unit={value:'us',tagName:'SELECT',events:{},checkValidity(){return ['us','si'].includes(this.value);},addEventListener(event,callback){this.events[event]=callback;}};
  for(const name of type==='capacity'?['btu','kw','tons']:['difference','kelvin']) outputs[name]={value:''};
  const defaults=Object.fromEntries(Object.entries(elements).map(([key,el])=>[key,el.value]));
  const form={dataset:{refrigerationForm:type},elements,
    querySelectorAll(selector){return selector==='[data-result]'?Object.values(outputs):Object.values(elements);},
    querySelector(selector){if(selector==='[data-refrigeration-message]')return message;const key=selector.match(/data-result="([^"]+)"/)?.[1];return key?outputs[key]:(labels[selector]??={textContent:''});},
    addEventListener(event,callback){events[event]=callback;}};
  const formula={textContent:''};
  vm.runInNewContext(source,{document:{querySelectorAll:()=>[form],querySelector:()=>formula},Intl,setTimeout:callback=>callback()});
  return {elements,outputs,labels,message,calculate(){events.submit({preventDefault(){}});},
    reset(){for(const key in defaults)elements[key].value=defaults[key];events.reset();}};
}
// This regression fails on the original deployed script: blank was coerced to 0.
const first=fixture('superheat');first.elements.lineTemperature.value='';first.elements.lineTemperature.events.input();
eq(first.outputs.difference.value,'','blank temperature must clear result');
for(const type of Object.keys(files)) {
  const x=fixture(type), fields=Object.keys(x.elements).filter(k=>k!=='unit');
  ok(Object.values(x.outputs).every(o=>o.value!==''),'default results '+type);
  for(const unit of ['us','si']) for(const key of fields) {
    const badValues=type==='capacity'?['','0','-1','NaN','Infinity','1e309','1e-7',key==='massFlow'?'1000001':'100001']:['','NaN','Infinity','1e309','-100.001','300.001'];
    for(const bad of badValues) {
      x.reset();x.elements.unit.value=unit;x.elements[key].value=bad;x.elements[key].events.input();
      for(const output of Object.values(x.outputs))eq(output.value,'',`${type} ${unit} ${key} ${bad} clears all`);
      ok(x.message.textContent.length>0,'validation explanation');
      x.reset();ok(Object.values(x.outputs).every(o=>o.value!==''),'reset restores valid sample');
    }
  }
  x.elements.unit.value='unknown';x.elements.unit.events.change();
  for(const output of Object.values(x.outputs))eq(output.value,'','unsupported unit cleared');
  x.reset();eq(x.elements.unit.value,'us','reset unit');
  if(type==='capacity') {
    eq(x.outputs.btu.value,'24,000','US mass flow × enthalpy × 60');
    eq(x.outputs.kw.value,'7.034','US thermal kW');eq(x.outputs.tons.value,'2','US refrigeration tons');
    x.elements.unit.value='si';x.elements.massFlow.value='0.1';x.elements.enthalpyDelta.value='100';x.calculate();
    eq(x.outputs.kw.value,'10','SI kg/s × kJ/kg');ok(Math.abs(numeric(x.outputs.btu.value)-34121.41633)<0.5,'SI thermal BTU/h');
    eq(x.outputs.tons.value,'2.843','SI ton conversion');
    for(const boundary of ['0.000001','100000']){x.elements.massFlow.value=boundary;x.elements.enthalpyDelta.value=boundary;x.calculate();ok(Object.values(x.outputs).every(o=>o.value!==''&&!/∞|NaN|Infinity/.test(o.value)),'capacity supported boundary '+boundary);}
    x.elements.massFlow.value='1000000';x.calculate();ok(x.outputs.btu.value!=='','mass-flow native upper boundary');
  } else {
    for(const unit of ['us','si']) for(const [line,saturation] of [[0,0],[0,10],[10,0],[-100,300],[300,-100],[50.5,40.25]]) {
      x.elements.unit.value=unit;x.elements.lineTemperature.value=String(line);x.elements.saturationTemperature.value=String(saturation);x.calculate();
      const delta=type==='superheat'?line-saturation:saturation-line;
      eq(x.labels['[data-difference-unit]'].textContent,unit==='si'?'°C difference':'°F difference','selected result unit for Copy/Print');
      ok(Math.abs(numeric(x.outputs.difference.value)-delta)<0.0051,'signed/zero/fractional temperature difference');
      ok(Math.abs(numeric(x.outputs.kelvin.value)-(unit==='si'?delta:delta*5/9))<0.0051,'temperature interval conversion');
      if(delta<0)ok(/negative/i.test(x.message.textContent),'negative difference keeps review warning');
      if(delta===0)ok(/equal/i.test(x.message.textContent),'zero difference is valid');
    }
  }
}
console.log('PASS: '+checks+' Refrigeration validation/conversion assertions across three maintained Tools.');
