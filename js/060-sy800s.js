(function(){
window.syTdsPill=function(i,nm){var st='event.preventDefault();event.stopPropagation();',ex='SY.layers['+i+'].n';return '<span class=psb><button type=button class="zsp no" data-t="'+(nm||'~c'+i)+'" onclick="'+st+'tds('+ex+','+i+')">'+IC.doc+'<span>미첨부</span></button><button type=button class="zsp at" onclick="'+st+'att('+ex+','+i+')"><span>첨부</span></button><button type=button class="zsp dl" onclick="'+st+'tdel('+ex+','+i+')"><span>삭제</span></button><button type=button class="zsp ed" onclick="'+st+'syPdEdt('+i+')"><span>제품 수정</span></button></span>'};
window.syPdEdt=function(i){var c=SY.layers[i],p=c&&PC(c.n),j=p?DB.indexOf(p):-1;if(j<0)return tt('DB에 등록된 제품만 수정할 수 있습니다');pdOpen(j)};
/* 제품 직접 입력(검색·선택·생성) — 일위대가표와 동일 */
window.sySetN=function(i,n){var c=SY.layers[i];if(!c||c.n==n)return;c.n=n;['dft','svr','loss','tr','price','tprice'].forEach(function(k){delete c[k]});syS();syRender()};
window.sySg=function(i,q){var b=document.getElementById('sycb'+i);if(!b)return;q=(q||'').trim().toLowerCase();var L=[];DB.forEach(function(p,j){if(!q||(p.n+' '+(p.g||'')).toLowerCase().indexOf(q)>=0)L.push([p,j])});L=L.slice(0,40);
 b.innerHTML=L.length?L.map(function(x){return '<div onclick="syPk('+i+','+x[1]+')"><b>'+esc(x[0].n)+'</b><br><small>'+esc(x[0].g||'')+'</small></div>'}).join(''):'<div><small>일치하는 제품이 없습니다</small></div>';b.hidden=false};
window.syPk=function(i,j){if(DB[j])sySetN(i,DB[j].n)};
window.syChgN=function(i,v){v=(v||'').trim();setTimeout(function(){if(!v)return syRender();if(PC(v))return sySetN(i,v);var q=v.toLowerCase(),m=DB.filter(function(p){return p.n.toLowerCase()==q});if(m.length)return sySetN(i,m[0].n);tt('DB에 있는 제품을 선택하세요<br><small>새 제품은 “+ 생성”으로 직접 입력합니다</small>');syRender()},0)};
window.syCuOn=function(i){var c=SY.layers[i];if(!c)return;c.cu=true;c.cp=c.cp||{un:'ℓ'};SY.act=i;syS();syRender()};
window.syCuOff=function(i){var c=SY.layers[i];if(!c)return;c.cu=false;syS();syRender()};
window.syCU=function(i,k,v){var c=SY.layers[i];if(!c)return;(c.cp=c.cp||{})[k]=v;syS()};
window.syCuForm=function(i,c){var d=c.cp||{},f=function(l,k,ic,ph,tx){return '<div class=cell><div class=lb>'+(CI[ic]||'')+'<span>'+l+'</span></div><input '+(tx?'':'type=number inputmode=decimal ')+'placeholder="'+(ph||'')+'" value="'+esc(d[k]==null?'':d[k])+'" oninput="syCU('+i+',\''+k+'\',this.value)"></div>'},
 g=function(l,k,ic,ph){return '<div class=cell><div class=lb>'+(CI[ic]||'')+'<span>'+l+'</span></div><input type=number inputmode=decimal placeholder="'+(ph||'')+'" value="'+esc(c[k]==null?'':c[k])+'" oninput="syIn('+i+',\''+k+'\',this.value)"></div>'};
 return '<div class=cbd><div><div class="cbox neon"><div class=prow><div class=pin><input placeholder="제품명 입력 (필수)" value="'+esc(d.n==null?'':d.n)+'" oninput="syCU('+i+',\'n\',this.value)"></div><button type=button class="gb gen" onclick="syCuOff('+i+')">목록 선택</button></div><div class=rec>직접 입력 모드 · 입력한 값으로 새 제품이 DB에 등록되고 바로 계산됩니다</div>'
 +'<div class=ccard><div class=cch><span class=cci>'+CI.flask+'</span><div><b>소요량 및 조건</b><small>Consumption &amp; Condition</small></div><label class=carea><span>면적 [m²]</span><input type=number inputmode=decimal placeholder="기본면적" value="'+esc(c.area==null?'':c.area)+'" oninput="syIn('+i+',\'area\',this.value)"></label></div>'
 +'<div class="cg3 cg4">'+f('DFT [μm]','dft','dft')+f('SVR (%)','svr','svr')+f('Loss (%)','loss','loss','10')+f('희석율 (%)','tr','tr')+'</div><div class="cg3 cgp">'+g('제품단가 [원/1말]','price','price')+g('희석제 단가 [원]','tprice','price')+'</div></div>'
 +'<div class=ccard><div class=cch><span class=cci>'+CI.th+'</span><div><b>제품 정보</b><small>Product Information</small></div><div class=cuact2><button type=button class=a4 onclick="syCuSave('+i+')">저장·계산</button></div></div><div class=cg3><div class=cell><div class=lb>'+CI.flask+'<span>단위</span></div><select onchange="syCU('+i+',\'un\',this.value)"><option value="ℓ"'+(d.un!='kg'?' selected':'')+'>ℓ (리터)</option><option value="kg"'+(d.un=='kg'?' selected':'')+'>kg</option></select></div>'+f('혼합규격 1말','mk','svr','예: 18')+f('출고규격 (주제)','pk','svr','단액형 비움')+f('비중','sg','svr','kg일 때')+f('희석제 규격','ts','tr','예: 18')+f('제조사','mf','th','예: KCC',1)+'</div><div class=cg2>'+f('일반명 · 용도','g','th','예: 에폭시 하도',1)+f('희석제명','tn','tr','없으면 비움',1)+'</div></div>'
 +'<div class=hint>제품명만 필수입니다. 나머지는 비워 두면 입력한 값으로 계산됩니다</div></div></div></div>'};
window.syCuSave=function(i){var c=SY.layers[i],d=(c&&c.cp)||{},n=String(d.n||'').trim();if(!c)return;if(!n)return tt('제품명을 입력하세요');if(DB.some(function(q){return q.n==n}))return tt('같은 이름의 제품이 이미 있습니다<br><small>“목록 선택”으로 고르거나 제품명을 바꿔 주세요</small>');
 var g=function(k){return d[k]!==undefined&&d[k]!==''&&isFinite(+d[k])?+d[k]:0},mk=g('mk')||g('pk'),pk=g('pk')||mk,p={n:n,mf:String(d.mf||'').trim(),g:d.g||'',us:d.g||'',d:'',tc:'',ts:g('ts'),url:'',un:d.un||'ℓ',pk:pk,mk:mk,tn:d.tn||'',tr:g('tr')?g('tr')/100:0,cu:1};
 if(g('sg'))p.sg=g('sg');if(g('svr'))p.svr=g('svr');if(g('dft'))p.dft=g('dft');if(p.svr&&p.dft)p.th=+(p.svr*10/p.dft).toFixed(4);
 DB.push(p);c.n=n;c.dft=c.tr='';c.loss=d.loss!==undefined?d.loss:'';c.svr=p.svr||'';c.cu=false;delete c.cp;syS();try{if(typeof sv=='function')sv()}catch(e){}syRender();try{dbl()}catch(e){}tt('직접 입력한 제품을 등록했습니다<br><small>'+esc(n)+'</small>')};
window.syDelAsk=function(i){try{ask('이 코트를 삭제할까요?',function(){syRmL(i)})}catch(e){syRmL(i)}};
var _sc=syCalc;syCalc=function(){var r=_sc.apply(this,arguments);try{syCCup()}catch(e){}return r};
window.syCCup=function(){try{SY.layers.forEach(function(c,i){var d=syLay(i),h=document.getElementById('syh'+i),te=document.getElementById('syth'+i),ae=document.getElementById('syac'+i),ce=document.getElementById('syca'+i);
 var st=function(e,t,emp){if(e){e.textContent=t;e.classList.toggle('emp',!!emp)}};
 if(!d.r){if(h)h.textContent='';st(te,'자동 계산됩니다.',1);st(ae,'자동 계산됩니다.',1);st(ce,'자동 계산됩니다.',1);return}
 var s=d.r.reduce(function(a,x){return a+x.amt},0),cA=d.a.ac>0?d.a.pk/d.a.ac:0;
 if(h)h.textContent=((function(){try{return tdsHh(PC(c.n),d.u,d.a)}catch(_){return '실제 '+F(d.a.ac)+d.u+'/㎡'}})())+' · ㎡당 '+F(s,0)+'원'+(cA>0?' · 캔당 '+F(cA,1)+'㎡':'');
 st(te,F(d.a.th));st(ae,F(d.a.ac));try{tdsFx(PC(c.n),d.u,d.a,te,ae)}catch(_){}st(ce,cA>0?F(cA,1):'자동 계산됩니다.',cA<=0)})}catch(e){}};
/* 일위대가표(#cs) 스타일을 도장 시스템(#v3)에도 그대로 적용 */
var done=0;function clone(){if(done)return;done=1;var out=[];
 function walk(rs,wrap){for(var i=0;i<rs.length;i++){var r=rs[i];if(r.cssRules&&!r.selectorText){var inner=[];walk(r.cssRules,inner);if(inner.length){var head=r.cssText.slice(0,r.cssText.indexOf('{')+1);out.push(head+inner.join('\n')+'}')}continue}
  if(r.selectorText&&/#cs\b/.test(r.selectorText)){var sel=r.selectorText.split(',').filter(function(x){return /#cs\b/.test(x)}).map(function(x){return x.replace(/#cs\b/g,'#v3')}).join(',');var t=r.cssText.slice(r.cssText.indexOf('{'));(wrap||out).push(sel+t)}}}
 for(var j=0;j<document.styleSheets.length;j++){var ss=document.styleSheets[j];if(ss.ownerNode&&ss.ownerNode.id=='sy800clone')continue;var rs;try{rs=ss.cssRules}catch(e){continue}if(rs)walk(rs,null)}
 var st=document.createElement('style');st.id='sy800clone';st.textContent=out.join('\n');document.head.appendChild(st)}
if(document.readyState=='complete')setTimeout(clone,0);else window.addEventListener('load',function(){setTimeout(clone,0)});
})();
