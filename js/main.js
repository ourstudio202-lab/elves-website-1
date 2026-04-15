const menuBtn = document.getElementById('menu-btn');
const fullscreenMenu = document.getElementById('fullscreen-menu');
const logoText = document.querySelector('.logo-text');

menuBtn.addEventListener('click', function () {

    fullscreenMenu.classList.toggle('open');

    menuBtn.classList.toggle('text-white');
    logoText.classList.toggle('text-white');

    document.body.classList.toggle('no-scroll');

    if (fullscreenMenu.classList.contains('open')) {
        menuBtn.textContent = '× Close';
    } else {
        menuBtn.textContent = '+ Menu';
    }
});
// HERO PARALLAX
const hero = document.querySelector('.hero');

hero.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;

    const x = (clientX / window.innerWidth) - 0.5;
    const y = (clientY / window.innerHeight) - 0.5;

    document.querySelectorAll('.blob').forEach((el, i) => {
        const speed = (i + 1) * 20;
        el.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });

    document.querySelectorAll('.micro-text').forEach((el, i) => {
        const speed = (i + 1) * 10;
        el.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});
