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
