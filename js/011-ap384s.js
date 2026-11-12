(function(){
const NS='ap344',n=v=>{v=parseFloat(String(v==null?'':v).replace(/,/g,''));return isFinite(v)?v:0},q1=p=>(p.q===''||p.q==null)?1:n(p.q),sd=p=>+p.s==2?2:1,PI=Math.PI;
const load=()=>{try{const o=JSON.parse(LS[NS]||'null');return o&&Array.isArray(o.parts)?o:null}catch(e){return null}};
let AR=load()||{type:'apt',name:'',parts:[],seq:1};
const save=()=>{try{LS[NS]=JSON.stringify(AR)}catch(e){}};
window.apGet=()=>AR;window.apSetAll=o=>{if(o&&Array.isArray(o.parts)){AR=o;save()}};
const SEL12=[['1','한 면'],['2','양면']];
const K={
 wall:{n:'벽면',f:[['w','가로','m'],['h','높이','m'],['q','수량','개'],['ded','공제(창·문)','㎡'],['s','도장 면','sel',SEL12]],a:p=>Math.max(0,(n(p.w)*n(p.h)*q1(p)-n(p.ded))*sd(p))},
 floor:{n:'바닥·천장',f:[['w','가로','m'],['l','세로','m'],['q','수량','개'],['ded','공제','㎡']],a:p=>Math.max(0,n(p.w)*n(p.l)*q1(p)-n(p.ded))},
 roof:{n:'경사 지붕',f:[['w','경사 방향 밑변','m'],['l','길이','m'],['r','경사(밑변 10당 높이)','']],a:p=>n(p.w)*n(p.l)*Math.sqrt(1+Math.pow(n(p.r)/10,2))},
 parapet:{n:'파라펫',f:[['len','길이','m'],['h','높이','m'],['t','상단 폭','m'],['s','도장 면','sel',[['1','바깥 + 상단'],['2','안·밖 + 상단']]]],a:p=>n(p.len)*(n(p.h)*sd(p)+n(p.t))},
 col:{n:'기둥',f:[['sh','단면','sel',[['1','사각'],['2','원형']]],['a','가로 / 지름','m'],['b','세로(사각)','m'],['h','높이','m'],['q','수량','개']],a:p=>(+p.sh==2?PI*n(p.a):2*(n(p.a)+n(p.b)))*n(p.h)*q1(p)},
 line:{n:'구획선·차선',f:[['len','선 길이','m'],['wd','선 폭','m'],['q','수량','줄']],a:p=>n(p.len)*n(p.wd)*q1(p)},
 pipe:{n:'강관',f:[['D','외경','mm'],['L','길이','m'],['q','수량','본'],['s','도장 면','sel',[['1','외면'],['2','내·외면']]]],a:p=>PI*n(p.D)/1000*n(p.L)*q1(p)*sd(p)},
 hbeam:{n:'H형강',f:[['H','H','mm'],['B','B','mm'],['tw','tw','mm'],['tf','tf','mm'],['L','길이','m'],['q','수량','본'],['x','도장 범위','sel',[['0','전체 둘레'],['1','플랜지 외측 1면 제외'],['2','전체 둘레 + 양 끝면']]]],a:p=>{const H=n(p.H),B=n(p.B),tw=n(p.tw),tf=n(p.tf),x=+p.x||0;return Math.max(0,((4*B+2*H-2*tw-(x==1?B:0))/1000*n(p.L)+(x==2?2*(2*B*tf+(H-2*tf)*tw)/1e6:0))*q1(p))}},
 ibeam:{n:'I형강',f:[['H','H','mm'],['B','B','mm'],['tw','tw','mm'],['tf','tf','mm'],['L','길이','m'],['q','수량','본'],['x','도장 범위','sel',[['0','전체 둘레'],['1','플랜지 외측 1면 제외'],['2','전체 둘레 + 양 끝면']]]],a:p=>{const H=n(p.H),B=n(p.B),tw=n(p.tw),tf=n(p.tf),x=+p.x||0;return Math.max(0,((4*B+2*H-2*tw-(x==1?B:0))/1000*n(p.L)+(x==2?2*(2*B*tf+(H-2*tf)*tw)/1e6:0))*q1(p))}},
 rtube:{n:'각형강',f:[['A','가로 A','mm'],['B','세로 B','mm'],['t','두께 t','mm'],['L','길이','m'],['q','수량','본'],['s','도장 면','sel',[['1','외면'],['2','내·외면']]]],a:p=>{const A=n(p.A),B=n(p.B),t=n(p.t),o=2*(A+B)/1000*n(p.L),i=Math.max(0,2*(A+B-4*t))/1000*n(p.L);return Math.max(0,(sd(p)==2?o+i:o)*q1(p))}},
 plate:{n:'평판·철판',f:[['w','가로','m'],['l','세로','m'],['q','수량','장'],['s','도장 면','sel',SEL12]],a:p=>n(p.w)*n(p.l)*q1(p)*sd(p)},
 tank:{n:'탱크·원통',f:[['D','지름','m'],['h','높이','m'],['t','지붕·바닥','sel',[['0','측면만'],['1','측면 + 지붕'],['2','측면 + 지붕 + 바닥']]],['q','수량','기']],a:p=>(PI*n(p.D)*n(p.h)+PI*n(p.D)*n(p.D)/4*(+p.t||0))*q1(p)},
 car:{n:'차량(근사)',f:[['L','길이','m'],['W','폭','m'],['H','높이','m'],['k','외판 계수','','0.3'],['q','대수','대']],a:p=>2*(n(p.L)*n(p.W)+n(p.L)*n(p.H)+n(p.W)*n(p.H))*(p.k===''||p.k==null?0.3:n(p.k))*q1(p)},
 direct:{n:'직접 면적',f:[['A','면적','㎡'],['q','수량','개'],['s','도장 면','sel',[['','선택하세요'],['1','한 면'],['2','양면']]]],a:p=>n(p.A)*q1(p)*sd(p)}
};
const TY={
 apt:{n:'아파트',pre:[['외벽','wall'],['내벽(세대)','wall'],['천장','floor'],['계단실 벽','wall'],['복도 바닥','floor'],['옥상 바닥','floor'],['옥상 파라펫','parapet']]},
 house:{n:'주택',pre:[['외벽','wall'],['내벽','wall'],['천장','floor'],['지붕','roof'],['담장','wall'],['철재 대문','plate']]},
 roof:{n:'옥상',pre:[['옥상 바닥','floor'],['파라펫','parapet'],['설비 기초','floor'],['배수구 주변','floor']]},
 park:{n:'주차장',pre:[['바닥','floor'],['기둥','col'],['구획선','line'],['벽','wall'],['천장','floor']]},
 steel:{n:'철재',pre:[['H형강','hbeam'],['강관','pipe'],['평판','plate'],['탱크','tank']]},
 car:{n:'차량',pre:[['차체 외판','car']]},
 plant:{n:'플랜트',pre:[['배관','pipe'],['탱크','tank'],['철골(H형강)','hbeam'],['평판','plate']]},
 free:{n:'기타',pre:[['면적 직접 입력','direct']]}
};
const ar=p=>{const k=K[p.k];return k?k.a(p):0};
const tot=t=>AR.parts.filter(p=>!t||p.t==t).reduce((s,p)=>s+ar(p),0);
const fm=v=>F(v,2)+'㎡';
/* ---------- 도면 ---------- */
const DW=200,DH=118,C1='#1d5fd1',C2='#ff8a1f',FL='#eaf2ff';
const tx=(x,y,t,a,c)=>`<text x="${x}" y="${y}" font-size="9" fill="${c||'#4a5b7c'}" text-anchor="${a||'middle'}" font-family="Noto Sans KR,system-ui,sans-serif" font-weight="600">${t}</text>`;
const fit=(a,b,W,H)=>{a=a>0?a:1.6;b=b>0?b:1;const k=Math.min(W/a,H/b);return [a*k,b*k]};
const dm=(v,u)=>v>0?F(v,2)+u:'?';
const PAT='<defs><pattern id="aph" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="#b9cff3" stroke-width="1.4"/></pattern></defs>';
const qtag=p=>q1(p)>1?tx(DW-6,DH-4,'× '+F(q1(p),0),'end',C1):'';
const D={
 wall(p){const w=n(p.w),h=n(p.h),[rw,rh]=fit(w,h,150,72),x=(DW-rw)/2,y=14;let s=`<rect x="${x}" y="${y}" width="${rw}" height="${rh}" fill="${FL}" stroke="${C1}" stroke-width="1.6"/>`;
  const d=n(p.ded);if(d>0&&w*h>0){const fr=Math.min(.7,d/(w*h*q1(p))),wa=rw*.2,ha=Math.min(rh*.7,fr*rw*rh/2/wa);[.22,.58].forEach(f=>{s+=`<rect x="${x+rw*f}" y="${y+(rh-ha)/2}" width="${wa}" height="${ha}" fill="#fff" stroke="${C2}" stroke-width="1.3"/>`})}
  return s+tx(DW/2,y+rh+13,dm(w,'m'))+tx(x-4,y+rh/2+3,dm(h,'m'),'end')+(sd(p)==2?tx(x+rw/2,y+rh/2+3,'양면',null,C1):'')+qtag(p)},
 floor(p){const w=n(p.w),l=n(p.l),[rw,rh]=fit(w,l,150,72),x=(DW-rw)/2,y=14;
  let s=PAT+`<rect x="${x}" y="${y}" width="${rw}" height="${rh}" fill="url(#aph)" stroke="${C1}" stroke-width="1.6"/>`;
  if(n(p.ded)>0){const fr=Math.min(.6,n(p.ded)/(w*l*q1(p)||1));s+=`<rect x="${x+rw*.55}" y="${y+rh*.25}" width="${rw*Math.sqrt(fr)}" height="${rh*Math.sqrt(fr)}" fill="#fff" stroke="${C2}" stroke-width="1.3"/>`}
  return s+tx(DW/2,y+rh+13,dm(w,'m'))+tx(x-4,y+rh/2+3,dm(l,'m'),'end')+qtag(p)},
 roof(p){const w=n(p.w),r=n(p.r),h=w*r/10,[rw,rh]=fit(w,Math.max(h,w*.12),150,66),x=(DW-rw)/2,y=16+(66-rh);
  return `<polygon points="${x},${y+rh} ${x+rw},${y+rh} ${x+rw},${y}" fill="${FL}" stroke="${C1}" stroke-width="1.6"/><line x1="${x}" y1="${y+rh}" x2="${x+rw}" y2="${y}" stroke="${C2}" stroke-width="2.4"/>`+tx(DW/2,y+rh+13,dm(w,'m'))+tx(x+rw+4,y+rh/2+3,r>0?(F(r,1)+'/10'):'?','start',C2)+tx(DW/2,10,'측면도 (색선 = 도장면)',null,'#7d8aa3')},
 parapet(p){const h=n(p.h),t=Math.max(n(p.t),h*.12),[rw,rh]=fit(t,h,60,76),x=(DW-rw)/2-10,y=14,two=sd(p)==2;
  return `<rect x="${x}" y="${y}" width="${rw}" height="${rh}" fill="${FL}" stroke="${C1}" stroke-width="1.4"/><line x1="${x+rw}" y1="${y}" x2="${x+rw}" y2="${y+rh}" stroke="${C2}" stroke-width="3"/><line x1="${x}" y1="${y}" x2="${x+rw}" y2="${y}" stroke="${C2}" stroke-width="3"/>`+(two?`<line x1="${x}" y1="${y}" x2="${x}" y2="${y+rh}" stroke="${C2}" stroke-width="3"/>`:'')+`<line x1="${x-14}" y1="${y+rh}" x2="${x+rw+40}" y2="${y+rh}" stroke="#8b9bb8" stroke-width="1.4"/>`+tx(x-4,y+rh/2+3,dm(n(p.h),'m'),'end')+tx(x+rw+8,y+rh/2+3,'단면','start','#7d8aa3')+tx(x+rw/2,y+rh+13,dm(n(p.t),'m'))+tx(DW-6,DH-4,'길이 '+dm(n(p.len),'m'),'end',C1)},
 col(p){const a=n(p.a),b=+p.sh==2?a:n(p.b),h=n(p.h),[sw,sh]=fit(a,b,50,50),[ew,eh]=fit(a,h,50,80),x1=24,y1=24,x2=120,y2=14;
  const top=+p.sh==2?`<circle cx="${x1+sw/2}" cy="${y1+sh/2}" r="${sw/2}" fill="${FL}" stroke="${C2}" stroke-width="2.4"/>`:`<rect x="${x1}" y="${y1}" width="${sw}" height="${sh}" fill="${FL}" stroke="${C2}" stroke-width="2.4"/>`;
  return top+tx(x1+sw/2,y1+sh+13,'평면 '+dm(a,'m')+(+p.sh==2?'':'×'+dm(b,'m')))+`<rect x="${x2}" y="${y2}" width="${ew}" height="${eh}" fill="${FL}" stroke="${C1}" stroke-width="1.6"/>`+tx(x2+ew/2,y2+eh+13,'높이 '+dm(h,'m'))+qtag(p)},
 line(p){const x=24,w=152;let s='';[22,46,70].forEach(y=>{s+=`<rect x="${x}" y="${y}" width="${w}" height="9" fill="#fff6c9" stroke="${C2}" stroke-width="1.4"/>`});
  return s+tx(DW/2,100,'길이 '+dm(n(p.len),'m')+' × 폭 '+dm(n(p.wd),'m'))+qtag(p)},
 pipe(p){const D=n(p.D),L=n(p.L),rh=Math.max(20,Math.min(48,D>0&&L>0?D/1000/L*600:30)),x=22,w=150,y=(DH-rh)/2-6;
  return `<rect x="${x}" y="${y}" width="${w}" height="${rh}" fill="${FL}" stroke="${C2}" stroke-width="2.4"/><ellipse cx="${x+w}" cy="${y+rh/2}" rx="${rh*.22}" ry="${rh/2}" fill="#fff" stroke="${C2}" stroke-width="2"/>`+(sd(p)==2?`<ellipse cx="${x+w}" cy="${y+rh/2}" rx="${rh*.12}" ry="${rh/2-5}" fill="none" stroke="${C2}" stroke-dasharray="3 2"/>`:'')+tx(x+w/2,y+rh+14,'길이 '+dm(L,'m'))+tx(x-3,y+rh/2+3,'Ø'+(D>0?F(D,0):'?'),'end')+qtag(p)},
 ibeam(p){return D.hbeam(p)},
 rtube(p){const A=n(p.A),B=n(p.B),[rw,rh]=fit(A,B,80,70),x=(DW-rw)/2,y=16;return `<rect x="${x}" y="${y}" width="${rw}" height="${rh}" fill="${FL}" stroke="${C2}" stroke-width="2.4"/>`+tx(DW/2,y+rh+13,dm(A,'mm'))+tx(x-4,y+rh/2+3,dm(B,'mm'),'end')+qtag(p)},
 hbeam(p){const H=n(p.H),B=n(p.B),tw=n(p.tw),tf=n(p.tf);if(!(H>0&&B>0&&tw>0&&tf>0))return tx(DW/2,62,'H · B · tw · tf 를 입력하세요',null,'#8b9bb8');
  const k=Math.min(96/B,84/H),h=H*k,b=B*k,w=Math.max(tw*k,2.5),f=Math.max(tf*k,2.5),x=(DW-b)/2-14,y=(DH-h)/2-4;
  const pts=[[x,y],[x+b,y],[x+b,y+f],[x+b/2+w/2,y+f],[x+b/2+w/2,y+h-f],[x+b,y+h-f],[x+b,y+h],[x,y+h],[x,y+h-f],[x+b/2-w/2,y+h-f],[x+b/2-w/2,y+f],[x,y+f]].map(a=>a.map(v=>v.toFixed(1)).join(',')).join(' ');
  return `<polygon points="${pts}" fill="${FL}" stroke="${C2}" stroke-width="2.4" stroke-linejoin="round"/>`+tx(x+b+8,y+h/2+3,'H '+F(H,0),'start')+tx(x+b/2,y+h+13,'B '+F(B,0))+tx(x+b+8,y+h/2+15,'tw '+F(tw,1)+' tf '+F(tf,1),'start','#7d8aa3')+tx(DW-6,DH-4,'길이 '+dm(n(p.L),'m')+(q1(p)>1?' ×'+F(q1(p),0):''),'end',C1)},
 plate(p){const w=n(p.w),l=n(p.l),[rw,rh]=fit(w,l,140,66),x=(DW-rw)/2,y=12;
  return `<rect x="${x}" y="${y}" width="${rw}" height="${rh}" fill="${FL}" stroke="${C2}" stroke-width="2.4"/>`+tx(DW/2,y+rh+13,dm(w,'m'))+tx(x-4,y+rh/2+3,dm(l,'m'),'end')+(sd(p)==2?tx(x+rw/2,y+rh/2+3,'양면',null,C1):'')+qtag(p)},
 tank(p){const D=n(p.D),h=n(p.h),[rw,rh]=fit(D,h,86,70),x=(DW-rw)/2-10,y=26,t=+p.t||0;
  return `<rect x="${x}" y="${y}" width="${rw}" height="${rh}" fill="${FL}" stroke="${C2}" stroke-width="2.4"/><ellipse cx="${x+rw/2}" cy="${y}" rx="${rw/2}" ry="${Math.max(4,rw*.12)}" fill="${t>=1?'#fff6e6':'#fff'}" stroke="${t>=1?C2:C1}" stroke-width="${t>=1?2.4:1.2}"/><ellipse cx="${x+rw/2}" cy="${y+rh}" rx="${rw/2}" ry="${Math.max(4,rw*.12)}" fill="none" stroke="${t==2?C2:C1}" stroke-width="${t==2?2.4:1.2}" stroke-dasharray="${t==2?'':'3 2'}"/>`+tx(x+rw/2,y+rh+22,'Ø'+dm(D,'m'))+tx(x+rw+8,y+rh/2+3,'H '+dm(h,'m'),'start')+qtag(p)},
 car(p){return `<path d="M30 78 L30 62 Q32 52 46 50 L70 46 Q84 30 108 30 L136 30 Q150 34 158 48 L172 52 Q180 56 180 66 L180 78 Z" fill="${FL}" stroke="${C1}" stroke-width="1.6"/><circle cx="62" cy="80" r="11" fill="#fff" stroke="${C1}" stroke-width="2"/><circle cx="148" cy="80" r="11" fill="#fff" stroke="${C1}" stroke-width="2"/><path d="M30 66 L180 66" stroke="${C2}" stroke-width="2.4"/>`+tx(DW/2,106,(n(p.L)>0?F(n(p.L),2):'?')+' × '+(n(p.W)>0?F(n(p.W),2):'?')+' × '+(n(p.H)>0?F(n(p.H),2):'?')+' m · 근사')+qtag(p)},
 direct(p){return `<rect x="62" y="20" width="76" height="62" rx="6" fill="${FL}" stroke="${C1}" stroke-width="1.6"/>`+tx(100,56,fm(n(p.A)),null,C1)+tx(100,100,'면적 직접 입력')}
};
const draw=p=>`<svg viewBox="0 0 ${DW} ${DH}" width="100%" aria-hidden="true">${(D[p.k]||D.direct)(p)}</svg>`;
/* ---------- 화면 (v384 · 1024px 참고 디자인 기준) ---------- */
const IC={apt:'<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M11 21v-3h2v3"/>',house:'<path d="M3.5 11 12 4l8.5 7"/><path d="M5.5 9.8V20h13V9.8"/><path d="M10 20v-5.5h4V20"/>',roof:'<rect x="6" y="3" width="12" height="18" rx="1.2"/><path d="M9.5 7h1.6M12.9 7h1.6M9.5 11h1.6M12.9 11h1.6M9.5 15h1.6M12.9 15h1.6"/>',park:'<rect x="3.5" y="4" width="17" height="16" rx="2.5"/><path d="M9.5 16V8.5h3a2.3 2.3 0 0 1 0 4.6h-3"/>',steel:'<path d="M5 4h14v3.5H13.5v9H19V20H5v-3.5h5.5v-9H5z"/>',car:'<path d="M3 15v-3l2-4h14l2 4v3z"/><circle cx="7.5" cy="16.5" r="1.8"/><circle cx="16.5" cy="16.5" r="1.8"/>',plant:'<path d="M3 20V9l5 3V9l5 3V5h3l1 7h3v8z"/><path d="M7 16h2M12 16h2M17 16h2"/>',free:'<circle cx="5.5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="18.5" cy="12" r="1.3"/>',hbeam:'<path d="M6 4v16M18 4v16M6 12h12"/>',ibeam:'<path d="M6 4h12M6 20h12M12 4v16"/>',rtube:'<rect x="5" y="5" width="14" height="14" rx="1.5"/>',pipe:'<circle cx="12" cy="12" r="8"/>',chev:'<path d="M6 9l6 6 6-6"/>',right:'<path d="M9 6l6 6-6 6"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.8v.4"/>',calc:'<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M8.5 7.5h7M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01"/>',roller:'<rect x="4" y="3.5" width="14" height="6" rx="1.8"/><path d="M18 6.5h2.5V12h-8v3"/><rect x="10" y="15" width="4" height="6" rx="1.2"/>',drop:'<path d="M12 3c3.5 4.5 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 2.5-6.5 6-11z"/>',kg:'<path d="M7 9h10l2.2 11H4.8z"/><circle cx="12" cy="5.5" r="2"/>',yen:'<circle cx="12" cy="12" r="9"/><path d="M8.5 7l3.5 5 3.5-5M12 12v6M9 13.5h6M9 16h6"/>',doc:'<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 14l2 2 4-4"/>',atom:'<circle cx="12" cy="12" r="1.8"/><ellipse cx="12" cy="12" rx="9" ry="3.6"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)"/>',plus:'<path d="M12 5v14M5 12h14"/>',ruler:'<path d="M3 17 17 3l4 4L7 21z"/><path d="M7.5 12.5l2 2M10.5 9.5l2 2M13.5 6.5l2 2"/>'};
Object.assign(IC,{pin:'<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>',layers:'<path d="M12 3L3 7.5l9 4.5 9-4.5z"/><path d="M3 12l9 4.5 9-4.5M3 16.5L12 21l9-4.5"/>'});
const I=(k,c)=>`<svg class="${c||''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[k]||''}</svg>`;
const FMIB=[['I-100×75×5×8',100,75,5,8],['I-150×75×5.5×9.5',150,75,5.5,9.5],['I-200×100×7×10',200,100,7,10],['I-250×125×7.5×12.5',250,125,7.5,12.5],['I-300×150×8×13',300,150,8,13]];
const FMRT=[['□-50×50×2.3',50,50,2.3],['□-75×75×3.2',75,75,3.2],['□-100×100×4.5',100,100,4.5],['□-150×150×6.0',150,150,6],['□-200×200×8.0',200,200,8]];
const FMPI=[['Ø60.5',60.5],['Ø114.3',114.3],['Ø165.2',165.2],['Ø216.3',216.3],['Ø267.4',267.4]];
const SZ={hbeam:{l:()=>FMHB,k:['H','B','tw','tf']},ibeam:{l:()=>FMIB,k:['H','B','tw','tf']},rtube:{l:()=>FMRT,k:['A','B','t']},pipe:{l:()=>FMPI,k:['D']}};
const HBH={H:'H (높이)',B:'B (폭)',tw:'tw (웹 두께)',tf:'tf (플랜지 두께)',L:'길이'},HINT={hbeam:HBH,ibeam:HBH,rtube:{A:'A (가로)',B:'B (세로)',t:'t (두께)',L:'길이'},pipe:{D:'D (외경)',L:'길이'}};
const KN={hbeam:'H형강',ibeam:'I형강',rtube:'각형강',pipe:'원형강'};
const SYM3=[['길이','부재 길이 (m)'],['수량','수량 (본)']];
const FX={hbeam:{f:'도장면적(㎡) = <b>{ 2×H + 4×B − 2×tw }</b><br>× 길이(m) × 수량 ÷ 1,000',sym:[['H','형강 높이 (mm)'],['B','형강 폭 (mm)'],['tw','웹 두께 (mm)'],['tf','플랜지 두께 (mm)'],['길이','형강 길이 (m)'],['수량','형강 수량 (본)']]},
 ibeam:{f:'도장면적(㎡) = <b>{ 2×H + 4×B − 2×tw }</b><br>× 길이(m) × 수량 ÷ 1,000',sym:[['H','형강 높이 (mm)'],['B','형강 폭 (mm)'],['tw','웹 두께 (mm)'],['tf','플랜지 두께 (mm)'],['길이','형강 길이 (m)'],['수량','형강 수량 (본)']]},
 rtube:{f:'도장면적(㎡) = <b>{ 2 × (A + B) }</b> × 길이(m) × 수량 ÷ 1,000<br>(내·외면: + 2 × (A + B − 4 × t))',sym:[['A','가로 (mm)'],['B','세로 (mm)'],['t','두께 (mm)'],['길이','강관 길이 (m)'],['수량','수량 (본)']]},
 pipe:{f:'도장면적(㎡) = <b>π × D</b> ÷ 1,000 × 길이(m) × 수량<br>× 도장 면수(외면 1 · 내·외면 2)',sym:[['D','외경 (mm)'],['길이','강관 길이 (m)'],['수량','수량 (본)']]},
 wall:{f:'도장면적(㎡) = <b>(가로 × 높이 × 수량 − 공제)</b><br>× 도장 면수',sym:[['가로','벽 가로 (m)'],['높이','벽 높이 (m)'],['공제','창·문 면적 (㎡)'],['면수','한 면 1 · 양면 2']]},
 floor:{f:'도장면적(㎡) = <b>가로 × 세로 × 수량 − 공제</b>',sym:[['가로','가로 (m)'],['세로','세로 (m)'],['공제','제외 면적 (㎡)']]},
 roof:{f:'도장면적(㎡) = <b>밑변 × 길이 × √(1 + (경사/10)²)</b>',sym:[['밑변','경사 방향 밑변 (m)'],['길이','지붕 길이 (m)'],['경사','밑변 10당 높이']]},
 parapet:{f:'도장면적(㎡) = <b>길이 × (높이 × 면수 + 상단 폭)</b>',sym:[['길이','파라펫 길이 (m)'],['높이','높이 (m)'],['상단 폭','상단 폭 (m)']]},
 col:{f:'도장면적(㎡) = <b>(둘레) × 높이 × 수량</b><br>사각 2 × (가로 + 세로) · 원형 π × 지름',sym:[['가로','가로 / 지름 (m)'],['세로','세로 (m)'],['높이','기둥 높이 (m)']]},
 line:{f:'도장면적(㎡) = <b>선 길이 × 선 폭 × 수량</b>',sym:[['선 길이','선 한 줄 길이 (m)'],['선 폭','선 폭 (m)'],['수량','줄 수']]},
 plate:{f:'도장면적(㎡) = <b>가로 × 세로 × 수량 × 도장 면수</b>',sym:[['가로','가로 (m)'],['세로','세로 (m)'],['면수','한 면 1 · 양면 2']]},
 tank:{f:'도장면적(㎡) = <b>(π × D × h + π × D² ÷ 4 × 지붕·바닥 면수)</b> × 수량',sym:[['D','지름 (m)'],['h','높이 (m)'],['면수','지붕·바닥 도장 수']]},
 car:{f:'도장면적(㎡) = <b>2 × (L×W + L×H + W×H) × 외판 계수</b> × 대수',sym:[['L','길이 (m)'],['W','폭 (m)'],['H','높이 (m)'],['계수','외판 계수 (기본 0.3)']]},
 direct:{f:'도장면적(㎡) = <b>면적 × 수량</b>',sym:[['면적','직접 입력 (㎡)'],['수량','개수']]}};
const TABS=['apt','house','roof','park','steel','car','plant','free'];
const fxs=(p,f)=>f.f+((p&&p.k=='direct'&&+p.s==2)?' × 2(양면)':'');
const CD0={dft:100,use:'',sg:1.33,price:40000,loss:0,p:''};
const cnd=()=>{const c=Object.assign({},CD0,AR.cond||{});return c};
const useKg=c=>{if(n(c.use)>0)return n(c.use);const p=c.p&&typeof P=='function'?P(c.p):null;if(p&&n(p.svr)>0)return n(c.dft)/(10*n(p.svr))*(n(p.sg)>0?n(p.sg):c.sg);return n(c.dft)*0.00105};
const lab=l=>{const m=String(l).match(/^(\S+)\s+(\(.*\))$/);return m?`${m[1]} <small>${m[2]}</small>`:l};
const mainPart=k=>{let p=AR.parts.find(x=>x.t=='steel'&&x.k==k);if(!p){p={id:'p'+(AR.seq++),t:'steel',k,nm:'',q:'',s:'1'};AR.parts.push(p);save()}return p};
const curPart=()=>{if(AR.type=='steel')return mainPart(AR.sk||'hbeam');return AR.parts.find(p=>p.id==AR.cur&&p.t==AR.type)||AR.parts.find(p=>p.t==AR.type)};
const num=(p,k)=>p[k]===''||p[k]==null?'':p[k];
const ICN={h:'<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>',v:'<path d="M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4"/>',d:'<path d="M5 19L19 5M5 19v-6M5 19h6M19 5v6M19 5h-6"/>',t:'<path d="M4 8h16M4 16h16M12 8v8M9 11l3-3 3 3M9 13l3 3 3-3"/>',q:'<rect x="4" y="3.5" width="13" height="5.5" rx="1.6"/><path d="M17 6.2h2.5v5H12v3"/><rect x="10" y="14" width="4" height="6.5" rx="1.2"/>',m:'<circle cx="12" cy="12" r="9"/><path d="M8 12h8"/>',a:'<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M12 8v8M8 12h8"/>',s:'<path d="M3 17l9 4 9-4M3 12l9 4 9-4M12 3L3 7l9 4 9-4z"/>',r:'<path d="M4 20h16M4 20L16 6M9 20a6 6 0 0 0-1.6-4"/>',c:'<circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/><path d="M18 5L6 19"/>',w:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',y:'<path d="M4 6l3.5 12L12 8l4.5 10L20 6M3 10.5h18M3 14h18"/>'};
const icn=l=>{const t=String(l).replace(/<[^>]+>/g,'');let k='';
 if(/DFT/.test(t))k='s';else if(/높이|^H\b|^h\b|깊이/.test(t))k='v';else if(/두께|^tw|^tf|^t\b/.test(t))k='t';else if(/가로|폭|밑변|너비|지름|외경|^B\b|^W\b|^A\b/.test(t))k='h';else if(/세로/.test(t))k='v';else if(/길이|^L\b/.test(t))k='h';
 else if(/수량|대수|개수/.test(t))k='q';else if(/공제/.test(t))k='m';else if(/면적/.test(t))k='a';else if(/도장 ?면/.test(t))k='s';else if(/경사/.test(t))k='r';else if(/계수|로스/.test(t))k='c';else if(/사용량|비중/.test(t))k='w';else if(/단가/.test(t))k='y';else if(/DFT/.test(t))k='t';else if(/제품 ?DB/.test(t))k='s';
 return k?`<svg class="zqic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICN[k]}</svg>`:''};
const tile=(p,[k,l,u,o],kk)=>{const h=(HINT[kk]||{})[k]||l;return `<div class="zqd"><span>${icn(h)}<i>${lab(h)}</i></span><div class="zqi"><input type="number" inputmode="decimal" step="any" value="${num(p,k)}" placeholder="${k=='q'?'1':(o||'')}" oninput="apSet('${p.id}','${k}',this.value)" onfocus="apCur('${p.id}')" onwheel="this.blur()"><em>${u}</em></div></div>`};
const selTile=(p,[k,l,u,o])=>`<div class="zqd"><span>${icn(l)||icn('도장 면')}<i>${lab(l)}</i></span><div class="zqi"><select onchange="apSet('${p.id}','${k}',this.value);apRe()">${o.map(([v,t])=>`<option value="${v}"${String(p[k]==null||p[k]===''?o[0][0]:p[k])==v?' selected':''}>${t}</option>`).join('')}</select></div></div>`;
/* 철재 · 형강 종류별 정적 일러스트 (등각 투영) */
function iso(kd){const T=kd=='ibeam'?{bw:84,bh:124,tf:14,tw:12}:{bw:106,bh:112,tf:17,tw:15},x0=kd=='ibeam'?82:70,y0=kd=='ibeam'?56:62,dx=70,dy=-36,{bw,bh,tf,tw}=T,wx0=x0+bw/2-tw/2,wx1=wx0+tw,y1=y0+bh-tf,yb=y0+bh,xr=x0+bw;
 const P=a=>a.map(q=>q.join(',')).join(' ');
 const front=[[x0,y0],[xr,y0],[xr,y0+tf],[wx1,y0+tf],[wx1,y1],[xr,y1],[xr,yb],[x0,yb],[x0,y1],[wx0,y1],[wx0,y0+tf],[x0,y0+tf]];
 return `<svg viewBox="0 0 316 222"><defs><linearGradient id="gF" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9aa2ad"/><stop offset="1" stop-color="#6c7580"/></linearGradient><linearGradient id="gT" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#aab2bd"/><stop offset="1" stop-color="#d6dbe2"/></linearGradient><marker id="mk" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L8 4L0 8z" fill="#10264f"/></marker><marker id="mb" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L8 4L0 8z" fill="#1a8fd8"/></marker></defs>`+
 `<polygon points="${P([[x0,y1],[wx0,y1],[wx0+dx,y1+dy],[x0+dx,y1+dy]])}" fill="#9aa3ae"/>`+
 `<polygon points="${P([[wx1,y0+tf],[wx1,y1],[wx1+dx,y1+dy],[wx1+dx,y0+tf+dy]])}" fill="#838c97"/>`+
 `<polygon points="${P([[wx1,y1],[xr,y1],[xr+dx,y1+dy],[wx1+dx,y1+dy]])}" fill="url(#gT)"/>`+
 `<polygon points="${P([[xr,y1],[xr,yb],[xr+dx,yb+dy],[xr+dx,y1+dy]])}" fill="#59626e"/>`+
 `<polygon points="${P([[x0,y0],[xr,y0],[xr+dx,y0+dy],[x0+dx,y0+dy]])}" fill="url(#gT)"/>`+
 `<polygon points="${P([[xr,y0],[xr,y0+tf],[xr+dx,y0+tf+dy],[xr+dx,y0+dy]])}" fill="#59626e"/>`+
 `<polygon points="${P(front)}" fill="url(#gF)" stroke="#5a636e" stroke-width="1"/>`+
 `<line x1="${x0-26}" y1="${y0}" x2="${x0-26}" y2="${yb}" stroke="#10264f" stroke-width="1.4" marker-start="url(#mk)" marker-end="url(#mk)"/><line x1="${x0-32}" y1="${y0}" x2="${x0-20}" y2="${y0}" stroke="#10264f" stroke-width="1"/><line x1="${x0-32}" y1="${yb}" x2="${x0-20}" y2="${yb}" stroke="#10264f" stroke-width="1"/>`+
 `<text x="${x0-52}" y="${(y0+yb)/2+6}" font-size="18" font-weight="600" fill="#10264f">H</text>`+
 `<line x1="${x0}" y1="${yb+18}" x2="${xr}" y2="${yb+18}" stroke="#10264f" stroke-width="1.4" marker-start="url(#mk)" marker-end="url(#mk)"/>`+
 `<text x="${(x0+xr)/2-5}" y="${yb+40}" font-size="18" font-weight="600" fill="#10264f">B</text>`+
 `<line x1="${xr+dx+14}" y1="${y0+dy-3}" x2="${xr+dx+14}" y2="${y0+tf+dy+3}" stroke="#10264f" stroke-width="1.4" marker-start="url(#mk)" marker-end="url(#mk)"/><line x1="${xr+dx+14}" y1="${y0+tf/2+dy}" x2="${xr+dx+22}" y2="${y0+tf/2+dy}" stroke="#10264f" stroke-width="1.2"/>`+
 `<text x="${xr+dx+26}" y="${y0+tf/2+dy+6}" font-size="17" font-weight="600" fill="#10264f">tf</text>`+
 `<line x1="${xr+dx+10}" y1="${(y0+yb)/2-2}" x2="${wx1+dx*0.55}" y2="${(y0+yb)/2+10}" stroke="#1a8fd8" stroke-width="1.8" marker-end="url(#mb)"/>`+
 `<text x="${xr+dx+14}" y="${(y0+yb)/2+2}" font-size="17" font-weight="600" fill="#10264f">tw</text></svg>`}
function isoTube(){const x0=84,y0=56,s=96,t=15,dx=64,dy=-32,P=a=>a.map(q=>q.join(',')).join(' ');return `<svg viewBox="0 0 316 222"><defs><linearGradient id="gF" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9aa2ad"/><stop offset="1" stop-color="#6c7580"/></linearGradient><linearGradient id="gT" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#aab2bd"/><stop offset="1" stop-color="#d6dbe2"/></linearGradient><marker id="mk" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L8 4L0 8z" fill="#10264f"/></marker></defs>`+
 `<polygon points="${P([[x0,y0],[x0+s,y0],[x0+s+dx,y0+dy],[x0+dx,y0+dy]])}" fill="url(#gT)"/><polygon points="${P([[x0+s,y0],[x0+s,y0+s],[x0+s+dx,y0+s+dy],[x0+s+dx,y0+dy]])}" fill="#59626e"/>`+
 `<path fill-rule="evenodd" d="M${x0} ${y0}h${s}v${s}h${-s}z M${x0+t} ${y0+t}v${s-2*t}h${s-2*t}v${-(s-2*t)}z" fill="url(#gF)" stroke="#5a636e"/>`+
 `<line x1="${x0-26}" y1="${y0}" x2="${x0-26}" y2="${y0+s}" stroke="#10264f" stroke-width="1.4" marker-start="url(#mk)" marker-end="url(#mk)"/><text x="${x0-50}" y="${y0+s/2+6}" font-size="18" font-weight="600" fill="#10264f">B</text>`+
 `<line x1="${x0}" y1="${y0+s+18}" x2="${x0+s}" y2="${y0+s+18}" stroke="#10264f" stroke-width="1.4" marker-start="url(#mk)" marker-end="url(#mk)"/><text x="${x0+s/2-5}" y="${y0+s+40}" font-size="18" font-weight="600" fill="#10264f">A</text>`+
 `<line x1="${x0+s+dx+14}" y1="${y0+dy-2}" x2="${x0+s+dx+14}" y2="${y0+t+dy+2}" stroke="#10264f" stroke-width="1.4" marker-start="url(#mk)" marker-end="url(#mk)"/><text x="${x0+s+dx+24}" y="${y0+dy+10}" font-size="17" font-weight="600" fill="#10264f">t</text></svg>`}
const dgHtml=()=>{const p=curPart();if(!p)return '';if(p.k=='hbeam'||p.k=='ibeam')return iso(p.k);if(p.k=='rtube')return isoTube();return `<div style="padding:calc(var(--k)*8) 0">${draw(p)}</div>`};
const sy=p=>{const f=(FX[p.k]||FX.direct);return `<div class="zqfm">${f.f}</div><div class="zqsy">기호 설명</div><div>${f.sym.map(([a,b])=>`<span>${a}</span><span>:</span><span>${b}</span>`).join('')}</div>`};
function rightHtml(m){const p=curPart();if(!p)return '';IC.bulb=IC.bulb||'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.3 1 2.1h5c0-.8.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>';
 const f=(FX[p.k]||FX.direct),kd=K[p.k],fa=fxs(p,f).replace(/<br>/g,' ').replace(/<[^>]+>/g,''),fl=fa.replace(/^도장면적\(㎡\)\s*=\s*/,'');
 const dm=kd?kd.f.filter(x=>x[2]!='sel'&&x[0]!='q'):[],la=(dm[0]||[0,'가로'])[1].replace(/\s*\(.*\)/,''),lb=(dm[1]||[0,'높이'])[1].replace(/\s*\(.*\)/,'');
 const row=(a,b)=>`<div class="zqcr"><b>${a}</b><span>=</span><em>${b}</em></div>`;
 const svg=`<svg viewBox="0 0 200 112" aria-hidden="true"><defs><marker id="zqa" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L8 4L0 8z" fill="#1d3a73"/></marker></defs><rect x="46" y="8" width="146" height="76" fill="#e3eeff" stroke="#1d58d8" stroke-width="1.6"/><line x1="30" y1="12" x2="30" y2="80" stroke="#1d3a73" stroke-width="1.2" marker-start="url(#zqa)" marker-end="url(#zqa)"/><text x="4" y="50" font-size="11" fill="#33496f">${lb}</text><line x1="48" y1="97" x2="190" y2="97" stroke="#1d3a73" stroke-width="1.2" marker-start="url(#zqa)" marker-end="url(#zqa)"/><text x="119" y="110" font-size="11" fill="#33496f" text-anchor="middle">${la}</text></svg>`;
 return m=='f'?`<details class="zqr1" open><summary><i>${I('calc')}</i><b>계산식 요약</b>${I('chev')}</summary><div class="zqfm"><div class="zqfs"><b>도장 면적</b><div>${fa}</div></div><div class="zqfs"><b>도료 소요량</b><div>소요량(kg) = 도장면적(㎡)<br>× 도료 사용량(kg/㎡)<br>÷ 비중(kg/L)</div></div><div class="zqfs"><b>도장 비용</b><div>비용(원) = 소요량(L) × 도료<br>단가(원/L)</div></div></div></details>`:`<div class="zqtp"><span class="zqtpb"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${IC.bulb}</svg>TIP</span><ul><li>도장면적에서 공제되는 부위는 창문, 출입문 등입니다.</li><li>실제 소요량을 입력하면 보다 정확한 견적을 산출할 수 있습니다.</li></ul></div>`}

const f1=(v,d)=>F(v,d==null?1:d);
function resCalc(){const A=tot(AR.type),c=cnd(),u=useKg(c),kg=A*u,L=c.sg>0?kg/n(c.sg):0,cost=L*n(c.price);return{A,c,u,kg,L,cost}}
function condItems(r){const p=curPart(),c=r.c,out=[];if(!p)return out;const kd=K[p.k];
 if(AR.type=='steel'){out.push(KN[p.k]||kd.n);const sz=SZ[p.k];if(sz){const v=sz.k.map(k=>n(p[k])>0?F(n(p[k]),1):'-').join('×');out.push(v)}if('L' in {L:1}&&kd.f.some(f=>f[0]=='L'))out.push('길이 '+(n(p.L)>0?F(n(p.L),1)+'m':'-'));out.push('수량 '+F(q1(p),0)+'본')}
 else{out.push(TY[AR.type].n);out.push('부위 '+AR.parts.filter(x=>x.t==AR.type).length+'곳')}
 out.push('도막두께 '+F(n(c.dft),0)+'µm');out.push('도료 사용량 '+F(r.u,3)+'kg/㎡');return out}
function resInner(){const r=resCalc(),c=r.c,pr=r.A>0?r.L/r.A:0;return `<div class="zqrh"><i>${I('calc')}</i><b>최종 산출 결과</b><button type="button" onclick="apDetail()">상세보기 ${I('right')}</button></div>
<div class="zqtl"><div class="zqtc"><i>${I('roller')}</i><div><small>도장 면적</small><strong>${f1(r.A,0)}<u>㎡</u></strong></div></div>
<div class="zqtc"><i>${I('drop')}</i><div><small>도료 소요량</small><strong>${f1(r.L,0)}<u>L</u></strong><em>(소비율 ${F(pr,2)} L/㎡ 기준)</em></div></div>
<div class="zqtc"><i>${I('kg')}</i><div><small>도료 무게</small><strong>${f1(r.kg,0)}<u>kg</u></strong><em>(도료 비중 ${F(n(c.sg),2)} 기준)</em></div></div>
<div class="zqtc g"><i>${I('yen')}</i><div><small>도장 비용</small><strong>${F(Math.round(r.cost/100)*100,0)}<u>원</u></strong><em>(도료 단가 ${F(n(c.price),0)}원/L 기준)</em></div></div></div>
<div class="zqap"><button type="button" class="zqgo" onclick="apApply(1)">${I('calc')}기본면적에 적용</button><button type="button" class="zqgo2" onclick="apApply(0)">전체 합계로 적용</button></div>`}
function partCard(p){const kd=K[p.k];if(!kd)return '';const sels=kd.f.filter(f=>f[2]=='sel'),dims=kd.f.filter(f=>f[2]!='sel');
 return `<details class="zqpt" data-id="${p.id}"${p.o?' open':''} ontoggle="apTog('${p.id}',this.open)"><summary>${I(p.t)}<span data-nm="${p.id}">${esc(p.nm||kd.n)}</span><em data-pa="${p.id}">${fm(ar(p))}</em>${I('chev')}</summary><div><div class="zqnm"><div class="zqi"><input type="text" value="${esc(p.nm||'')}" placeholder="${kd.n}" oninput="apName('${p.id}',this.value)" onfocus="apCur('${p.id}')"></div><button type="button" class="zqx" onclick="apDel('${p.id}')">${I('trash')}삭제</button></div><div class="zqdm">${dims.map(f=>tile(p,f,p.k)).join('')}${sels.map(f=>selTile(p,f)).join('')}</div></div></details>`}
function leftHtml(){const t=AR.type,steel=t=='steel',c=cnd();let main='',others='';
 if(steel){const k=AR.sk||'hbeam',p=mainPart(k),kd=K[k],sz=SZ[k],list=sz?sz.l():[],cur=list.findIndex(h=>sz.k.every((kk,i)=>n(p[kk])===h[i+1]&&n(p[kk])>0));
  const dims=kd.f.filter(f=>f[2]!='sel'&&f[0]!='q');
  main=`<div class="zqc zqs1"><div class="zqsh"><span class="zqnb">01</span><div><b>${KN[k]||kd.n} 정보 입력</b><small>${KN[k]||kd.n}의 규격과 수량을 입력하세요.</small></div><button type="button" class="zqex" onclick="apEx()">${I('info')}규격 예시</button></div>
<div class="zqlb">형강 종류</div><div class="zqkd">${['hbeam','ibeam','rtube','pipe'].map(x=>`<button type="button" class="${x==k?'on':''}" onclick="apKind('${x}')">${I(x)}${KN[x]}</button>`).join('')}</div>
<div class="zqsp"><div><div class="zqlb">규격 선택</div><div class="zqsel"><select onchange="apSz('${p.id}',this.value)"><option value="x">직접 입력</option>${list.map((h,i)=>`<option value="${i}"${i==cur?' selected':''}>${h[0]}</option>`).join('')}</select>${I('chev')}</div></div><div><div class="zqlb">단위 수량</div><div class="zqst"><div><button type="button" onclick="apStep('${p.id}',-1)">−</button><input type="number" inputmode="numeric" value="${q1(p)}" oninput="apSet('${p.id}','q',this.value)" onfocus="apCur('${p.id}')"><button type="button" onclick="apStep('${p.id}',1)">+</button></div><em>EA</em></div></div></div>
<div class="zqlb">치수 입력 <small>(${k=='pipe'?'mm · m':'mm'})</small></div><div class="zqdm">${dims.map(f=>tile(p,f,k)).join('')}${tile(p,['q','수량','본'],k)}</div></div>`;
  others=AR.parts.filter(x=>x.t=='steel'&&x.id!=p.id&&(x.u||ar(x)>0)).map(partCard).join('');
 }else{const all=AR.parts.filter(x=>x.t==t),cp=curPart(),L=all.filter(x=>!cp||x.id!=cp.id).map(partCard).join(''),ck=cp&&K[cp.k];
  const fl=ck?fxs(cp,FX[cp.k]||FX.direct).replace(/<br>/g,' ').replace(/<[^>]+>/g,'').replace(/^도장면적\(㎡\)\s*=\s*/,''):'';
  main=`<div class="zqc zqs1"><div class="zqsh"><span class="zqnb">01</span><div><b>부위 정보 입력</b><small>${TY[t].n}의 각 부위별 면적을 입력하세요.</small></div></div>${t=='free'?`<div class="zqseg"><button type="button" class="${cp&&cp.k=='direct'?'on':''}" onclick="apDirect()">${I('edit')}면적 직접 입력</button><button type="button" class="${cp&&cp.k!='direct'?'on':''}" onclick="apShape()">${I('pin')}도면에서 선택</button></div>`:''}<div class="zqpills"${t=='free'?' hidden':''}>${(()=>{const lim=3,ci=cp?all.findIndex(x=>x.id==cp.id):-1,vis=all.length<=lim+1?all:all.filter((x,i)=>i<lim||i==ci),hid=all.filter(x=>vis.indexOf(x)<0),bt=x=>`<button type="button" class="${cp&&x.id==cp.id?'on':''}" onclick="apPick('${x.id}')">${esc(x.nm||K[x.k].n)}</button>`;return vis.map(bt).join('')+(hid.length?`<button type="button" class="mo${AR.pm?' on':''}" onclick="apMore()" aria-label="더보기">···</button>${AR.pm?`<div class="zqpop">${hid.map(bt).join('')}</div>`:''}`:'')})()}</div>
<div class="zqlb">현장 · 구역 이름 <small>(선택)</small></div><div class="zqi zqsite">${I('pin')}<input type="text" value="${esc(AR.name||'')}" placeholder="예: ○○아파트 101동" oninput="AR_N(this.value)"></div>
${ck?`<div class="zqnm" style="margin-top:12px"><div class="zqi"><input type="text" value="${esc(cp.nm||'')}" placeholder="${ck.n}" oninput="apName('${cp.id}',this.value)"></div><button type="button" class="zqx" onclick="apDel('${cp.id}')">${I('trash')}삭제</button></div><div class="zqdm">${ck.f.filter(f=>f[2]!='sel').map(f=>tile(cp,f,cp.k)).join('')}</div>
<div class="zqfr"><i>${I('calc')}</i><div><small>${esc(cp.nm||ck.n)} 면적 계산식</small><span>${fl}</span></div><strong data-pa="${cp.id}">${fm(ar(cp))}</strong></div>`:'<div class="zqnt">부위가 없습니다</div>'}
${L}`+addRow(t)+`</div>`}
 const p=curPart(),kd=p&&K[p.k],sels=kd?kd.f.filter(f=>f[2]=='sel'):[];
 const selRow=(p,[k,l,u,o])=>`<div class="zqsb">${I('layers')}<select onchange="apSet('${p.id}','${k}',this.value);apRe()">${o.map(([v,t])=>`<option value="${v}"${String(p[k]==null?'':p[k])==v?' selected':''}>${t}</option>`).join('')}</select>${I('chev')}</div>`;
  const a2=`<div class="zqc zqs2"><div class="zqac"><div class="zqsh"><span class="zqnb">02</span><div><b>도장면 정보</b><small>도장된 면(양면/단면 등)을 선택하세요.</small></div></div>${I('right')}</div><div class="zqab">${sels.length&&p?sels.map(f=>selRow(p,f)).join(''):'<div class="zqnt">이 부위는 추가로 선택할 도장면 항목이 없습니다.</div>'}</div></div>`;
  const prods=(typeof DB!='undefined'&&DB.length)?DB.map(x=>x.n):[];
 const a3=`<div class="zqc zqs3"><div class="zqac"><div class="zqsh"><span class="zqnb">03</span><div><b>도장 조건</b><small>도료, 도장 횟수, 도막두께 등을 입력하세요.</small></div></div></div>${true?`<div class="zqab"><div class="zqdm">${prods.length?`<div class="zqd zqprod" style="grid-column:1/-1"><span>${icn('제품 DB')}<i>도료 <small>(제품 DB · 선택)</small></i></span><div class="zqi"><select onchange="apCond('p',this.value);apRe()"><option value="">직접 입력</option>${prods.map(x=>`<option value="${esc(x)}"${c.p==x?' selected':''}>${esc(x)}</option>`).join('')}</select></div></div>`:''}${cin('도막 두께 <small>(DFT)</small>','dft','µm',c.dft)}${cin('도료 사용량','use','kg/㎡',c.use,F(useKg(c),3))}${cin('비중','sg','kg/L',c.sg)}${cin('도료 단가','price','원/L',c.price)}</div><div class="zqr" id="zqr">${rightHtml()}</div></div>`:''}</div>`;
 return main+others+a2+a3}
const cin=(l,k,u,v,ph)=>`<div class="zqd"><span>${icn(l)}<i>${l}</i></span><div class="zqi"><input type="number" inputmode="decimal" step="any" value="${v===''||v==null?'':v}" placeholder="${ph||''}" oninput="apCond('${k}',this.value);apLive()"><em>${u}</em></div></div>`;
const addRow=t=>{if(t=='free')return `<div class="zqad"><button type="button" onclick="apAdd()">＋ 부위 추가</button></div>`;const ks=Object.keys(K).map(k=>`<option value="${k}">${K[k].n}</option>`).join('');return `<div class="zqad"><div class="zqsel"><select id="apks">${ks}</select>${I('chev')}</div><button type="button" onclick="apAdd()">＋ 부위 추가</button></div>`};
function page(){
 return `<div class="zqhx"><i class="zqhp"></i><div class="zqhi"><i class="zqlg3">${I('roller')}<em>코트 온</em></i><span class="zqbr2">코트 온</span><b>도장 면적 산출</b><p>간단한 입력으로 정확한 도장 면적과<br>소요량을 계산하세요.</p></div></div>
<div class="zqp"><div class="zqt">${TABS.map(k=>`<button type="button" class="${k==AR.type?'on':''}" onclick="apType('${k}')">${I(k)}${TY[k].n}</button>`).join('')}</div>
<div class="zqg"><div class="zqcol" id="zql">${leftHtml()}</div><div class="zqrc"><div class="zqrs" id="zqrs">${resInner()}</div><div id="zqfc">${rightHtml('f')}</div></div></div></div>`}
function render(){const e=document.getElementById('zq');if(!e)return;const sc=e.scrollTop;e.innerHTML=page();e.scrollTop=sc}
const ensure=()=>{ensurePre(AR.type);if(AR.type=='steel')mainPart(AR.sk||'hbeam')};
window.apOpen=function(){apClose();ensure();const e=document.createElement('div');e.id='ap';e.className='ap';e.innerHTML='<div class="zq" id="zq"></div>';document.body.appendChild(e);document.documentElement.classList.add('pdlock');document.body.classList.add('apopen');render();const g=document.getElementById('gnav');if(g)g.addEventListener('click',apClose,true)};
window.apClose=function(){const e=document.getElementById('ap');if(e)e.remove();document.documentElement.classList.remove('pdlock');document.body.classList.remove('apopen');const g=document.getElementById('gnav');if(g)g.removeEventListener('click',apClose,true)};
function ensurePre(t){if(t=='steel'||AR.parts.some(p=>p.t==t))return;(TY[t]||TY.free).pre.forEach(([nm,k])=>{AR.parts.push({id:'p'+(AR.seq++),t,k,nm,q:'',s:k=='direct'?'':'1'})});save()}
const find=id=>AR.parts.find(p=>p.id==id);
window.apRe=()=>render();
window.apLive=()=>{const r=document.getElementById('zqrs');if(r)r.innerHTML=resInner();document.querySelectorAll('#ap [data-pa]').forEach(e=>{const p=find(e.dataset.pa);if(p)e.textContent=fm(ar(p))})};
window.apType=t=>{AR.type=t;AR.cur=null;ensure();save();render()};
window.apKind=k=>{AR.sk=k;mainPart(k);save();render()};
window.apMore=()=>{AR.pm=AR.pm?0:1;save();render()};
window.apPick=id=>{AR.pm=0;AR.cur=id;save();render()};
window.apCur=id=>{if(AR.cur==id||AR.type=='steel')return;AR.cur=id;save();const r=document.getElementById('zqr');if(r)r.innerHTML=rightHtml();const f=document.getElementById('zqfc');if(f)f.innerHTML=rightHtml('f')};
window.AR_N=v=>{AR.name=v;save()};
window.apSet=(id,k,v)=>{const p=find(id);if(!p)return;p[k]=v;save();apLive()};
window.apName=(id,v)=>{const p=find(id);if(!p)return;p.nm=v;save();const e=document.querySelector(`#ap [data-nm="${id}"]`);if(e)e.textContent=v||K[p.k].n};
window.apTog=(id,o)=>{const p=find(id);if(p){p.o=o?1:0;save()}};
window.apStep=(id,d)=>{const p=find(id);if(!p)return;p.q=String(Math.max(1,Math.round(q1(p))+d));save();render()};
window.apSz=(id,i)=>{const p=find(id);if(!p||i==='x')return;const sz=SZ[p.k],h=sz.l()[+i];sz.k.forEach((k,j)=>{p[k]=h[j+1]});save();render()};
window.apCond=(k,v)=>{AR.cond=Object.assign({},CD0,AR.cond||{});if(k=='p'){AR.cond.p=v;const q=v&&typeof P=='function'?P(v):null;if(q){AR.cond.use='';if(n(q.dft)>0)AR.cond.dft=n(q.dft);if(n(q.sg)>0)AR.cond.sg=n(q.sg)}}else AR.cond[k]=v;save()};
window.apAcc=i=>{AR['a'+i]=AR['a'+i]?0:1;save();render()};
 window.apDirect=()=>{const p=curPart();if(p&&p.k!='direct'){p.k='direct';p.nm='면적 직접 입력';save();render()}};
 window.apShape=()=>{const p=curPart();if(!p)return;const ks=Object.keys(K).filter(k=>k!='direct');pqSheet('apsh','<div class="pqmh"><b>도면에서 선택</b></div><div class="zqls">'+ks.map(k=>`<button type="button" class="pqml" style="height:auto;padding:10px 12px" onclick="pqX('apsh');apShapeSet('${k}')"><b>${K[k].n}</b></button>`).join('')+'</div><button class="pqbc" onclick="pqX(\'apsh\')">닫기</button>')};
 window.apShapeSet=k=>{const p=curPart();if(!p||!K[k])return;p.k=k;p.nm=K[k].n;save();render()};
window.apMenu=()=>{const m=document.getElementById('zqmn');if(m)m.classList.toggle('on')};
window.apDel=id=>{const p=find(id);if(!p)return;ask('<b>'+esc(p.nm||K[p.k].n)+'</b> 부위를 삭제할까요?',()=>{AR.parts=AR.parts.filter(x=>x.id!=id);save();render()})};
window.apAdd=()=>{const k=(document.getElementById('apks')||{}).value||(AR.type=='free'?'direct':'wall');const p={id:'p'+(AR.seq++),t:AR.type,k,nm:'',q:'',s:'1',o:1,u:1};AR.parts.push(p);AR.cur=p.id;save();render()};
window.apEx=()=>{const p=curPart(),sz=p&&SZ[p.k];if(!sz)return;const l=sz.l();pqSheet('apex','<div class="pqmh"><b>'+(KN[p.k]||'')+' 규격 예시</b></div><div class="zqls">'+l.map((h,i)=>`<button type="button" class="pqml" style="height:auto;padding:10px 12px" onclick="pqX('apex');apSz('${p.id}',${i})"><b>${h[0]}</b></button>`).join('')+'</div><button class="pqbc" onclick="pqX(\'apex\')">닫기</button>')};
window.apDetail=()=>{const t=AR.type,L=AR.parts.filter(p=>p.t==t&&ar(p)>0);pqSheet('apd','<div class="pqmh"><b>상세내역 · '+TY[t].n+'</b></div><div class="zqls">'+(L.map(p=>`<div><span>${esc(p.nm||K[p.k].n)}</span><b>${fm(ar(p))}</b></div>`).join('')||'<div><span>입력된 부위가 없습니다</span></div>')+`<div><span>이 유형 합계</span><b>${fm(tot(t))}</b></div><div><span>전체 합계</span><b>${fm(tot())}</b></div></div><div style="display:flex;gap:8px;margin-top:10px"><button class="pqbc ok" style="flex:1" onclick="pqX('apd');apApply(1)">이 유형 적용</button><button class="pqbc" style="flex:1" onclick="pqX('apd');apApply(0)">전체 적용</button></div><button class="pqbc" onclick="pqX('apd')">닫기</button>`)};
window.apApply=cur=>{const m=document.getElementById('zqmn');if(m)m.classList.remove('on');const v=cur?tot(AR.type):tot(),r=Math.round(v*100)/100;if(!(r>0))return tt('면적이 0입니다<br><small>치수를 입력하세요</small>');
 ask(`기본면적을 <b>${F(r,2)}㎡</b>로 적용할까요?<br><small>${cur?TY[AR.type].n+' 유형 합계':'전체 합계'}${AR.name?' · '+esc(AR.name):''}</small>`,()=>{
  const e=document.getElementById('ar');if(e){e.value=r;e.dispatchEvent(new Event('input',{bubbles:true}))}else{S.area=String(r);sv()}
  try{pqRcAdd('면적 산출',(AR.name?AR.name+' · ':'')+F(r,2)+'㎡',{m:r})}catch(_){}
  apClose();try{T(0)}catch(_){}tt('기본면적에 적용했습니다<br><small>'+F(r,2)+'㎡</small>')})};
/* 일위대가표 진입 버튼 */
function addBtn(){if(document.getElementById('apgo'))return;const g=document.getElementById('fmgo');if(!g)return;const b=document.createElement('button');b.type='button';b.id='apgo';b.className='fmbar';b.onclick=apOpen;b.innerHTML=`<span class="fmpin">${I('ruler')}</span><span class="fmtx"><b>도장 면적 산출 · 도면</b><small>아파트·주택·옥상·주차장·철재·차량 유형별 면적 계산</small></span>`;g.after(b)}
addBtn();setTimeout(addBtn,600);
})();
