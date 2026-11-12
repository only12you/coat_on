(function(){
var KC=function(l){return l=='하도'?'k1':l=='중도'?'k2':l=='상도'?'k3':'k0'};
var _P=window.syLibPage||syLibPage;
window.syLibPage=syLibPage=function(){_P.apply(this,arguments);try{cx()}catch(e){}};
function cx(){var e=document.getElementById('sylib');if(!e)return;var A=syLibGet();
 if(!e.querySelector('.cx-st')){var mf={},last=0;A.forEach(function(x){(x.items||[]).forEach(function(i){var m=i.mf||i.m||i.mk;if(m&&typeof m=='string')mf[m]=1});if(x.ts>last)last=x.ts});
  var d=last?new Date(last):null,ds=d?d.getFullYear()+'.'+String(d.getMonth()+1).padStart(2,'0')+'.'+String(d.getDate()).padStart(2,'0'):'-';
  var h='<div class="cx-st"><div><small>등록 사양 수</small><b>'+A.length+'</b></div><div><small>제조사 수</small><b>'+(Object.keys(mf).length||'-')+'</b></div><div><small>최근 등록일</small><b style="font-size:14px;line-height:23px">'+ds+'</b></div></div>'+(window.SYPK?'<div class="cx-pk">불러올 사양을 선택하세요 (카드를 누르거나 체크 후 ‘불러오기’)</div>':'');
  var sr=e.querySelector('.lb-sr');if(sr)sr.insertAdjacentHTML('beforebegin',h);else e.insertAdjacentHTML('afterbegin',h)}
 e.querySelectorAll('.lb-c').forEach(function(c){if(c.dataset.cx)return;var nm=c.querySelector('.lb-nm');if(!nm)return;
  var x=A.find(function(a){return a.name==nm.textContent}),k=A.indexOf(x);if(!x)return;c.dataset.cx=1;
  var ck=c.querySelector('.lb-ck'),dt=c.querySelector('.lb-dt'),mn=c.querySelector('.lb-mn');
  var rows=syLibRows(x),tot=rows.reduce(function(a,r){return a+(r.w?0:r.d)},0),show=rows.slice(0,4),more=rows.length-show.length;
  var meta=[x.env,x.sub,x.life?x.life+'년 이상':''].filter(Boolean).join(' · ')||(x.spec?'사양서':'견적 · LCC');
  var ph=''+(typeof ndSpPh=='function'?'':'');
  var L=show.map(function(r,j){var lb=r.lb||['하도','중도','상도'][j]||'코트';return '<div class="cx-r"><em class="'+KC(lb)+'">'+esc(lb)+'</em><span>'+esc(r.n)+(r.a?' 외 '+r.a:'')+(r.c>1?' ×'+r.c:'')+'</span></div>'}).join('')||'<div class="cx-more">구성 없음</div>';
  c.innerHTML='<div class="cx-h"></div><div class="cx-b"><div class="cx-l">'+L+(more>0?'<div class="cx-more">외 '+more+'개 코트</div>':'')+'</div><div class="lb-tt cx-tt"><small>총 도막두께</small><b>'+(tot?syNU(syFmtD(tot)):'-')+'</b></div></div>';
  var h=c.querySelector('.cx-h');if(ck)h.appendChild(ck);
  h.insertAdjacentHTML('beforeend','<div class="cx-t"><b class="lb-nm">'+esc(x.name)+'</b><div class="cx-meta">'+esc(meta)+'</div></div>');
  if(dt)h.appendChild(dt);
  h.insertAdjacentHTML('beforeend','<button type="button" class="lb-gt" aria-label="보기" onclick="syLibView('+k+')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg></button>');
  if(mn)c.insertBefore(mn,c.querySelector('.cx-b'));
  c.onclick=function(ev){if(!window.SYPK)return;if(ev.target.closest('button,label,input'))return;syLibUse(k)}})}
window.syLibSheet=function(){window.SYRET=+document.body.dataset.pg||2;window.SYPK=1;try{SYF.q='';SYF.mn=-1}catch(e){}window.SYM='db';window.SYK=1;try{T(3)}finally{window.SYK=0}};
var _U=window.syLibUse||syLibUse;
window.syLibUse=syLibUse=function(k){var lcc=window.SYLCC;if(lcc){window.SYLCC=null;window.SYPK=0;window.SYM='sys';var p=window.SYRET||9;try{T(p)}catch(e){}return lcc(k)}window.SYPK=0;return _U(k)};
var _H=window.hdr||hdr;
window.hdr=hdr=function(n){if(!(n==3&&window.SYM=='db')){window.SYPK=0;window.SYLCC=null}return _H.apply(this,arguments)};
})()
