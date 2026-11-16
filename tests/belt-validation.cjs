// Dependency-free fixtures; native browser, clipboard and Print QA are separate.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'assets/js/belt-drive.js'), 'utf8');
const files = ['fan-pulley-rpm-calculator', 'motor-sheave-size-calculator', 'v-belt-length-calculator', 'fan-law-calculator'];
let checks = 0;
const eq = (a,b,label) => { assert.equal(a,b,label); checks++; };
const ok = (value,label) => { assert.ok(value,label); checks++; };
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(m => [m[1],m[2]]));
function fixture(file) {
  const html = fs.readFileSync(path.join(root, 'tool', file+'.html'), 'utf8');
  const controls = {}, defaults = {}, outputs = {}, events = {}, note = {textContent:''};
  for (const match of html.matchAll(/<input\b[^>]*>/g)) {
    const a=attrs(match[0]);
    controls[a.name]={value:a.value, min:Number(a.min), max:Number(a.max), step:a.step, required:/\brequired\b/.test(match[0])};
    defaults[a.name]=a.value;
  }
  const options=[...html.matchAll(/<option value="([^"]+)"/g)].map(m=>m[1]);
  const select={value:options[0],events:{},addEventListener(k,fn){this.events[k]=fn;}};
  controls.unit=select;
  for (const m of html.matchAll(/<output data-result="([^"]+)"/g)) outputs[m[1]]={value:'',nextElementSibling:{textContent:''}};
  const form={dataset:{beltDrive:html.match(/data-belt-drive="([^"]+)"/)[1]},elements:controls,
    checkValidity(){return Object.entries(controls).every(([name,e])=>name==='unit'||(e.value===''?!e.required:Number.isFinite(Number(e.value))&&Number(e.value)>=e.min&&Number(e.value)<=e.max&&(e.step==='any'||Number.isInteger(Number(e.value)))));},
    querySelectorAll(s){return s==='[data-result]'?Object.values(outputs):s==='select'?[select]:[];},
    querySelector(s){return s==='[data-note]'?note:outputs[s.match(/data-result="([^"]+)"/)?.[1]];},
    addEventListener(k,fn){events[k]=fn;}};
  vm.runInNewContext(source,{document:{querySelectorAll:()=>[form]},window:{setTimeout:fn=>fn()},Math,Number});
  return {controls,outputs,note,options,calculate(){events.submit({preventDefault(){}});},
    input(name,value){controls[name].value=String(value);events.input();},
    unit(value){select.value=value;events.input();select.events.change();},
    reset(){Object.entries(defaults).forEach(([k,v])=>controls[k].value=v);select.value=options[0];events.reset();},
    empty(){return Object.values(outputs).every(e=>e.value==='');},
    result(name){return Number(outputs[name].value.replaceAll(',',''));}};
}
// Must fail on the pre-fix script: valid edits retained a copyable old result.
const repro=fixture(files[0]);repro.input('motorRpm',2000);ok(repro.empty(),'editing a valid input invalidates all old results');
for (const file of files) {
  const x=fixture(file);ok(!x.empty(),'initial valid example '+file);
  const fields=Object.keys(x.controls).filter(k=>k!=='unit');
  for (const unit of x.options) for (const name of fields) {
    const c=x.controls[name];
    for (const bad of ['', '0', '-1', 'NaN', 'Infinity', '1e309', String(c.min/2), String(c.max+1)]) {
      x.reset();x.unit(unit);x.input(name,bad);
      ok(x.empty(),'input clears invalid output '+file+' '+name+' '+bad);
      x.unit(unit===x.options[0]?x.options[1]:x.options[0]);
      ok(x.empty(),'unit change must not bypass native bounds '+file+' '+name+' '+bad);
      x.calculate();ok(x.empty(),'submit also enforces validity');ok(x.note.textContent.length>0,'invalid guidance');
    }
    x.reset();x.unit(unit);x.input(name,x.controls[name].value);ok(x.empty(),'valid edit invalidates cached result');x.calculate();ok(!x.empty(),'explicit Calculate restores current result');
  }
  x.reset();ok(x.empty(),'Reset clears result');x.calculate();ok(!x.empty(),'Calculate after Reset');
  x.unit('unsupported');ok(x.empty(),'unsupported unit does not fall through');
}
const rpm=fixture(files[0]);rpm.input('motorRpm',2000);rpm.calculate();eq(rpm.result('fanRpm'),1000,'2000*4/8');
rpm.unit('mm');rpm.input('motorRpm',1750);rpm.input('motorSheave',101.6);rpm.input('fanSheave',203.2);rpm.calculate();eq(rpm.result('fanRpm'),875,'equivalent metric speed');eq(rpm.result('beltSpeed'),9.31,'metric belt speed');eq(rpm.outputs.beltSpeed.nextElementSibling.textContent,'m/s','metric speed unit');
const motor=fixture(files[1]);motor.calculate();ok(Math.abs(motor.result('motorSheave')-4.571)<.001,'8*1000/1750 driver diameter');motor.unit('mm');motor.input('fanSheave',203.2);motor.calculate();eq(motor.result('motorSheave'),116.114,'metric target diameter');eq(motor.outputs.motorSheave.nextElementSibling.textContent,'mm','metric diameter label');
const belt=fixture(files[2]);for(const [k,v]of Object.entries({smallSheave:4,largeSheave:8,centerDistance:20}))belt.input(k,v);belt.calculate();eq(belt.result('length'),59.05,'independent open-belt example');eq(belt.result('smallWrap'),168.5,'small wrap');eq(belt.result('largeWrap'),191.5,'large wrap');eq(belt.result('ratio'),2,'geometry ratio');
belt.input('centerDistance',2);belt.calculate();ok(belt.empty(),'infeasible open-belt geometry rejected');
const fan=fixture(files[3]);eq(fan.result('airflow2'),5500,'10% speed airflow');eq(fan.result('pressure2'),1.815,'square pressure');eq(fan.result('power2'),6.655,'cube brake power');eq(fan.result('powerChange'),33.1,'power percent');
fan.unit('si');for(const[k,v]of Object.entries({airflow1:1000,pressure1:100,power1:2}))fan.input(k,v);fan.calculate();eq(fan.result('airflow2'),1100,'SI airflow scaling');eq(fan.result('pressure2'),121,'SI pressure scaling');eq(fan.result('power2'),2.662,'SI power scaling');eq(fan.outputs.power2.nextElementSibling.textContent,'kW','SI power label');
fan.reset();fan.input('rpm2',640);fan.calculate();eq(fan.result('speedChange'),-20,'speed reduction allowed');eq(fan.result('powerChange'),-48.8,'signed power change allowed');
const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
const latest=home.match(/<section class="section home-latest" aria-labelledby="latest-title">[\s\S]*?<\/section>/)[0];
for(const file of files){
  const html=fs.readFileSync(path.join(root,'tool',file+'.html'),'utf8');
  const date=html.match(/name="updated_date" content="([^"]+)"/)[1];
  const entry=[...sitemap.matchAll(/<url>[\s\S]*?<\/url>/g)].map(m=>m[0]).find(s=>s.includes('/tool/'+file+'.html</loc>'));
  eq(entry?.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1],date,'sitemap follows maintained Tool update '+file);
  eq([...latest.matchAll(/<a\b[^>]*href="([^"]+)"/g)].filter(m=>m[1]==='/tool/'+file+'.html').length,1,'one current Latest entry '+file);
}
const homeEntry=[...sitemap.matchAll(/<url>[\s\S]*?<\/url>/g)].map(m=>m[0]).find(s=>s.includes('<loc>https://hvactoolshub.com/</loc>'));
eq(homeEntry?.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1],home.match(/name="updated_date" content="([^"]+)"/)[1],'Home sitemap date');
console.log('PASS: '+checks+' Belt validation, stale-result and formula assertions across four Tools.');
