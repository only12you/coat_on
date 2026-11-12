/* 결함·등급 일관성 + 진단 기록 확장 점검 (v593 A1·A2)  실행: node tools/dge-check.js [주소] */
const {chromium}=require('playwright');const URL=process.argv[2]||'http://localhost:8768/index.html';
(async()=>{const b=await chromium.launch(),p=await b.newPage({viewport:{width:390,height:800}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(URL);await p.waitForTimeout(2500);
const R=await p.evaluate(async()=>{const o=[],ok=(n,v,d)=>o.push([n,!!v,d||'']);const E=window.DGE;ok('DGE 로드',E);if(!E)return o;
 ok('결함 13종 · 열화5/품질6/외관2',E.DEF.length==13&&E.DEF.filter(x=>x[2]=='d').length==5&&E.DEF.filter(x=>x[2]=='q').length==6&&E.DEF.filter(x=>x[2]=='a').length==2);
 const S=window.DIAGSRC,kb=(S.match(/var K=\[([^\]]*)\]/)||[])[1],kx=(S.match(/KX=\[([^\]]*)\]/)||[])[1];const ks=(kb+','+kx).replace(/'/g,'').split(',').sort().join();
 ok('진단 앱 결함 키와 일치',ks==E.DEF.map(x=>x[0]).sort().join(),ks);
 /* 원래 점수식과 동일한지 */
 const ref=it=>{const s=[0,0,1,1,2,2];return Math.round((s[it.rust.g]+s[it.peel.g]+s[it.crack.g]+Math.min(2,(it.rust.pct+it.peel.pct)/30))*10)/10};
 let bad=0;for(let i=0;i<3000;i++){const mk=()=>({g:Math.floor(Math.random()*6),pct:Math.round(Math.random()*600)/10});const it={rust:mk(),peel:mk(),crack:mk()};if(ref(it)!==E.score(it))bad++}
 ok('점수식 기존과 동일(3000건)',bad==0,bad);
 let b2=0;for(let sc=0;sc<=8;sc+=.1){const L=E.level(sc),r=sc>=6?2:sc>=3?1:0,k=sc>=6?.78:sc>=3?.9:1;if(L.i!==r||L.k!==k)b2++}ok('수준·보정계수 기존과 동일',b2==0,b2);
 /* 진단 화면 안의 함수와 같은 결과 */
 const f=document.createElement('iframe');f.srcdoc=S;f.style.cssText='position:fixed;left:-9999px;width:400px;height:600px';document.body.appendChild(f);await new Promise(r=>f.onload=r);await new Promise(r=>setTimeout(r,500));
 const w=f.contentWindow;let b3=0;for(let i=0;i<500;i++){const mk=()=>({g:Math.floor(Math.random()*6),pct:Math.round(Math.random()*600)/10});const r={items:{rust:mk(),peel:mk(),crack:mk()}};const sc=w.score(r);if(sc!==E.score(r.items))b3++;const l=w.lvl(sc),L=E.level(sc);if(l[0]!==L.t||l[2]!==L.k)b3++}
 ok('진단 화면 점수·수준이 DGE와 동일(500건)',b3==0,b3);f.remove();
 /* 신뢰·안전 */
 ok('수기·검수=A',E.trust({man:1})=='A'&&E.trust({ed:1,ai:1,cf:.2})=='A');
 ok('AI 신뢰도 A/B/C',E.trust({ai:1,cf:.9})=='A'&&E.trust({ai:1,cf:.7})=='B'&&E.trust({ai:1,cf:.3})=='C');
 ok('규칙기반·미검수=C',E.trust({})=='C'&&E.trust({ai:0,cf:.99})=='C');
 ok('안전관련: 균열·박리 3등급 이상',E.safety('crack',{g:3})&&E.safety('peel',{g:5})&&!E.safety('crack',{g:2})&&!E.safety('rust',{g:5}));
 ok('LCC 반영은 열화형만',E.lccUse('rust')&&!E.lccUse('sag')&&!E.lccUse('stain'));
 const sm=E.summary({rust:{done:true,g:2,pct:3,ai:1,cf:.9},crack:{done:true,g:4,pct:2,ai:1,cf:.9},sag:{done:true,g:1,pct:1},stain:{done:false}});
 ok('요약: 군별 분류·전문가 확인 목록',sm.d.length==2&&sm.q.length==1&&sm.a.length==0&&sm.need.includes('crack')&&sm.need.includes('sag')&&!sm.need.includes('rust'),JSON.stringify(sm.need));
 /* LCC 연결 + 이력 */
 const X=window.LCCX;const A0=X.diagInfo().hist.length;
 X.diagApply({id:901,name:'t',date:1000,sc:4,k:.9,items:{rust:{pct:3,g:2,done:true},crack:{pct:.3,g:2,done:true,ai:1,cf:.8},sag:{pct:2,g:2,done:true}}});
 let I=X.diagInfo();ok('구형 형식도 적용(v 부여)',I.dg&&I.dg.v==2&&I.dg.sc==4);
 X.diagApply({id:902,name:'t2',date:2000,sc:7,k:.78,items:{rust:{pct:9,g:3,done:true,man:1}}});
 X.diagApply({id:901,name:'t',date:1000,sc:5,k:.9,items:{rust:{pct:4,g:2,done:true}}});
 I=X.diagInfo();const h=I.hist;ok('이력 누적·같은 id는 갱신',h.length==A0+2&&h.filter(x=>x.id==901).length==1&&h.find(x=>x.id==901).sc==5,h.length);
 ok('이력 날짜순',h.every((x,i)=>!i||h[i-1].d<=x[i>=0?'d':'d']));
 ok('이력에 결함별 값·신뢰도 보존',h.find(x=>x.id==902).c.rust.p==9&&h.find(x=>x.id==902).c.rust.g==3);
 for(let i=0;i<20;i++)X.diagApply({id:1000+i,date:3000+i,sc:1,k:1,items:{}});ok('이력 최대 12건',X.diagInfo().hist.length==12);
 return o});
let bad=0;R.forEach(([n,v,d])=>{console.log((v?'통과 ':'실패 ')+n+(v?'':'  '+d));if(!v)bad++});
if(errs.length){console.log('스크립트 오류',errs.slice(0,3));bad++}
console.log(bad?'\n실패 '+bad+'건':'\n전체 통과');await b.close();process.exit(bad?1:0)})();
