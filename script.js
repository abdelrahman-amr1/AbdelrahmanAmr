// Translation Dictionary
const translations = {
    ar: {
        "nav-about": "عني",
        "nav-honors": "التكريمات والمناصب",
        "nav-services": "الخدمات",
        "nav-contact": "تواصل معي",
        "hero-badge": "رؤية مصر 2030",
        "hero-title": "م. عبدالرحمن عمرو",
        "hero-tagline": "مدرب دولي سفيراً للحوكمة، الذكاء الاصطناعي، والبصمة الكربونية.",
        "hero-desc": "أقود التحول الرقمي بخبرات متراكمة في إدارة مشاريع تقنية المعلومات لتقديم حلول مبتكرة وبناء أنظمة مؤسسية متكاملة.",
        "hero-btn-services": 'اكتشف خدماتي <i class="fas fa-arrow-left"></i>',
        "hero-btn-contact": "تواصل الآن",
        "hero-floating": "سفير الذكاء الاصطناعي",
        "honors-title": "التكريمات والمناصب القيادية",
        "honor-1-title": "سفير الذكاء الاصطناعي",
        "honor-1-desc": "المساهمة في نشر الوعي وبناء قدرات المجتمع في مجالات وتطبيقات الذكاء الاصطناعي.",
        "honor-2-title": "سفير الحوكمة والتحول الرقمي",
        "honor-2-desc": "قيادة مبادرات رقمنة المؤسسات لضمان حوكمة الأنظمة وتوافقها مع رؤية 2030.",
        "honor-3-title": "سفير البصمة الكربونية",
        "honor-3-desc": "خريج الدفعة الأولى وتسخير التكنولوجيا لتحقيق الاستدامة البيئية.",
        "honor-4-title": "مدير مشروع تقنية المعلومات",
        "honor-4-desc": "مطار القاهرة الدولي - إدارة مشاريع حيوية وتطوير الأنظمة التقنية.",
        "honor-5-title": "Senior Pacs/Ris",
        "honor-5-desc": "مستشفيات جامعة عين شمس - خبير في أنظمة الأشعة الرقمية وتكنولوجيا السحابة الطبية.",
        "honor-6-title": "مدرب دولي معتمد",
        "honor-6-desc": "تخطيط وتقديم برامج تدريبية متقدمة في التحول الرقمي وتكنولوجيا المعلومات.",
        "gallery-title": "معرض الشهادات والتكريمات",
        "gallery-subtitle": "جانب من الشهادات والتكريمات المستحقة لعام 2025.",
        "news-title": "التغطية الإعلامية",
        "news-badge": "تغطية صحفية حديثة",
        "news-headline": "المهندس عبدالرحمن عمرو سفيراً للذكاء الاصطناعي",
        "news-desc": 'أبرزت صحيفة "تحيا مصر" خبراً مفصلاً يتناول المهندس عبدالرحمن عمرو كواحد من أبرز الوجوه في منصب سفير الذكاء الاصطناعي ودوره الفعال في دفع مسيرة التحول الرقمي وفقاً لرؤية مصر 2030.',
        "news-btn": 'اقرأ المقال كاملاً في موقع تحيا مصر <i class="fas fa-external-link-alt"></i>',
        "services-title": "خدماتنا الرقمية",
        "services-subtitle": "حلول تقنية مبتكرة مصممة لدعم الأفراد والشركات في رحلة التحول الرقمي.",
        "srv-1-title": "إنشاء وتطوير مواقع إلكترونية احترافية",
        "srv-1-desc": "تصميم وبرمجة مواقع ويب حديثة، متجاوبة مع جميع الشاشات بمظهر فخم يعكس هوية عملك ويجلب لك المزيد من العملاء.",
        "srv-1-f1": "تصميم مخصص وجذاب",
        "srv-1-f2": "توافق مع الهواتف",
        "srv-1-f3": "تحسين محركات البحث SEO",
        "srv-btn": "احجز الخدمة",
        "srv-2-title": "سيستم للتحول من ورقي إلى رقمي",
        "srv-2-desc": "بناء نظام أرشيف رقمي وإدارة معلومات متكامل للتخلص من المعاملات الورقية، متبوعاً بتدريب مكثف للموظفين لضمان الاستخدام الأمثل.",
        "srv-2-f1": "أرشفة آمنة وسريعة",
        "srv-2-f2": "لوحة تحكم إدارية كاملة",
        "srv-2-f3": "تدريب طاقم العمل",
        "srv-3-title": "صفحات تعريفية للأنشطة الصغيرة",
        "srv-3-desc": "إطلاق صفحة تعريفية سريعة ومبهرة لنشاطك التجاري الصغير (بدومين خاص أو بدونه) لتسهيل وصول العملاء لمنتجاتك.",
        "srv-3-f1": "تكلفة اقتصادية",
        "srv-3-f2": "تصميم سريع التنفيذ",
        "srv-3-f3": "ربط بوسائل التواصل",
        "footer-desc": "مستعد لبدء رحلة نجاحك الرقمية؟ تواصل معي الآن لنحول أفكارك إلى واقع تكنولوجي ملموس.",
        "form-title": "اطلب استشارة أو خدمة",
        "form-name": "الاسم الكريم",
        "form-contact": "البريد الإلكتروني أو الهاتف",
        "form-opt-def": "اختر الخدمة...",
        "form-opt-1": "موقع إلكتروني",
        "form-opt-2": "سيستم تحول رقمي وتدريب",
        "form-opt-3": "صفحة تعريفية",
        "form-opt-4": "استشارة ذكاء اصطناعي",
        "form-details": "تفاصيل طلبك...",
        "form-btn": 'إرسال الطلب عبر واتساب <i class="fab fa-whatsapp"></i>',
        "copyright": "م. عبدالرحمن عمرو. جميع الحقوق محفوظة."
    },
    en: {
        "nav-about": "About",
        "nav-honors": "Honors & Roles",
        "nav-services": "Services",
        "nav-contact": "Contact Me",
        "hero-badge": "Egypt Vision 2030",
        "hero-title": "Eng. Abdelrahman Amr",
        "hero-tagline": "International Trainer & Ambassador for Governance, AI, and Carbon Footprint.",
        "hero-desc": "Leading digital transformation with extensive experience in IT project management to deliver innovative solutions and build integrated enterprise systems.",
        "hero-btn-services": 'Discover Services <i class="fas fa-arrow-right"></i>',
        "hero-btn-contact": "Contact Now",
        "hero-floating": "AI Ambassador",
        "honors-title": "Honors & Leadership Roles",
        "honor-1-title": "Artificial Intelligence Ambassador",
        "honor-1-desc": "Contributing to spreading awareness and building community capacities in AI fields and applications.",
        "honor-2-title": "Governance & Digital Transformation Ambassador",
        "honor-2-desc": "Leading enterprise digitization initiatives to ensure systems governance and alignment with Vision 2030.",
        "honor-3-title": "Carbon Footprint Ambassador",
        "honor-3-desc": "First cohort graduate, harnessing technology for environmental sustainability.",
        "honor-4-title": "IT Project Manager",
        "honor-4-desc": "Cairo International Airport - Managing vital projects and developing technical systems.",
        "honor-5-title": "Senior PACS/RIS",
        "honor-5-desc": "Ain Shams University Hospitals - Expert in digital radiology systems and medical cloud technology.",
        "honor-6-title": "Certified International Trainer",
        "honor-6-desc": "Planning and delivering advanced training programs in digital transformation and Information Technology.",
        "gallery-title": "Certificates & Honors Gallery",
        "gallery-subtitle": "A glimpse of the certificates and honors earned in 2025.",
        "news-title": "Media Coverage",
        "news-badge": "Recent Press Coverage",
        "news-headline": "Eng. Abdelrahman Amr as AI Ambassador",
        "news-desc": '"Tahia Masr" newspaper highlighted a detailed report covering Eng. Abdelrahman Amr as one of the prominent figures in the AI Ambassador role and his effective part in driving digital transformation according to Egypt Vision 2030.',
        "news-btn": 'Read the full article on Tahia Masr <i class="fas fa-external-link-alt"></i>',
        "services-title": "Our Digital Services",
        "services-subtitle": "Innovative technical solutions designed to support individuals and companies in their digital transformation journey.",
        "srv-1-title": "Professional Website Development",
        "srv-1-desc": "Designing and programming modern, responsive websites with a premium look that reflects your brand identity and attracts more clients.",
        "srv-1-f1": "Custom & Attractive Design",
        "srv-1-f2": "Mobile Responsive",
        "srv-1-f3": "SEO Optimization",
        "srv-btn": "Book Service",
        "srv-2-title": "Paper to Digital Transformation System",
        "srv-2-desc": "Building a digital archive and integrated information management system to eliminate paper transactions, followed by intensive staff training.",
        "srv-2-f1": "Secure & Fast Archiving",
        "srv-2-f2": "Full Admin Dashboard",
        "srv-2-f3": "Staff Training",
        "srv-3-title": "Landing Pages for Small Businesses",
        "srv-3-desc": "Launching a fast and impressive landing page for your small business (with or without a custom domain) to ease customer access to your products.",
        "srv-3-f1": "Cost-Effective",
        "srv-3-f2": "Fast Implementation",
        "srv-3-f3": "Social Media Integration",
        "footer-desc": "Ready to start your digital success journey? Contact me now to turn your ideas into a tangible technological reality.",
        "form-title": "Request Consultation or Service",
        "form-name": "Full Name",
        "form-contact": "Email or Phone",
        "form-opt-def": "Select Service...",
        "form-opt-1": "Website Development",
        "form-opt-2": "Digital Transformation & Training",
        "form-opt-3": "Landing Page",
        "form-opt-4": "AI Consultation",
        "form-details": "Your Request Details...",
        "form-btn": 'Send Request via WhatsApp <i class="fab fa-whatsapp"></i>',
        "copyright": "Eng. Abdelrahman Amr. All rights reserved."
    }
};

