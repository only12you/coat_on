/* ===== v564: 도막구성·도막두께 줄 ===== */
(function(){
const sv=(d)=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+d+'</svg>';
const DOC='<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>',STK='<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 12.5l9 5 9-5M3 16.5l9 5 9-5"/>';
window.ndCoat=function(x){const R=syLibRows(x).filter(r=>!r.w),o=[],m={};
 R.forEach(r=>{const l=r.lb||'코트';if(!(l in m)){m[l]=0;o.push(l)}m[l]+=(r.c||1)});
 return {txt:o.map(l=>l+' '+m[l]+'회').join(' + ')||'-',tot:R.reduce((a,r)=>a+(r.d||0),0)}};
const _P=syLibPage;
syLibPage=function(){_P.apply(this,arguments);try{
 const e=document.getElementById('sylib');if(!e)return;const A=syLibGet();
 e.querySelectorAll('.lb-c').forEach(c=>{if(c.querySelector('.lb-cs'))return;const nm=c.querySelector('.lb-nm');const x=nm&&A.find(a=>a.name==nm.textContent);if(!x)return;
  const k=ndCoat(x);const m=c.querySelector('.lb-m');
  const h='<div class="lb-cs"><span>'+sv(DOC)+'<small>도막구성</small><b>'+esc(k.txt)+'</b></span><span>'+sv(STK)+'<small>도막두께</small><b>'+(k.tot?syNU(syFmtD(k.tot)):'-')+'</b></span></div>';
  if(m)m.insertAdjacentHTML('afterend',h);else c.insertAdjacentHTML('beforeend',h)})}catch(x){}};
try{if(document.getElementById('sylib')&&document.getElementById('sylib').innerHTML)syLibPage()}catch(x){}
})();
