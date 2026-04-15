// ==========================================
// DYNAMIC PROJECT DATA
// ==========================================
const projectData = {
    "1": {
        title: "Brand Identity", img: "https://picsum.photos/800/1000?random=1",
        overview: "A comprehensive brand identity overhaul designed to communicate clarity, structure, and premium aesthetics. We developed a highly flexible visual system.",
        concept: "The core concept revolves around the idea of 'reduction'. Stripping away unnecessary noise to let the bold typography and stark contrast do the heavy lifting.",
        process: "We began with extensive competitor analysis, moving into wireframing the identity across digital touchpoints, and finalizing the rigorous brand guidelines."
    },
    "2": {
        title: "Digital Presence", img: "https://picsum.photos/800/1000?random=2",
        overview: "End-to-end web strategy and development for a modern tech consultancy.",
        concept: "Creating a seamless, fluid user experience through custom interactions and a strict monochromatic color palette.",
        process: "Developed on a custom headless CMS structure, ensuring lightning-fast load times and infinite scalability."
    },
    "3": {
        title: "Editorial Design", img: "https://picsum.photos/800/1000?random=3",
        overview: "A massive 300-page print publication focusing on modern architectural forms.",
        concept: "Drawing inspiration from brutalist architecture, the layout relies on heavy grid structures and dynamic whitespace.",
        process: "Typeset primarily in Inter and Helvetica, we worked closely with local print shops to ensure perfect color calibration on uncoated paper."
    },
    "4": {
        title: "Art Direction", img: "https://picsum.photos/800/1000?random=4",
        overview: "Creative direction for a high-end fashion editorial campaign.",
        concept: "Isolating the subjects in stark, surreal environments to emphasize the silhouette of the garments.",
        process: "Managed set design, lighting plans, and post-production color grading."
    },
    "5": {
        title: "Packaging", img: "https://picsum.photos/800/1000?random=5",
        overview: "Sustainable packaging solutions for a boutique cosmetics brand.",
        concept: "Utilitarian yet luxurious. We wanted the packaging to feel like a high-end industrial product.",
        process: "Sourced 100% recycled corrugated materials and utilized single-color foil stamping."
    },
    "6": {
        title: "Creative Campaign", img: "https://picsum.photos/800/1000?random=6",
        overview: "A localized outdoor and digital activation campaign.",
        concept: "Using hyper-local messaging combined with highly abstracted 3D visuals to capture attention.",
        process: "Rolled out across billboards, social channels, and physical pop-up installations over 30 days."
    }
};

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
// 2-STAGE MODAL INTERACTION SYSTEM
// ==========================================
const modalOverlay = document.getElementById('project-modal');
const modalCard = document.getElementById('modal-card');
const modalScrollArea = document.getElementById('modal-scroll-area');
const modalCloseBtn = document.getElementById('modal-close');

let activeWorkItem = null; 

document.querySelectorAll('.work-item').forEach(item => {
    item.addEventListener('click', function(e) {
        if (activeWorkItem) return; 
        
        const projectId = this.getAttribute('data-id');
        const data = projectData[projectId];
        if (!data) return;

        activeWorkItem = this;
        const cardInner = this.querySelector('.card-inner');
        const workCard = this.querySelector('.work-card');

        // STAGE 1: The 3D Flip
        cardInner.classList.add('is-flipped');

        // STAGE 2: The Expansion
        setTimeout(() => {
            document.getElementById('modal-title').textContent = data.title;
            document.getElementById('modal-img').src = data.img;
            document.getElementById('modal-overview').textContent = data.overview;
            document.getElementById('modal-concept').textContent = data.concept;
            document.getElementById('modal-process').textContent = data.process;

            const rect = workCard.getBoundingClientRect();

            modalCard.style.top = rect.top + 'px';
            modalCard.style.left = rect.left + 'px';
            modalCard.style.width = rect.width + 'px';
            modalCard.style.height = rect.height + 'px';
            modalCard.style.transform = 'none';
            modalCard.style.opacity = '1';

            modalOverlay.classList.add('active');
            document.body.classList.add('no-scroll');

            cardInner.style.opacity = '0';

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    modalCard.style.top = '50%';
                    modalCard.style.left = '50%';
                    modalCard.style.width = '90vw';
                    modalCard.style.maxWidth = '1000px';
                    modalCard.style.height = '85vh';
                    modalCard.style.transform = 'translate(-50%, -50%)';
                    
                    modalScrollArea.style.opacity = '1';
                });
            });

        }, 800); 
    });
});

// 3. Close Interaction
modalCloseBtn.addEventListener('click', () => {
    if (!activeWorkItem) return;

    const workCard = activeWorkItem.querySelector('.work-card');
    const cardInner = activeWorkItem.querySelector('.card-inner');

    modalScrollArea.style.opacity = '0';

    const rect = workCard.getBoundingClientRect();

    modalCard.style.top = rect.top + 'px';
    modalCard.style.left = rect.left + 'px';
    modalCard.style.width = rect.width + 'px';
    modalCard.style.height = rect.height + 'px';
    modalCard.style.transform = 'none';

    modalOverlay.classList.remove('active');

    // STAGE 4: Restore Original Card and Flip Back
    setTimeout(() => {
        cardInner.style.opacity = '1';
        modalCard.style.opacity = '0';

        cardInner.classList.remove('is-flipped');

        activeWorkItem = null;
        document.body.classList.remove('no-scroll');
        
        modalScrollArea.scrollTop = 0;
    }, 800); 
});
