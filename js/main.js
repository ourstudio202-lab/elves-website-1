// ==========================================
// FULLSCREEN MENU TOGGLE
// ==========================================
const menuBtn = document.getElementById('menu-btn');
const fullscreenMenu = document.getElementById('fullscreen-menu');

menuBtn.addEventListener('click', () => {
    fullscreenMenu.classList.toggle('open');
    document.body.classList.toggle('no-scroll');

    if (fullscreenMenu.classList.contains('open')) {
        menuBtn.textContent = '× Close';
    } else {
        menuBtn.textContent = '+ Menu';
    }
});

// ==========================================
// HERO SCROLL EFFECT (Fade & Push Back)
// ==========================================
const heroContent = document.getElementById('hero-content');

window.addEventListener('scroll', () => {
    if (!heroContent) return;
    
    const scrollPosition = window.scrollY;
    
    const opacity = Math.max(1 - scrollPosition / 600, 0);
    const scale = Math.max(1 - scrollPosition / 1500, 0.85);
    
    heroContent.style.opacity = opacity;
    heroContent.style.transform = `scale(${scale})`;
});

// ==========================================
// SCROLL REVEAL ANIMATIONS (Intersection Observer)
// ==========================================
const revealElements = document.querySelectorAll('.fade-in-up');

// Options for the observer: 
// rootMargin "-50px" means the animation triggers slightly *after* it enters the screen
const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px" 
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        // If the element is visible on screen
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing it so the animation only happens once
            observer.unobserve(entry.target); 
        }
    });
}, revealOptions);

// Attach the observer to every element with the .fade-in-up class
revealElements.forEach(el => {
    revealOnScroll.observe(el);
});
