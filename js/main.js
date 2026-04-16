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
// 4. GSAP 3D FLIP + EXPAND SYSTEM
// ==========================================
if (typeof gsap !== 'undefined' && document.querySelectorAll('.work-item').length > 0) {
    
    gsap.registerPlugin(Flip);
    const overlay = document.querySelector('.modal-overlay');

    document.querySelectorAll('.work-item').forEach(item => {
        item.addEventListener('click', function(e) {
            
            // Prevent spam clicks
            if (document.querySelector('.clone-card')) return;

            const card = this.querySelector('.work-card');
            const rect = card.getBoundingClientRect(); 

            // 1. Create Clone
            const clone = card.cloneNode(true);
            clone.classList.add('clone-card');
            document.body.appendChild(clone);

            // 2. Setup Initial Clone State with 3D Perspective
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
                transformPerspective: 1500, // Establish 3D space
                transformOrigin: "center center"
            });

            // Capture FLIP State
            const state = Flip.getState(clone);

            // 3. Hide original card and prep UI
            gsap.set(card, { opacity: 0 });
            if (overlay) overlay.classList.add('active');
            document.body.classList.add('no-scroll');

            const heroImg = clone.querySelector('.card-hero-img');
            const hiddenContent = clone.querySelector('.card-content-hidden');
            const closeBtn = clone.querySelector('.close-btn');

            // Select elements to stagger
            const contentElements = clone.querySelectorAll('.modal-title, .modal-text-section');

            // Extract close button to window to prevent scrolling away
            document.body.appendChild(closeBtn);
            closeBtn.classList.add('fixed-close-btn');

            gsap.set(hiddenContent, { display: 'block' });
            gsap.set(contentElements, { opacity: 0, y: 40 }); // Push text down for reveal
            gsap.set(closeBtn, { opacity: 0, pointerEvents: 'none' });

            // 4. Calculate Final Destination
            const targetWidth = window.innerWidth > 1000 ? window.innerWidth * 0.7 : window.innerWidth * 0.95;
            const targetHeight = window.innerHeight; 
            const targetLeft = (window.innerWidth - targetWidth) / 2; 

            // Move clone to final coordinates for FLIP to calculate
            gsap.set(clone, {
                top: 0,
                left: targetLeft,
                width: targetWidth,
                height: targetHeight,
                borderRadius: 0 
            });

            // 5. THE 3D OPEN MOTION
            Flip.from(state, {
                duration: 0.9,
                ease: "power3.inOut",
                absolute: true,
                onStart: () => {
                    // Inject the 3D tilt concurrently with the spatial expansion
                    gsap.fromTo(clone, 
                        { rotationY: -12, z: -50 }, 
                        { rotationY: 0, z: 0, duration: 0.9, ease: "power3.inOut" }
                    );
                    
                    // Image leads the expansion
                    gsap.to(heroImg, { height: '60vh', minHeight: '400px', duration: 0.9, ease: "power3.inOut" });
                    
                    // Add subtle lift shadow
                    gsap.to(clone, { boxShadow: '0 40px 100px rgba(0,0,0,0.4)', duration: 0.9 });
                },
                onComplete: () => {
                    clone.style.overflowY = 'auto'; // Enable scrolling once animation finishes
                }
            });

            // 6. STAGGERED CONTENT REVEAL (Starts near end of flip)
            gsap.to(contentElements, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                delay: 0.5 
            });

            gsap.to(closeBtn, {
                opacity: 1,
                pointerEvents: 'auto',
                duration: 0.4,
                delay: 0.6
            });

            // 7. CLOSE INTERACTION (Snappy Reverse)
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Lock scroll & Reset position instantly to avoid glitches
                clone.style.overflowY = 'hidden';
                gsap.set(clone, { scrollTop: 0 }); 
                
                const closeTl = gsap.timeline();
                
                // Fade out text rapidly
                closeTl.to(contentElements, { 
                    opacity: 0, 
                    y: 15, 
                    duration: 0.3, 
                    stagger: 0.05, 
                    ease: "power2.inOut" 
                });
                closeTl.to(closeBtn, { opacity: 0, duration: 0.3 }, 0);
                
                // Begin Reverse FLIP
                closeTl.add(() => {
                    const returnState = Flip.getState(clone);
                    const currentRect = card.getBoundingClientRect(); // Live coordinates
                    
                    gsap.set(clone, {
                        top: currentRect.top,
                        left: currentRect.left,
                        width: currentRect.width,
                        height: currentRect.height,
                        borderRadius: '24px'
                    });

                    Flip.from(returnState, {
                        duration: 0.6, // Snappier return speed
                        ease: "power3.inOut",
                        absolute: true,
                        onStart: () => {
                            // Reverse 3D tilt
                            gsap.fromTo(clone, 
                                { rotationY: 0, z: 0 }, 
                                { rotationY: 8, z: -30, duration: 0.6, ease: "power3.inOut" }
                            );
                            gsap.to(heroImg, { height: '100%', minHeight: '0px', duration: 0.6, ease: "power3.inOut" });
                            gsap.to(clone, { boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)', duration: 0.6 });
                        },
                        onComplete: () => {
                            // Cleanup
                            gsap.set(card, { opacity: 1 });
                            clone.remove(); 
                            closeBtn.remove();
                            if(overlay) overlay.classList.remove('active');
                            document.body.classList.remove('no-scroll');
                        }
                    });
                });
            });
        });
    });
}
