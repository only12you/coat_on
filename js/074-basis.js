/* BSS — 기준 근거 목록 (v593 0단계)
   앱 계산에 쓰이는 계수·비율의 출처·기준일·확인 상태를 한 곳에서 관리합니다. 값은 바꾸지 않고 상태만 표시합니다.
   상태: ok 확인됨 / co 사내 기준 / tmp 잠정(가정) / chk 확인 필요 */
(function(){
var ST={ok:['확인됨','#1a7f4b'],co:['사내 기준','#1f5fd6'],tmp:['잠정','#c27803'],chk:['확인 필요','#c0392b']};
var XL='원 엑셀(공동주택 셀프견적 2026) 고정값 — 산정 근거 미확인';
var JD='조달청 공사원가계산 제비율 적용기준(2024.07.01 판)에서 확인 — 2026년 고시 재확인 필요';
var L=[
 ['out.k','외벽 둘레 계수','계단식 0.2416 · 복도식 0.2625','chk',XL],
 ['out.h','외벽 층고','2.6m','chk',XL],
 ['out.par','옥상 파라펫 높이','0.5m','chk',XL],
 ['out.cor','라인당 지상부 보정','+150㎡ −4㎡(출입구)','chk',XL],
 ['out.win','세대별 창호 면적표','공급면적 구간별 8.51~37.52㎡','chk',XL+' (계단식 79.2㎡ 미만은 0)'],
 ['out.jt','층간조인트 수량','둘레 × 0.15m','chk','v593에서 세대 정보 추정식을 동별 산출식과 같게 수정 — 원 엑셀 확인 필요'],
 ['in.line','내벽 라인당 벽 둘레','23.56m','chk',XL],
 ['in.h','내벽 층고','2.4m','chk',XL],
 ['in.ceil','천장/벽체 면적 비율','0.439','chk',XL],
 ['in.skirt','걸레받이 높이','0.1m','chk',XL],
 ['in.nw','낙서방지 범위','계단식 1층 3개소 1.5m · 복도식 전 층 1.5m','chk','복도식 범위가 의도된 값인지 확인 필요'],
 ['px.hp','품셈 단가(재료·노무·경비)','2026 품셈 표','chk','사용자 제공 2026 엑셀 값 — 원문 대조 전'],
 ['px.wg','노임 단가','도장공 263,017 · 방수공 228,286 · 보통인부 172,068원','chk','사용자 제공 2026 엑셀 값 — 공표 노임 대조 전'],
 ['cr.ind','간접노무비율','외벽 17.4~17.5% · 내벽 14.2~15%','chk','금액 구간별 값, 원 엑셀 — 제비율 원문에서 판독 못 함'],
 ['cr.ac','산재보험료율','3.56%','ok',JD],
 ['cr.emp','고용보험료율','1.01%','chk','원문에서 판독 못 함'],
 ['cr.hl','건강보험료율','3.545%','ok',JD],
 ['cr.pn','연금보험료율','4.5%','ok',JD],
 ['cr.ca','노인장기요양보험료율','건강보험료 × 12.95%','ok',JD],
 ['cr.rt','퇴직공제부금비','2.3%','ok',JD],
 ['cr.sf','산업안전보건관리비','3.11% · 2.28%+4,325,000원 · 2.37%','chk','제비율 문서(2024)의 요율과 달라 보임 — 2026년 고시 확인 필요'],
 ['cr.gm','일반관리비율','4%','co','사내 기준으로 확정 필요 — 근거 미확인'],
 ['cr.pf','이윤율','10%','co','사내 기준으로 확정 필요 — 근거 미확인'],
 ['cr.vat','부가가치세','10%','ok','법정 세율'],
 ['pt.cv','도료 도포량','0.15ℓ/㎡·회','tmp','임의 가정 — 제품 선택 시 제품별 도포량으로 대체'],
 ['pt.ls','도료 손실률','10%','tmp','임의 가정']
];
var M={};L.forEach(function(x){M[x[0]]=x});
function chip(k){var s=ST[k]||ST.chk;return '<span style="display:inline-block;padding:1px 7px;border-radius:10px;font-size:11px;font-weight:700;color:#fff;background:'+s[1]+'">'+s[0]+'</span>'}
/* 키 목록 → 표시용 HTML 한 블록 */
function html(keys){var n={ok:0,co:0,tmp:0,chk:0},h='';keys.forEach(function(k){var x=M[k];if(!x)return;n[x[3]]++;
 h+='<div style="padding:7px 0;border-bottom:1px solid rgba(120,130,150,.18);font-size:13px"><div style="display:flex;justify-content:space-between;gap:8px;align-items:center"><span style="flex:1">'+x[1]+'</span>'+chip(x[3])+'</div><small style="display:block;opacity:.7;margin-top:2px">'+x[2]+' · '+x[4]+'</small></div>'});
 var sum='확인됨 '+n.ok+' · 사내 '+n.co+' · 잠정 '+n.tmp+' · 확인 필요 '+n.chk;
 return '<div style="margin-top:10px;font-weight:700;font-size:13px">적용 기준 <small style="font-weight:500;opacity:.7">'+sum+'</small></div>'+h}
window.BSS={list:L,get:function(k){return M[k]},chip:chip,html:html,ST:ST};
})();
