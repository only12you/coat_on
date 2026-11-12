(function(){
const NOT=/내화|FIREMASK|방수|바닥|수성|플레이크|아스파틱|메탈릭|몰탈|콘크리트\s*외벽/i,MET=/에폭시|에포|징크|우레탄|방청|MIO|알키드|실리콘|불소|IZ\d|EZ\d|철재|EP\d|센스탄|코레탄|폴리/i,ZN=/징크|IZ\d|갈바니|ZINC/i;
const GR=['C2','C3','C4','C5','CX'];
window.isoJudge=function(e){const it=(e.items||[]).filter(c=>(c.n||'').trim());if(!it.length)return null;
 const T=[e.name,e.scope,e.sub,...it.map(c=>c.n)].join(' ');
 if(NOT.test(T))return null;
 if(!(MET.test(T)||e.sub=='철재'))return null;
 const tot=it.reduce((a,c)=>a+(+c.dft||0)*(+c.cnt>1?Math.round(+c.cnt):1),0);if(!(tot>0))return null;
 const zn=it.some(c=>ZN.test(c.n)),coats=it.length;
 /* ISO 12944-5 고내구성(H) 기준 최소 도막(㎛) 근사: C2 100 · C3 160 · C4 220 · C5 280 · CX 320 */
 const MIN=[100,160,220,280,320];let g=-1;MIN.forEach((m,i)=>{if(tot>=m)g=i});
 if(g<0)g=0;
 /* 징크리치 하도는 한 단계 높은 환경까지 인정(도막이 최소치의 +20% 이상일 때) */
 if(zn&&g<4&&tot>=MIN[g+1]*0.9)g++;
 /* 코트 수가 적으면(2회 이하) 한 단계 낮춤 */
 if(coats<=2&&g>1)g--;
 const env=GR[g],why='ISO 12944-5 기준 추정 → '+env+' (총 DFT '+Math.round(tot)+'㎛'+(zn?' · 징크리치 하도':'')+' · '+coats+'코트). 실제 적용은 사양서 확인 필요';
 return {env,sub:'철재',why,tot}};
window.syEdAuto=function(){if(!SYE)return;const j=isoJudge(SYE.e);if(!j){tt('철재 방식 사양(제품명·DFT 입력 필요)에서만 자동 판정할 수 있습니다');return}
 SYE.e.env=j.env;if(!SYE.e.sub)SYE.e.sub=j.sub;SYE.e._why=j.why;syEdUi()};
const _s=window.syEdSave;
window.syEdSave=function(){if(SYE&&SYE.e&&!SYE.e.env){const j=isoJudge(SYE.e);if(j){SYE.e.env=j.env;if(!SYE.e.sub)SYE.e.sub=j.sub;try{tt('환경등급 '+j.env+' 자동 설정 (ISO 12944 추정)')}catch(x){}}}return _s.apply(this,arguments)};
})();
