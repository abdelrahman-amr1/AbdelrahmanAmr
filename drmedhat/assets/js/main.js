// Initialize AOS animation
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 50
    });
});

// Target Phone Number
const WHATSAPP_NUMBER = "201224221165";

// Function for course cards
function bookCourse(courseName) {
    const message = `مرحباً، أود الاستفسار وحجز دورة "${courseName}".`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Function for contact form
document.getElementById('bookingForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const course = document.getElementById('courseSelect').value;

    const message = `مرحباً، أنا ${name}.\nرقم هاتفي: ${phone}\nأود حجز دورة: "${course}".\nيرجى التواصل معي.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
