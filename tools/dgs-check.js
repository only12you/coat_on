/* 진단 기반 보수 시나리오 점검 (v593 A3)  실행: node tools/dgs-check.js [주소] */
const {chromium}=require('playwright');const URL=process.argv[2]||'http://localhost:8768/index.html';
(async()=>{const b=await chromium.launch(),p=await b.newPage({viewport:{width:390,height:800}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(URL);await p.waitForTimeout(2500);
const R=await p.evaluate(()=>{const o=[],ok=(n,v,d)=>o.push([n,!!v,d===undefined?'':String(d)]);const X=LCCX,G=DGS;ok('DGS 로드',G&&X.rs&&X.judge);
 const a=X.cur();const resetDg=()=>{delete a.dg;a.dgOn=true;a.age=12};resetDg();
 /* 진단 없음 */
 let r=G.run(a);ok('진단 없으면 국부 보수 제외·사유 표시',!r.sc[0].ok&&r.sc[0].note.includes('진단')&&r.caveats.some(c=>c.includes('진단')),r.sc[0].note);
 ok('3개 시나리오 구조',r.sc.length==3&&['spot','full','upg'].join()==r.sc.map(s=>s.id).join());
 ok('추천은 실행 가능한 안',r.sc.find(s=>s.id==r.best).ok);
 /* 경미한 결함 */
 const dg=(it,id)=>({id:id||1,name:'t',date:1,sc:2,k:1,items:it});
 X.diagApply(dg({rust:{pct:2,g:1,done:true,ai:1,cf:.92},peel:{pct:.5,g:1,done:true,ai:1,cf:.9},crack:{pct:0,g:1,done:true,ai:1,cf:.9}}));
 r=G.run(a);const sp=r.sc[0];
 ok('경미 결함: 국부 보수 가능·면적비 하한~상한',sp.ok&&sp.af>=.05&&sp.af<=.4,sp.af);
 ok('신뢰 등급 A',r.trust=='A',r.trust);
 ok('국부 보수 즉시비용 < 전면 재도장 1회 비용',sp.now>0&&sp.now<X.all(a).m[0].sc.init*a.ar/1000,sp.now);
 /* 범위 */
 ok('모든 시나리오 최소≤기준≤최대',r.sc.every(s=>s.lo<=s.tot+1e-6&&s.tot<=s.hi+1e-6),r.sc.map(s=>[Math.round(s.lo),Math.round(s.tot),Math.round(s.hi)].join('/')).join(' | '));
 ok('범위 폭: 신뢰 낮을수록 넓다',(()=>{X.diagApply(dg({rust:{pct:2,g:1,done:true},peel:{pct:.5,g:1,done:true},crack:{pct:0,g:1,done:true}},2));const rc=G.run(a);return(rc.sc[1].hi-rc.sc[1].lo)>(r.sc[1].hi-r.sc[1].lo)&&rc.trust=='C'})());
 /* 넓은 결함 → 국부 불가 */
 X.diagApply(dg({rust:{pct:30,g:4,done:true,ai:1,cf:.9},peel:{pct:15,g:3,done:true,ai:1,cf:.9}},3));r=G.run(a);
 ok('넓은 결함: 국부 보수 불가 + 안전 확인',!r.sc[0].ok&&r.need.includes('peel'),r.sc[0].note);
 ok('추천이 국부 보수가 아님',r.best!='spot');
 /* 에스컬레이션 0 → 합계가 단순 곱 */
 const rs=X.rs();const e0=rs.esc;rs.esc=0;r=G.run(a);const m0=X.all(a).m[0];const n=G.flow(m0.sc.init,a.ar,r.sc[1].first,m0.c,rs.hz,0).ev.length;
 ok('물가 0%: 전면 재도장 총비용=1회비용×횟수',Math.abs(r.sc[1].tot-m0.sc.init*a.ar*n/1000)<1e-6,n);rs.esc=e0;
 /* 물가상승 단조 */
 rs.esc=0;const t0=G.run(a).sc[1].tot;rs.esc=3;const t3=G.run(a).sc[1].tot;ok('물가상승률↑ → 총비용↑',t3>t0);rs.esc=e0;
 /* 요구 내구성 상향 시 현재 사양 미충족 경고 */
 const d0=a.dur;a.dur='VH';r=G.run(a);ok('요구 내구성 VH: 현재 사양 미충족이면 경고',r.sc[1].meets||r.sc[1].note.includes('내구성'));a.dur=d0;
 /* 진단 끄기 */
 a.dgOn=false;r=G.run(a);ok('진단 반영 끄면 진단 없음과 동일 취급',!r.has&&!r.sc[0].ok);a.dgOn=true;
 /* 사용자 조정값 */
 X.diagApply(dg({rust:{pct:2,g:1,done:true,ai:1,cf:.92}},4));a.dgsP={spotMax:.01};r=G.run(a);ok('자산별 기준 덮어쓰기(a.dgsP)',!r.sc[0].ok);delete a.dgsP;
 /* 보고서 카드 */
 a.dgOn=true;X.diagApply(dg({rust:{pct:2,g:1,done:true,ai:1,cf:.92}},5));let h=DGS.card(a);ok('보고서 카드: 진단 있으면 3개 시나리오 행+신뢰 배지',(h.match(/class="dgxr/g)||[]).length==3&&/dgxt [ABC]/.test(h));
 a.dgOn=false;ok('보고서 카드: 진단 끄면 표시 안 함',DGS.card(a)==='');a.dgOn=true;
 a.n='<b>x</b>';ok('보고서 카드: 자산명 이스케이프',!DGS.card(a).includes('<b>x</b>'));
 /* 기존 LCC 계산 불변 */
 ok('기존 LCC 3사양 계산 그대로',X.all(a).m.length==3&&X.all(a).m.every(m=>m.tot>0));
 return o});
let bad=0;R.forEach(([n,v,d])=>{console.log((v?'통과 ':'실패 ')+n+(v?'':'  '+d));if(!v)bad++});
if(errs.length){console.log('스크립트 오류',errs.slice(0,3));bad++}
console.log(bad?'\n실패 '+bad+'건':'\n전체 통과');await b.close();process.exit(bad?1:0)})();