let currentLang = localStorage.getItem('siteLang') || 'ar';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('siteLang', lang);

    // Update HTML attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Update Toggle Button Text
    const toggleBtn = document.getElementById('lang-toggle');
    if (toggleBtn) {
        toggleBtn.textContent = lang === 'ar' ? 'English' : 'عربي';
    }

    // Update all translatable text
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Update all translatable placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    // Update logos
    document.querySelectorAll('[data-i18n-logo]').forEach(el => {
        if (lang === 'ar') {
            el.innerHTML = '<i class="fas fa-microchip"></i> عبدالرحمن <span>عمرو</span>';
        } else {
            el.innerHTML = '<i class="fas fa-microchip"></i> Abdelrahman <span>Amr</span>';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Language
    setLanguage(currentLang);

    // Language Toggle Event
    const toggleBtn = document.getElementById('lang-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            setLanguage(currentLang === 'ar' ? 'en' : 'ar');
        });
    }

    // Current Year Update
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // WhatsApp Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('userName').value;
            const contact = document.getElementById('userContact').value;
            const service = document.getElementById('userService').options[document.getElementById('userService').selectedIndex].text;
            const details = document.getElementById('userDetails').value;

            // Formulate the WhatsApp message
            const messageTitle = currentLang === 'ar' ? 'مرحباً مهندس عبدالرحمن،\n\nيوجد طلب جديد:\n\n' : 'Hello Eng. Abdelrahman,\n\nNew Request:\n\n';
            const messageBody = currentLang === 'ar' 
                ? `👤 الاسم: ${name}\n📞 التواصل: ${contact}\n💼 الخدمة: ${service}\n📝 التفاصيل:\n${details}`
                : `👤 Name: ${name}\n📞 Contact: ${contact}\n💼 Service: ${service}\n📝 Details:\n${details}`;
            
            const message = messageTitle + messageBody;

            // URL encode the message
            const whatsappUrl = `https://wa.me/201128007078?text=${encodeURIComponent(message)}`;

            // Open WhatsApp in a new tab
            window.open(whatsappUrl, '_blank');
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize Swiper
    const swiper = new Swiper('.gallery-swiper', {
        loop: true,
        spaceBetween: 30,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });
});
