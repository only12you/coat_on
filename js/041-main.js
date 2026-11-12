function ndHero(n){const h=document.getElementById('hx');if(!h)return;
if(!h.querySelector('.hni')){h.insertAdjacentHTML('beforeend','<div class="hni"></div><div class="hnl">COAT<i>ON</i></div><div class="hns">Paint Quantity &amp; Unit Price Table</div><div class="hnt">코트를 더 스마트하게,<br>일위대가표로 시작하세요</div>')}
const db=(n==3&&window.SYM=='db');h.classList.toggle('hnw',n==0||db);h.classList.toggle('hn1',db);
const t=h.querySelector('.hnt');if(t)t.innerHTML=db?'다양한 도장 사양을 조회하고<br>비교해 보세요.':'코트를 더 스마트하게,<br>일위대가표로 시작하세요'}
try{ndHero(0)}catch(e){}
