(function(){const _m=window.fmMs||fmMs;fmMs=function(k,v){_m.apply(this,arguments);const e=document.getElementById('rla');if(e){const M=MS();e.innerHTML='롤 면적 = 롤 폭 × 롤 길이 = <b>'+fn((+M.wr||0)*(+M.lr||0),1)+' ㎡</b><br>입력 단위: 띠 폭·연장·겹침은 mm, 길이는 m, 면적은 ㎡'}}})();
window.fmSrc=function(v){MS().src=v;fmSave();fmRender();try{res()}catch(e){}};
window.fmMan=function(i,k,v){MS().man[i][k]=v;fmSave();fmOut();try{res()}catch(e){}};
window.fmAddMan=function(){const M=MS();M.man.push({nm:'수기'+(M.man.length+1),w:'',l:'',q:1,a:''});fmSave();fmRender()};
window.fmDelMan=function(i){const M=MS();if(M.man.length>1){M.man.splice(i,1);fmSave();fmRender();try{res()}catch(e){}}};
