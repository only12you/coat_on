/* v320: TDS 불러오기 규칙 — 일반명(수지 조성+역할), 표면처리, 선행·후속도장(제품명만), 제품설명 100자 */
function exGen(t,u){var z=EXZ((t||'')+' '+(u||'')),r0=exRes(z);if(!r0)return '';
 var cure=(EXCURE.find(function(x){return x[0].test(z)})||[])[1]||'';
 if(window.WBX?WBX(z):/수성|수용성/.test(z))return '수용성 '+r0.replace(/^폴리/,'')+' 수성도료';
 var FN=[['방청',/방청|방식|내식|녹방지/],['내화학',/내화학/],['내열',/내열/],['내후',/내후/],['방수',/방수|내수/],['방오',/방오/]];
 var f=FN.find(function(x){return x[1].test(z)}),fn=f?f[0]:'',ly=exLayer(z)[0]||'',tail;
 if(ly=='하도'||ly=='중도')tail=fn+ly;else if(ly=='상도')tail=fn?fn+'상도':'마감도료';else tail=fn?fn+'도료':'도료';
 return [cure&&cure!=r0?cure:'',r0,tail].filter(Boolean).join(' ')}
function exSp(t){t=String(t||'');if(!t.trim())return '';var P=[],m=t.match(/S[aA]\s*(3|2\s*(?:1\/2|½|\.5)|2|1)(?![\d])/);
 if(m){var g=m[1].replace(/\s/g,'');P.push('Sa '+(g=='3'?'3':g=='2'?'2':g=='1'?'1':'2.5'))}else if(/블라스[트팅]|blast/i.test(t))P.push('블라스팅');
 m=t.match(/\bS[tT]\s*([23])/);if(m)P.push('동력공구 St '+m[1]);else if(/동력\s*공구|power\s*tool|SSPC-?SP\s*3/i.test(t))P.push('동력공구');
 if(/용제|솔벤트|solvent|SSPC-?SP\s*1(?!\d)|탈지|유분|그리스|기름|세정|크리닝|degreas|cleaning/i.test(t))P.push('용제크리닝');
 var R=[['수분',/수분|습기|물기|moisture|water/i],['오염',/오염|오물|contamina/i],['먼지',/먼지|분진|dust/i],['이물질',/이물질|이물|foreign/i],['녹',/녹|rust/i],['구도막',/구도막|기존\s*도막|노후\s*도막|old\s*coat/i],['염분',/염분|salt/i],['백화',/백화|efflorescence/i]].filter(function(x){return x[1].test(t)}).map(function(x){return x[0]});
 if(R.length)P.push(R.join('·')+' 제거');return P.join(' · ')}
function exPre(v){var D='도장사양에 따름';v=String(v||'').replace(/\s+/g,' ').trim();
 if(!v||/사양에\s*따|해당\s*없|^[-–]+$|^N\/?A$/i.test(v))return D;
 var t=v.replace(/\([^)]*\)|\[[^\]]*\]/g,' '),
 parts=t.split(/[,;\/·、]|\s+및\s+|\s+또는\s+|\s+or\s+|\s+and\s+/i).map(function(x){return x.trim().replace(/^(?:선행|후속|전|후)\s*(?:도료|도장)?\s*[:：]?\s*/,'').replace(/[.。]+$/,'')}),
 bad=/^(?:하도|중도|상도|도료|도장|프라이머|없음|해당\s*없음|제품|사용|가능|권장|등|기타)$|\d\s*(?:시간|hr|hrs|℃|°C|㎛|μm|um|%|회|일)|간격|이상|이내|이하|건조|경화|도장\s*사양/i,out=[];
 parts.forEach(function(x){if(x.length>=2&&x.length<=40&&!bad.test(x)&&out.indexOf(x)<0)out.push(x)});
 return out.length?out.slice(0,3).join(', '):D}
