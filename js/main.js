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
