/* v518: 도장사양서 인식 보강 — OCR·표기 정규화, 번호·콜론·영문·불릿 표기, 자유 형식 보조 해석 */
(function(){
'use strict';
const FW={'０':'0','１':'1','２':'2','３':'3','４':'4','５':'5','６':'6','７':'7','８':'8','９':'9'};
function fixLine(x){
 let t=String(x==null?'':x).replace(/[\u3000\u00a0\u2009\u200b]/g,' ');
 t=t.replace(/[０-９]/g,c=>FW[c]).replace(/％/g,'%').replace(/[～〜∼]/g,'~').replace(/：/g,':').replace(/[–—−]/g,'-');
 /* 한 글자씩 띄어 인식된 구간 합치기 (3글자 이상) */
 t=t.replace(/(?:^|(?<=\s))(?:[가-힣A-Za-z0-9%.:~\-()±\/㎛㎡℃,][ ]){2,}[가-힣A-Za-z0-9%.:~\-()±\/㎛㎡℃,](?=\s|$)/g,m=>m.replace(/ /g,''));
 /* 숫자 토큰 안의 O/l/I 혼동 */
 t=t.replace(/(?<![A-Za-z가-힣])[0-9OolI][0-9OolI.,:~\-±]*%?(?![A-Za-z가-힣])/g,tok=>/\d/.test(tok)?tok.replace(/[Oo]/g,'0').replace(/[lI]/g,'1'):tok);
 /* 단위 */
 t=t.replace(/(\d+(?:\.\d+)?)(?:\s*[~\-]\s*(\d+(?:\.\d+)?))?\s*mils?\b/gi,(m,a,b)=>Math.round(+a*25.4)+(b?'~'+Math.round(+b*25.4):'')+'㎛');
 t=t.replace(/[µμ]\s*m\b/g,'㎛').replace(/(\d)\s*(?:um|micro(?:n|ns|meters?|metres?)|마이크론|미크론)(?![A-Za-z])/gi,'$1㎛')
    .replace(/\bm\s*[²2]\s*\/\s*(?:l|L|ℓ|lit(?:re|er)s?|ltr)\b/g,'㎡/L').replace(/m²/g,'㎡');
 t=t.replace(/^[•·▪■□◦○●◆◇▶▷►]\s*/,'');
 return t.replace(/[ \t]+/g,' ').trim();
}
const N=s=>parseFloat(String(s).replace(/,/g,''));
const SG_START=/^(하도실러|중도실러|상도실러|하도|중도|상도)(?=[가-힣A-Za-z0-9])/;
const PAINT=/(도료|프라이머|프라이마|에폭시|우레탄|아크릴|징크|실리콘|불소|실러|코팅|상도|중도|하도|방수|퍼티|내화|알키드|primer|epoxy|polyurethane|acrylic|zinc|silicone|fluoro|coating|paint|finish)/i;
function stageOf(n){n=String(n||'');return /(하도|프라이머|프라이마|징크|방청|primer|zinc)/i.test(n)&&!/상도|중도/.test(n)?'하도':/(상도|톱코트|finish|top)/i.test(n)?'상도':/(중도|MIO|미스트|intermediate)/i.test(n)?'중도':''}

/* 자유 형식: 단계 + 제품명 + 두께 (줄 단위) */
function spFree(F,fname){
 const items=[];let cur='';
 for(let i=0;i<F.length;i++){
  const l=String(F[i]).replace(/^[•·▪■□◦○●◆◇▶▷►\-–*]\s*/,'');if(/습윤|WFT|wet\s*film/i.test(l))continue;
  let m=l.match(/^(?:\d+\s*[).]\s*)?(하도실러|중도실러|상도실러|하도|중도|상도)\s*$/);if(m){cur=m[1];continue}
  m=l.match(/^(?:\d+\s*[).]\s*)?(하도실러|중도실러|상도실러|하도|중도|상도|실러)\s+(.*)$/);
  let lb='',rest=l;
  if(m){lb=m[1];rest=m[2];cur=lb}else{lb=cur;rest=l.replace(/^(?:\d+\s*[).]\s*)/,'')}
  let t=rest.match(/^(.*?)\s*(\d[\d,]*(?:\.\d+)?)\s*(㎛|μm|µm|㎜|mm)(?![A-Za-z])\s*(?:[x×]\s*)?(?:(\d)\s*회)?/);
  if(!t||!/[가-힣A-Za-z]/.test(t[1])){const q=rest.match(/^(?:도막\s*)?(\d[\d,]*(?:\.\d+)?)\s*(㎛|μm|µm|㎜|mm)(?![A-Za-z])\s*(?:[x×]\s*)?(?:(\d)\s*회)?\s*(.+)$/);if(q)t=[q[0],q[4],q[1],q[2],q[3]]}
  if(!t)continue;
  let name=t[1].replace(/^[\s:：\-–·•]+|[\s:：,\-–·]+$/g,'').replace(/\s*[(（]\s*(?:도막|건조\s*도막|DFT)\s*$/,'').replace(/\s*\d\s*회$/,'').replace(/\s+\d$/,'').trim();
  if(!/[가-힣A-Za-z]/.test(name)||name.length>40||!PAINT.test(name)&&!m)continue;
  if(!lb)lb=stageOf(name)||(/내화/.test(name)?'중도':'')||cur;if(!lb)continue;
  let d=N(t[2]);if(/㎜|mm/i.test(t[3]))d*=1000;if(!(d>=5&&d<=9999))continue;
  const it={lb,n:name,dft:Math.round(d*10)/10};if(t[4]&&+t[4]>1)it.cnt=+t[4];items.push(it);
 }
 if(items.length<2)return null;
 let title=String(F[0]||'').replace(/도장\s*사양서|표준\s*시방서|시방서|도장\s*사양|coating\s*specification/ig,'').replace(/^[\s\-–:·]+|[\s\-–:·]+$/g,'').trim();
 if(!title||title.length>40||/\d{2,}\s*(?:㎛|mm)/.test(title))title=String(fname||'').replace(/\.[^.]+$/,'')||'사양서 시스템';
 return {name:title,scope:'',sub:'',env:'',life:'',spec:1,src:fname||'',items};
}

