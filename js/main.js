// ==========================================
// FULLSCREEN MENU TOGGLE
// ==========================================
const menuBtn = document.getElementById('menu-btn');
const fullscreenMenu = document.getElementById('fullscreen-menu');

menuBtn.addEventListener('click', () => {
    // Toggle the menu open/close classes
    fullscreenMenu.classList.toggle('open');
    document.body.classList.toggle('no-scroll');

    // Change button text based on state
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
    // Only run this if the hero section actually exists on the page
    if (!heroContent) return;
    
    // Get the number of pixels scrolled down
    const scrollPosition = window.scrollY;
    
    // Calculate Opacity (Starts fading out, reaches 0 at 600px scroll)
    const opacity = Math.max(1 - scrollPosition / 600, 0);
    
    // Calculate Scale (Starts at 1, shrinks slightly to 0.85)
    const scale = Math.max(1 - scrollPosition / 1500, 0.85);
    
    // Apply styles
    heroContent.style.opacity = opacity;
    heroContent.style.transform = `scale(${scale})`;
});
