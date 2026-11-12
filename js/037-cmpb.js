/* v494 제품 비교 ↔ 본체 다리: 제품 DB · 도장 시스템 읽기 / 제품 변경 적용 (compare.html 이 같은 출처 iframe 으로 사용) */
window.CMPB=(function(){
 const pkL=p=>{const m=mx(p).m;return m>0?(UN(p)=='kg'&&+p.sg>0?m/+p.sg:m):0};
 const dryTx=p=>{const R=String(p.dry||'').split(/[;\n]/).map(x=>x.trim()).filter(Boolean).map(r=>r.split('/').map(x=>x.trim()));if(!R.length)return'';let b=R[0];R.forEach(r=>{if(Math.abs((parseFloat(r[0])||20)-20)<Math.abs((parseFloat(b[0])||20)-20))b=r});const h=v=>v&&v!='-';return [h(b[1])?'지촉 '+b[1]:'',h(b[2])?'고화 '+b[2]:''].filter(Boolean).join(' / ')+(h(b[0])?' ('+b[0]+(/℃|°/.test(b[0])?'':'℃')+')':'')};
 const nz=s=>String(s||'').toLowerCase().replace(/[\s\-_·.()\/]/g,'');
 const rowOf=p=>({n:p.n,mf:p.mf||'',g:p.g||'',us:p.us||'',svr:+p.svr||0,dft:+p.dft||0,packL:pkL(p),dry:dryTx(p),pot:p.pot||'',mixr:'',re:'',certs:''});
 function layer(i){const c=SY.layers[i];if(!c||!c.n)return null;const p=PC(c.n),e=ev(c,p),g=SY.groups[c.g]||{},A=+c.area||+g.area||+SY.area||0,k=pkL(p);
  return{i,lb:syLbFull(i),n:c.n,mf:p.mf||'',svr:e.svr,dft:e.dft,loss:e.loss,priceL:k>0&&+c.price>0?+c.price/k:0,pkL:k,area:A,dry:dryTx(p),pot:p.pot||''}}
 return{
  db(q,max){const k=nz(q),out=[];for(let i=0;i<DB.length&&out.length<(max||40);i++){const p=DB[i];if(!p||!p.n)continue;if(!k||nz([p.n,p.g,p.us,p.mf,p.d].join(' ')).includes(k))out.push(rowOf(p))}return out},
  layers(){return SY.layers.map((c,i)=>layer(i)).filter(Boolean)},
  layer,
  apply(i,name,priceL){const c=SY.layers[i];if(!c)return{ok:false,msg:'도장 시스템 코트를 찾지 못했습니다'};const p=PX(name);if(!p)return{ok:false,msg:'제품 DB에서 「'+name+'」을(를) 찾지 못했습니다'};
   c.n=p.n;delete c.svr;const k=pkL(p);if(priceL>0&&k>0)c.price=Math.round(priceL*k);syS();try{syRender()}catch(e){}try{tt('도장 시스템 제품을 변경했습니다<br><small>'+esc(p.n)+'</small>')}catch(e){}return{ok:true}},
  pdfText:(f,m)=>pdfText(f,m),ocrImg:(f,s)=>ocrImg(f,s),lx:()=>lx(),
  /* v515 제품 DB 와 같은 인식(pdfLines→parseAll→applySpec)으로 파일 1개를 읽어 제품 값으로 돌려줌 */
  async tds(f,say){const isImg=/^image\//.test(f.type)||/\.(png|jpe?g|webp|bmp)$/i.test(f.name);if(!isImg&&!/pdf/i.test(f.type+f.name))return null;
   let L=isImg?await ocrImg(f,say):await pdfLines(f,say);return this.lines(L,f.name,!isImg&&!L.ocr?f:null,say)},
  async lines(L,fname,f,say){const sp=parseAll(L),pt=parsePot(L);let d=parseDry(L);const p={n:'',g:'',d:'',tc:'',ts:0,un:'ℓ',pk:'',mk:'',tr:0,tn:''};applySpec(p,sp,true);if(pt)p.pot=pt;if(d)p.dry=d;
   if(f&&(!sp.svr||!sp.sg||!sp.d)){try{say&&say('글자 인식(OCR)으로 빠진 항목을 보완하는 중…');const O=await ocrLines(f,say),s2=parseAll(O),t={};for(const k in s2)if(!p[k]&&s2[k]!=null&&s2[k]!=='')t[k]=s2[k];if(+p.mk){delete t.pack;delete t.pk;delete t.mk;delete t.mixa;delete t.mixb}applySpec(p,t,false);if(!p.dry){const d2=parseDry(L.concat(O));if(d2)p.dry=d2}}catch(e){}}
   p.n=(fname?String(fname).replace(/\.[^.]+$/,'').trim():'')||sp.hname||'';const r=rowOf(p);r.n=p.n||sp.hname||'';r.d=p.d||'';r.sg=+p.sg||0;r.un=UN(p);r.fn=p.n;r.sp=p.sp||'';return r}
 }})();
