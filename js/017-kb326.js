(function(){let y0=0;const inV=e=>e&&e.closest&&e.closest('#v8');
document.addEventListener('touchstart',e=>{y0=e.touches[0].clientY},{passive:true});
document.addEventListener('touchmove',e=>{const a=document.activeElement;if(a&&inV(a)&&/^(INPUT|TEXTAREA)$/.test(a.tagName)&&Math.abs(e.touches[0].clientY-y0)>16&&e.target!==a){try{a.blur()}catch(_){}}},{passive:true});
})();
