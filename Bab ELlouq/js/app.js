document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Set current year in footer ---
    document.getElementById('year').textContent = new Date().getFullYear();

    // --- 2. Mobile Navbar Toggle ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- 3. Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('active'); // close menu on click mobile
            if (mobileToggle) mobileToggle.querySelector('i').className = 'fa-solid fa-bars';

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 4. Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100; // Trigger points before the element is fully visible

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger initially

    // --- 5. Navbar Scrolled State ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
            navbar.style.background = 'rgba(6, 8, 11, 0.95)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(6, 8, 11, 0.8)';
        }
    });

    // --- 6. Form Submission (Dummy Action) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;

            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري الإرسال...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> تم إرسال رسالتك بنجاح';
                btn.style.background = '#00d2ff';
                contactForm.reset();

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                }, 3000);
            }, 1500);
        });
    }

    // --- 7. Particles Background Canvas (Tech Aesthetic) ---
    const canvas = document.getElementById('particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray = [];
        let numParticles = window.innerWidth > 768 ? 60 : 30;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2;
                this.speedX = (Math.random() * 0.5) - 0.25;
                this.speedY = (Math.random() * 0.5) - 0.25;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            draw() {
                ctx.fillStyle = 'rgba(0, 242, 254, 0.3)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function init() {
            particlesArray = [];
            for (let i = 0; i < numParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            requestAnimationFrame(animate);
        }

        init();
        animate();
    }

    // --- 8. Populate Products ---
    const landingProducts = document.getElementById('landingProducts');
    if (landingProducts) {
        let products = JSON.parse(localStorage.getItem('babElloq_products'));
        if (!products || products.length === 0) {
            products = typeof initialProducts !== 'undefined' ? initialProducts : [];
        }

        let displayProducts = [];
        if (products && products.length > 0) {
            displayProducts = products.filter(p => p.image && !p.image.includes('undefined') && p.image.includes('Products_Images')).slice(0, 3);
            if (displayProducts.length < 3) displayProducts = products.slice(0, 3);
        }

        if (displayProducts.length > 0) {
            landingProducts.innerHTML = '';
            displayProducts.forEach(product => {
                const card = document.createElement('div');
                card.className = 'glass-card product-card';
                card.innerHTML = `
                    <div class="product-image-container" style="height: 200px; margin-bottom: 20px; border-radius: 10px; overflow: hidden; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center;">
                        <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: contain; padding: 10px;" onerror="this.onerror=null; this.src='https://via.placeholder.com/200x200/00f2fe/0a0e17?text=Product';">
                    </div>
                    <h4>${product.name}</h4>
                    <p class="accent-color mt-2" style="font-weight: bold; font-size: 1.2rem;">${Number(product.price).toLocaleString()} ج.م</p>
                `;
                landingProducts.appendChild(card);
            });
        } else {
            landingProducts.innerHTML = '<p class="text-center w-100">تحتاج إلى إضافة منتجات من نظام الكاشير!</p>';
        }
    }
});
