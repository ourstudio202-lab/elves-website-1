const modal = document.getElementById("project-modal");
const card = document.getElementById("modal-card");
const scroll = document.getElementById("modal-scroll-area");
const closeBtn = document.getElementById("modal-close");

let active = null;

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

modal.classList.add("active");
document.body.style.overflow = "hidden";

card.style.top = r.top + "px";
card.style.left = r.left + "px";
card.style.width = r.width + "px";
card.style.height = r.height + "px";

inner.classList.add("is-flipped");

requestAnimationFrame(() => {
requestAnimationFrame(() => {

card.style.top = "5vh";
card.style.left = "50%";
card.style.width = "90vw";
card.style.height = "85vh";
card.style.transform = "translateX(-50%)";

setTimeout(() => {
scroll.classList.add("active");
}, 300);

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
document.body.style.overflow = "auto";
active = null;
}, 900);

}

document.querySelectorAll(".work-item").forEach(item => {
item.addEventListener("click", () => open(item));
});

closeBtn.addEventListener("click", close);
