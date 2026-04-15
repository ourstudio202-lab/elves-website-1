const menuBtn = document.getElementById('menu-btn');
const fullscreenMenu = document.getElementById('fullscreen-menu');
const logoText = document.querySelector('.logo-text');

menuBtn.addEventListener('click', function () {

    // Toggle menu
    fullscreenMenu.classList.toggle('open');

    // Prevent scroll
    document.body.classList.toggle('no-scroll');

    // Optional: text color switch
    menuBtn.classList.toggle('text-white');
    if (logoText) {
        logoText.classList.toggle('text-white');
    }

    // Change button text
    if (fullscreenMenu.classList.contains('open')) {
        menuBtn.textContent = '× Close';
    } else {
        menuBtn.textContent = '+ Menu';
    }
});
