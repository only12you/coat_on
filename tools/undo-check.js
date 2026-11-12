// 일위대가표 "전체 초기화" 후 10초 되돌리기 검사
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch(),p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(process.argv[2]||'http://localhost:8768/index.html');await p.waitForTimeout(2500);await p.evaluate(()=>document.getElementById('splash')?.remove());await p.getByText('확인했습니다').click().catch(()=>0);
 await p.evaluate(()=>{T(0);S.area='777';S.coats=[{n:'가짜',dft:50}];sv();cards()});
 await p.evaluate(()=>clr());await p.waitForTimeout(300);await p.locator('#py').click();await p.waitForTimeout(500);
 const cleared=await p.evaluate(()=>S.area);const bar=await p.evaluate(()=>!!document.getElementById('undobar'));
 await p.screenshot({path:'u_undo.png'});
 await p.locator('#undobar button').click();await p.waitForTimeout(500);
 const back=await p.evaluate(()=>({a:S.area,c:S.coats[0].n,bar:!!document.getElementById('undobar')}));
 console.log('지운 뒤 면적',cleared,'/ 막대',bar,'/ 되돌린 뒤',JSON.stringify(back),'/ 오류',errs);
 const ok=cleared=='1'&&bar&&back.a=='777'&&back.c=='가짜'&&!back.bar&&!errs.length;console.log(ok?'통과':'실패');await b.close();process.exit(ok?0:1)})();
