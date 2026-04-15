const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("fullscreen-menu");

let isOpen = false;

menuBtn.addEventListener("click", () => {
    isOpen = !isOpen;

    if (isOpen) {
        openMenu();
    } else {
        closeMenu();
    }
});

function openMenu() {
    menu.classList.add("open");
    menuBtn.textContent = "× Close";

    // Lock scroll
    document.body.style.overflow = "hidden";
}

function closeMenu() {
    menu.classList.remove("open");
    menuBtn.textContent = "+ Menu";

    // Restore scroll (after animation ends)
    setTimeout(() => {
        document.body.style.overflow = "";
    }, 500);
}

/* CLOSE ON LINK CLICK (Premium UX) */
const links = document.querySelectorAll(".menu-links a");

links.forEach(link => {
    link.addEventListener("click", () => {
        closeMenu();
        isOpen = false;
    });
});
