/* v335: 제조사별 데이터시트 보강 — 공백/두 줄 라벨 정규화, 제품명·일반명·설명·용도·표면처리·희석제·혼합비·포장·선행/후속 */
(function(){
const prev=parseAll;
const sq=s=>String(s==null?'':s).replace(/\s+/g,'');
const LABS=['용도','표면처리','도장방법','도장조건','도장기구','작업기상조건','희석제','희석율','희석률','희석','신너','신나','비중','이론도포량','이론도포율','이론도포면적','색상','혼합비','혼합','인화점','저장기간','저장방법','포장단위','포장','광택','건조시간','가사시간','선행도장','후속도장','도막두께','일반적성질','마감상태','도장사양','보관및포장조건','주의사항','개요','특징','물성','제품특성','제품의특성','제품정보','도료의특성','고형분','용적비','페인트타입','구분','도료종류','도료색상','액형','불휘발분','건조조건','부피고형분','추천건조도막두께','재도장간격','점도','비휘발분','사용방법','적당한시공사양','도장시스템','법규관련','경고사항','인덕션시간','상도도료','추천도막두께','취급시주의사항','도장시주의사항','기타','제품명','일반명','선행및후속도장','도장횟수','추천도포면적','표면처리요약테이블','1회도장도막두께','건조와경화시간','제품호환성','포장(대표적)'].sort((a,b)=>b.length-a.length);
function after(l,lab){let i=0,j=0;while(j<lab.length){while(i<l.length&&/\s/.test(l[i]))i++;if(l[i]!==lab[j])return null;i++;j++}
 if(i<l.length&&!/[\s:：]/.test(l[i]))return null;return l.slice(i).replace(/^[\s:：]+/,'')}
const NUM=/^\s*\d+\s*[.)]\s*/;
function getLab(l){const t=String(l).replace(NUM,'').replace(/^(신너|신나)\s*\(\s*희석제\s*\)/,'$1');for(const k of LABS){const r=after(t,k);if(r!==null)return{k,v:r}}return null}
const joinW=a=>a.reduce((p,x)=>p===''?x:(/^[가-힣](?:\s*[,.])(\s|$)/.test(String(x))?p+x:p+' '+x),'');
const clean=s=>String(s).replace(/\s+([,.;:)])/g,'$1').replace(/([(])\s+/g,'$1').replace(/\s+/g,' ').trim();
function sect(L,keys,max,skip){
 for(let i=0;i<L.length;i++){const g=getLab(L[i]);if(!g||!keys.includes(g.k))continue;
  const parts=[];let num0=null;
  if(g.v)parts.push(g.v);else{let a=i-1;const up=[];while(a>=0&&NUM.test(L[a])&&!getLab(L[a])){up.unshift(L[a]);a--}if(up.length)parts.push(...up)}
  let b=i+1,c=0,last=num0;const ry=L.rid||[];
  while(b<L.length&&c<max){const t=L[b];const lb=getLab(t);if(lb&&!(NUM.test(t)&&!lb.v&&0))break;
   if(ry.length&&ry[b]-ry[b-1]>3)break;
   const m=t.match(/^\s*(\d+)\s*[.)]\s/);if(m){const n=+m[1];if(last!=null&&n<=last)break;last=n}
   parts.push(t);b++;c++}
  let txt=clean(joinW(parts.map(x=>String(x).replace(NUM,'').replace(/^\s*[*·•\-]\s*/,'')).filter(x=>!(skip&&skip.test(x)))));
  {const mm=txt.match(/^(도장된 표면)\s+(.+?호환 가능한 도장)/);if(mm)txt=mm[1]+': '+mm[2]}
  if(txt.length>=8&&!/^요약\s*테이블/.test(txt))return txt}
 return ''}
const rng=(a,b)=>+((+a+ +b)/2).toFixed(4);

