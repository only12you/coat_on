// CoatOn 스모크 테스트: 모든 주요 화면이 열리고, 스크립트 오류와 가로 넘침이 없는지 확인
// 사용: 앱 폴더에서 `python3 -m http.server 8768` 실행 후  `node tools/smoke.js [주소]`  (playwright 필요)
const {chromium}=require('playwright');
const URL=process.argv[2]||'http://localhost:8768/index.html';
const SCREENS=[
 ['홈',()=>hqDash(),'#hqd'],['일위대가표',()=>T(0),null],['제품DB',()=>T(1),null],['도장시스템',()=>{window.SYM='sys';T(3)},null],
 ['사양DB',()=>{window.SYM='db';window.SYK=1;T(3);window.SYK=0},null],['충진',()=>T(8),null],['LCC',()=>T(9),null],
 ['공동주택 견적',()=>hqOpen(),'#hq'],['단지DB 검색',()=>aptDbOpen(),'#aptdb'],['사용설명서(앱)',()=>helpOpen(),'#ugp'],
 ['사용설명서(iframe)',()=>mnOpen(),'#mnp'],['설정',()=>openSettings(),null],
 ['사양 수정',()=>{window.SYM='db';window.SYK=1;T(3);window.SYK=0;if(!syLibGet().length)syLibSet([{name:'테스트',scope:'x',items:[{lb:'하도',n:'A',dft:50}],ts:1}]);syEdOpen(0)},'#syed'],
];
(async()=>{const b=await chromium.launch(),c=await b.newContext({viewport:{width:390,height:844}}),p=await c.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,120)));
 await p.goto(URL);await p.waitForTimeout(2500);
 await p.evaluate(()=>{document.getElementById('splash')?.remove()});await p.getByText('확인했습니다').click().catch(()=>0);
 let fail=0;
 for(const [name,fn,root] of SCREENS){
  const before=errs.length;
  await p.evaluate(()=>{document.querySelectorAll('#hq,#hqd,#aptdb,#ugp,#mnp,#syed,#sypk,.pqs').forEach(e=>e.remove());document.documentElement.classList.remove('pdlock')});
  let opened=true;try{await p.evaluate(new Function('return ('+fn.toString()+')()'))}catch(e){opened=false;errs.push(name+': '+e.message.slice(0,80))}
  await p.waitForTimeout(1500);
  const r=await p.evaluate(root=>({ok:root?!!document.querySelector(root):true,ov:document.documentElement.scrollWidth>innerWidth+1||document.body.scrollWidth>innerWidth+1}),root);
  const bad=!opened||!r.ok||r.ov||errs.length>before;if(bad)fail++;
  console.log((bad?'FAIL ':'ok   ')+name+(r.ov?' [가로넘침]':'')+(!r.ok?' [열리지 않음]':'')+(errs.length>before?' [오류: '+errs.slice(before).join(' | ')+']':''));
 }
 console.log(fail?`\n실패 ${fail}건`:'\n전체 통과 ('+SCREENS.length+'개 화면, 스크립트 오류 0건)');
 await b.close();process.exit(fail?1:0)})();
