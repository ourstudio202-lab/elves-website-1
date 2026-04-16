// ==========================================
// 1. FULLSCREEN MENU (Safe for all pages)
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
// 2. HERO SCROLL EFFECT (Safe for all pages)
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
// 4. GSAP CLONE & MORPH INTERACTION
// ==========================================
// Check if GSAP is loaded and we are on a page with work items
if (typeof gsap !== 'undefined' && document.querySelectorAll('.work-item').length > 0) {
    
    const overlay = document.querySelector('.modal-overlay');

    document.querySelectorAll('.work-item').forEach(item => {
        item.addEventListener('click', function(e) {
            
            // Prevent clicking if a clone animation is already running
            if (document.querySelector('.clone-card')) return;

            const card = this.querySelector('.work-card');
            const rect = card.getBoundingClientRect(); // Get exact grid position

            // 1. Create Clone
            const clone = card.cloneNode(true);
            clone.classList.add('clone-card');
            document.body.appendChild(clone);

            // 2. Setup Clone Initial Bounds to match original perfectly
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

            // 3. Hide the original card
            gsap.set(card, { opacity: 0 });

            // 4. Show dark background and lock scroll
            if (overlay) overlay.classList.add('active');
            document.body.classList.add('no-scroll');

            // Select elements inside the clone
            const heroImg = clone.querySelector('.card-hero-img');
            const hiddenContent = clone.querySelector('.card-content-hidden');
            const closeBtn = clone.querySelector('.close-btn');

            // Prep hidden elements for animation
            gsap.set(hiddenContent, { display: 'block', opacity: 0, y: 30 });
            gsap.set(closeBtn, { opacity: 0, pointerEvents: 'none' });

            // 5. Calculate Center Target Destination
            const targetWidth = window.innerWidth > 1000 ? 1000 : window.innerWidth * 0.9;
            const targetHeight = window.innerHeight * 0.85;
            const targetLeft = (window.innerWidth - targetWidth) / 2;
            const targetTop = (window.innerHeight - targetHeight) / 2;

            // 6. OPEN ANIMATION TIMELINE
            const tl = gsap.timeline({
                onComplete: () => {
                    clone.style.overflowY = 'auto'; // Allow scrolling once open
                }
            });

            // Animate 3D rotation and expand to center
            gsap.fromTo(clone, 
                { rotationY: -10 }, 
                { rotationY: 0, duration: 0.8, ease: "power3.out" }
            );

            tl.to(clone, {
                top: targetTop,
                left: targetLeft,
                width: targetWidth,
                height: targetHeight,
                backgroundColor: '#111111', // Morph into dark theme container
                boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
                duration: 0.8,
                ease: 'power3.out'
            }, 0)
            .to(heroImg, {
                height: '55vh',
                minHeight: '400px',
                duration: 0.8,
                ease: 'power3.out'
            }, 0)
            .to([hiddenContent, closeBtn], {
                opacity: 1,
                y: 0,
                pointerEvents: 'auto',
                duration: 0.4,
                ease: 'power2.out'
            }, "-=0.2"); // Start slightly before the morph finishes

            // 7. CLOSE EVENT LISTENER ON CLONE
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                
                clone.style.overflowY = 'hidden';
                gsap.to(clone, { scrollTop: 0, duration: 0.3 }); // Smooth scroll back to top of card
                
                const closeTl = gsap.timeline({
                    onComplete: () => {
                        // Restore Original Grid Item
                        gsap.set(card, { opacity: 1 });
                        clone.remove(); // Delete clone
                        if(overlay) overlay.classList.remove('active');
                        document.body.classList.remove('no-scroll');
                    }
                });
                
                // Fade out content inside clone
                closeTl.to([hiddenContent, closeBtn], {
                    opacity: 0,
                    y: 20,
                    duration: 0.3,
                    ease: 'power2.inOut'
                }, 0);
                
                // Recalculate original bounds (in case the browser was resized while open)
                const currentRect = card.getBoundingClientRect();
                
                // Animate 3D reverse rotation
                gsap.fromTo(clone, 
                    { rotationY: 0 }, 
                    { rotationY: 10, duration: 0.8, ease: "power2.inOut" }
                );

                // Shrink Clone back to grid position
                closeTl.to(clone, {
                    top: currentRect.top,
                    left: currentRect.left,
                    width: currentRect.width,
                    height: currentRect.height,
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
