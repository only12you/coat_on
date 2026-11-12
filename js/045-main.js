/* ===== v561: 사양 DB 시안 적용 ===== */
(function(){
const sv=(d,w)=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||2)+'" stroke-linecap="round" stroke-linejoin="round">'+d+'</svg>';
const RF='<path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3.5 17.3a1.8 1.8 0 0 0 2.5 2.5l5.8-5.8a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.1-.5-.5-2.1z"/>';
const _T=ndSpTy;
window.ndSpTy=function(x){const r=_T(x);const T=[x.name||'',x.scope||'',x.sub||''].join(' ');if(/리피니쉬|리피니시|refinish|보수도장|재도장|보수/i.test(T))return {t:'보수도장',s:''};return r};
window.ndSpPh=function(x){const t=ndSpTy(x).t,i=['건축','플랜트','공업','기타','보수도장'].indexOf(t);
 const ic={건축:'<rect x="5" y="3" width="10" height="18" rx="1.5"/><rect x="15" y="9" width="5" height="12" rx="1.5"/><path d="M8 7h4M8 11h4M8 15h4"/>',플랜트:'<path d="M5 21V11l3-2v12M8 21V6l3.5-3L15 6v15M15 21v-8l4 2v6"/><path d="M3 21h18"/>',공업:'<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>',기타:'<path d="M9 3h6M10 3v6l-5.5 9.5A1.5 1.5 0 0 0 5.8 21h12.4a1.5 1.5 0 0 0 1.3-2.5L14 9V3"/><path d="M7.5 15h9"/>',보수도장:RF}[t];
 return '<span class="lb-ph t-'+i+'">'+(x.photo?'<img alt="" src="'+x.photo+'">':sv(ic,1.8))+'</span>'};
/* 히어로 */
const _H=ndHero;
window.ndHero=function(n){_H(n);const h=document.getElementById('hx');if(!h)return;const db=(n==3&&window.SYM=='db');
 const t=h.querySelector('.hnt');if(t&&db)t.innerHTML='<b class="hdt">도장시스템 사양 DB</b><span class="hds">더 스마트한 도장 솔루션,<br>코아톤과 함께하세요.</span>';
 let g=h.querySelector('.hgear');if(!g){g=document.createElement('div');g.className='hgear';g.innerHTML=sv('<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v2.6M12 18.6v2.6M2.8 12h2.6M18.6 12h2.6M5.5 5.5l1.8 1.8M16.7 16.7l1.8 1.8M18.5 5.5l-1.8 1.8M7.3 16.7l-1.8 1.8"/>',1.8);h.appendChild(g)}};
/* 목록 후처리 */
const _P=syLibPage;
syLibPage=function(){_P.apply(this,arguments);try{nd561()}catch(x){}};
function nd561(){const e=document.getElementById('sylib');if(!e)return;
 const hd=e.querySelector('.ndsh b');if(hd)hd.textContent='유형 분류';
 const tl=e.querySelector('.ndtl');if(tl&&!tl.querySelector('[data-rf]')){const on=SYF.ty=='보수도장';tl.insertAdjacentHTML('beforeend','<button type="button" data-rf="1" class="'+(on?'on':'')+'" onclick="ndTy(\'보수도장\')">'+sv(RF)+'<b>보수도장</b>'+(on?'<i></i>':'')+'</button>')}
 e.querySelectorAll('.lb-c').forEach(c=>{if(!c.querySelector('.lb-go')){const m=c.querySelector('.lb-m');if(m)m.insertAdjacentHTML('beforeend','<i class="lb-go">›</i>')}});
 let bar=document.getElementById('cpbar');if(bar)bar.remove();
 const n=Object.keys(SYSEL).length;
 const fl=e.querySelector('.lb-fl');if(fl)fl.insertAdjacentHTML('beforebegin','<div class="cpbar" id="cpbar"><div class="cpt"><b>선택된 사양 <em>'+n+'</em>/4</b><small>최대 4개 제품을 선택하여 비교할 수 있습니다.</small></div><button type="button" class="cpb" onclick="ndCmp()">'+sv('<path d="M7 4v16M17 4v16M3 8l4-4 4 4M13 16l4 4 4-4"/>',2)+'<span>비교하기</span></button></div>')}
const _FL=syLibSel;
window.syLibSel=function(k,on,el){if(on&&Object.keys(SYSEL).length>=4){if(el)el.checked=false;return tt('비교는 최대 4개까지 선택할 수 있습니다')}_FL(k,on,el);const b=document.getElementById('cpbar');if(b){const n=Object.keys(SYSEL).length;const em=b.querySelector('em');if(em)em.textContent=n}};
window.ndCmp=function(){const A=syLibGet().filter(x=>SYSEL[x.name]);if(A.length<2)return tt('비교할 사양을 2개 이상 체크하세요');
 const o=document.getElementById('cpm');if(o)o.remove();
 const row=(l,f)=>'<tr><th>'+l+'</th>'+A.map(x=>'<td>'+f(x)+'</td>').join('')+'</tr>';
 const rs=x=>syLibRows(x),tot=x=>rs(x).reduce((a,r)=>a+(r.w?0:r.d),0);
 const h='<div class="cpms"><div class="cpmh"><b>사양 비교</b><button type="button" onclick="document.getElementById(\'cpm\').remove()" aria-label="닫기">✕</button></div><div class="cpmb"><table><tr><th></th>'+A.map(x=>'<th class="n">'+esc(x.name)+'</th>').join('')+'</tr>'
 +row('유형',x=>esc(ndSpTy(x).t))+row('환경등급',x=>esc(x.env||'-'))+row('기재',x=>esc(x.sub||'-'))+row('예상 내구성',x=>x.life?x.life+'년':'-')
 +row('코트 수',x=>rs(x).length+'코트')+row('총 도막두께',x=>{const t=tot(x);return t?syNU(syFmtD(t)):'-'})
 +row('도장 시스템',x=>rs(x).map((r,j)=>'<div>'+(j+1)+'. '+esc(r.lb||'')+' '+esc(r.n)+'</div>').join(''))+'</table></div></div>';
 const e=document.createElement('div');e.id='cpm';e.innerHTML=h;e.addEventListener('click',ev=>{if(ev.target===e)e.remove()});document.body.appendChild(e)};
try{ndHero(window.SYM=='db'?3:0)}catch(x){}
})();
