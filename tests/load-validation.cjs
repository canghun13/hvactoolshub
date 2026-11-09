// DOM fixtures are not native-browser validation, clipboard or Print proof.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'tool/hvac-load-calculator.html'),'utf8');
const source=fs.readFileSync(path.join(root,'assets/js/load.js'),'utf8');
let checks=0;
const eq=(a,b,label)=>{assert.equal(a,b,label);checks++;};
const ok=(a,label)=>{assert.ok(a,label);checks++;};
function fixture(){
  const inputs={},defaults={},events={},out={innerHTML:'',get innerText(){return this.innerHTML.replace(/<[^>]*>/g,' ').trim();}},message={textContent:''},copy={};
  for(const m of html.matchAll(/<input\b[^>]*>/g)){
    const a=Object.fromEntries([...m[0].matchAll(/([\w-]+)="([^"]*)"/g)].map(x=>[x[1],x[2]])),required=/\brequired\b/.test(m[0]);
    const el={value:a.value,events:{},checkValidity(){if(this.value==='')return !required;const n=Number(this.value);return Number.isFinite(n)&&n>=Number(a.min)&&n<=Number(a.max)&&(a.step==='any'||Number.isInteger(n));},addEventListener(k,f){this.events[k]=f;}};
    inputs[a.name]=el;defaults[a.name]=a.value;
  }
  inputs.unit={value:'ip',events:{},checkValidity(){return ['ip','si'].includes(this.value);},addEventListener(k,f){this.events[k]=f;}};
  const form={querySelectorAll:()=>Object.values(inputs),addEventListener(k,f){events[k]=f;}};
  const buttons={copy:{addEventListener(k,f){copy[k]=f;}},print:{addEventListener(){}}};
  const document={querySelector(s){return s==='[data-load-form]'?form:s==='[data-load-results]'?out:s==='[data-load-message]'?message:s==='[data-copy-results]'?buttons.copy:buttons.print;}};
  class FormData{entries(){return Object.entries(inputs).map(([k,el])=>[k,el.value]);}}
  const clipboard=[];
  vm.runInNewContext(source,{document,FormData,Intl,setTimeout:cb=>cb(),navigator:{clipboard:{async writeText(text){clipboard.push(text);}}},window:{print(){}}});
  return {inputs,out,message,clipboard,calculate(){events.submit({preventDefault(){}});},set(k,value){inputs[k].value=String(value);inputs[k].events.input();},reset(){for(const k in defaults)inputs[k].value=defaults[k];inputs.unit.value='ip';events.reset();},copy:()=>copy.click()};
}
async function main(){
  const first=fixture();first.set('height',0.5);eq(first.out.innerHTML,'','below-minimum height must clear all results');
  const x=fixture();ok(x.out.innerHTML.includes('0 BTU/h'),'documented zero components remain valid');
  const fields=Object.keys(x.inputs).filter(k=>k!=='unit');
  const max={area:1e6,height:100,outdoorDelta:150,envelope:1e7,solar:1e7,people:1e7,lights:1e7,equipment:1e7,outdoorAir:1e6,supplyDelta:100};
  for(const unit of ['ip','si'])for(const key of fields){
    const required=['area','height','supplyDelta'].includes(key);
    for(const bad of ['-1','NaN','Infinity','1e309',String(max[key]+1),...(required?['','0','0.5']:[])]){
      x.reset();x.inputs.unit.value=unit;x.set(key,bad);eq(x.out.innerHTML,'',`${unit} ${key} ${bad}`);ok(x.message.textContent.length>0,'invalid explanation');
      const copies=x.clipboard.length;await x.copy();eq(x.clipboard.length,copies,'invalid result cannot copy');
    }
    x.reset();x.inputs.unit.value=unit;x.set(key,max[key]);ok(x.out.innerHTML.length>0,'inclusive upper boundary '+key);ok(!/∞|Infinity|NaN/.test(x.out.innerHTML),'finite boundary '+key);
    if(!required){x.set(key,'');ok(x.out.innerHTML.length>0,'optional blank retains existing zero convention '+key);}
  }
  for(const key of ['envelope','solar','people','lights','equipment','outdoorAir']){
    x.reset();x.set(key,123.5);ok(x.inputs[key].checkValidity(),'continuous input has step=any '+key);ok(x.out.innerHTML.length>0,'fractional component calculates '+key);
  }
  x.reset();eq(x.out.innerHTML,'','Reset restores empty guidance state');x.calculate();ok(x.out.innerHTML.length>0,'Calculate after Reset');
  x.set('unit','unknown');eq(x.out.innerHTML,'','unsupported unit');
  x.reset();for(const [k,v]of Object.entries({envelope:1000,solar:200,people:100,lights:100,equipment:50,outdoorAir:100,outdoorDelta:20,supplyDelta:20}))x.set(k,v);
  const values=[...x.out.innerHTML.matchAll(/<strong>([\d,.]+) (?:BTU\/h|CFM)<\/strong>/g)].map(m=>Number(m[1].replaceAll(',','')));
  eq(values.length,3,'three primary results');
  ok(Math.abs(values[0]-3971.82124495)<0.051,'independent component cooling sum');eq(values[1],3160,'heating envelope plus outdoor sensible');
  ok(Math.abs(values[2]-3971.82124495/21.6)<0.051,'sensible airflow');
  await x.copy();ok(x.clipboard.at(-1).includes('3,971.8 BTU/h')&&x.clipboard.at(-1).includes('CFM'),'complete valid copy');
  x.reset();for(const [k,v]of Object.entries({unit:'si',area:100,height:2.5,outdoorAir:100,outdoorDelta:10,supplyDelta:10}))x.set(k,v);
  const si=[...x.out.innerHTML.matchAll(/<strong>([\d,.]+) (?:BTU\/h|CFM)<\/strong>/g)].map(m=>Number(m[1].replaceAll(',','')));
  const expected=1.08*100*0.5885778*18;
  ok(Math.abs(si[0]-expected)<0.051,'SI airflow and temperature-difference conversions');ok(Math.abs(si[2]-100*0.5885778)<0.051,'SI sensible CFM');
  ok(x.out.innerHTML.includes('8,828.7 ft3'),'SI geometry conversion');
  console.log('PASS: '+checks+' HVAC Load validation/conversion assertions.');
}
main().catch(error=>{console.error(error);process.exitCode=1;});
