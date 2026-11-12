(function(){
const CH='<svg class="mxv" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>';
window.moreOpen=function(){
 const G={blue:'linear-gradient(145deg,#5aa0ff,#2f6bd0)',green:'linear-gradient(145deg,#6cbf86,#3d9068)',orange:'linear-gradient(145deg,#f5a742,#e0771c)',teal:'linear-gradient(145deg,#5fb6c9,#2f8ea5)',purple:'linear-gradient(145deg,#a479ee,#7549d0)',indigo:'linear-gradient(145deg,#4d78e6,#2a4fc0)',red:'linear-gradient(145deg,#ee6a6a,#cf3a3a)',sky:'linear-gradient(145deg,#4a9bff,#2a6fe0)',slate:'linear-gradient(145deg,#7686a3,#4f5d7a)'};
 const R1=[['db','제품 DB','T(1)','제품 정보 · TDS 관리','blue'],['hq','단지 DB','aptDbMgr()','면적 · 기본정보 등록','sky'],['save','백업 · 복원',"goCsv('set')",'CSV · JSON 백업','green'],['calc','노무비 설정','lbSheet()','노임단가 · 할증','orange']];
 const R2=[['fm','충진','T(8)','실란트 · 실리콘 퍼티','teal'],['ap','도면','apOpen()','도장 위치 · 면적 관리','purple'],['hq','공동','hqOpen()','공동주택 견적','indigo'],['cmp','제품 비교','T(10)','소요량 · 자재비 우위','orange']];
 const R4=[['calc','소요량 공식 · 경고','infoOpen()','산출 공식 · 용어 매칭표','orange'],['db','자재정보','matOpen()','건재 · 도료 선택','indigo'],['quote','Activity Report',"location.href='activity.html'",'활동 보고서 · 자재 연동','teal']];
 const R3=[['quote','사용법','helpOpen()','매뉴얼 · 도움말','red'],['set','설정 · 언어','openSettings()','테마 · 언어 · 알림','sky'],['shield','자료 이용 안내','legalOpen()','이용약관 · 개인정보','green'],['info','정보','showInfo()','앱 정보 · 버전','slate']];
 const card=([i,t,f,d,c])=>`<button class="mxc" onclick="pqX('pqmore');${f}"><span class="mxi" style="background:${G[c]}">${PQI[i]||''}</span><b class="mxn">${t}</b>${CH}<span class="mxd">${d}</span></button>`;
 const row=(L,k)=>`<div class="mxr mxr${k}">${L.map(card).join('')}</div>`;
 let h=`<div class="mxh"><div class="mxt"><span class="mxg"><i></i><i></i><i></i><i></i></span>더보기</div><div class="mxs"><span><b>정확한 데이터,</b> 스마트한 계산</span><u></u></div></div>`+row(R1,4)+row(R2,4)+row(R3,4)+row(R4,4);
 if(typeof IS_ADMIN!='undefined'&&IS_ADMIN)h+=`<button class="mxw" onclick="pqX('pqmore');T(7)"><span class="mxi" style="background:${G.slate};width:38px;height:38px;margin:0;border-radius:10px">${PQI.admin||''}</span><b>관리자 모드</b></button>`;
 h+=`<div class="mxb"><span class="mxbi"><i style="height:35%"></i><i style="height:55%"></i><i style="height:80%"></i></span><div class="mxbt"><small>더 스마트한 도장 계산의 시작</small><b>지금 바로 시작해보세요!</b></div><button class="mxgo" onclick="pqX('pqmore');T(0)">시작하기 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg></button></div><button class="mxcl" onclick="pqX('pqmore')">닫기</button>`;
 pqSheet('pqmore',h,'mx');
};
})();
