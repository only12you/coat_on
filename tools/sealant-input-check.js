const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch(),p=await(await b.newContext({viewport:{width:390,height:844}})).newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.goto('http://localhost:8768/index.html');await p.waitForTimeout(2500);await p.evaluate(()=>document.getElementById('splash')?.remove());await p.getByText('확인했습니다').click().catch(()=>0);
await p.evaluate(()=>T(0));await p.waitForTimeout(600);await p.evaluate(()=>{S.sb={seal:1};try{sv()}catch(e){};res()});await p.waitForTimeout(400);
await p.evaluate(()=>{document.querySelector('#sbx').scrollIntoView()});const inp=await p.$('#sbx .sbp input');console.log('입력칸',!!inp);
await inp.click();await p.keyboard.type('12500',{delay:60});
const o=await p.evaluate(()=>({v:document.querySelector('#sbx .sbp input').value,focus:document.activeElement===document.querySelector('#sbx .sbp input'),price:FM.price}));console.log(JSON.stringify(o));
console.log('오류',er);await b.close()})();
