// Dependency-free DOM fixtures. Browser/native validity and clipboard QA remain separate.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const coreSource = fs.readFileSync(path.join(root, 'assets/js/btu-calculator.js'), 'utf8');
const clusterSource = fs.readFileSync(path.join(root, 'assets/js/btu-cluster.js'), 'utf8');
const element = value => ({value:String(value), textContent:'', events:{},
  checkValidity() {return this.value.trim() !== '' && Number.isFinite(Number(this.value)) && Number(this.value) >= 0.000001;},
  addEventListener(event, listener) {this.events[event] = listener;}
});
function core() {
  const value = element(12000), unit = element('btu'), message = element('');
  const outputs = Object.fromEntries(['btu','watt','kw','ton'].map(key => [key,element('')]));
  const form = element('');
  const document = {querySelector(selector) {
    if (selector === '[data-btu-form]') return form;
    if (selector === '#capacity-value') return value;
    if (selector === '#capacity-unit') return unit;
    if (selector === '[data-btu-message]') return message;
    return outputs[selector.match(/data-result="([^"]+)"/)?.[1]];
  }};
  vm.runInNewContext(coreSource, {document,Intl,setTimeout:callback=>callback()});
  return {value,unit,message,outputs,calculate() {form.events.submit({preventDefault(){}});},
    reset() {value.value='12000';unit.value='btu';form.events.reset();}};
}
function cluster(mode, defaults) {
  const inputs = defaults.map(element), output = element(''), secondary = element(''), message = element('');
  const form = {dataset:{btuCluster:mode},events:{},querySelectorAll:()=>inputs,
    querySelector:selector=>selector==='[data-output]'?output:selector==='[data-secondary]'?secondary:message,
    addEventListener(event, callback) {this.events[event]=callback;}
  };
  vm.runInNewContext(clusterSource, {document:{querySelectorAll:()=>[form]},Intl,setTimeout:callback=>callback()});
  return {inputs,output,secondary,message,calculate() {form.events.submit({preventDefault(){}});},
    reset() {inputs.forEach((input,index)=>{input.value=String(defaults[index]);});form.events.reset();}};
}
let checks=0;
const equal=(a,b,label)=>{assert.equal(a,b,label);checks++;};
const ok=(condition,label)=>{assert.ok(condition,label);checks++;};
const number=text=>Number(text.replaceAll(',',''));
const c=core();
equal(c.outputs.btu.value,'12,000','default BTU/h');
equal(c.outputs.watt.value,'3,516.85','default thermal watts');
equal(c.outputs.kw.value,'3.517','default thermal kW');
equal(c.outputs.ton.value,'1','default tons');
for (const [unit,value,btu] of [['btu',24000,24000],['ton',1.5,18000],['kw',1,3412.141633],['watt',1000,3412.141633]]) {
  c.value.value=String(value);c.unit.value=unit;c.calculate();
  ok(Math.abs(number(c.outputs.btu.value)-btu)<0.01, unit+' independent conversion');
}
for (const unit of ['btu','watt','kw','ton']) for (const value of ['', '0','-1','NaN','Infinity','1e309','0.0000001']) {
  c.reset();c.unit.value=unit;c.value.value=value;c.value.events.input();
  for (const output of Object.values(c.outputs)) equal(output.value,'',unit+' clear '+value);
  ok(c.message.textContent.length>0,'validation message');
  c.reset();equal(c.outputs.btu.value,'12,000','reset restores default');
}
for (const unit of ['watt','kw','ton']) {
  c.reset();c.value.value='1e308';c.unit.value=unit;c.unit.events.change();
  for (const output of Object.values(c.outputs)) equal(output.value,'','core '+unit+' normalized overflow');
  ok(/unsupported|range/i.test(c.message.textContent),'overflow explanation');
}
c.reset();c.value.value='1e308';c.calculate();
ok(Object.values(c.outputs).every(output=>output.value && !/∞|NaN|Infinity/.test(output.value)),'large finite BTU/h remains supported');
c.reset();c.unit.value='unknown';c.calculate();
ok(Object.values(c.outputs).every(output=>output.value===''),'unknown unit clears results');
const modes=[['btu-to-tons',[12000],'1'],['tons-to-btu',[1],'12,000'],['per-square-foot',[12000,600],'20'],['room',[500,20],'10,000']];
for (const [mode,defaults,expected] of modes) {
  const x=cluster(mode,defaults);equal(x.output.value,expected,mode+' default');
  for (let index=0;index<defaults.length;index++) for (const bad of ['', '0','-1','NaN','Infinity','1e309','0.0000001']) {
    x.reset();x.inputs[index].value=bad;x.inputs[index].events.input();
    equal(x.output.value,'',mode+' invalid output');equal(x.secondary.textContent,'',mode+' stale secondary cleared');
    ok(x.message.textContent.length>0,mode+' invalid explanation');
    x.reset();equal(x.output.value,expected,mode+' reset');
  }
}
for (const [mode,values] of [['tons-to-btu',[1e308]],['room',[1e200,1e200]],['per-square-foot',[1e308,0.000001]]]) {
  const x=cluster(mode,values);equal(x.output.value,'',mode+' overflow');
  equal(x.secondary.textContent,'',mode+' secondary cleared');ok(/range|unsupported/i.test(x.message.textContent),mode+' arithmetic explanation');
}
for (const [mode,values] of [['btu-to-tons',[1e308]],['room',[1e150,1e150]],['per-square-foot',[1e200,1e100]]]) {
  const x=cluster(mode,values);ok(x.output.value && !/∞|NaN|Infinity/.test(x.output.value+x.secondary.textContent),mode+' large finite remains supported');
}
for (const [mode,values,expected] of [['btu-to-tons',[18000],'1.5'],['tons-to-btu',[1.5],'18,000'],['per-square-foot',[12000,500],'24'],['room',[125.5,21.5],'2,698']]) equal(cluster(mode,values).output.value,expected,mode+' fractional fixture');
equal(cluster('tons-to-btu',[1.5]).secondary.textContent,'5.275 kW of capacity','1.5 ton thermal kW example');
ok(fs.readFileSync(path.join(root,'tool/tons-to-btu-calculator.html'),'utf8').includes('5.275 kW'),'prose matches three-decimal result');
console.log('PASS: '+checks+' BTU validation/conversion assertions across five maintained pages.');
