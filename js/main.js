// ==========================
// MENU
// ==========================
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("fullscreen-menu");

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("open");
    document.body.classList.toggle("no-scroll");

    menuBtn.textContent = menu.classList.contains("open") ? "× Close" : "+ Menu";
});


// ==========================
// HERO SCROLL EFFECT
// ==========================
const heroContent = document.getElementById("hero-content");

window.addEventListener("scroll", () => {
    if (!heroContent) return;

    const scrollY = window.scrollY;

    const opacity = Math.max(1 - scrollY / 600, 0);
    const scale = Math.max(1 - scrollY / 1500, 0.85);

    heroContent.style.opacity = opacity;
    heroContent.style.transform = `scale(${scale})`;
});


// ==========================
// SCROLL REVEAL
// ==========================
const revealElements = document.querySelectorAll(".fade-in-up");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(el => observer.observe(el));


// ==========================
// SIMPLE CARD FLIP (hover-style backup)
// ==========================
document.querySelectorAll(".work-item").forEach(item => {
    const cardInner = item.querySelector(".card-inner");

    item.addEventListener("mouseenter", () => {
        cardInner.classList.add("is-flipped");
    });

    item.addEventListener("mouseleave", () => {
        cardInner.classList.remove("is-flipped");
    });
});


// ==========================
// PROJECT DATA (for future modal system)
// ==========================
const projectData = {
    1: { title: "Brand Identity" },
    2: { title: "Digital Presence" },
    3: { title: "Editorial Design" },
    4: { title: "Art Direction" },
    5: { title: "Packaging" },
    6: { title: "Campaign" }
};
