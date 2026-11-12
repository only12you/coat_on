/* 도장 시스템: 끌어서 위치 변경 (제품은 이동하고 하도·중도·상도 단계 자리는 그대로 유지) */
(function(){
const GRIP='<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.8"/><circle cx="15" cy="6" r="1.8"/><circle cx="9" cy="12" r="1.8"/><circle cx="15" cy="12" r="1.8"/><circle cx="9" cy="18" r="1.8"/><circle cx="15" cy="18" r="1.8"/></svg>';
const mk=()=>{const b=document.createElement('button');b.type='button';b.className='sy-grip';b.setAttribute('aria-label','끌어서 위치 변경');b.innerHTML=GRIP;b.addEventListener('click',e=>e.stopPropagation());return b};
const scP=el=>{let n=el.parentElement;while(n&&n!==document.body){const o=getComputedStyle(n).overflowY;if((o=='auto'||o=='scroll')&&n.scrollHeight>n.clientHeight+2)return n;n=n.parentElement}return document.scrollingElement||document.documentElement};
function drag(ev,rows,from,drop){
 ev.preventDefault();const g=ev.currentTarget,el=rows[from];if(!el)return;
 const sc=scP(el),isW=sc===document.scrollingElement||sc===document.documentElement,st=()=>isW?window.scrollY:sc.scrollTop;
 const rect=rows.map(r=>r.getBoundingClientRect()),sy0=st(),y0=ev.clientY;
 const gap=rows.length>1?Math.max(0,Math.abs(rect[1].top-rect[0].bottom)):6,h=rect[from].height+gap;
 let to=from,cy=ev.clientY,on=true,raf=0;
 el.classList.add('dragging');rows.forEach((r,k)=>{if(k!=from)r.classList.add('shift')});
 try{g.setPointerCapture(ev.pointerId)}catch(e){}
 const upd=()=>{const dy=cy-y0+(st()-sy0);el.style.transform='translateY('+dy+'px)';
  const mid=rect[from].top+rect[from].height/2+dy;let t=0;
  rows.forEach((r,k)=>{if(k!=from&&rect[k].top+rect[k].height/2<mid)t++});to=t;
  rows.forEach((r,k)=>{if(k==from)return;let d=0;if(from<to&&k>from&&k<=to)d=-h;else if(from>to&&k<from&&k>=to)d=h;r.style.transform=d?'translateY('+d+'px)':''})};
 const tick=()=>{if(!on)return;let d=0;if(cy<150)d=-10;else if(cy>innerHeight-140)d=10;if(d){if(isW)window.scrollBy(0,d);else sc.scrollTop+=d;upd()}raf=requestAnimationFrame(tick)};
 const mv=e=>{cy=e.clientY;upd()};
 const end=e=>{on=false;cancelAnimationFrame(raf);g.removeEventListener('pointermove',mv);g.removeEventListener('pointerup',end);g.removeEventListener('pointercancel',end);
  rows.forEach(r=>{r.classList.remove('dragging','shift');r.style.transform=''});
  try{g.releasePointerCapture(ev.pointerId)}catch(x){}
  if(e.type=='pointerup'&&to!=from)drop(from,to)};
 g.addEventListener('pointermove',mv);g.addEventListener('pointerup',end);g.addEventListener('pointercancel',end);upd();raf=requestAnimationFrame(tick)}
/* 시스템 목록 */
window.syDragMove=function(gi,from,to){
 const idxs=syGr()[gi]&&syGr()[gi].idx;if(!idxs||from==to)return;
 const labs=syLb(),slot=idxs.map(i=>labs[i]),items=idxs.map(i=>SY.layers[i]),actObj=SY.layers[SY.act];
 const m=items.splice(from,1)[0];items.splice(to,0,m);
 items.forEach((l,k)=>{l.lb=slot[k]=='미지정'?'':slot[k];SY.layers[idxs[k]]=l});
 SY.act=actObj?SY.layers.indexOf(actObj):-1;syS();syRender();try{vib(20)}catch(e){}};
function syGrips(){
 const rows=[...document.querySelectorAll('#v3 .sy-t')],flat=[];syGr().forEach((g,gi)=>g.idx.forEach(i=>flat.push(gi)));
 if(rows.length!=flat.length)return;
 rows.forEach((r,k)=>{const h=r.querySelector('.sy-th');if(!h||h.querySelector('.sy-grip'))return;const b=mk();
  b.addEventListener('pointerdown',ev=>{const gi=flat[k],peers=rows.filter((x,j)=>flat[j]==gi);drag(ev,peers,peers.indexOf(r),(f,t)=>syDragMove(gi,f,t))});h.prepend(b)})}
const _sr=syRender;syRender=function(){_sr.apply(this,arguments);try{syGrips()}catch(e){}};
/* 시스템 추가(제품 선택) 시트의 담은 제품 목록 */
function qGrips(){const box=document.getElementById('syq-sel');if(!box||typeof SYQ==='undefined'||!SYQ||!SYQ.draft)return;
 [...box.querySelectorAll('.syq-r')].forEach((r,k)=>{if(r.querySelector('.sy-grip'))return;const b=mk();
  b.addEventListener('pointerdown',ev=>drag(ev,[...box.querySelectorAll('.syq-r')],k,(f,t)=>{const it=SYQ.items,labs=it.map(x=>x.lb||''),m=it.splice(f,1)[0];it.splice(t,0,m);it.forEach((x,j)=>{x.lb=labs[j]});try{vib(15)}catch(e){}syPickUi()}));r.prepend(b)})}
const _pu=syPickUi;syPickUi=function(){_pu.apply(this,arguments);try{qGrips()}catch(e){}};
setTimeout(()=>{try{syGrips()}catch(e){}},300);
})();
