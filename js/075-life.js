/* LIFE — 도장 성능 잔존율·감가상각 (v593 2단계, 정액 방식)
   성능 잔존율 = max(0, 100 − 경과년수 ÷ 기준수명 × 100), 감가상각률 = 100 − 성능잔존율.
   '이론값'입니다. 현장 진단 결과와 다를 수 있으며 0%가 곧 재도장 필요를 뜻하지는 않습니다. */
(function(){
var STG=[[80,'양호','정기 관찰'],[60,'관심','연차별 상태 점검'],[40,'주의','정밀 진단 및 예산 검토'],[20,'준비','재도장 계획 수립'],[1,'임박','공사 발주 및 예산 확보 검토'],[0,'기준수명 도달','재도장 필요성 정밀 진단']];
function stage(res){for(var i=0;i<STG.length;i++)if(res>=STG[i][0])return{n:STG[i][1],a:STG[i][2],i:i};return{n:STG[5][1],a:STG[5][2],i:5}}
/* y0 최종 재도장(준공) 연도, life 기준수명(년), now 기준 연도 */
function calc(y0,life,now){y0=+y0;life=+life;now=+now;if(!(y0>1900)||!(life>0))return null;
 var el=Math.max(0,now-y0),res=Math.max(0,Math.round((100-el/life*100)*10)/10),st=stage(Math.round(res));
 return{y0:y0,life:life,el:el,res:res,dep:Math.round((100-res)*10)/10,st:st,end:y0+life,
  mile:[['정밀 진단·예산 검토',y0+Math.round(life*.5)],['재도장 준비',y0+Math.round(life*.8)],['기준수명 도달',y0+life]]}}
/* 차기 공사비: 현재 견적 × (1+물가상승률)^남은해, 부족액과 연 적립 목표 */
function budget(cost,g,have,r){cost=+cost||0;g=(+g||0)/100;have=+have||0;var rem=Math.max(0,r.end-r.y0-r.el);
 var fut=Math.round(cost*Math.pow(1+g,rem)),need=Math.max(0,fut-have);return{rem:rem,fut:fut,need:need,per:rem>0?Math.round(need/rem):need}}
window.LIFE={calc:calc,stage:stage,budget:budget,STG:STG};
})();
