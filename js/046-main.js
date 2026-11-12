/* ===== v562: 시안 동일 적용(레이아웃·글꼴) ===== */
(function(){
const sv=(d,w)=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||1.9)+'" stroke-linecap="round" stroke-linejoin="round">'+d+'</svg>';
const TI={건축:'<path d="M3 21h18"/><path d="M5 21V8l4-2v15M9 21V4l4-1v18M13 21v-9l6 2v7"/><path d="M7 11h.01M7 15h.01M11 8h.01M11 12h.01M11 16h.01"/>',
플랜트:'<path d="M3 21h18"/><path d="M4 21V12l5 3v-3l5 3V8h3v13"/><path d="M15 8V4h2v4"/>',
공업:'<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1"/><circle cx="12" cy="12" r="6.5"/>',
보수도장:'<path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3.5 17.3a1.8 1.8 0 0 0 2.5 2.5l5.8-5.8a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.1-.5-.5-2.1z"/>',
기타:'<path d="M9 3h6M10 3v6l-5.5 9.5A1.5 1.5 0 0 0 5.8 21h12.4a1.5 1.5 0 0 0 1.3-2.5L14 9V3"/><path d="M7.5 15h9"/>'};
const LEAF='<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14"/><path d="M5 19c2-5 5-8 9-10"/>';
const STK='<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 12.5l9 5 9-5M3 16.5l9 5 9-5"/>';
const SHD='<path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z"/><path d="M8.8 12l2.2 2.2 4.2-4.4"/>';
const SCL='<path d="M12 4v15M7 20h10M5 7h14"/><path d="M5 7l-3 7a3.5 3.5 0 0 0 6 0zM19 7l-3 7a3.5 3.5 0 0 0 6 0z"/>';
const ORD=['건축','플랜트','공업','보수도장','기타'];
const _P=syLibPage;
syLibPage=function(){_P.apply(this,arguments);try{nd562()}catch(x){}};
function nd562(){const e=document.getElementById('sylib');if(!e)return;
 const ty=SYF.ty||'all';
 const sh=e.querySelector('.ndsh');if(sh){const b=sh.querySelector('b');sh.innerHTML='<i class="ndbar"></i>'+(b?b.outerHTML:'<b>유형 분류</b>')}
 const tl=e.querySelector('.ndtl');if(tl)tl.innerHTML=ORD.map(t=>'<button type="button" class="'+(ty==t?'on':'')+'" onclick="ndTy(\''+t+'\')">'+sv(TI[t])+'<b>'+t+'</b></button>').join('');
 const cb=e.querySelector('.ndcb .ndbi');if(cb)cb.innerHTML=sv('<rect x="3" y="11" width="4.5" height="9" rx="1.2"/><rect x="9.8" y="4" width="4.5" height="16" rx="1.2"/><rect x="16.6" y="8" width="4.5" height="12" rx="1.2"/>',2.4);
 const A=syLibGet();
 e.querySelectorAll('.lb-c').forEach((c,i)=>{
  const nm=c.querySelector('.lb-nm');if(!nm)return;const x=A.find(a=>a.name==nm.textContent)||{};const k=A.indexOf(x);
  const th=c.querySelector('.lb-th');
  if(th&&!th.querySelector('.lb-gt')){th.insertAdjacentHTML('beforeend','<button type="button" class="lb-gt" aria-label="보기" onclick="syLibView('+k+')">'+sv('<path d="M9 5l7 7-7 7"/>',2.6)+'</button>')}
  const tx=c.querySelector('.lb-tx');if(tx&&!tx.querySelector('.lb-ds')&&x.scope)tx.insertAdjacentHTML('beforeend','<p class="lb-ds">'+esc(x.scope)+'</p>');
  const sc=c.querySelector(':scope>.lb-sc');if(sc)sc.remove();
  const m=c.querySelector('.lb-m');
  if(m&&!m.dataset.n){m.dataset.n=1;m.innerHTML='<span>'+sv(LEAF,1.8)+'<small>환경등급</small><b>'+esc(x.env||'---')+'</b></span><span>'+sv(STK,1.8)+'<small>기재</small><b>'+esc(x.sub||'---')+'</b></span><span>'+sv(SHD,1.8)+'<small>예상 내구성</small><b>'+(x.life?x.life+'년 이상':'---')+'</b></span>'}
  if(m&&th)th.parentNode.insertBefore(m,m);
 });
 const cp=document.getElementById('cpbar');if(cp){const n=Object.keys(SYSEL).length;cp.innerHTML='<span class="cps">'+sv(SCL,1.7)+'</span><div class="cpt"><b>비교하기'+(n?' <em>'+n+'/4</em>':'')+'</b><small>최대 4개 제품을 선택하여 비교할 수 있습니다.</small></div><button type="button" class="cpb" onclick="ndCmp()" aria-label="비교하기">'+sv('<path d="M9 5l7 7-7 7"/>',2.6)+'</button>'}
}
const _S=syLibSel;
window.syLibSel=function(k,on,el){_S(k,on,el);try{const cp=document.getElementById('cpbar');if(cp){const n=Object.keys(SYSEL).length;const t=cp.querySelector('.cpt b');if(t)t.innerHTML='비교하기'+(n?' <em>'+n+'/4</em>':'')}}catch(x){}};
try{if(document.getElementById('sylib')&&document.getElementById('sylib').innerHTML)syLibPage()}catch(x){}
})();