/* 제품설명 핵심 요약(50자 이내) */
function sum50(t,g){t=String(t||'').replace(/\s+/g,' ').trim();g=String(g||'');if(!t)return'';
 const N=(t.match(/(\d)\s*액\s*형/)||[])[1],RSR=/(아크릴\s*우레탄|폴리우레탄|에폭시|우레탄|아크릴|실리콘|불소|알키드|염화고무|(?<![가-힣])비닐|합성수지|징크|무기)/,RS=(t.match(RSR)||g.match(RSR)||[])[1],
  CLR=/(워시\s*프라이[머마]|프라이[머마]|상도|중도|하도|방수재|방수|코팅제|퍼티|실란트)/,CL=(t.match(/(워시\s*프라이[머마])/)||g.match(CLR)||t.match(CLR)||[])[1];
 const F=[[/무용제/,'무용제'],[/속건/,'속건'],[/고\s*\(?高?\)?\s*고형분/,'고고형분'],[/후도막/,'후도막'],[/고탄성/,'고탄성'],[/탄성/,'탄성'],[/방청/,'방청'],[/인산/,'인산'],[/자기\s*평활/,'자기평활'],[/이음매\s*없/,'무이음매'],[/내수성/,'내수성'],[/내약품성/,'내약품성'],[/내후성/,'내후성'],[/내한성/,'내한성'],[/내마모성/,'내마모성'],[/내구성/,'내구성'],[/부착(?:성|력)/,'부착성'],[/작업성/,'작업성'],[/은폐\s*력/,'은폐력'],[/친환경/,'친환경']];
 let ft=F.filter(([re])=>re.test(t)).map(x=>x[1]);if(ft.includes('고탄성'))ft=ft.filter(x=>x!=='탄성');
 const cls=CL?CL.replace(/\s+/g,' ').replace('프라이마','프라이머'):'';
 const head=[N?N+'액형':'',RS?RS.replace(/\s+/g,''):'',cls].filter(Boolean).join(' ');
 if(!head){const f=t.split(/(?<=[.다])\s/)[0];return f.length>50?endSum(f,50):f}
 let k=Math.min(3,ft.length),out='';
 const hd=head+' 도료';for(;k>=0;k--){out=(k?ft.slice(0,k).join('·')+' ':'')+hd;if(out.length<=50)break}
 return out.length>50?hd.slice(-50):out}

/* 용도·표면처리 요약(50자 이내) */
const cut50=t=>{t=String(t||'').trim();return t.length<=50?t:endSum(t,50)};
function sumUse(t){t=String(t||'').replace(/\s+/g,' ').trim();if(!t)return'';
 const sn=t.split(/(?<=[.。])\s+|\s*(?=\d\)\s)/).map(x=>x.trim()).filter(Boolean);
 const one=x=>{x=x.replace(/\s*소재\s*[:：].*$/,'');const m=x.match(/^(.+?)(?:(?:으)?로\s*사용(?:하며|하고|합니다|할 수)|에\s*사용|(?:이|입)?니다|에\s*적합|\s*사용하며|\s*적용하며)/);if(m&&m[1].length>=6)x=m[1];return x.replace(/[.。,\s]+$/,'').replace(/(?:용으로|으로|에)$/,'').trim()};
 let out=one(sn[0]||t);
 for(let i=1;i<sn.length&&i<3;i++){const n=one(sn[i]);if(n&&(out+' / '+n).length<=50&&n.length>=6)out+=' / '+n;else break}
 return cut50(out)}
function sumSurf(t){t=String(t||'').replace(/\s+/g,' ').trim();if(!t)return'';
 const C=[[/레이턴스|laitance/i,'레이턴스'],[/그리스/,'그리스'],[/오일/,'오일'],[/유분|기름때/,'유분'],[/수분|물기/,'수분'],[/모래/,'모래'],[/시멘트\s*가루/,'시멘트가루'],[/먼지/,'먼지'],[/흙/,'흙'],[/녹/,'녹'],[/염분/,'염분'],[/구도막|노화된\s*도막/,'구도막'],[/오염\s*물질?|오염물|이물질|오물/,'오염물']];
 const M=[[/고압\s*(?:청수\s*)?(?:수세|세척)/,'고압수세'],[/용제\s*세(?:척|정)/,'용제세척'],[/(?<!고압)청수\s*세척/,'청수세척'],[/블라스팅|blasting|Sa\s*2/i,'블라스팅'],[/그라인딩/,'그라인딩'],[/샌드\s*페이퍼|샌딩/,'샌딩'],[/산\s*세척|염산/,'산세척'],[/스크래핑/,'스크래핑'],[/퍼티/,'퍼티']];
 const S=[[/깨끗/,'깨끗'],[/건조/,'건조'],[/평탄/,'평탄'],[/양생/,'양생']];
 const pick=(R,n)=>{const f=[];for(const [re,l] of R){const m=t.match(re);if(m)f.push([m.index,l])}return f.sort((a,b)=>a[0]-b[0]).map(x=>x[1]).slice(0,n)};
 const c=pick(C,3).filter((x,i,a)=>!(x==='오염물'&&a.length>1)),m=pick(M,2),st=pick(S,2).filter(x=>!(x==='깨끗'&&c.length));
 if(!c.length&&!m.length&&!st.length)return cut50(t.replace(/^[*\-·•]\s*/,'').split(/(?<=[.。])\s/)[0]);
 let out=(c.length?c.join('·')+' 제거':'')+(m.length?(c.length?' ('+m.join('·')+')':m.join('·')):'')+(st.length?(out0(c,m)?', ':'')+st.join('·'):'');
 return cut50(out)}
