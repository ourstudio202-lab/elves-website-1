// MENU
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

// CURSOR INTERACTION (SUBTLE PARALLAX)
const hero = document.querySelector('.hero');

hero.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;

    document.querySelectorAll('.micro').forEach((el, i) => {
        const speed = (i + 1) * 10;
        el.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});
