(function(){
function d200(t){t=String(t||'').replace(/\s+/g,' ').trim();if(t.length<=200)return t;var c=t.slice(0,200),q=c.slice(100),j=Math.max(q.lastIndexOf('. '),q.lastIndexOf('다 '),q.lastIndexOf('다.'));
 if(j>=0)return c.slice(0,100+j+1).trim();return c.slice(0,199).trim()+'…'}
window.syDesc200=d200;
var _R=window.syReadSpecFile||syReadSpecFile;
window.syReadSpecFile=syReadSpecFile=async function(){var l=await _R.apply(this,arguments);try{(l||[]).forEach(function(x){var t=x.scope||(x.items||[]).map(function(i){return i.nt}).filter(Boolean).join(' ');if(t)x.scope=d200(t)})}catch(e){}return l};
var _O=window.syEdOpen||syEdOpen;
window.syEdOpen=syEdOpen=function(k){_O(k);try{if(SYE&&SYE.e&&SYE.e.scope&&SYE.e.scope.length>200){SYE.e.scope=d200(SYE.e.scope);syEdUi()}}catch(e){}};
var S=function(d,w){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||2)+'" stroke-linecap="round" stroke-linejoin="round">'+d+'</svg>'};
var IC={back:S('<path d="M15 5l-7 7 7 7"/>',2.6),
 del:S('<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>',2),
 doc:S('<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>'),
 txt:S('<path d="M4 7h16M4 12h16M4 17h10"/>',2.4),
 lay:S('<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5M3 17.5l9 5 9-5"/>'),
 gear:S('<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1"/>'),
 note:S('<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'),
 dn:S('<path d="M6 9l6 6 6-6"/>',2.6),
 minus:S('<path d="M5 12h14"/>',3),
 ok:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>',
 plus:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#1766e6"/><path d="M12 7v10M7 12h10" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/></svg>',
 therm:S('<path d="M10 14V5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0z"/>',1.8),
 clock:S('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',1.8),
 drop:S('<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',1.8),
 scale:S('<path d="M12 4v16M6 20h12M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z"/>',1.8)};
var KC=function(l){return l=='하도'?'k1':l=='중도'?'k2':l=='상도'?'k3':/실러/.test(l)?'k4':'k0'};
function tot(){var s=SYE.e,t=0;(s.items||[]).forEach(function(c){if(c.when)return;var d=+c.dft;if(d>0)t+=d*(+c.cnt>1?+c.cnt:1)});return t}
function fm(t){return t?(Math.round(t)/1000).toString():'0'}
window.syXTot=function(){var e=document.getElementById('sx-tt');if(e)e.innerHTML=fm(tot())+'<i>mm</i>'};
window.syEdUi=syEdUi=function(){
 var e=document.getElementById('syed'),fresh=!e;if(fresh){e=document.createElement('div');e.id='syed';document.body.append(e);e.onclick=null}
 e.className='sypk syed sx';
 var s=SYE.e,sc=fresh?0:(e.querySelector('.sx-bd')||{}).scrollTop||0,ro=SYE.k>=0,
 I=function(i,k,lab,ph,w){return '<label class="'+(w?'w2':'')+'"><small>'+lab+'</small><input type="text" value="'+esc(s.items[i][k]==null?'':s.items[i][k])+'" placeholder="'+(ph||'')+'" oninput="SYE.e.items['+i+'].'+k+'=this.value"></label>'},
 LBS=['하도','하도실러','중도','상도실러','상도','미지정'],pr=s.props=s.props||{},sc0=(s.scope||'');
 var rows=s.items.map(function(c,i){var cur=c.lb||'미지정',p=P(c.n);
  return '<div class="sx-r '+KC(cur)+'"><span class="sx-pl '+KC(cur)+'" style="border-radius:17px !important;clip-path:inset(0 round 17px)">'+esc(cur)+'<select onchange="SYE.e.items['+i+'].lb=this.value;syEdUi()" aria-label="구분">'+LBS.map(function(x){return '<option'+(cur==x?' selected':'')+'>'+x+'</option>'}).join('')+'</select></span>'
  +'<div class="sx-pw"><input style="border-radius:10px !important" type="text" autocomplete="off" value="'+esc(c.n)+'" placeholder="제품명·코드 입력" oninput="SYE.e.items['+i+'].n=this.value;syEdHint('+i+');syEdSg('+i+',-1,this.value)" onfocus="syEdSg('+i+',-1,this.value)" onblur="setTimeout(()=>syEdSgHide('+i+',-1),250)">'+IC.dn+'</div>'
  +'<div class="sx-d" style="border-radius:10px !important"><input type="number" inputmode="decimal" id="se-d'+i+'" value="'+esc(c.dft==null?'':c.dft)+'" placeholder="'+(p&&+p.dft?p.dft:'DFT')+'" onwheel="this.blur()" oninput="SYE.e.items['+i+'].dft=this.value;syXTot()"><em>μm</em></div>'
  +'<button type="button" class="sx-m" style="border-radius:50% !important" onclick="SYE.e.items.splice('+i+',1);syEdUi()" aria-label="삭제">'+IC.minus+'</button></div><div class="se-sg" id="se-sg'+i+'_m" hidden></div>'}).join('');
 var cd=s.items.map(function(c,i){return '<div class="sx-cd"><b>'+(i+1)+'. '+esc(c.lb||'미지정')+' '+esc(c.n||'')+'</b><div class="sx-dt">'+I(i,'cnt','횟수','1')+I(i,'mth','도장방법','B,R,S')+I(i,'thin','희석(최대)','≤5%')+I(i,'mix','혼합비','4:1 (부피비)')+I(i,'rc','재도장 간격','≥24시간')+I(i,'th','이론소요량','0.12 L/㎡')+I(i,'pot','가사시간','20℃ 4시간')+I(i,'svr','고형분 SVR(%)','58')+I(i,'nt','비고','',1)+'</div></div>'}).join('');
 var more='<details class="sx-mr"><summary>추가 설정 (코트별 상세·용도·사진·환경·대상·수명)</summary>'+cd
  +'<div class="se-g"><span>용도</span><div class="se-ch"><button type="button" class="'+((s.use||'est')=='est'?'on':'')+'" onclick="SYE.e.use=\'est\';syEdUi()">견적용</button><button type="button" class="'+(s.use=='lcc'?'on':'')+'" onclick="SYE.e.use=\'lcc\';syEdUi()">LCC용</button></div></div>'
  +'<div class="se-g"><span>대표 사진</span><div class="se-ph"><label class="se-pl'+(s.photo?'':' e')+'">'+(s.photo?'<img src="'+s.photo+'" alt="">':'<span>'+syIx.cam+'<small>사진 등록</small></span>')+'<input type="file" accept="image/*" onchange="syEdPhoto(this)" aria-label="사진 등록"></label>'+(s.photo?'<button type="button" class="se-pd" onclick="SYE.e.photo=\'\';syEdUi()">사진 삭제</button>':'')+'</div></div>'
  +'<div class="se-t"><span>'+syIx.star+'기본 시스템 지정</span><button type="button" class="se-sw'+(s.basic?' on':'')+'" onclick="SYE.e.basic=!SYE.e.basic;syEdUi()"><i></i></button></div>'
  +'<div class="se-t"><span>'+syIx.heart+'즐겨찾기</span><button type="button" class="se-sw'+(s.fav?' on':'')+'" onclick="SYE.e.fav=!SYE.e.fav;syEdUi()"><i></i></button></div>'
  +'<div class="se-g"><span>적용 환경 <small>(ISO 12944)</small><button type="button" class="se-auto" onclick="syEdAuto()">자동 판정</button></span><div class="se-ch">'+Object.keys(SYENV).map(function(c){return '<button type="button" class="'+(s.env==c?'on':'')+'" onclick="SYE.e.env=SYE.e.env==\''+c+'\'?\'\':\''+c+'\';syEdUi()">'+c+'</button>'}).join('')+'</div></div>'
  +'<div class="se-g"><span>대상</span><div class="se-ch">'+SYSUB.map(function(c){return '<button type="button" class="'+(s.sub==c?'on':'')+'" onclick="SYE.e.sub=SYE.e.sub==\''+c+'\'?\'\':\''+c+'\';syEdUi()">'+c+'</button>'}).join('')+'</div></div>'
  +'<label class="se-l">예상 수명 <small>(년)</small><input type="number" inputmode="decimal" value="'+esc(s.life)+'" placeholder="예: 12" oninput="SYE.e.life=this.value"></label></details>';
 var PC=[['heat','최대 내열온도',IC.therm,'1200 °C',['80 °C','120 °C','150 °C','200 °C','1200 °C']],['dry','건조시간',IC.clock,'24 시간',['4 시간','8 시간','12 시간','24 시간','48 시간']],['dil','희석제',IC.drop,'신나',['신나','물','전용 신나']],['mixr','혼합비율',IC.scale,'100 : 10',['100 : 10','4 : 1','3 : 1','1 : 1']]];
 e.innerHTML='<div class="sx-hd"><button type="button" onclick="syEdClose()" aria-label="뒤로">'+IC.back+'</button><b>'+(SYE.k<0?(SYE.imp!=null?'읽은 결과 확인':'새 시스템 추가'):'사양 수정')+'</b>'+(ro?'<button type="button" onclick="syEdDel()" aria-label="삭제">'+IC.del+'</button>':'')+'</div>'
 +'<div class="sx-bd">'
 +'<div class="sx-lb">'+IC.doc+'사양명</div><input class="sx-in" style="font-weight:700 !important;font-size:17px !important" type="text" value="'+esc(s.name)+'" placeholder="예: [기본] C5 중방식 철재" oninput="SYE.e.name=this.value">'
 +'<div class="sx-lb">'+IC.txt+'사양 설명 <small>(200자 이내)</small></div><textarea class="sx-ta" maxlength="200" placeholder="사양의 적용 범위·특징을 입력하세요" oninput="SYE.e.scope=this.value;document.getElementById(\'sx-cn\').textContent=this.value.length+\' / 200\'">'+esc(sc0)+'</textarea><div class="sx-cn" id="sx-cn">'+sc0.length+' / 200</div>'
 +'<div class="sx-lb">'+IC.lay+'도장 시스템 구성</div><div class="sx-tl">'+rows+'</div>'
 +'<button type="button" class="sx-add" style="border-radius:10px !important" onclick="SYE.e.items.push({lb:SYST[Math.min(SYE.e.items.length,2)],n:\'\',dft:\'\'});syEdUi()">'+IC.plus+'도장 단계 추가</button>'
 +'<div class="sx-tot">'+IC.lay+'<span>총 도막두께</span><b id="sx-tt">'+fm(tot())+'<i>mm</i></b></div>'
 
 +more+'</div>'
 +'<div class="sx-ft"><button type="button" class="c" style="border-radius:12px !important" onclick="syEdClose()">취소</button><button type="button" class="s" style="border-radius:12px !important" onclick="syEdSave()">'+IC.ok+'저장</button></div>'
 +'<datalist id="sy-dl">'+(typeof DB!='undefined'?DB:[]).slice(0,3000).map(function(p){return '<option value="'+esc(p.n)+'">'}).join('')+'</datalist>';
 e.style.setProperty('--rc2','7px');e.querySelectorAll('input:not([type=file]):not([type=checkbox]),textarea,.sx-d,.sx-pw input,.sx-dt input,.sx-add,.sx-ft button,details.sx-mr,.se-ch button,.se-l input,.se-pl,.sx-cd').forEach(function(x){x.style.setProperty('border-radius','7px','important')});
 var hd=e.querySelector('.sx-hd');if(hd){var u=hero();hd.style.backgroundImage=u?'linear-gradient(90deg,rgba(10,79,209,.95) 0,rgba(10,79,209,.55) 50%,rgba(10,79,209,.1) 100%),url('+u+')':'linear-gradient(165deg,#0a4fd1,#2f80f0)'}
 if(sc){var q=e.querySelector('.sx-bd');if(q)q.scrollTop=sc}
};
var HU;function hero(){if(HU!==undefined)return HU;HU='';try{document.querySelectorAll('style').forEach(function(st){if(HU)return;var m=/#hx\.hn1 \.hni\{background:[^}]*?url\((data:image\/jpeg;base64,[A-Za-z0-9+\/=]+)\)/.exec(st.textContent);if(m)HU=m[1]})}catch(e){}return HU}
})()