function exApply(s,h,L){var desc=h.desc||'',use=s.use||'',head=(L||[]).slice(0,60).join(' ');
 var d=exDesc(desc,h.name);if(d)s.d=d;if(s.d)s.d=endSum(s.d,100);
 var u=exUse(use||desc);if(u)s.us=u;
 var g=exGen(desc,use)||exGen(head+' '+(h.name||''),'');if(g)s.g=g;
 if(!s.d&&g){var fm=/2\s*액|주제.{0,6}경화제/.test(head)?'2액형 ':/1\s*액|단액/.test(head)?'1액형 ':'';s.d=(fm+g+' 도료').slice(0,100)}
 var sp=s.sp||'';try{var i=L.findIndex(function(r){return /표면\s*처리|소지\s*조정|바탕\s*처리|표면\s*준비|전\s*처리/.test(r)});if(i>=0)sp=L.slice(i,i+7).join(' ')}catch(e){}
 var x=exSp(sp);if(x)s.sp=x;
 if(s.pre!=null)s.pre=exPre(s.pre);if(s.nxt!=null)s.nxt=exPre(s.nxt)}
/* v324: TDS 보완 — 라벨/값 줄바꿈 병합, SVR·희석제·희석제코드 추가 인식 */
(function(){
const SQ=l=>String(l==null?'':l).replace(/(?<=[가-힣])[ \t]+(?=[가-힣])/g,'').replace(/[ \t]+/g,' ').trim();
const LAB=/^[■□●○▪·\-\d.)(\s]*(?:전용\s*)?(?:고형분\s*용적비|용적\s*고형분|체적\s*고형분|부피\s*고형분|고형분|희석제|신나|신너|시너|희석율|희석\s*비율|희석률|비중|건조\s*도막\s*두께|권장\s*도막|추천\s*도막|도막\s*두께|혼합비|volume\s*solids|solids\s*by\s*volume|thinner|thinning|specific\s*gravity|dry\s*film\s*thickness|mixing\s*ratio)(?:\s*[\/·]\s*(?:세척제|세척\s*용제|시너|신나|신너|희석제))*\s*(?:\([^)]*\))?\s*(?:명|종류|코드|code|name)?\s*[:：]?\s*$/i;
const NUMLAB=/고형분|희석율|희석\s*비율|희석률|비중|도막|혼합비|volume|solids|thinning|gravity|film|mixing/i;
function joinL(L){const o=[];for(let i=0;i<L.length;i++){const a=SQ(L[i]);const n=L[i+1]!=null?String(L[i+1]).replace(/\s+/g,' ').trim():'';
 if(a&&a.length<=34&&LAB.test(a)&&n&&n.length<=70&&!(LAB.test(n)&&!/전용|\(/.test(n))){const num=NUMLAB.test(a);if(num?/^[\d(~±<>]/.test(n):!/^(?:희석|고형|비중|도막|건조|혼합|색상|광택|용도)/.test(n)){o.push(a.replace(/\s*[:：]\s*$/,'')+' : '+n);i++;continue}}
 o.push(L[i])}
 o.ocr=L.ocr;return o}
const stripStd=t=>t.replace(/\(?\s*(?:ISO|ASTM|KS|JIS|DIN|EN)\s*[A-Z]?\s*[\d\-:.]+[^)\s]*\s*\)?/gi,' ');
function svrOf(L){for(const raw of L){const l=stripStd(SQ(raw));
 let m=l.match(/(?:volume\s*solids|solids\s*by\s*vol(?:ume)?|vol\.?\s*solids|solid\s*content\s*by\s*vol)[^\d\n]{0,24}?(\d+(?:\.\d+)?)(?:\s*[~～\-–]\s*(\d+(?:\.\d+)?))?/i)
  ||l.match(/(?:고형분\s*용적비?|용적\s*고형분|체적\s*고형분|부피\s*고형분|고형분\s*\(?\s*(?:용적|체적|부피|V\/V|vol)[^)\d]{0,10}\)?)[^\d\n]{0,24}?(\d+(?:\.\d+)?)(?:\s*[~～\-–]\s*(\d+(?:\.\d+)?))?/i)
  ||(/고형분/.test(l)&&/(?:용적|체적|부피)/.test(l)&&l.replace(/.*(?:용적|체적|부피)[^\d\n]{0,12}?(?=\d)/,'').match(/^(\d+(?:\.\d+)?)(?:\s*[~～\-–]\s*(\d+(?:\.\d+)?))?/));
 if(m){const v=m[2]?(+m[1]+ +m[2])/2:+m[1];if(v>=1&&v<=100)return v}}return null}
const CODE=[/#\s*(\d{2,5}[A-Z]?)/,/(?:No\.?|번호|NO\.)\s*(\d{1,5}[A-Z]?)/i,/\b([A-Z]{1,5}-\d{2,5}[A-Z]?)\b/,/\b([A-Z]{1,4}\d{2,5}[A-Z]?)\b/,/(\d{2,5})\s*번/,/\b(0\d{4})\b/,/\b(\d{4,6})\b/];
function thinOf(L){let tn='',tc='',tr=null;
 for(const raw of L){const ci=String(raw).search(/[:：]/),l=ci>0?SQ(String(raw).slice(0,ci))+' : '+String(raw).slice(ci+1).replace(/\s+/g,' ').trim():SQ(raw);if(/희석\s*율|희석\s*비율|희석률|thinning\s*(?:rate|ratio)/i.test(l)&&!/^(?:전용\s*)?(?:희석제|신나|신너|시너|thinner)/i.test(l))continue;
  const m=l.match(/^[■□●○▪·\-\d.)(\s]*(?:전용\s*)?(?:희석제|신나|신너|시너|thinner|recommended\s*thinner)(?:\s*[\/·]\s*(?:세척제|세척\s*용제|시너|신나|신너|희석제|cleaner))*\s*(명|종류|코드|code|name)?\s*[:：]?\s*(.*)$/i);
  if(!m)continue;let v=m[2].trim();const suf=(m[1]||'').toLowerCase();
  v=v.replace(/^(?:코드|code|명|name|종류)\s*[:：]?\s*/i,'');
  if(window.__thinCell&&(/[를을]\s|사용|하며|하여|합니다/.test(v)||/^(?:는|은)\s/.test(v))){const o2=window.__thinCell('희석제 '+String(raw).replace(/^.*?(?:희\s*석\s*제|신\s*나|신\s*너|시\s*너)/,'').replace(/\s+/g,' '));if(o2.tn){tn=o2.tn;if(o2.tc)tc=o2.tc;if(o2.tr!=null&&tr==null)tr=o2.tr;continue}}
  if(!v||/^\d+(?:\.\d+)?\s*%/.test(v)||/^(?:희석|비중|고형|도막)/.test(v))continue;
  if(/^(?:no|none|무희석|불필요|not\s*required)/i.test(v)&&!tn){tn='무희석';continue}
  const mx=v.match(/(?:max\.?|최대|이내)\s*(\d+(?:\.\d+)?)\s*%/i);if(mx&&tr==null)tr=+(+mx[1]/100).toFixed(3);
  v=v.replace(/\([^)]*%[^)]*\)/g,' ').replace(/\s*[\/,;]\s*(?:세척제|세척|cleaner|cleaning).*$/i,'').replace(/\s*(?:희석\s*율|희석\s*비율|thinning|max\.?|최대).*$/i,'').replace(/\s*(?:저장\s*기간|포장\s*규격|색상|인화점|비중|건조).*$/,'').trim();
  if(!v)continue;
  let c='';for(const r of CODE){const k=v.match(r);if(k){c=k[1];break}}
  if(suf=='코드'||suf=='code'){if(c||v.length<=14)tc=tc||(c||v);continue}
  if(!tn||tn=='무희석'){tn=v;if(c&&!tc)tc=c}}
 if(tn&&tn!='무희석'){let n=tn;if(tc){const re=new RegExp('[\\s(\\[]*(?:#\\s*|No\\.?\\s*|NO\\.?\\s*)?'+tc.replace(/[.*+?^${}()|[\]\\-]/g,'\\$&')+'\\s*(?:번)?[\\s)\\]]*','i');n=tn.replace(re,' ').replace(/\s{2,}/g,' ').trim()}
  if(!n||/^[-/·,:\s]*$/.test(n))n=/[A-Za-z]/.test(tc||'')?tc:'전용 희석제';tn=n.replace(/[\s,;:·\-]+$/,'')}
 return {tn,tc,tr}}
