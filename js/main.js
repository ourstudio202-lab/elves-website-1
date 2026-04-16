// ==========================================
// 1. FULLSCREEN MENU
// ==========================================
const menuBtn = document.getElementById('menu-btn');
const fullscreenMenu = document.getElementById('fullscreen-menu');

if (menuBtn && fullscreenMenu) {
    menuBtn.addEventListener('click', () => {
        fullscreenMenu.classList.toggle('open');
        document.body.classList.toggle('no-scroll');

        if (fullscreenMenu.classList.contains('open')) {
            menuBtn.textContent = '× Close';
        } else {
            menuBtn.textContent = '+ Menu';
        }
    });
}

// ==========================================
// 2. HERO SCROLL EFFECT 
// ==========================================
const heroContent = document.getElementById('hero-content');
if (heroContent) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const opacity = Math.max(1 - scrollPosition / 600, 0);
        const scale = Math.max(1 - scrollPosition / 1500, 0.85);
        
        heroContent.style.opacity = opacity;
        heroContent.style.transform = `scale(${scale})`;
    });
}

// ==========================================
// 3. SCROLL REVEAL ANIMATIONS
// ==========================================
const revealElements = document.querySelectorAll('.fade-in-up');
if (revealElements.length > 0) {
    const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));
}

// ==========================================
// 4. GSAP CLONE & MORPH INTERACTION (FRAMER STYLE)
// ==========================================
if (typeof gsap !== 'undefined' && document.querySelectorAll('.work-item').length > 0) {
    
    const overlay = document.querySelector('.modal-overlay');

    document.querySelectorAll('.work-item').forEach(item => {
        item.addEventListener('click', function(e) {
            
            if (document.querySelector('.clone-card')) return;

            const card = this.querySelector('.work-card');
            const rect = card.getBoundingClientRect(); 

            // 1. Create Clone
            const clone = card.cloneNode(true);
            clone.classList.add('clone-card');
            document.body.appendChild(clone);

            // 2. Setup Clone Initial Bounds
            gsap.set(clone, {
                position: 'fixed',
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
                margin: 0,
                zIndex: 1001,
                overflow: 'hidden',
                borderRadius: '24px',
                backgroundColor: '#ffffff'
            });

            // 3. Hide original card
            gsap.set(card, { opacity: 0 });

            // 4. Show overlay and lock body
            if (overlay) overlay.classList.add('active');
            document.body.classList.add('no-scroll');

            const heroImg = clone.querySelector('.card-hero-img');
            const hiddenContent = clone.querySelector('.card-content-hidden');
            const closeBtn = clone.querySelector('.close-btn');

            gsap.set(hiddenContent, { display: 'block', opacity: 0, y: 40 });
            gsap.set(closeBtn, { opacity: 0, pointerEvents: 'none' });

            // 5. Calculate Center Target Destination (Covering Top & Bottom)
            const targetWidth = window.innerWidth > 1000 ? window.innerWidth * 0.7 : window.innerWidth * 0.95;
            const targetHeight = window.innerHeight; // Full viewport height
            const targetLeft = (window.innerWidth - targetWidth) / 2; // Margins only on left/right
            const targetTop = 0; // Flush with top

            // 6. OPEN ANIMATION TIMELINE
            const tl = gsap.timeline({
                onComplete: () => {
                    clone.style.overflowY = 'auto'; 
                }
            });

            gsap.fromTo(clone, 
                { rotationY: -10 }, 
                { rotationY: 0, duration: 0.8, ease: "power3.out" }
            );

            tl.to(clone, {
                top: targetTop,
                left: targetLeft,
                width: targetWidth,
                height: targetHeight,
                borderRadius: 0, // Animate to 0 to sit flush with the screen edges
                backgroundColor: '#ffffff', 
                boxShadow: '0 0 100px rgba(0,0,0,0.8)',
                duration: 0.8,
                ease: 'power3.out'
            }, 0)
            .to(heroImg, {
                height: '60vh', // Larger editorial hero image
                minHeight: '400px',
                duration: 0.8,
                ease: 'power3.out'
            }, 0)
            .to([hiddenContent, closeBtn], {
                opacity: 1,
                y: 0,
                pointerEvents: 'auto',
                duration: 0.5,
                ease: 'power2.out'
            }, "-=0.3"); 

            // 7. CLOSE EVENT LISTENER ON CLONE
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                
                clone.style.overflowY = 'hidden';
                gsap.to(clone, { scrollTop: 0, duration: 0.3 }); 
                
                const closeTl = gsap.timeline({
                    onComplete: () => {
                        gsap.set(card, { opacity: 1 });
                        clone.remove(); 
                        if(overlay) overlay.classList.remove('active');
                        document.body.classList.remove('no-scroll');
                    }
                });
                
                closeTl.to([hiddenContent, closeBtn], {
                    opacity: 0,
                    y: 20,
                    duration: 0.3,
                    ease: 'power2.inOut'
                }, 0);
                
                const currentRect = card.getBoundingClientRect();
                
                gsap.fromTo(clone, 
                    { rotationY: 0 }, 
                    { rotationY: 10, duration: 0.8, ease: "power2.inOut" }
                );

                closeTl.to(clone, {
                    top: currentRect.top,
                    left: currentRect.left,
                    width: currentRect.width,
                    height: currentRect.height,
                    borderRadius: '24px', // Bring the rounded edges back
                    backgroundColor: '#ffffff',
                    boxShadow: '0 0 0 rgba(0,0,0,0)',
                    duration: 0.8,
                    ease: 'power2.inOut'
                }, 0.1)
                .to(heroImg, {
                    height: '100%',
                    minHeight: '0px',
                    duration: 0.8,
                    ease: 'power2.inOut'
                }, 0.1);
            });
        });
    });
}
