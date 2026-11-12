const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await p.goto('http://localhost:8187/index.html');await p.waitForTimeout(1500);await p.evaluate(()=>{document.querySelector('#splash')?.remove()});
const bt=await p.$('text=확인했습니다');if(bt)await bt.click();
const pages=[['일위대가표',()=>T(0),'#v0'],['제품DB',()=>T(1),'#v1'],['홈',()=>T(2),'#vh'],['도장시스템',()=>T(3),'#v3'],['TDS',()=>T(4),'#v4'],['CSV',()=>T(5),'#v5'],['관리자',()=>T(7),'#v7'],['충진',()=>T(8),'#v8'],['LCC',()=>T(9),'#v9'],['비교',()=>T(10),'#v10'],['견적서',()=>est(),'#es'],['공동주택',()=>hqOpen(),'#hq'],['단지DB',()=>aptDbOpen(),'#aptdb']];
const out={};
for(const [n,f,sel] of pages){try{await p.evaluate(f);await p.waitForTimeout(700);
out[n]=await p.evaluate(sel=>{const R=document.querySelector(sel);if(!R)return 'none';const vis=e=>{const r=e.getBoundingClientRect();return r.width>8&&r.height>8&&r.top<844&&r.bottom>0};
const q=(a,fn)=>{const m={};[...R.querySelectorAll(a)].filter(vis).forEach(e=>{const k=fn(getComputedStyle(e),e);m[k]=(m[k]||0)+1});return Object.entries(m).sort((x,y)=>y[1]-x[1]).slice(0,3).map(([k,v])=>k+'×'+v).join(' ; ')};
const r1=x=>Math.round(parseFloat(x)*10)/10;
return {inp:q('input:not([type=checkbox]):not([type=radio]):not([type=file]),select',(c,e)=>'h'+Math.round(e.getBoundingClientRect().height)+' fs'+r1(c.fontSize)+' br'+r1(c.borderRadius)+' bd'+c.borderTopColor),
btn:q('button',(c,e)=>'h'+Math.round(e.getBoundingClientRect().height)+' fs'+r1(c.fontSize)+' br'+r1(c.borderRadius)),
card:q('div,section',(c,e)=>{const r=e.getBoundingClientRect();return (r.width>250&&r.height>40&&c.backgroundColor=='rgb(255, 255, 255)'&&parseFloat(c.borderRadius)>3)?'w'+Math.round(r.width)+' br'+r1(c.borderRadius)+' sh'+(c.boxShadow=='none'?'0':'1')+' bd'+(c.borderTopWidth):'-'}),
bg:getComputedStyle(R).backgroundColor}},sel)}catch(e){out[n]='err '+e.message.slice(0,60)}}
for(const k in out){console.log('## '+k);const o=out[k];if(typeof o=='string')console.log(o);else for(const x in o)console.log('  '+x+': '+o[x])}
await b.close()})()