if(typeof syParseSpec==='function'){
 const S0=syParseSpec;
 const EN=[[/^(?:\d+\s*[).]\s*)?(?:primer|prime\s*coat|base\s*coat|1st\s*coat|first\s*coat)\b\s*[:\-]?\s*/i,'하도 '],[/^(?:\d+\s*[).]\s*)?(?:intermediate(?:\s*coat)?|mid(?:dle)?\s*coat|2nd\s*coat|second\s*coat|build\s*coat)\b\s*[:\-]?\s*/i,'중도 '],[/^(?:\d+\s*[).]\s*)?(?:top\s*coat|topcoat|finish(?:ing)?\s*coat|final\s*coat|3rd\s*coat|finish)\b\s*[:\-]?\s*/i,'상도 '],[/^(?:\d+\s*[).]\s*)?(?:sealer|seal\s*coat)\b\s*[:\-]?\s*/i,'실러 ']];
 syParseSpec=function(raw,fname){
  const R0=(raw||[]).map(x=>String(x==null?'':x));
  let F=R0.map(fixLine);
  const hasHdr=F.some(l=>/(제품명|도료명|품\s*명)/.test(l)&&/(도막\s*두께|구분|㎛)/.test(l));
  F=F.map(l=>{
   let t=l;for(const [re,r] of EN){if(re.test(t)){t=t.replace(re,r);break}}
   t=t.replace(/^(?:\d+\s*[).]\s*|[①-⑩]\s*|[가-하]\s*[.)]\s*)?(하도실러|중도실러|상도실러|하\s*도|중\s*도|상\s*도)\s*[:：]\s*/,(m,a)=>a.replace(/\s+/g,'')+' ');
   t=t.replace(SG_START,'$1 ').replace(/(?<=[가-힣A-Za-z)])(?=\d+(?:\.\d+)?\s*(?:㎛|㎜|mm))/,' ');
   if(/^(?:하도실러|중도실러|상도실러|하도|중도|상도|실러)\s/.test(t)){
    t=t.replace(/(\d+(?:\.\d+)?)\s*(?:mm|㎜)(?![A-Za-z])/g,(m,v)=>+v<10?Math.round(+v*1000)+'㎛':m);
    if(hasHdr&&!/(㎛|μm|㎜|mm)/.test(t)){const m=t.match(/^(.*?\s)(\d{2,4})(?:\s+(\d{1,2})\s*회?)?\s*$/);if(m&&+m[2]>=10&&!/^\d/.test(m[1].trim()))t=m[1]+m[2]+'㎛'+(m[3]?' '+m[3]+'회':'')}}
   return t});
  let r;try{r=S0(F,fname)}catch(e){r=null}
  if(!r||!r.length){try{r=S0(R0,fname)||[]}catch(e){r=[]}}
  try{
   const fr=spFree(F,fname);
   if(!r||!r.length){if(fr)r=[fr]}
   else if(fr){
    /* 이름이 비었거나 두께가 빠진 코트는 보조 해석 결과로 채움 */
    r.forEach(sys=>{(sys.items||[]).forEach(it=>{
     if(!(it.n||'').trim()){const g=fr.items.find(x=>x.lb===it.lb&&Math.abs((+x.dft||0)-(+it.dft||0))<1)||fr.items.find(x=>x.lb===it.lb);if(g)it.n=g.n}
    })});
    /* 기존 해석이 놓친 단계가 있으면 보조 결과에서 추가 */
    const sys=r[0];if(sys&&Array.isArray(sys.items)){
     const have=new Set(sys.items.map(x=>String(x.lb||'').replace(/실러$/,'')));
     const miss=fr.items.filter(x=>!have.has(String(x.lb).replace(/실러$/,''))&&r.length===1);
     if(miss.length&&sys.items.length<fr.items.length){const rk=x=>['하도','중도','상도'].indexOf(String(x.lb).replace(/실러$/,''));sys.items=sys.items.concat(miss).sort((a,b)=>(rk(a)<0?9:rk(a))-(rk(b)<0?9:rk(b)))}
    }
   }
  }catch(e){console.warn('spx518',e)}
  return r||[]};
}
})();
