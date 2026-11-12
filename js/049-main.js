/* ===== v566: 사양 DB를 제품 DB 디자인으로 통일 ===== */
(function(){
const sv=(d,w)=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||1.9)+'" stroke-linecap="round" stroke-linejoin="round">'+d+'</svg>';
const ORD=['건축','플랜트','공업','보수도장','기타'];
const _P=syLibPage;
syLibPage=function(){_P.apply(this,arguments);try{nd566()}catch(x){}};
function nd566(){const e=document.getElementById('sylib');if(!e)return;const A=syLibGet();
 /* 유형 타일: 건수 추가 */
 const cnt={};ORD.forEach(t=>cnt[t]=0);A.forEach(x=>{const t=ndSpTy(x).t;if(t in cnt)cnt[t]++});
 e.querySelectorAll('.ndtl button').forEach((b,i)=>{b.classList.add('k'+i);if(!b.querySelector('em')){const t=b.querySelector('b');if(t)t.insertAdjacentHTML('afterend','<em>'+cnt[t.textContent]+'</em>')}});
 const hl=e.querySelector('.ndcb .ndbi');if(hl)hl.innerHTML=sv('<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',2.2);
 /* 카드 */
 e.querySelectorAll('.lb-c').forEach(c=>{const nm=c.querySelector('.lb-nm');const x=nm&&A.find(a=>a.name==nm.textContent);if(!x)return;
  const T=ndSpTy(x),ti=Math.max(0,ORD.indexOf(T.t));c.className=c.className.replace(/\bct\d\b/g,'').trim()+' ct'+ti;
  const tx=c.querySelector('.lb-tx');if(!tx)return;
  if(!tx.querySelector('.lb-n1')){const n1=document.createElement('div');n1.className='lb-n1';tx.insertBefore(n1,tx.firstChild);n1.appendChild(nm);
   if(x.env)n1.insertAdjacentHTML('beforeend','<span class="ndg">환경등급 '+esc(x.env)+'</span>');
   if(x.life)n1.insertAdjacentHTML('beforeend','<span class="ndl">내구성 '+esc(x.life)+'년</span>')}
  const g=tx.querySelector('.lb-tgs');
  if(g){const k=typeof ndCoat=='function'?ndCoat(x):null;
   g.innerHTML=[T.t,T.s].filter(Boolean).map(v=>'<span>'+esc(v)+'</span>').join('')+(k&&k.txt!='-'?'<span class="cc">'+esc(k.txt)+'</span>':'');
   const ds=tx.querySelector('.lb-ds');if(ds)tx.insertBefore(ds,g)}
  if(!c.querySelector('.lb-rt')){const k=typeof ndCoat=='function'?ndCoat(x):null;const th=c.querySelector('.lb-th');const gt=th&&th.querySelector('.lb-gt');
   if(th){const r=document.createElement('div');r.className='lb-rt';r.innerHTML='<span class="tkp">'+(k&&k.tot?'도막 '+esc(String(syFmtD(k.tot)).replace(/<[^>]*>/g,'')):'도막 -')+'</span>';if(gt)r.appendChild(gt);th.appendChild(r)}}
 });
 const cp=document.getElementById('cpbar');if(cp&&!cp.dataset.v){cp.dataset.v=1}
}
try{if(document.getElementById('sylib')&&document.getElementById('sylib').innerHTML)syLibPage()}catch(x){}
})();
