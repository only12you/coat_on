/* DGE — 결함·등급 기준 한 곳 (v593 A2)
   진단 화면·LCC·보고서가 같은 결함 분류·점수·등급·신뢰도 기준을 쓰도록 모은 곳.
   ※ 수치 기준은 기존 앱 값 그대로입니다(결과 변화 없음). '잠정' 표시는 사내 기준 확정 전 값입니다. */
(function(){
/* 결함 13종: grp d=열화형(수명·LCC 반영), q=시공품질형, a=외관형 */
var DEF=[
 ['rust','녹','d'],['crack','균열','d'],['peel','박리','d'],['blis','블리스터','d'],['chalk','초킹','d'],
 ['hide','은폐불량','q'],['sag','흐름','q'],['cdev','색분리','q'],['bub','기포','q'],['dry','건조불량','q'],['wrink','주름','q'],
 ['stain','빗물자국','a'],['putty','퍼티자국','a']];
var GRP={d:'열화형',q:'시공품질형',a:'외관형'};
var NAME={},G={};DEF.forEach(function(x){NAME[x[0]]=x[1];G[x[0]]=x[2]});
/* 등급 → 점수 환산(기존 진단 점수식 그대로) */
var GS=[0,0,1,1,2,2];
function score(it){it=it||{};var g=function(k){return it[k]&&it[k].g||0},p=function(k){return+(it[k]&&it[k].pct)||0};
 var s=GS[g('rust')]+GS[g('peel')]+GS[g('crack')]+Math.min(2,(p('rust')+p('peel'))/30);return Math.round(s*10)/10}
/* 점수 → 열화 수준(0 낮음·1 보통·2 높음)과 현장진단 보정계수 k */
function level(sc){return sc>=6?{i:2,t:'높음',k:.78}:sc>=3?{i:1,t:'보통',k:.9}:{i:0,t:'낮음',k:1}}
/* 진단 등급 → LCC 열화 입력값(기존 diagApply 표 그대로) */
var CRACK=[0,.05,.2,.4,.8,1.2],PEEL=[0,.5,2,6,20,40];
function toB(it){var b={};it=it||{};
 if(it.rust&&it.rust.done)b[0]=+it.rust.pct||0;
 if(it.crack&&it.crack.done)b[1]=CRACK[it.crack.g]||0;
 if(it.peel&&it.peel.done)b[2]=PEEL[it.peel.g]||0;
 if(it.blis&&it.blis.done)b[3]=Math.min(5,it.blis.g||0);
 if(it.chalk&&it.chalk.done)b[4]=Math.min(5,it.chalk.g||0);return b}
/* 결과 신뢰 등급 — 잠정 기준(A 판정 활용 / B 범위 표시 / C 전문가 확인 전 참고) */
var TH={A:.85,B:.6};
function trust(x){x=x||{};
 if(x.ed||x.man)return'A';                         /* 전문가 수정·수기 측정 */
 if(x.ai&&x.cf!=null)return x.cf>=TH.A?'A':x.cf>=TH.B?'B':'C';
 return'C'}                                        /* 규칙 기반·미검수 */
/* 안전 관련 — 신뢰 등급과 무관하게 전문가 확인 유지 */
function safety(k,x){return(k==='crack'||k==='peel')&&((x&&x.g)||0)>=3}
/* 결함 요약: 군별 목록 + 전문가 확인 필요 항목 */
function summary(it){it=it||{};var out={d:[],q:[],a:[],need:[],rank:{A:0,B:0,C:0}};
 DEF.forEach(function(d){var x=it[d[0]];if(!x||!x.done)return;var t=trust(x),sf=safety(d[0],x);
  out[d[2]].push({k:d[0],n:d[1],pct:+x.pct||0,g:x.g||0,t:t,sf:sf});out.rank[t]++;if(sf||t==='C')out.need.push(d[0])});
 return out}
/* LCC 계산 반영 대상 — 지금은 열화형만. 시공품질·외관형은 기준 확정 전까지 보고용 */
function lccUse(k){return G[k]==='d'}
window.DGE={DEF:DEF,GRP:GRP,NAME:NAME,G:G,score:score,level:level,toB:toB,trust:trust,safety:safety,summary:summary,lccUse:lccUse,TH:TH};
})();
