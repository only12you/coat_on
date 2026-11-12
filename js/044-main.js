/* ===== v560: 사양 DB(도장시스템 DB) 시안 ===== */
(function(){
const SP_T=['건축','플랜트','공업','기타'],SP_S=['수성','유성','방수','바닥','건축기타'];
window.ndSpTy=function(x){const nm=String(x.name||''),it=(x.items||[]).map(i=>i.n+' '+(i.alt||[]).map(a=>a.n).join(' ')).join(' '),T=[nm,x.scope||'',x.sub||'',it].join(' ');
 const wb=/수성|수용성|수계|에멀|워터|water/i.test(T)||(typeof WBX=='function'&&WBX(T,''));
 const rf=/방수|옥상|지붕/.test(T),fl=/바닥|floor|주차장|마루|라이닝/i.test(T);
 const pl=/플랜트|정유|석유|화학|탱크|해양|조선|선박|발전|배관|고내식|내열|내약품|ISO/i.test(T)||/^(C5|CX)$/.test(x.env||'');
 const bd=/건축|아파트|외벽|내벽|주택|건물|공동주택|콘크리트|실내|내화|벽체/.test(T)||/콘크리트|옥상/.test(x.sub||'');
 const ind=/공업|공장|산업|철재|철골|철구조|강구조|기계|설비|구조물|교량/.test(T);
 let t,s='';
 if(rf||fl){t='건축'}else if(pl){t='플랜트'}else if(bd){t='건축'}else if(ind){t='공업'}else{t='기타'}
 if(t=='건축'){s=rf?'방수':fl?'바닥':wb?'수성':/유성|에폭시|우레탄|알키드|용제|불소|실리콘|징크|아크릴|우레아/.test(T)?'유성':'건축기타'}
 return {t,s}};
const IC={건축:'<rect x="5" y="3" width="10" height="18" rx="1.5"/><rect x="15" y="9" width="5" height="12" rx="1.5"/><path d="M8 7h4M8 11h4M8 15h4"/>',
 플랜트:'<path d="M5 21V11l3-2v12M8 21V6l3.5-3L15 6v15M15 21v-8l4 2v6"/><path d="M3 21h18"/>',
 공업:'<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>',
 기타:'<path d="M9 3h6M10 3v6l-5.5 9.5A1.5 1.5 0 0 0 5.8 21h12.4a1.5 1.5 0 0 0 1.3-2.5L14 9V3"/><path d="M7.5 15h9"/>'};
const sv=(d,w)=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||2)+'" stroke-linecap="round" stroke-linejoin="round">'+d+'</svg>';
window.ndSpPh=function(x){const t=ndSpTy(x).t;return '<span class="lb-ph t-'+SP_T.indexOf(t)+'">'+(x.photo?'<img alt="" src="'+x.photo+'">':sv(IC[t],1.8))+'</span>'};
window.ndSpTags=function(x){const t=ndSpTy(x),a=[t.t,t.s,x.env,x.sub].filter(Boolean).slice(0,4);return '<div class="lb-tgs">'+a.map(v=>'<span>'+esc(v)+'</span>').join('')+'</div>'};
const _L=syLibList;
syLibList=function(){let R=_L();const ty=SYF.ty||'all',st=SYF.st||'all',so=SYF.so||'new';
 if(ty!='all')R=R.filter(([x])=>ndSpTy(x).t==ty);
 if(ty=='건축'&&st!='all')R=R.filter(([x])=>ndSpTy(x).s==st);
 R=R.slice();if(so=='name')R.sort((a,b)=>String(a[0].name).localeCompare(String(b[0].name),'ko',{numeric:true}));
 else if(so=='fav')R.sort((a,b)=>(!!b[0].fav-!!a[0].fav)||((b[0].ts||0)-(a[0].ts||0)));
 else R.sort((a,b)=>(b[0].ts||0)-(a[0].ts||0));
 return R};
window.ndTy=function(t){SYF.ty=SYF.ty==t?'all':t;SYF.st='all';SYF.mn=-1;syLibPage()};
window.ndSt=function(t){SYF.st=SYF.st==t?'all':t;SYF.mn=-1;syLibPage()};
window.ndSo=function(v){SYF.so=v;syLibPage()};
window.ndAll=function(){SYF.ty='all';SYF.st='all';SYF.k='all';SYF.q='';SYF.fo=false;syLibPage()};
function ndLib(){const e=document.getElementById('sylib');if(!e)return;e.classList.toggle('fo',!!SYF.fo);
 const sr=e.querySelector('.lb-sr'),ls=e.querySelector('.lb-ls');if(!sr||!ls)return;
 e.querySelectorAll('.ndtb,.ndty,.ndcb').forEach(n=>n.remove());
 const ty=SYF.ty||'all',st=SYF.st||'all',so=SYF.so||'new',tot=syLibGet().length,n=syLibList().length;
 const tb='<div class="ndtb"><button type="button" onclick="T(1)">'+sv('<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>')+'<span>제품 DB</span></button><button type="button" onclick="try{aptDbOpen()}catch(e){}">'+sv(IC.건축)+'<span>단지 DB</span></button><button type="button" class="on">'+sv('<rect x="3.5" y="3.5" width="14" height="6" rx="1.8"/><path d="M17.5 6.5H20v5.5h-8v3"/><rect x="10" y="15" width="4" height="6" rx="1.2"/>')+'<span>도장시스템</span></button></div>';
 const tl=SP_T.map(t=>'<button type="button" class="'+(ty==t?'on':'')+'" onclick="ndTy(\''+t+'\')">'+sv(IC[t])+'<b>'+t+'</b>'+(ty==t?'<i></i>':'')+'</button>').join('');
 const sc=ty=='건축'?'<div class="ndsc">'+SP_S.map(t=>'<button type="button" class="'+(st==t?'on':'')+'" onclick="ndSt(\''+t+'\')">'+t+'</button>').join('')+'</div>':'';
 const sec='<div class="ndty"><div class="ndsh"><span class="ndgi">'+sv('<rect x="3.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.6"/>',2.2)+'</span><b>건축유형</b><button type="button" class="ndal" onclick="ndAll()">전체보기 ›</button></div><div class="ndtl">'+tl+'</div>'+sc+'</div>';
 const cb='<div class="ndcb"><span class="ndbi">'+sv('<rect x="4" y="12" width="4" height="8" rx="1"/><rect x="10" y="6" width="4" height="14" rx="1"/><rect x="16" y="9" width="4" height="11" rx="1"/>',2.2)+'</span><b>총 '+n+'건의 사양'+(n==tot?'':' <small>(전체 '+tot+')</small>')+'</b><select aria-label="정렬" onchange="ndSo(this.value)"><option value="new"'+(so=='new'?' selected':'')+'>최신순</option><option value="name"'+(so=='name'?' selected':'')+'>이름순</option><option value="fav"'+(so=='fav'?' selected':'')+'>즐겨찾기순</option></select></div>';
 sr.insertAdjacentHTML('beforebegin',tb);ls.insertAdjacentHTML('beforebegin',sec+cb)}
const _P=syLibPage;
syLibPage=function(){_P.apply(this,arguments);try{ndLib()}catch(x){}};
})();
