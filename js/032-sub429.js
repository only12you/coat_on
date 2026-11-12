/* 견적·보고서 내보내기 속도 개선: 동일 내용 재사용, 라이브러리 미리 불러오기 */
(function(){
let ck='',cc=null;const _ec=esCv;
esCv=async function(se){let k='';try{const src=se||document.querySelector('#es .esh');k=src.innerHTML+'\u0001'+[...src.querySelectorAll('input,textarea')].map(x=>x.value).join('\u0001')}catch(e){}
 if(k&&k===ck&&cc)return cc;const r=await _ec(se);ck=k;cc=r;return r};
setTimeout(()=>{try{ldp().catch(()=>{});ldj().catch(()=>{})}catch(e){}},3000);
})();
