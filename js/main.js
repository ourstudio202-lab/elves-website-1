// 1. Check if the file is connected
console.log("The Design Elves JavaScript is linked and running! ✨");

// 2. Simple Contact Form Message
// This waits for the user to click 'submit' on the contact page
const contactForm = document.querySelector('form');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // This stops the page from refreshing
        alert("Magic sent! The Design Elves will get back to you soon.");
        contactForm.reset(); // This clears the form
    });
}
// Select our elements
const menuBtn = document.getElementById('menu-btn');
const fullscreenMenu = document.getElementById('fullscreen-menu');
const logoText = document.querySelector('.logo-text');

// Add a click event listener to the button
menuBtn.addEventListener('click', function() {
    // 1. Toggle the 'open' class on the menu to slide it down
    fullscreenMenu.classList.toggle('open');
    
    // 2. Toggle the 'text-white' class so the header text is visible on the dark background
    menuBtn.classList.toggle('text-white');
    if (logoText) {
        logoText.classList.toggle('text-white');
    }

    // 3. Change the button text based on whether the menu is open or closed
    if (fullscreenMenu.classList.contains('open')) {
        menuBtn.textContent = '× Close';
    } else {
        menuBtn.textContent = '+ Menu';
    }
});
document.body.classList.toggle('no-scroll');
