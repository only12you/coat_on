const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch(),c=await b.newContext({viewport:{width:390,height:844}}),p=await c.newPage();
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://localhost:8768/index.html');await p.waitForTimeout(2500);
await p.evaluate(()=>document.getElementById('splash')?.remove());await p.getByText('확인했습니다').click().catch(()=>0);
console.log('check',JSON.stringify(await p.evaluate(()=>CODATA.check().map(d=>d.id+':'+(d.ok?'ok':'BAD')+':'+d.count))));
console.log('schema',await p.evaluate(()=>CODATA.schema()));
await p.evaluate(()=>{const s=document.createElement('div');s.id='bk_st';document.body.appendChild(s)});
// newer schema refused
await p.evaluate(async()=>{await bkRestore(new File([JSON.stringify({app:'CoatOn',schema:9,db:[]})],'n.json'))});
console.log('newer:',await p.evaluate(()=>document.getElementById('bk_st').textContent));
// old format accepted (shows confirm)
await p.evaluate(async()=>{await bkRestore(new File([JSON.stringify({app:'CoatOn',date:'2026-01-01',db:[{n:'옛백업제품'}]})],'o.json'))});
await p.waitForTimeout(500);console.log('old confirm shown:',await p.evaluate(()=>!!document.getElementById('py')));
await p.locator('#py').click();await p.waitForTimeout(800);
console.log('merged:',await p.evaluate(()=>DB.some(x=>x.n=='옛백업제품')),'errs',errs);await b.close()})();