const out0=(c,m)=>c.length||m.length;
function fix(L,s){
 L=L||[];s=s||{};const o={};
 const t0=L.findIndex(x=>x&&!/^[A-Z0-9 &.\-+]+$/.test(String(x).trim()));
 const title=t0>=0?clean(L[t0]):'';let sub='',si=t0+1;
 if(t0>=0&&L[si]){const t=clean(L[si]);if(t.length<=32&&!/[.。]$/.test(t)&&!/(니다|십시오|있다|한다)\b/.test(t)&&/(상도|중도|하도|프라이머|프라이마|방수|도료|코팅|방청|우레탄|에폭시|실란트|퍼티|시너|워시)/.test(t)&&!getLab(t)&&!/^[A-Z0-9 &.\-+]+$/.test(t))sub=t}
 // 일반명(g)
 let g=s.g||'';
 const gl=sect(L,['일반명','도료종류'],0);if(gl)g=gl;
 else if(sub)g=sub;
 else if(g&&(/^[A-Z0-9 &.\-+]+$/.test(g)||sq(title).includes(sq(g))||sq(g).includes(sq(title))))g='';
 // 설명(d)
 let d=sect(L,['제품특성','제품의특성','도료의특성','개요'],3,/^\s*(Approved|\d+)\s/);
 if(!d||d.length<12){const u=L.findIndex(x=>{const q=getLab(x);return q&&q.k==='용도'});const st=sub?si+1:t0+1;const arr=[];
  for(let i=st;i<(u>0?u:Math.min(L.length,st+8));i++){const x=String(L[i]);if(/^\s*[▣+★※]/.test(x)||/^[+\-\d ]+$/.test(x))break;if(getLab(x)&&arr.length)break;arr.push(x)}
  const dd=clean(arr.join(' '));if(dd.length>=12)d=dd}
 if(d&&d.length>=12)o.dRaw=d;
 if(!g&&d){const r=d.match(/(아크릴우레탄|폴리우레탄|에폭시|우레탄|아크릴|실리콘|불소|알키드|염화고무|비닐|징크|무기)/),l=d.match(/(하도|중도|상도|프라이머|프라이마)(?:용|로서|로|입니다|\s*도료)/);if(r&&l)g=r[1]+' '+l[1]}
 if(g)o.g=g;else if(s.g)o.g='';
 if(o.dRaw){o.d=sum50(o.dRaw,g);delete o.dRaw}
 // 용도 · 표면처리
 const us=sect(L,['용도'],3);if(us)o.us=sumUse(us);
 const sp=sect(L,['표면처리'],4,/^\s*소지\s*최소\s*추천\s*$/);if(sp)o.sp=sumSurf(sp);
 // 희석제
 for(let i=0;i<L.length;i++){const gg=getLab(L[i]);if(!gg||!['희석제','신너','신나'].includes(gg.k)&&!(gg.k==='희석'&&/희석제|No\.?\s*\d/.test(gg.v)))continue;
  let r=gg.v.replace(/\(\s*최대[^)]*\)?/,'').trim();
  if(/필요하지\s*않|무희석|사용하지\s*않|필요\s*없/.test(r)){o.tn='';o.tc='';o.tr=0;break}
  if(!r||/저장\s*기간/.test(r)){const n=String(L[i+1]||'');if(n.length<=14&&!getLab(n))r=clean(n);else r=''}
  if(!r||r.length>60||/[.。]\s*$/.test(r)&&r.length>30)continue;
  r=clean(r).replace(/^\(?희석제\)?\s*/,'희석제 ').replace(/^희석제\s+(?=[A-Za-z0-9가-힣]{1,4}\s*$)/,'');
  r=r.replace(/([가-힣])\s+\(/g,'$1(');o.tn=r;const m=r.match(/(?:No\.?\s*)?([A-Z]{0,3}-?\d{2,4}[A-Z]?)(?=\s*(?:[,/]|$))/i);if(m)o.tc=m[1];break}
 // 혼합비 (A/B)
 let m=null;
 for(const x of L){if((m=String(x).match(/\(A\)\s*\/\s*경화제\s*\(B\)\s*=\s*(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/))){o.mixa=+m[1];o.mixb=+m[2];break}}
 const ca=L.find(x=>/Comp\.?\s*A\s+\d/.test(x)&&/\d\s*파트/.test(x)),cb=L.find(x=>/Comp\.?\s*B\s+\d/.test(x)&&/\d\s*파트/.test(x));
 if(ca&&cb){const a=ca.match(/Comp\.?\s*A\s*(\d+(?:\.\d+)?)\s*파트/),b=cb.match(/Comp\.?\s*B\s*(\d+(?:\.\d+)?)\s*파트/);if(a&&b){o.mixa=+a[1];o.mixb=+b[1]}}
 // 포장 (Jotun: Comp A/B 부피)
 const pa=L.find(x=>/Comp\.?\s*A\s+[\d./ ]+$/.test(String(x).trim())),pb=L.find(x=>/Comp\.?\s*B\s+[\d./ ]+$/.test(String(x).trim()));
 if(pa&&pb){const A=pa.match(/[\d.]+/g).slice(-4).map(Number),B=pb.match(/[\d.]+/g).slice(-4).map(Number);if(A.length==4&&B.length==4){const tt=[A[0]+B[0],A[1]+B[1]];o.pks=tt.map(v=>v+'L').join(' · ');o.pack=Math.max(...tt);o.pun='ℓ'}}
 for(let i=0;i<L.length&&!o.pks;i++){const q=getLab(L[i]);if(q&&q.k==='포장단위'){const r=q.v+' '+(L[i+1]||'')+' '+(L[i+2]||'')+' '+(L[i+3]||'');const mm=r.match(/([\d.]+)\s*(리터|L|ℓ|LT|kg|㎏)/i);if(mm){const kg=/kg|㎏/i.test(mm[2]);o.pks=mm[1]+(kg?'kg':'L');if(!s.pack||!kg){o.pack=+mm[1];o.pun=kg?'㎏':'ℓ'}}break}}
 // 도막/고형분/비중 범위
 for(const x of L){const t=String(x);
  if((m=t.match(/^\s*건조\s*도막\s*두께\s*(\d+(?:\.\d+)?)\s*[-~]\s*(\d+(?:\.\d+)?)\s*(미크론|㎛|μm|micron)/))&&!o.dftR){o.dft=Math.round(rng(m[1],m[2]));o.dftR=1}
  else if(!o.dftR&&(m=t.match(/건조\s*도막\s*두께\s*(\d+(?:\.\d+)?)\s*(㎜|mm)/))&&!+s.dft)o.dft=+m[1]*1000;
  if((m=t.match(/부피\s*고형분[^0-9\n]*(\d+(?:\.\d+)?)\s*[~\-]\s*(\d+(?:\.\d+)?)/)))o.svr=rng(m[1],m[2]);
  if((m=t.match(/^\s*비\s*중\s*(?:\([^)]*\))?\s*(\d+(?:\.\d+)?)\s*[~\-]\s*(\d+(?:\.\d+)?)\s*$/)))o.sg=rng(m[1],m[2])}
 delete o.dftR;
 // 선행·후속 도장
 const own=/상도/.test(title+(o.g||s.g||''))?'상도':/중도/.test(title+(o.g||s.g||''))?'중도':/하도|프라이/.test(title+(o.g||s.g||''))?'하도':'';
 const ORD=['하도','중도','상도'],sys={};
 for(const x of L){const q=String(x).match(/^\s*(?:도장\s*시스템\s*)?(하도|중도|상도)\s*[:：]\s*(.+)$/);if(q&&!sys[q[1]])sys[q[1]]=clean(q[2]).split(/\s*[,，]\s*/)[0]}
 if(Object.keys(sys).length>=2){let ow=own;for(const k of ORD)if(sys[k]&&sq(sys[k]).length>2&&sq(title).includes(sq(sys[k])))ow=k;
  const ix=ORD.indexOf(ow);if(ix>=0){const pr=ORD.slice(0,ix).reverse().find(k=>sys[k]),nx=ORD.slice(ix+1).find(k=>sys[k]);if(pr)o.pre=sys[pr];if(nx)o.nxt=sys[nx];if(!nx&&s.nxt)o.nxt=''}}
 for(const x of L){const t=String(x);
  if((m=t.match(/후속\s*도장\s*[:：]\s*(.+?)\s*(?:적용\s*가능)?\s*$/))&&/계|도료|상도|우레탄|에폭시/.test(m[1])&&!o.nxt)o.nxt=clean(m[1]).replace(/\s*(도료)\s*$/,'');
  if((m=t.match(/^\s*(?:이전\s*도장|선\s*행\s*도\s*장)\s*[:：]?\s*(.+)$/))&&!o.pre)o.pre=clean(m[1]).replace(/\s*(혹은|또는)\s*도장사양에\s*따릅니다\.?$/,'').replace(/,?\s*도장사양에\s*따릅니다\.?$/,'').replace(/[,、]\s*$/,'');
  if((m=t.match(/^\s*후\s*속\s*도\s*장\s*(.+)$/))&&!o.nxt&&!/:|가능\s*시간|\d\s*시간/.test(m[1]))o.nxt=clean(m[1]).replace(/\s*(혹은|또는)\s*도장사양에\s*따릅니다\.?$/,'').replace(/,?\s*도장사양에\s*따릅니다\.?$/,'')}
 for(const k of ['pre','nxt']){const v=o[k]!==undefined?o[k]:s[k];if(v&&/^도장\s*사양에\s*따(름|릅니다)\.?$/.test(v.trim()))o[k]=''}
 return o}

