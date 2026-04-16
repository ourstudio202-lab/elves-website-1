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
// 4. PRECISE MANUAL GSAP SPATIAL INTERACTION
// ==========================================
if (typeof gsap !== 'undefined' && document.querySelectorAll('.work-item').length > 0) {
    
    const overlay = document.querySelector('.modal-overlay');

    document.querySelectorAll('.work-item').forEach(item => {
        item.addEventListener('click', function(e) {
            
            if (document.querySelector('.clone-card')) return;

            const card = this.querySelector('.work-card');
            const rect = card.getBoundingClientRect(); 

            // 1. Create Floating Clone
            const clone = card.cloneNode(true);
            clone.classList.add('clone-card');
            
            // Remove any inline styles from cloning process
            clone.style.cssText = '';

            // 2. Setup Exact Starting Bounds + 3D Perspective
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
                backgroundColor: '#ffffff',
                transformPerspective: 1400,
                transformOrigin: "center center",
                rotationY: -8, // Initial 3D illusion tilt
                scale: 1
            });

            document.body.appendChild(clone);

            // Hide original card securely WITHOUT shifting the grid
            gsap.set(card, { visibility: 'hidden' });

            // Activate Background
            if (overlay) overlay.classList.add('active');
            document.body.classList.add('no-scroll');

            const heroImg = clone.querySelector('.card-hero-img');
            const hiddenContent = clone.querySelector('.card-content-hidden');
            const closeBtn = clone.querySelector('.close-btn');

            // Safely extract the close button
            document.body.appendChild(closeBtn);
            closeBtn.classList.add('fixed-close-btn');

            // Content setup
            const contentElements = clone.querySelectorAll('.modal-title, .modal-text-section');
            gsap.set(hiddenContent, { display: 'block' });
            gsap.set(contentElements, { opacity: 0, y: 40 });
            gsap.set(closeBtn, { opacity: 0, pointerEvents: 'none' });

            // 3. Target Calculations (Covering Top & Bottom)
            const targetWidth = window.innerWidth > 1000 ? window.innerWidth * 0.7 : window.innerWidth * 0.95;
            const targetHeight = window.innerHeight;
            const targetLeft = (window.innerWidth - targetWidth) / 2;
            const targetTop = 0;

            // 4. THE MOTION TIMELINE (Total: 0.8s)
            const tl = gsap.timeline({
                onComplete: () => {
                    clone.style.overflowY = 'auto'; 
                }
            });

            // Container Motion (Width, Height, Top, Left, rotateY)
            tl.to(clone, {
                top: targetTop,
                left: targetLeft,
                width: targetWidth,
                height: targetHeight,
                borderRadius: 0,
                rotationY: 0, // Flattens out beautifully
                boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
                duration: 0.8,
                ease: "power3.inOut"
            }, 0);

            // Scale Overshoot System (1 -> 1.02 during first 60% -> 1 during last 40%)
            tl.to(clone, {
                scale: 1.02,
                duration: 0.48, // 60% of 0.8s
                ease: "power2.out"
            }, 0)
            .to(clone, {
                scale: 1,
                duration: 0.32, // 40% of 0.8s
                ease: "power2.inOut"
            }, 0.48);

            // Image Motion (Leads slightly faster to hit 60vh)
            tl.to(heroImg, {
                height: '60vh',
                minHeight: '400px',
                duration: 0.7, 
                ease: "power3.inOut"
            }, 0);

            // Content Reveal (Starts at 0.5s mark, right as scale settles)
            tl.to(contentElements, {
                opacity: 1,
                y: 0,
                stagger: 0.12, // Distinct visual hierarchy reveal
                duration: 0.5,
                ease: "power2.out"
            }, 0.5);

            // Button Reveal
            tl.to(closeBtn, {
                opacity: 1,
                pointerEvents: 'auto',
                duration: 0.3
            }, 0.6);

            // ==========================================
            // 5. THE CLOSE INTERACTION (Snappy & Spatial)
            // ==========================================
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                
                clone.style.overflowY = 'hidden';
                
                const closeTl = gsap.timeline();
                
                // Fast content fade
                closeTl.to([contentElements, closeBtn], {
                    opacity: 0,
                    y: 15,
                    duration: 0.3,
                    stagger: 0.05,
                    ease: "power2.inOut"
                }, 0);
                
                // Get fresh live coordinates of the hidden grid card
                const currentRect = card.getBoundingClientRect();
                
                // Fast Shrink to Grid
                closeTl.to(clone, {
                    top: currentRect.top,
                    left: currentRect.left,
                    width: currentRect.width,
                    height: currentRect.height,
                    borderRadius: '24px',
                    rotationY: 6, // Slight reverse tilt
                    boxShadow: '0 0 0 rgba(0,0,0,0)',
                    duration: 0.6, // Faster than open
                    ease: "power3.inOut"
                }, 0.2) // Overlaps text fade
                .to(heroImg, {
                    height: '100%',
                    minHeight: '0px',
                    duration: 0.6,
                    ease: "power3.inOut"
                }, 0.2);

                // Flatten reverse tilt exactly at end
                closeTl.to(clone, {
                    rotationY: 0,
                    duration: 0.2,
                    ease: "power2.out",
                    onComplete: () => {
                        // Cleanup Phase
                        gsap.set(card, { visibility: 'visible' });
                        clone.remove(); 
                        closeBtn.remove();
                        if(overlay) overlay.classList.remove('active');
                        document.body.classList.remove('no-scroll');
                    }
                }, "+=0");
            });
        });
    });
}
