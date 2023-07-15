(()=>{"use strict";var e,n,t=Array.from(document.querySelectorAll(".radios")),r=document.querySelector(".content-box"),i=document.querySelector(".victory-lose-screen"),s=document.querySelector(".time-spent-minutes"),c=document.querySelector(".time-spent-seconds"),l=document.getElementById("victory-restart-button"),o=document.querySelector(".victory-lose-text"),a=document.querySelector(".victory-lose-icon"),u=document.querySelector(".easy-game"),d=document.querySelector(".medium-game"),v=document.querySelector(".hard-game"),m=document.querySelector(".restart-button"),f=document.querySelector(".stopwatch"),L=document.querySelector(".minutes"),y=document.querySelector(".seconds"),h=document.querySelector(".form"),p=document.querySelector("button"),S="Easy",b=0,M=0,g=null,T="",q=[],E=new Audio("../static/audio/card-flip.mp3"),H=new Audio("../static/audio/success.mp3"),A=new Audio("../static/audio/victory.mp3"),k=new Audio("../static/audio/game-over.mp3"),w=new Audio("../static/audio/click.mp3");function x(){null==i||i.classList.add("visible"),null==f||f.classList.remove("visible"),null==u||u.classList.remove("visible-cards"),null==d||d.classList.remove("visible-cards"),null==v||v.classList.remove("visible-cards"),s&&L&&(s.innerHTML=L.innerHTML),c&&y&&(c.innerHTML=y.innerHTML),l&&l.addEventListener("click",(function(){w.play(),C()})),"victory"===T?(o&&(o.innerHTML="Вы выиграли!"),null==a||a.classList.remove("dead"),null==a||a.classList.add("celebration")):(o&&(o.innerHTML="Вы проиграли!"),null==a||a.classList.remove("celebration"),null==a||a.classList.add("dead"))}function I(n){Array.from(document.querySelectorAll(".card")).forEach((function(t){t.addEventListener("click",(function(){(function(n){return!e&&g!==n})(t)&&(E.play(),t.classList.add("visible"),g?(e=!0,function(n,t){setTimeout((function(){n.dataset.index===(null==g?void 0:g.dataset.index)?(H.play(),q.push(n),g&&q.push(g),console.log(t),console.log(q),q.length===t.length&&(A.play(),T="victory",x())):(k.play(),T="lose",x()),g=null,e=!1}),1e3)}(t,n)):g=t)}))}))}function D(){for(var n=Array.from(document.querySelectorAll(".card")),t=n.length-1;t>0;t--){var r=Math.floor(Math.random()*(t+1));n[r].style.order=String(t),n[t].style.order=String(r)}setTimeout((function(){n.forEach((function(e){e.classList.add("visible")}))}),1e3),setTimeout((function(){n.forEach((function(e){e.classList.remove("visible")})),e=!1}),5e3)}function B(){event&&event.preventDefault(),null==r||r.classList.remove("visible"),null==f||f.classList.add("visible"),null==m||m.addEventListener("click",(function(){w.play(),C()}));var e=function(){for(var e=[],n=1;n<37;n++)e.push('<div class="card card'.concat(n,'" data-index="').concat(n,'">\n      <div class="card-back card-face"></div>\n      <div class="card-front card-face"></div>\n    </div>'));return e}();t.forEach((function(e){e.checked&&(S=e.value)})),"Easy"===S?(null==u||u.classList.add("visible-cards"),function(e){for(var n=[],t=[],r=3;r>0;r--){var i=Math.floor(36*Math.random());t.includes(String(i))?r++:(n.push(e[i]),n.push(e[i]),t.push(String(i)))}var s="";n.forEach((function(e){s+=e})),u&&(u.innerHTML=s),D(),I(n)}(e)):"Medium"===S?(null==d||d.classList.add("visible-cards"),function(e){for(var n=[],t=[],r=6;r>0;r--){var i=Math.floor(36*Math.random());t.includes(String(i))?r++:(n.push(e[i]),n.push(e[i]),t.push(String(i)))}var s="";n.forEach((function(e){s+=e})),d&&(d.innerHTML=s),D(),I(n)}(e)):"Hard"===S&&(null==v||v.classList.add("visible-cards"),function(e){for(var n=[],t=[],r=9;r>0;r--){var i=Math.floor(36*Math.random());t.includes(String(i))?r++:(n.push(e[i]),n.push(e[i]),t.push(String(i)))}var s="";n.forEach((function(e){s+=e})),v&&(v.innerHTML=s),D(),I(n)}(e));var i=function(){M++,y&&L&&(y.innerHTML="0"+M,M>9&&(y.innerHTML=String(M)),M>59&&(b++,L.innerHTML="0"+b,M=0),b>9&&(L.innerHTML=String(b)))};f&&setTimeout((function(){n=Number(setInterval(i,1e3))}),5e3)}function C(){b=0,M=0,e=!0,g=null,q=[],y&&(y.innerHTML="00"),L&&(L.innerHTML="00"),clearInterval(n),k.pause(),A.pause(),k.currentTime=0,A.currentTime=0,null==r||r.classList.add("visible"),null==u||u.classList.remove("visible-cards"),null==v||v.classList.remove("visible-cards"),null==d||d.classList.remove("visible-cards"),null==f||f.classList.remove("visible"),null==i||i.classList.remove("visible"),h&&h.addEventListener("submit",B)}null==p||p.addEventListener("click",(function(){w.play()})),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",C):C()})();