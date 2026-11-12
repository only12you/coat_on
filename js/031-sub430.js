/* 공유창을 하단 내비게이션 위로 올림 + html2canvas가 문서 전체 대신 대상 영역만 복제하도록 제한(속도) */
(function(){
const _sh=shUni;shUni=function(){try{const n=document.getElementById('gnav');document.documentElement.style.setProperty('--navh',(n?n.offsetHeight:0)+'px')}catch(e){}return _sh.apply(this,arguments)};
let H=window.html2canvas;
const wrap=h=>{if(!h||h.__w)return h;const w=function(el,o){o=Object.assign({},o||{});try{if(el&&document.documentElement.contains(el)&&!o.ignoreElements)o.ignoreElements=n=>{if(n===el||n.contains(el)||el.contains(n))return false;const t=n.tagName;return !(t==='STYLE'||t==='LINK'||t==='META'||t==='HEAD')}}catch(e){}return h.call(this,el,o)};w.__w=1;return w};
H=wrap(H);
Object.defineProperty(window,'html2canvas',{configurable:true,get(){return H},set(v){H=wrap(v)}});
})();
