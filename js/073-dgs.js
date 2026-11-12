/* DGS — 진단 기반 보수 시나리오 비교 (v593 A3, 계산 엔진만 · 화면 없음)
   국부 보수 / 전면 재도장(현재 사양) / 사양 개선 3가지를 같은 기준으로 비교하고,
   수명·단가 불확실성을 반영한 범위(최소~최대)와 신뢰 등급, 확인 필요 사항을 함께 돌려준다.
   ※ P의 값은 사내 기준 확정 전 '잠정값'. a.dgsP 로 자산별 덮어쓰기 가능. 기존 LCC 계산(cc·sim)은 그대로 사용. */
(function(){
var P={
 spotMargin:2.0,   /* 결함 면적 대비 보수 범위 배수(주변 포함) */
 spotMin:.05,spotMax:.40, /* 국부 보수 면적비 하·상한 — 상한 초과 시 전면 재도장 권장 */
 spotUnit:1.3,     /* 국부 보수 단위비용 배수(소규모 비효율) */
 spotDelayK:.25,spotDelayMax:3, /* 국부 보수로 늦춰지는 전면 재도장: 수명의 25%, 최대 3년 */
 crackAff:[0,1,3,6,12,20], /* 균열 등급 → 영향 면적(%) */
 lifeBand:.2,      /* 수명 ±20% */
 band:{A:.10,B:.20,C:.30} /* 신뢰 등급별 비용 불확실성 */
};
function pp(a){var o={};for(var k in P)o[k]=P[k];if(a&&a.dgsP)for(var k in a.dgsP)o[k]=a.dgsP[k];return o}
/* 비용 흐름: 첫 시행 y1, 이후 주기 c, 물가상승 esc(%/년) — 단위는 LCC와 동일 */
function flow(unit,ar,y1,c,hz,esc){var ev=[],tot=0;for(var y=y1;y<=hz;y+=c){var v=unit*ar*(1+esc/100*y)/1000;ev.push({y:y,v:v});tot+=v;if(c<1)break}return{ev:ev,tot:tot}}
function affected(a,p){var it=a.dg&&a.dg.items||{},s=0,n=0;
 ['rust','peel','blis','chalk'].forEach(function(k){var x=it[k];if(x&&x.done){s+=+x.pct||0;n++}});
 var c=it.crack;if(c&&c.done){s+=p.crackAff[Math.min(5,c.g||0)]||0;n++}
 return{pct:s,n:n}}
function run(a){
 var X=window.LCCX,E=window.DGE;if(!X||!a)return null;
 var RS=X.rs(),hz=RS.hz,esc=RS.esc,p=pp(a),R=X.all(a),J=X.judge(a),ar=+a.ar||0,age=+a.age||0;
 var m0=R.m[0],has=!!(a.dg&&a.dgOn!==false&&a.dg.items);
 var sum=has&&E?E.summary(a.dg.items):null,tr=sum?(sum.rank.C?'C':sum.rank.B?'B':'A'):'C';
 var need=sum?sum.need.slice():[];
 var req=X.DKI[a.dur||'H'],okOf=function(m){return X.DKI[m.d]>=req};
 /* 현재 사양의 다음 재도장 시점 */
 var rem=Math.max(0,m0.e-age),y1=Math.round(rem);
 var aff=affected(a,p),af=Math.min(1,Math.max(p.spotMin,aff.pct/100*p.spotMargin));
 var unit0=m0.sc.init,unitA=null,mA=null;
 /* 사양 개선: 대안 2개 중 요구 내구성을 충족하고 가장 저렴한 것(없으면 가장 저렴한 것) */
 [1,2].forEach(function(i){var m=R.m[i],f=flow(m.sc.init,ar,0,m.c,hz,esc);m._t=f.tot;m._ok=okOf(m)});
 var cand=[1,2].map(function(i){return{i:i,m:R.m[i]}}).sort(function(x,y){return(y.m._ok-x.m._ok)||(x.m._t-y.m._t)});
 mA=cand[0].m;var iA=cand[0].i;
 var S=[];
 /* 1) 국부 보수 */
 var spotOK=has&&af<=p.spotMax&&!(sum&&sum.need.some(function(k){return E.safety(k,a.dg.items[k])})),spotNote='';
 if(!has)spotNote='진단 결과가 없어 결함 범위를 알 수 없습니다';
 else if(af>p.spotMax)spotNote='결함 범위가 넓어(보수 면적비 '+Math.round(af*100)+'%) 국부 보수 효과가 제한적입니다';
 else if(!spotOK)spotNote='균열·박리 등 안전 관련 결함은 전문가 확인 후 보수 범위를 정해야 합니다';
 var delay=Math.min(p.spotDelayMax,p.spotDelayK*m0.e),yFull=Math.round(rem+delay);
 var fs=flow(unit0*p.spotUnit*af,ar,0,9999,hz,esc),ff=flow(unit0,ar,yFull,m0.c,hz,esc);
 S.push({id:'spot',nm:'국부 보수',ok:spotOK,note:spotNote,now:fs.tot,first:0,full:yFull,tot:fs.tot+ff.tot,life:m0.e,spec:0,af:af,meets:okOf(m0)});
 /* 2) 전면 재도장(현재 사양) */
 var fr=flow(unit0,ar,y1,m0.c,hz,esc);
 S.push({id:'full',nm:'전면 재도장(현재 사양)',ok:true,note:okOf(m0)?'':'현재 사양은 요구 내구성 기준을 충족하지 못합니다',now:y1<=0&&fr.ev.length?fr.ev[0].v:0,first:y1,full:y1,tot:fr.tot,life:m0.e,spec:0,meets:okOf(m0)});
 /* 3) 사양 개선 */
 var fi=flow(mA.sc.init,ar,y1,mA.c,hz,esc);
 S.push({id:'upg',nm:'사양 개선('+(iA==1?'대안 1':'대안 2')+')',ok:true,note:mA._ok?'':'대안 모두 요구 내구성 기준에 미달합니다',now:y1<=0&&fi.ev.length?fi.ev[0].v:0,first:y1,full:y1,tot:fi.tot,life:mA.e,spec:iA,meets:mA._ok});
 /* 불확실성 범위: 수명 ±lifeBand, 신뢰 등급별 단가 ±band */
 S.forEach(function(s){var m=s.spec==0?m0:R.m[s.spec],unit=s.id=='spot'?null:m.sc.init,b=p.band[tr];
  var lo,hi;function at(k){var c=Math.max(1,Math.round(m.c*k)),y=Math.round(rem*k);
   if(s.id=='spot'){var a1=flow(unit0*p.spotUnit*af,ar,0,9999,hz,esc).tot,a2=flow(unit0,ar,Math.round((rem+delay)*k),c,hz,esc).tot;return a1+a2}
   return flow(unit,ar,y,c,hz,esc).tot}
  var t1=at(1-p.lifeBand),t2=at(1+p.lifeBand);lo=Math.min(t1,t2,s.tot)*(1-b);hi=Math.max(t1,t2,s.tot)*(1+b);s.lo=lo;s.hi=hi});
 /* 추천: 실행 가능하고 요구 내구성을 충족하는 시나리오 중 총비용 최소(없으면 실행 가능 중 최소) */
 var feas=S.filter(function(s){return s.ok}),good=feas.filter(function(s){return s.meets}),pool=good.length?good:feas;
 var best=pool.slice().sort(function(x,y){return x.tot-y.tot})[0];
 var second=pool.filter(function(s){return s!==best}).sort(function(x,y){return x.tot-y.tot})[0];
 /* 결정 확신도: 1·2위 범위가 겹치면 '근소한 차이' */
 var close=!!(second&&best.hi>=second.lo);
 var cav=[];if(!has)cav.push('현장 진단 결과가 없어 결함 상태를 반영하지 못했습니다');
 if(tr!=='A')cav.push('진단 신뢰 등급 '+tr+' — '+(tr==='C'?'전문가 확인 전 참고용':'결과를 범위로 해석하세요'));
 if(need.length)cav.push('전문가 확인 필요 결함: '+need.map(function(k){return E.NAME[k]}).join('·'));
 if(close)cav.push('추천안과 차순위의 비용 범위가 겹쳐 차이가 크지 않습니다');
 if(!good.length)cav.push('요구 내구성 기준을 충족하는 시나리오가 없습니다');
 return{hz:hz,esc:esc,rem:rem,trust:tr,has:has,sc:S,best:best.id,second:second?second.id:null,close:close,need:need,caveats:cav,params:p}}

/* 보고서용 카드(HTML 문자열) — 진단이 적용된 자산에만 표시 */
function esc(v){return String(v==null?'':v).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function fm(k){var v=Math.abs(k)>=100000?[(k/100000).toFixed(2),'억원']:[(k/1000).toFixed(1),'백만원'];return v[0]+'<small> '+v[1]+'</small>'}
function fr(k){return Math.abs(k)>=100000?(k/100000).toFixed(2)+'~':(k/1000).toFixed(1)+'~'}
function card(a){var r;try{r=run(a)}catch(e){return''}if(!r||!r.has)return'';
 var mx=Math.max.apply(null,r.sc.map(function(s){return s.hi}))||1,E=window.DGE,n=0,it=a.dg.items||{};for(var k in it)if(it[k]&&it[k].done)n++;
 var unit=Math.abs(mx)>=100000?100000:1000,uN=unit==100000?'억원':'백만원',f1=function(v){return(v/unit).toFixed(unit==100000?2:1)};
 var rows=r.sc.map(function(s){var best=s.id==r.best,lo=s.lo/mx*100,w=Math.max(1.5,(s.hi-s.lo)/mx*100),mid=s.tot/mx*100;
  var tag=!s.ok?'<em class="x">제외</em>':best?'<em>추천</em>':'';
  var when=s.id=='spot'?'즉시 보수 후 '+s.full+'년차 전면 재도장':(s.first<=0?'즉시 시행':s.first+'년 후 시행');
  return'<div class="dgxr'+(best?' bst':'')+'"><div class="dgxn"><b>'+esc(s.nm)+'</b>'+tag+'</div><div class="dgxv"><strong>'+f1(s.tot)+'</strong><small> '+uN+' · 범위 '+f1(s.lo)+'~'+f1(s.hi)+'</small></div><div class="dgxb"><i style="left:'+lo.toFixed(1)+'%;width:'+w.toFixed(1)+'%"></i><u style="left:'+mid.toFixed(1)+'%"></u></div><div class="dgxv"><small>'+esc(when)+'</small></div>'+(s.note?'<div class="dgxw">'+esc(s.note)+'</div>':'')+'</div>'}).join('');
 var cv=r.caveats.length?'<ul class="dgxk">'+r.caveats.map(function(c){return'<li>'+esc(c)+'</li>'}).join('')+'</ul>':'';
 return'<div class="dgxc"><div class="dgxh"><b>진단 기반 보수 시나리오</b><span class="dgxt '+r.trust+'">신뢰 '+r.trust+'</span></div><p class="dgxs">'+esc(a.n||'')+' · 결함 '+n+'종 진단 반영 · '+r.hz+'년 누적비용(막대=범위, 검은 선=기준값)</p>'+rows+cv+'<p class="dgxf">신뢰 등급·보수 범위·지연 효과는 잠정 기준이며, 전문가 확인 후 확정하세요.</p></div>'}
window.DGS={card:card,run:run,P:P,pp:pp,flow:flow,affected:affected};
})();