const P0=parseAll;
parseAll=function(L){const J=joinL(L||[]),s=P0(J);
 try{if(!s.svr){const v=svrOf(J);if(v)s.svr=v}
  const t=thinOf(J);
  if(t.tn){s.tn=t.tn;if(t.tc)s.tc=t.tc;else if(s.tc&&!/[A-Za-z#\d]/.test(String(t.tn+s.tc)))delete s.tc}
  else if(s.tn){s.tn=String(s.tn).replace(/^(?:코드|명|종류)\s*[:：]\s*/,'').trim()}
  if(t.tc&&!s.tc)s.tc=t.tc;
  if(s.tr==null&&t.tr!=null)s.tr=t.tr;
 }catch(e){}
 s.ocr=L&&L.ocr;return s};
window.__joinL=joinL;
})();
/* v325: KCC형 표 — 한 글자씩 띄운 라벨 · 2줄 라벨 · 칸 안 값 줄 → 용어 사전과 매칭 */
(function(){
const sqz=s=>String(s==null?'':s).replace(/\s+/g,'').toLowerCase();
const FULL=new Set(),PRE=new Set(),SUF=new Set();
const addL=w=>{const s=sqz(w);if(s.length<2||/^[a-z0-9.\-\/()]+$/.test(s)&&s.length<4)return;FULL.add(s);if(/[가-힣]/.test(s)&&s.length>=4)for(let i=2;i<s.length;i++){PRE.add(s.slice(0,i));SUF.add(s.slice(i))}};
TERMS.forEach(t=>{[t.k,t.r].concat(t.v).forEach(x=>{if(x&&!/[()\/:]/.test(x))addL(x)})});
['용도','마감상태','색상','광택','비중','고형분','고형분용적비','용적고형분','이론도포율','이론도포량','인화점','점도','표면처리','도장방법','도장횟수','희석','희석제','희석율','도장조건','도막두께','건조시간','후속도장','선행도장','가사시간','재도장간격','재도장시간','재료','저장기간','저장방법','포장단위','포장규격','비고','발행일','개정일','혼합비','일반명','제품명','제품특성','도장간격','사용법','사용방법'].forEach(addL);
const SEC=/^(?:일반적성질|도장사양|보관및포장조건|보관및포장|주의사항및비고|주의사항|물리적성질|제품특성|제품정보|기본물성|시공조건|도장시스템|건조시간표)$/;
function lead(line){const tk=String(line).trim().replace(/^[■□●○▪·]\s*/,'').replace(/([가-힣A-Za-z)])\s*[:：]\s*/,'$1 : ').split(/\s+/);let best=null,s='';for(let j=0;j<Math.min(tk.length,9);j++){if(/^[:：]$/.test(tk[j]))break;s+=sqz(tk[j]);if(FULL.has(s))best={s,j,t:'F'};else if(PRE.has(s))best=best&&best.t=='F'&&best.j>j-0?best:{s,j,t:'P'};else if(SUF.has(s)&&!best)best={s,j,t:'S'}}
 if(!best)return null;/* 라벨 뒤의 값 */const rest=tk.slice(best.j+1).join(' ').replace(/^[:：]\s*/,'');return {s:best.s,t:best.t,rest}}
function fixLabel(l){const x=lead(l);if(!x||x.t=='S'&&!/[가-힣]/.test(x.s))return l;return x.s+(x.rest?' '+x.rest:'')}
const jw=a=>{let r='';for(const t0 of a){const t=String(t0).trim();if(!t)continue;if(!r)r=t;else r+=(/[가-힣]$/.test(r)&&/^[가-힣]\s/.test(t)?'':' ')+t}return r};
function cellify(L){const Y=L.y&&L.y.length==L.length?L.y:null;
 /* 1) y 간격으로 칸(블록) 나누기: 칸 안 줄간격 < 칸 사이 간격 */
 const RID=L.rid&&L.rid.length==L.length&&L.rid.filter(r=>r>=0).length>=L.length*.5?L.rid:null;
 const blocks=[];if(RID){let cur=[];for(let i=0;i<L.length;i++){if(cur.length&&(RID[i]!==RID[i-1]||RID[i]<0)){blocks.push(cur);cur=[]}cur.push(i)}if(cur.length)blocks.push(cur)}else{let cur=[];const gaps=[];if(Y)for(let i=1;i<L.length;i++)gaps.push(Y[i-1]-Y[i]);const sg0=gaps.filter(g=>g>0).sort((a,b)=>a-b),md=sg0.length?sg0[Math.floor(sg0.length/2)]:0,sg=sg0.filter(g=>g>=md*.6),base=sg.length?sg[Math.floor(sg.length*.25)]:0;
  for(let i=0;i<L.length;i++){if(Y&&i>0&&cur.length&&(Y[i-1]-Y[i])>base*1.35+0.5){blocks.push(cur);cur=[]}cur.push(i)}if(cur.length)blocks.push(cur)}
 const cells=[],out=[];let prev=null;
 const fin=c=>{const v=jw(c.parts).replace(/\s+/g,' ').trim();c.v=v;cells.push({k:c.k,v,p:c.parts.slice()});return c.k+(v?' : '+v:'')};
 for(const bl of blocks){const slots=[];let cur=null,pre=[],blkPrev=null;
  const close=()=>{if(!cur)return;if(cur.k==null){const raw=cur.raw.join(' ');if(blkPrev)blkPrev.parts.push(raw);else if(prev)prev.parts.push(raw);else slots.push({txt:raw})}else blkPrev=cur;cur=null};
  const give=c=>{if(pre.length){if(RID)c.parts=pre.concat(c.parts);else if(prev)prev.parts.push(pre.join(' '));else pre.forEach(t=>slots.push({txt:t}));pre=[]}};
  for(const ix of bl){const raw=L[ix],z=sqz(raw);
   if(SEC.test(z)){close();pre.forEach(t=>slots.push({txt:t}));pre=[];prev=null;blkPrev=null;slots.push({txt:raw});continue}
   const x=lead(raw);
   if(x&&cur&&cur.k!=null&&x.s!==cur.k&&FULL.has(cur.k+x.s)){cur.k=cur.k+x.s;if(x.rest)cur.parts.push(x.rest);continue}
   if(x&&cur&&cur.k==null&&FULL.has(cur.frag+x.s)){cur.k=cur.frag+x.s;if(x.rest)cur.parts.push(x.rest);cur.raw.push(raw);give(cur);continue}
   if(x&&x.t=='F'){close();cur={k:x.s,parts:x.rest?[x.rest]:[],raw:[raw]};give(cur);slots.push(cur);continue}
   if(x&&x.t=='P'){close();cur={k:null,frag:x.s,parts:x.rest?[x.rest]:[],raw:[raw]};slots.push(cur);continue}
   if(/^[A-Za-z][A-Za-z .\/()]{2,28}\s*[:：]\s*\S/.test(String(raw).trim())){close();pre.forEach(t=>slots.push({txt:t}));pre=[];slots.push({txt:raw});blkPrev=null;continue}
   if(cur){cur.parts.push(raw);cur.raw.push(raw)}else if(blkPrev){blkPrev.parts.push(raw)}else pre.push(raw)}
  close();
  if(pre.length){if(prev&&!blkPrev&&!slots.some(s=>s.k!=null))prev.parts.push(pre.join(' '));else pre.forEach(t=>slots.push({txt:t}))}
  const first=slots.find(s=>s.k!=null);if(first)prev=first;
  for(const s of slots){if(s.txt!=null)out.push(s.txt);else if(s.k!=null)out.push(fin(s))}}
 out.ocr=L.ocr;return {lines:out,cells}}
const rng=t=>{const m=String(t).match(/(\d+(?:\.\d+)?)(?:\s*[~～\-–]\s*(\d+(?:\.\d+)?))?/);return m?{a:+m[1],b:m[2]?+m[2]:null}:null};
const stdOut=t=>String(t).replace(/\(?\s*(?:ISO|ASTM|KS|JIS|DIN|EN)\s*[A-Z]?\s*[\d\-:.]+[^)\s]*\s*\)?/gi,' ');
const CODE=[/#\s*(\d{2,5}[A-Z]?)/,/(?:No\.?|번호)\s*(\d{1,5}[A-Z]?)/i,/\b([A-Z]{1,5}-\d{2,5}[A-Z]?)\b/,/\b([A-Z]{1,4}\d{2,5}[A-Z]?)\b/,/(\d{2,5})\s*번/,/\b(0\d{4})\b/];
function thinCell(T){const o={};T=String(T).replace(/\s+/g,' ');
 const mc=T.match(/희석제\s*(?:코드|code)\s*[:：]?\s*([A-Za-z0-9#\-]+)/i),mn=T.match(/(?:희석제|신나|시너|신너)\s*(?:명|종류)\s*[:：]?\s*(.+?)(?=\s*(?:희석\s*율|희석제|$))/);if(mc)o.tc=mc[1].replace(/^#/,'');if(mn)o.tn=mn[1].replace(/\s*\d+(?:\.\d+)?\s*(?:[~～\-–]\s*\d+)?\s*%.*$/,'').trim();

 const mp=T.match(/희석\s*(?:율|비율|률)[^%\d]{0,8}(\d+(?:\.\d+)?)(?:\s*[~～\-–]\s*(\d+(?:\.\d+)?))?\s*%/)||T.match(/(\d+(?:\.\d+)?)(?:\s*[~～\-–]\s*(\d+(?:\.\d+)?))?\s*%/);if(mp){const v=Math.max(+mp[1],+(mp[2]||0));if(v>=0&&v<=100)o.tr=+(v/100).toFixed(3)}else if(/무희석|희석\s*불필요/.test(T))o.tr=0;
 const km=T.match(/(?:희석제|신나|신너|시너|thinner)/i);
 if(km){const i=km.index,pre=T.slice(Math.max(0,i-14),i),post=T.slice(i+km[0].length,i+km[0].length+60).replace(/^(?:\s*[\/·]\s*[가-힣]{2,5})*\s*(?:명|종류)?\s*[:：]\s*/,'');
  const cm0=post.match(/^\s*(?:\(|:|：|는|은)?\s*(?:No\.?|NO\.?|#|번호)\s*([A-Za-z0-9\-]{2,8})/);
  if(cm0){if(!o.tc)o.tc=cm0[1];if(!o.tn)o.tn=/KCC|케이씨씨|조광|삼화|노루|강남|제비스코/.test(pre)?(pre.match(/KCC|케이씨씨|조광|삼화|노루|강남|제비스코/)[0]+' '+km[0]):((/전용/.test(pre)?'전용 ':'')+km[0])}
  else{
  let nm=post.replace(/^\s*(?:\(|:|：|는|은|로|\s)+/,'').replace(/\s*\d+(?:\.\d+)?\s*(?:[~～\-–]\s*\d+)?\s*%.*$/,'').split(/\s*(?:를|을|으로|로\s|사용|희석|,|;|\.\s|\)\s)/)[0].replace(/\)$/,'').trim();
  if(!nm||nm.length>26||/^\d+\s*[~%]/.test(nm)||/^#?\d{2,5}$/.test(nm)){const b=pre.match(/(KCC|케이씨씨|조광|삼화|노루|강남제비스코|제비스코|[A-Za-z]{2,})\s*(?:전용\s*)?$/);nm=b?(b[1]+' 전용 '+km[0]):''}
  else if(/전용/.test(pre)&&!/전용/.test(nm))nm='전용 '+nm;
  let c='';const win=post.slice(0,40);for(const r of CODE){const k=win.match(r);if(k){c=k[1];break}}
  if(c&&nm){nm=nm.replace(new RegExp('[\\s(\\[]*(?:#\\s*|No\\.?\\s*)?'+c.replace(/[.*+?^${}()|[\]\\-]/g,'\\$&')+'\\s*(?:번)?[\\s)\\]]*','i'),' ').replace(/\s+/g,' ').trim()}
  if(c&&(!nm||/^[\s()\-:]*$/.test(nm)))nm=/[A-Za-z]/.test(c)?c:'희석제';
  if(nm&&!/^무희석/.test(nm)){if(!o.tn)o.tn=nm.replace(/[\s,;:·\-]+$/,'');if(c&&!o.tc)o.tc=c}}}
 return o}
function overlay(s,cells){
 const get=re=>cells.filter(c=>re.test(c.k)).map(c=>c.v).filter(Boolean);
 try{let g=get(/^(?:고형분용적비|용적고형분|체적고형분|부피고형분|용적비|고형분)$/);for(const t0 of g){const t=stdOut(t0);let m=t.match(/(?:용적|체적|부피|vol)[^\d\n]{0,12}?(\d+(?:\.\d+)?)(?:\s*[~～\-–]\s*(\d+(?:\.\d+)?))?/i);let v;if(m)v=m[2]?(+m[1]+ +m[2])/2:+m[1];else if(!/중량|wt|weight/i.test(t)){const r=rng(t);if(r)v=r.b?(r.a+r.b)/2:r.a}if(v>=1&&v<=100){s.svr=v;break}}}catch(e){}
 try{for(const t of get(/^(?:비중|밀도|중량)$/)){const v=(t.replace(/\([^)]*\)/g,' ').match(/\d+(?:\.\d+)?/g)||[]).map(Number).find(x=>x>=.5&&x<=5);if(v){s.sg=v;break}}}catch(e){}
 try{for(const t of get(/^(?:이론도포율|이론도포량|이론도포면적|이론살포율|이론소요면적)$/)){const v=(t.replace(/\([^)]*\)/g,' ').match(/\d+(?:\.\d+)?/g)||[]).map(Number).find(x=>x>=.5&&x<=200);if(v){s.th=v;break}}}catch(e){}
 try{for(const t0 of get(/^(?:도막두께|건조도막두께|추천도막두께|추천도막|권장도막두께|권장도막|표준도막두께)$/)){const t=t0.replace(/\([^)]*(?:습|wet)[^)]*\)/gi,' ');for(const m of t.matchAll(/(\d+(?:\.\d+)?)(?:\s*[~～\-–]\s*(\d+(?:\.\d+)?))?\s*(㎛|μm|µm|um|㎜|mm)/gi)){if(/습윤|wet/i.test(t.slice(Math.max(0,m.index-8),m.index)))continue;const k=/mm|㎜/i.test(m[3])?1000:1,a=+m[1]*k,b=m[2]?+m[2]*k:0,v=Math.round(b>a?(a+b)/2:a);if(v>=5&&v<=20000){s.dft=v;break}}if(s.dft)break}}catch(e){}
 try{const th=cells.filter(c=>/^(?:희석|희석제|신나|신너|시너|희석율|희석비율|희석률)$/.test(c.k)).map(c=>(c.k=='희석'?'':c.k+' ')+c.v).join(' ');if(th){const o=thinCell(th);if(o.tn){s.tn=o.tn;if(o.tc)s.tc=o.tc}if(o.tr!=null)s.tr=o.tr}}catch(e){}
 try{const pk=get(/^(?:포장단위|포장규격|포장|출고규격|포장용량|공급단위|판매단위)$/).join(' ');if(pk){const a=[...pk.matchAll(/(\d+(?:\.\d+)?)\s*(ℓ|L|리터|㎏|kg)(?![a-z])/gi)].filter(x=>+x[1]>0&&+x[1]<=1000).map(x=>({v:+x[1],u:/kg|㎏/i.test(x[2])?'㎏':'ℓ'}));if(a.length){const mx=a.reduce((p,q)=>q.v>p.v?q:p),us=[...new Set(a.filter(x=>x.u==mx.u).map(x=>x.v))].sort((p,q)=>p-q);s.pack=mx.v;s.pun=mx.u;s.pks=us.map(v=>v+(mx.u=='㎏'?'kg':'L')).join(' · ')}}}catch(e){}
 try{const uc=cells.find(c=>/^(?:용도|적용대상|적용부위|사용처)$/.test(c.k)),u=uc?((uc.p||[]).filter(t=>!/^\s*[*·•※\-]/.test(t)).join(' ').trim()||uc.v):'';if(u){s.use=sumU(u);if(typeof exUse=='function'){const x=exUse(s.use);if(x)s.us=x;else s.us=s.use}else s.us=s.use}}catch(e){}
 try{const q=get(/^(?:표면처리|소지조정|바탕처리|전처리|사용법|사용방법)$/)[0];if(q&&typeof exSp=='function'){const x=exSp(q);if(x)s.sp=x}}catch(e){}
 try{const ex=typeof exPre=='function'?exPre:null;const gp=re=>{const c=cells.find(c=>re.test(c.k));return c?((c.p||[c.v]).map(t=>String(t).trim()).filter(Boolean).join(', ')):''},n=gp(/^(?:후속도장|후속도료)$/),p=gp(/^(?:선행도장|선행도료|전도장)$/);if(ex){if(n)s.nxt=ex(n);if(p)s.pre=ex(p)}}catch(e){}
 try{const c=cells.find(c=>/^(?:비중|밀도)$/.test(c.k));if(c){const t=c.v.replace(/\([^)]*\)/g,' ');const m=t.match(/(\d+(?:\.\d+)?)\s*[~～\-–]\s*(\d+(?:\.\d+)?)/);if(m&&+m[1]>=.5&&+m[2]<=5&&+m[2]>=+m[1])s.sg=+((+m[1]+ +m[2])/2).toFixed(3)}}catch(e){}
 try{const c=cells.find(c=>/^(?:포장단위|포장규격|포장|출고규격|포장용량)$/.test(c.k));if(c){const t=c.v,P=[];for(const m of t.matchAll(/(\d+(?:\.\d+)?)\s*(ℓ|L|리터|㎏|kg)\s*포장\s*시?\s*\(?\s*주제\s*[:：]?\s*경화제\s*[=:：]?\s*(\d+(?:\.\d+)?)\s*(?:ℓ|L|㎏|kg)?\s*[:：]\s*(\d+(?:\.\d+)?)/gi))P.push({t:+m[1],u:/kg|㎏/i.test(m[2])?'㎏':'ℓ',a:+m[3],b:+m[4]});
  if(P.length){const mx=P.reduce((p,q)=>q.t>p.t?q:p);s.pk=mx.a;s.mk=+(mx.a+mx.b).toFixed(2);s.pun=mx.u;s.mixa=mx.a;s.mixb=mx.b;s.pack=mx.t;s.pks=[...new Set(P.map(x=>x.t))].sort((a,b)=>a-b).map(v=>v+(mx.u=='㎏'?'kg':'L')).join(' · ')}}}catch(e){}
 return s}
function headOf(L){const out=[];for(const raw of L){const z=sqz(raw);if(SEC.test(z))break;const x=lead(raw);if(x&&x.t=='F')break;out.push(String(raw).trim());if(out.length>8)break}return out}
function descOf(L,s){try{const H=headOf(L);if(!H.length)return;let t=String(H[0]).replace(/(?:데이터\s*시트|기술\s*자료집?|TDS)/gi,' ').replace(/\([^)]*\)/g,' ').replace(/\b[A-Z]{1,4}-?\d{2,}[A-Z0-9]*\b/g,' ').replace(/\s+/g,' ').trim(),tk=t.split(' ').filter(Boolean);
  if(tk.length>=3)tk=tk.slice(1);const g=tk.join(' ');if(g.length>=2&&g.length<=30)s.g=g;
  let d=jw(H.slice(1));d=d.replace(/^(?:[가-힣A-Za-z0-9() ]{2,40}?\s)?[A-Z]{1,4}-?\d{2,}[A-Z0-9]*\s*(?:은|는|이|가)\s+/,'').replace(/(?:됩니다|합니다|입니다)\.?$/,m=>/경화|건조|형성/.test(d)?'':m).replace(/\.$/,'').trim();
  if(d.length>100)d=endSum(d,100);if(d.length>=6)s.d=d}catch(e){}}

const P1=parseAll;
parseAll=function(L){L=L||[];let C;try{const L2=L.map(x=>String(x==null?'':x));L2.y=L.y;L2.rid=L.rid;L2.ocr=L.ocr;C=cellify(L2)}catch(e){C=null}
 const src=C?C.lines.concat(L.map(fixLabel)):L,s=P1(src);
 try{if(C)overlay(s,C.cells)}catch(e){}
 try{descOf(L.map(x=>String(x==null?'':x)),s)}catch(e){}
 try{if(s.mf)s.mf=String(s.mf).replace(/\([^)]*\)|（[^）]*）/g,' ').replace(/\s+/g,' ').trim()}catch(e){}
 try{if(s.sp)s.sp=String(s.sp).replace(/용제\s*크리닝/g,'용제세정')}catch(e){}
 try{if(!s.mf&&L.some(x=>/080-?022-?8200/.test(String(x))))s.mf='KCC'}catch(e){}
 s.ocr=L.ocr;return s};
{const D=parseDry,P=parsePot,F=L=>{const o=(L||[]).map(x=>{try{return fixLabel(x)}catch(e){return x}});o.ocr=L&&L.ocr;return o};parseDry=L=>D(F(L));parsePot=L=>P(F(L))}
window.__cellify=cellify;window.__thinCell=thinCell;window.__fixLabel=fixLabel;
})();
