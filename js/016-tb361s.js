(function(){
/* 더보기 메뉴용 아이콘 */
if(typeof PQI=='object'&&typeof pqSv=='function')Object.assign(PQI,{
 fm:pqSv('<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>'),
 ap:pqSv('<path d="M3.5 16.5 16.5 3.5l4 4-13 13z"/><path d="M7 13l2 2M10 10l2 2M13 7l2 2"/>'),
 hq:pqSv('<path d="M4 6l3 12 2.5-8L12 18l2.5-8L17 18l3-12"/><path d="M3 10h18M3 14h18"/>'),
 lc:pqSv('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>')});
/* 작업 버튼줄(#bb)이 하단 메인 메뉴 바로 위에 얹히도록 메뉴 높이를 측정 */
function gh(){const g=document.getElementById('gnav');if(!g)return;const h=g.getBoundingClientRect().height;if(h>0)document.documentElement.style.setProperty('--gh',h+'px')}
gh();const g=document.getElementById('gnav');if(g&&window.ResizeObserver)new ResizeObserver(gh).observe(g);
window.addEventListener('resize',gh);window.addEventListener('orientationchange',()=>setTimeout(gh,300));if(window.visualViewport)window.visualViewport.addEventListener('resize',gh);
setTimeout(gh,700);setTimeout(gh,2000);
})();