/* ---- 건조시간·가사시간 표 (헤더 단위, 라벨만 있는 줄, 값만 있는 줄, 범위, 단일값 확장) ---- */
const UN={h:'시간',hr:'시간',hrs:'시간',hour:'시간',hours:'시간',min:'분',d:'일',day:'일'};
const unN=u=>u?(UN[String(u).toLowerCase()]||u):'';
function dry326(L){L=(L||[]).map(x=>String(x));const TT=/(-?\d+)\s*[℃°]\s*C?/g;
 for(let i=0;i<L.length;i++){const tm=[...L[i].matchAll(TT)].map(m=>m[1]+'℃');if(tm.length<2||/가사|도료\s*온도/.test(L[i]))continue;
  const n=tm.length,R={touch:null,cure:null,full:null,rmin:null,rmax:null,pot:null};let pend=null,sawRe=false;
  const vals=(t,du)=>{const o=[];t=t.replace(/\[[^\]]*\]/g,' ').replace(/\([^)]*\)/g,' ');for(const m of t.matchAll(/(\d+(?:\.\d+)?)(?:\s*[~∼]\s*(\d+(?:\.\d+)?))?\s*(시간|분|일|개월|주|hours?|hrs?|min|h|d)?(?![A-Za-z가-힣])/gi)){const u=unN(m[3])||du||'';if(!u)continue;o.push({a:m[1]+u,b:m[2]?m[2]+u:''})}return o};
  const key=l=>{const q=l.replace(/\s+/g,'');if(/보행|서비스|인덕션|유도/.test(q))return'skip';if(/가사/.test(q))return'pot';if(/(재도장|후속도장)/.test(q)){return/(최대|max)/i.test(q)?'rmax':'rmin'}if(/지촉|touch/i.test(q))return'touch';if(/완전/.test(q))return'full';if(/고화|지건|경화|하드/.test(q))return'cure';return''};
  for(let j=i+1;j<Math.min(L.length,i+14);j++){let l=L[j];if(!l.trim())continue;if(/^\s*(주의|※|\*)/.test(l)&&R.touch)break;
   const lt=l.replace(/\s+/g,'');
   const du=(l.match(/\(\s*(시간|분|일|hrs?|h|min)\s*\)/i)||[])[1];
   let k=key(l.replace(/[\d.~∼]+.*$/,''));
   if(!k&&/(재도장|후속도장)/.test(lt)&&!/\d/.test(lt)){sawRe=true;continue}
   const lab=l.replace(/\(\s*(시간|분|일|hrs?|h|min)\s*\)/i,' ').replace(/\[[^\]]*\]/g,' ');
   let v=vals(lab,unN(du));
   if(k==='skip')continue;
   if(!k){ if(/^[\s\d.~∼시간분일hdmin]+$/i.test(l.replace(/\s+/g,' '))||(v.length>=2&&!/[가-힣A-Za-z]{3,}/.test(l.replace(/(시간|분|일|min|hrs?|hours?)/gi,'')))){pend={v,du:unN(du)};continue}
      if(v.length==n&&sawRe&&!R.rmin){k='rmin'}else{continue}}
   if(!v.length){const nx=L[j+1];if(nx&&!/[가-힣]{2,}/.test(nx.replace(/(시간|분|일)/g,''))&&!/[℃°]/.test(nx)){v=vals(nx,unN(du));if(v.length)j++}}
   if(!v.length&&pend){v=pend.v;pend=null}
   if(k==='pot'||k==='touch'||k==='cure'||k==='full'||k==='rmin'||k==='rmax'){if(v.length==n)R[k]=v;else if(v.length==1&&(k=='rmax'||k=='rmin'))R[k]=Array(n).fill(v[0])}
   if(k=='rmin'||k=='rmax')sawRe=true}
  if(!(R.touch||R.cure||R.full||R.rmin))continue;
  const g=(a,k)=>a?(a[k].a):'';
  const rows=tm.map((t,k)=>{let mn=R.rmin?R.rmin[k].a:'',mx=R.rmax?R.rmax[k].a:'';if(R.rmin&&R.rmin[k].b){mx=R.rmin[k].b}return [t,g(R.touch,k),g(R.cure,k),g(R.full,k),mn,mx].join('/')}).join(';');
  const pot=R.pot?tm.map((t,k)=>t+' '+R.pot[k].a).join(' / '):'';
  return{rows,pot,tm}}
 return null}
