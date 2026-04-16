// ==========================================
// GSAP SETUP
// ==========================================
gsap.registerPlugin(Flip);

// ==========================================
// SAFE ELEMENT HELPERS
// ==========================================
const safeQuery = (selector) => document.querySelector(selector);
const safeQueryAll = (selector) => document.querySelectorAll(selector);

// ==========================================
// MENU TOGGLE (WORKS ON ALL PAGES)
// ==========================================
const menuBtn = safeQuery('#menu-btn');
const fullscreenMenu = safeQuery('#fullscreen-menu');

if (menuBtn && fullscreenMenu) {
    menuBtn.addEventListener('click', () => {
        fullscreenMenu.classList.toggle('open');
        document.body.classList.toggle('no-scroll');

        menuBtn.textContent = fullscreenMenu.classList.contains('open')
            ? '× Close'
            : '+ Menu';
    });
}

// ==========================================
// HERO SCROLL (SAFE)
// ==========================================
const heroContent = safeQuery('#hero-content');

if (heroContent) {
    window.addEventListener('scroll', () => {
        const scroll = window.scrollY;
        heroContent.style.opacity = Math.max(1 - scroll / 600, 0);
        heroContent.style.transform = `scale(${Math.max(1 - scroll / 1500, 0.85)})`;
    });
}

// ==========================================
// SCROLL REVEAL (SAFE)
// ==========================================
const revealElements = safeQueryAll('.fade-in-up');

if (revealElements.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
}

// ==========================================
// GSAP CARD INTERACTION (FIXED)
// ==========================================
const overlay = safeQuery('.modal-overlay');
let activeCard = null;

safeQueryAll('.work-item').forEach(item => {
    const card = item.querySelector('.work-card');
    const content = item.querySelector('.card-content-hidden');
    const closeBtn = item.querySelector('.close-btn');

    if (!card || !content || !closeBtn) return;

    gsap.set(content, { display: "none", opacity: 0, y: 40 });

    // OPEN
    card.addEventListener('click', () => {
        if (activeCard) return;
        activeCard = card;

        const state = Flip.getState(card);

        card.classList.add('expanded');
        document.body.classList.add('no-scroll');

        if (overlay) overlay.classList.add('active');

        gsap.set(content, { display: "block" });

        Flip.from(state, {
            duration: 0.8,
            ease: "power3.out",
            absolute: true
        });

        gsap.fromTo(card,
            { rotateY: -10 },
            { rotateY: 0, duration: 0.8, ease: "power3.out" }
        );

        gsap.to(content, {
            opacity: 1,
            y: 0,
            delay: 0.3,
            duration: 0.6
        });
    });

    // CLOSE
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        if (!activeCard) return;

        gsap.to(content, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            onComplete: () => {
                gsap.set(content, { display: "none" });

                const state = Flip.getState(card);

                card.classList.remove('expanded');
                document.body.classList.remove('no-scroll');
                if (overlay) overlay.classList.remove('active');

                Flip.from(state, {
                    duration: 0.7,
                    ease: "power2.inOut",
                    absolute: true
                });

                activeCard = null;
            }
        });
    });
});
