// MENU
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('fullscreen-menu');

menuBtn.addEventListener('click',()=>{
menu.classList.toggle('open');
document.body.classList.toggle('no-scroll');

menuBtn.textContent = menu.classList.contains('open')
? '× Close'
: '+ Menu';
});

// CARD ANIMATION
const overlay = document.querySelector('.overlay-bg');
const floatingLayer = document.getElementById('floating-layer');

let activeClone=null;
let activeCard=null;

document.querySelectorAll('.work-card').forEach(card=>{

card.addEventListener('click',()=>{

if(activeClone)return;

activeCard=card;
const rect=card.getBoundingClientRect();

const clone=card.cloneNode(true);
clone.classList.add('floating-card');

gsap.set(clone,{
top:rect.top,
left:rect.left,
width:rect.width,
height:rect.height
});

floatingLayer.appendChild(clone);

overlay.classList.add('active');
document.body.classList.add('no-scroll');

card.style.visibility='hidden';

gsap.to(clone,{
top:window.innerHeight*0.08,
left:window.innerWidth/2,
xPercent:-50,
width:Math.min(1000,window.innerWidth*0.9),
height:window.innerHeight*0.85,
duration:0.7,
ease:"power3.inOut",
onComplete:()=>{

const content=document.createElement('div');
content.innerHTML=`
<div style="padding:60px">
<h2>Project</h2>
<p style="margin-top:20px;color:#aaa">
Case study content here.
</p>
</div>
`;

clone.appendChild(content);

const close=document.createElement('button');
close.className="floating-close";
close.innerHTML="✕";
clone.appendChild(close);

close.onclick=closeCard;
}
});
});
});

function closeCard(){
const rect=activeCard.getBoundingClientRect();

gsap.to(activeClone,{
top:rect.top,
left:rect.left,
xPercent:0,
width:rect.width,
height:rect.height,
duration:0.7,
onComplete:()=>{
activeClone.remove();
activeClone=null;
activeCard.style.visibility='visible';
overlay.classList.remove('active');
document.body.classList.remove('no-scroll');
}
});
}