function dry1(L){L=(L||[]).map(String);const J=L.join('\n');let t='',a='',c='',mn='',mx='',m;
 if((m=J.match(/Touch\s*:\s*(\d+)\s*(?:min\w*|분)\s*\/\s*Curing\s*:\s*(\d+)\s*(?:hours?|hrs?|시간)/i))){a=m[1]+'분';c=m[2]+'시간'}
 else{if((m=J.match(/지촉\s*건조\s*[:：]?\s*([\d.]+)\s*(분|시간)/)))a=m[1]+m[2];if((m=J.match(/(?:경화|고화)\s*건조\s*[:：]?\s*([\d.]+)\s*(분|시간)/)))c=m[1]+m[2]}
 if((m=J.match(/재도장\s*간격\s*\(?\s*(\d+)\s*[℃°]\s*C?\s*\)?\s*(?:에서)?[,\s]*(?:within\s*(\d+)\s*hours?)?/i))){t=m[1]+'℃';if(m[2])mn=m[2]+'시간'}
 if(!mn&&(m=J.match(/최소\s*[:：]\s*([\d.]+)\s*(분|시간|일)/)))mn=m[1]+m[2];if((m=J.match(/최대\s*[:：]\s*([\d.]+)\s*(분|시간|일)/)))mx=m[1]+m[2];
 if(!t&&(m=J.match(/(\d+)\s*[℃°]\s*C?\s*(?:기준|에서)/)))t=m[1]+'℃';
 if(!(a||c||mn))return'';return [t||'20℃',a,c,'',mn,mx].join('/')}
{const D=parseDry,P=parsePot;
 parseDry=function(L){let r=null;try{r=dry326(L)}catch(e){console.warn('dry326',e)}if(r&&r.rows)return r.rows;const o=D(L);if(o)return o;try{return dry1(L)}catch(e){return ''}};
 parsePot=function(L){let r=null;try{r=dry326(L)}catch(e){}const p=P(L);if(r&&r.pot&&(!p||/ \/ /.test(p)||/^\d+℃ /.test(p)===false))return r.pot;return p}}
parseAll=function(L){const s=prev(L)||{};let o={};try{o=fix(L,s)}catch(e){console.warn('tds326',e)}
 const r={...s};for(const k in o){if(o[k]===''||o[k]==null||o[k]===undefined){if(o[k]===''&&(k=='g'||k=='nxt'||k=='pre'||k=='tn'||k=='tc'))delete r[k];if(k=='tr'&&o[k]===0)r.tr=0;continue}r[k]=o[k]}
 if(r.mixa&&r.mixb&&r.pack&&!r.pk){}
 return r};
})();
