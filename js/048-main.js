/* ===== v565: 환경등급·내구성을 태그 줄로 이동, 기재 제거 ===== */
(function(){
const _P=syLibPage;
syLibPage=function(){_P.apply(this,arguments);try{
 const e=document.getElementById('sylib');if(!e)return;const A=syLibGet();
 e.querySelectorAll('.lb-c').forEach(c=>{const nm=c.querySelector('.lb-nm'),g=c.querySelector('.lb-tgs');const x=nm&&A.find(a=>a.name==nm.textContent);if(!x||!g)return;
  const t=ndSpTy(x),a=[t.t,t.s].filter(Boolean).map(v=>'<span>'+esc(v)+'</span>');
  if(x.env)a.push('<span class="ndg">환경등급 '+esc(x.env)+'</span>');
  if(x.life)a.push('<span class="ndl">내구성 '+esc(x.life)+'년</span>');
  g.innerHTML=a.join('')})}catch(x){}};
try{if(document.getElementById('sylib')&&document.getElementById('sylib').innerHTML)syLibPage()}catch(x){}
})();
