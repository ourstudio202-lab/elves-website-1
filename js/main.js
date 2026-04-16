// ==========================================
// SETUP GSAP
// ==========================================
gsap.registerPlugin(Flip);

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
// HERO SCROLL EFFECT
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
// SCROLL REVEAL ANIMATIONS
// ==========================================
const revealElements = document.querySelectorAll('.fade-in-up');
const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); 
        }
    });
}, revealOptions);

revealElements.forEach(el => revealOnScroll.observe(el));


// ==========================================
// ADVANCED GSAP FLIP PROJECT INTERACTION
// ==========================================
const overlay = document.querySelector('.modal-overlay');
let activeCard = null;

document.querySelectorAll('.work-item').forEach(item => {
    const card = item.querySelector('.work-card');
    const heroImg = card.querySelector('.card-hero-img');
    const hiddenContent = card.querySelector('.card-content-hidden');
    const closeBtn = card.querySelector('.close-btn');

    // 1. Initial State for the content
    gsap.set(hiddenContent, { display: "none", opacity: 0, y: 40 });

    // 2. Open Animation
    card.addEventListener('click', (e) => {
        // Prevent clicking if a card is already expanding
        if (card.classList.contains('expanded') || activeCard) return;
        activeCard = card;

        // Capture current bounds (position, size)
        const state = Flip.getState([card, heroImg]);

        // Toggle CSS class to shift the layout to "Expanded Mode"
        card.classList.add('expanded');
        overlay.classList.add('active');
        document.body.classList.add('no-scroll');
        
        // Render content block (so it takes up physical space) before animating
        gsap.set(hiddenContent, { display: "block" });

        // Trigger the magical GSAP FLIP
        Flip.from(state, {
            duration: 0.8,
            ease: "power3.out",
            absolute: true, // Prevents layout collapses during animation
            onStart: () => {
                // Simultaneously apply the slight 3D rotation effect during the transition
                gsap.fromTo(card, 
                    { rotationY: -12, z: -100 }, 
                    { rotationY: 0, z: 0, duration: 0.8, ease: "power3.out" }
                );
            },
            onComplete: () => {
                // Once FLIP is done, fade & slide in the text content
                gsap.to(hiddenContent, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power3.out"
                });
            }
        });
    });

    // 3. Close Animation
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Stops the card click event from firing again
        if (!card.classList.contains('expanded')) return;

        // Step A: Fade out text content first
        gsap.to(hiddenContent, {
            opacity: 0,
            y: 20,
            duration: 0.4,
            ease: "power2.inOut",
            onComplete: () => {
                // Step B: Set content to display none and scroll back to top
                gsap.set(hiddenContent, { display: "none" });
                card.scrollTop = 0; // Extremely important to prevent layout jumping

                // Step C: Capture state BEFORE returning to grid
                const state = Flip.getState([card, heroImg]);

                // Step D: Revert classes back to grid mode
                card.classList.remove('expanded');
                overlay.classList.remove('active');
                document.body.classList.remove('no-scroll');

                // Step E: Trigger the reverse FLIP
                Flip.from(state, {
                    duration: 0.8,
                    ease: "power2.inOut",
                    absolute: true,
                    onStart: () => {
                        // Simultaneously apply the reverse 3D rotation effect
                        gsap.fromTo(card, 
                            { rotationY: 10, z: 50 }, 
                            { rotationY: 0, z: 0, duration: 0.8, ease: "power2.inOut" }
                        );
                    },
                    onComplete: () => {
                        activeCard = null; // Free up the interaction
                    }
                });
            }
        });
    });
});
