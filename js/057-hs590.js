(function(){var o=window.ndHero;if(!o)return;
var D={1:'신뢰할 수 있는 도료 정보를 한곳에서<br>더 나은 선택을 위한 시작입니다.',
3:'도장 시스템을 구성하고<br>면적별 소요량·단가를 산출합니다.',
4:'TDS 원문의 설명 문구·표·이미지는 저장하지 않고,<br>계산에 필요한 값만 검토 후 등록합니다.',
5:'제품 DB와 설정을 CSV로 가져오고<br>내보내며 백업·복원합니다.',
7:'관리자 전용 설정과<br>데이터를 관리합니다.',
8:'실란트·메쉬 소요량을<br>단면 기준으로 산출합니다.',
10:'제품을 나란히 비교해<br>최적의 사양을 선택하세요.'};
window.ndHero=function(n){try{o(n)}catch(e){}
var h=document.getElementById('hx');if(!h)return;var db=(n==3&&window.SYM=='db');
if(D[n]&&!db){h.classList.add('hnw');h.classList.remove('hn1');var t=h.querySelector('.hnt');if(t)t.innerHTML=D[n]}
var b=h.querySelector('.hxtt b');if(b&&h.classList.contains('hnw')){b.style.fontSize='';requestAnimationFrame(function(){var w=h.clientWidth-36,f=29;b.style.fontSize=f+'px';while(b.scrollWidth>w&&f>16){f--;b.style.fontSize=f+'px'}})}
};
try{window.ndHero(0)}catch(e){}})();
