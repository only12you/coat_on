const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await p.goto('http://localhost:8187/index.html');await p.waitForTimeout(1500);await p.evaluate(()=>{document.querySelector('#splash')?.remove()});
const bt=await p.$('text=확인했습니다');if(bt)await bt.click();
const L=[['0',()=>T(0)],['1',()=>T(1)],['3',()=>T(3)],['4',()=>T(4)],['5',()=>T(5)],['8',()=>T(8)],['10',()=>T(10)],['9',()=>T(9)],['hq',()=>hqOpen()],['apdb',()=>{aptDbOpen()}],['est',()=>est()]];
for(const [n,f] of L){await p.evaluate(f);await p.waitForTimeout(700);await p.screenshot({path:'s_'+n+'.png'})}
await b.close()})()
