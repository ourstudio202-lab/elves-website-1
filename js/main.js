const data = {
1: {
title: "Brand Identity",
img: "https://picsum.photos/800/1000?random=1",
overview: "Clean identity system",
concept: "Reduction based thinking",
process: "Research → Design → System"
},
2: {
title: "Digital",
img: "https://picsum.photos/800/1000?random=2",
overview: "Web experience",
concept: "Fluid interaction",
process: "Wireframe → UI → Dev"
},
3: {
title: "Editorial",
img: "https://picsum.photos/800/1000?random=3",
overview: "Print system",
concept: "Grid based structure",
process: "Layout → Type → Print"
}
};

let active = null;

const modal = document.getElementById("project-modal");
const card = document.getElementById("modal-card");
const scroll = document.getElementById("modal-scroll-area");
const closeBtn = document.getElementById("modal-close");

function rect(el) {
return el.getBoundingClientRect();
}

function open(item) {
if (active) return;

active = item;

const id = item.dataset.id;
const workCard = item.querySelector(".work-card");
const inner = item.querySelector(".card-inner");

const r = rect(workCard);

// fill
document.getElementById("modal-title").textContent = data[id].title;
document.getElementById("modal-img").src = data[id].img;
document.getElementById("modal-overview").textContent = data[id].overview;
document.getElementById("modal-concept").textContent = data[id].concept;
document.getElementById("modal-process").textContent = data[id].process;

document.body.classList.add("no-scroll");
modal.classList.add("active");

card.style.top = r.top + "px";
card.style.left = r.left + "px";
card.style.width = r.width + "px";
card.style.height = r.height + "px";

inner.classList.add("is-flipped");

requestAnimationFrame(() => {
requestAnimationFrame(() => {

card.style.transition = "all 0.9s cubic-bezier(0.22,1,0.36,1)";
card.style.top = "50%";
card.style.left = "50%";
card.style.width = "90vw";
card.style.height = "85vh";
card.style.transform = "translate(-50%,-50%)";

scroll.classList.add("active");

});
});
}

function close() {
const item = active;
const workCard = item.querySelector(".work-card");
const inner = item.querySelector(".card-inner");

const r = rect(workCard);

scroll.classList.remove("active");

card.style.top = r.top + "px";
card.style.left = r.left + "px";
card.style.width = r.width + "px";
card.style.height = r.height + "px";
card.style.transform = "none";

setTimeout(() => {
modal.classList.remove("active");
inner.classList.remove("is-flipped");
document.body.classList.remove("no-scroll");
active = null;
}, 800);
}

document.querySelectorAll(".work-item").forEach(i => {
i.addEventListener("click", () => open(i));
});

closeBtn.addEventListener("click", close);
