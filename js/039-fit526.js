/* v526: 첫 대시보드 한 화면 맞춤 — 기기 높이에 맞는 세로 배율(--vf) 계산 */
(function(){
'use strict';
let busy=0,raf=0;
function avail(vh){
 const nav=document.getElementById('gnav');let navTop=innerHeight;
 if(nav){const r=nav.getBoundingClientRect();if(r.height>0&&r.top>0)navTop=Math.min(navTop,r.top)}
 return navTop;
}
function bottomOf(vh){
 let b=0;[...vh.children].forEach(c=>{const cs=getComputedStyle(c);if(cs.display==='none'||cs.position==='fixed'||cs.position==='absolute')return;const r=c.getBoundingClientRect();if(r.height>0)b=Math.max(b,r.bottom)});
 return b;
}
function fit(){
 const vh=document.getElementById('vh');
 if(!vh||vh.hidden||!vh.classList.contains('cd')||vh.offsetParent===null&&getComputedStyle(vh).position!=='fixed')return;
 if(busy)return;busy=1;
 try{
  const top=vh.getBoundingClientRect().top+scrollY;
  vh.classList.remove('cdc');
  const target=avail(vh)-6;                 // 하단 메뉴 바로 위까지
  const imp=(p,v)=>vh.style.setProperty(p,v,'important');
  const need=f=>{vh.style.setProperty('--vf',String(f));imp('padding-bottom','0px');imp('min-height','0px');return bottomOf(vh)<=target};
  /* 자연 높이(배율 1)에서 시작 → 넘치면 줄이고, 남으면 늘림 */
  let lo=.42,hi=2.6,best=lo;
  let ok=need(lo);
  if(!ok){vh.classList.add('cdc');ok=need(lo)}   // 아주 낮은 화면: 접이식 안내를 숨기고 다시 시도
  if(ok){for(let i=0;i<9;i++){const m=(lo+hi)/2;if(need(m)){best=m;lo=m}else hi=m}}
  vh.style.setProperty('--vf',best.toFixed(3));
  if(ok){imp('min-height',Math.max(0,avail(vh))+'px');imp('padding-bottom','0px')}   // 한 화면에 맞음
  else{vh.style.removeProperty('padding-bottom');vh.style.removeProperty('min-height')}  // 맞지 않으면 스크롤 허용
  vh.dataset.fit=best.toFixed(2)+(ok?'':'!');
 }catch(e){console.warn('fit526',e)}
 busy=0;
}
function sched(){cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>requestAnimationFrame(fit))}
window.cdFit=sched;
addEventListener('resize',sched);addEventListener('orientationchange',()=>setTimeout(sched,200));
if(window.visualViewport)visualViewport.addEventListener('resize',sched);
addEventListener('load',()=>{sched();setTimeout(sched,600);setTimeout(sched,1800)});
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(sched);
/* 홈이 표시되거나 내용이 다시 그려질 때 */
const obs=new MutationObserver(()=>sched());
function watch(){const vh=document.getElementById('vh');if(!vh)return false;obs.observe(vh,{attributes:true,attributeFilter:['hidden','class'],childList:true,subtree:true,characterData:true});return true}
if(!watch())document.addEventListener('DOMContentLoaded',watch);
document.addEventListener('click',()=>setTimeout(sched,120),true);
})();
