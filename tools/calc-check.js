// 계산 일치 검사: 같은 입력에 대해 ① 일위대가표 계산 ② LCC 계산 ③ 독립 기준식(손계산 공식)이 모두 같은지 확인
const {chromium}=require('playwright');
const URL=process.argv[2]||'http://localhost:8768/index.html';
(async()=>{const b=await chromium.launch(),p=await (await b.newContext()).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL);await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{
  let seed=20261108;const rnd=()=>(seed=(seed*1664525+1013904223)%4294967296)/4294967296,pick=a=>a[Math.floor(rnd()*a.length)],R=(a,b)=>Math.round((a+rnd()*(b-a))*10)/10;
  const out={n:0,bad:[],maxRel:0};
  for(let i=0;i<300;i++){
   const kg=rnd()<.4,pk=pick([4,16,18,20]),svr=R(30,100),dft=pick([30,50,60,80,100,200,300]),loss=pick([0,5,10,15,20]),tr=pick([0,0,5,10]),price=pick([8000,15000,32000,45000]),tp=pick([0,3000,5000]),ts=pick([16,18,20]),sg=kg?R(1.1,1.9):0;
   const prod={n:'__t'+i,g:'t',svr,dft,mk:pk,pk,un:kg?'kg':'L',sg,ts,tn:'',tc:'',tr:0};DB.push(prod);
   const c1={n:prod.n,dft,svr,loss,tr,price,tprice:tp};
   const o=calc(c1),mat=o.reduce((x,y)=>x+y.amt,0);
   const l=LCCX.cc({d:dft,vs:svr,ls:loss,th:tr,price,tp,pk,sg,ts,un:kg?'kg':'L'});
   // 독립 기준식
   const fm=kg?sg:1,thv=dft/(svr*10),acv=thv/(1-loss/100),ac=acv*fm,ref=ac*price/pk+acv*(tr/100)*(tp/ts);
   DB.pop();
   const A=mat,B=l.cost,C=ref,rel=Math.max(Math.abs(A-C),Math.abs(B-C))/Math.max(1,Math.abs(C));out.maxRel=Math.max(out.maxRel,rel);out.n++;
   if(rel>1e-9||Math.abs(o[0].ac-l.ac)>1e-9)out.bad.push({i,A,B,C,ac1:o[0].ac,ac2:l.ac,kg,tr,dft,svr,loss})}
  out.bad=out.bad.slice(0,5);return out});
 console.log('검사 건수',r.n,'/ 불일치',r.bad.length,'/ 최대 상대오차',r.maxRel.toExponential(2));if(r.bad.length)console.log(JSON.stringify(r.bad,null,1));console.log('오류',errs);await b.close();process.exit(r.bad.length||errs.length?1:0)})();
