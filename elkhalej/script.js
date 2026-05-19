// --- Screen Management ---
// Global State
window.currentCar = null;

/**
 * دالة لفتح تفاصيل السيارة
 */
window.openDetails = function (carId) {
    console.log("Opening details for car:", carId);
    const cars = getCars();
    const car = cars.find(c => c.id === carId);
    if (!car) {
        console.error("Car not found:", carId);
        return;
    }

    window.currentCar = car;

    // Update Detail Fields
    const fields = {
        'detail-name': car.name,
        'detail-type': car.type,
        'detail-engine': car.engine || "2.0L Turbo",
        'detail-speed': car.speed || "220 km/h",
        'detail-seats': car.seats || "5",
        'detail-price': `EGP ${car.price} <span class="period">/ يوم</span>`
    };

    for (let id in fields) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = fields[id];
    }

    const img = document.getElementById('detail-img');
    if (img) img.src = car.image;

    const discoverScreen = document.getElementById('discover');
    const detailsScreen = document.getElementById('details');

    if (discoverScreen) discoverScreen.classList.remove('active');

    window.scrollTo(0, 0);

    setTimeout(() => {
        if (detailsScreen) {
            detailsScreen.classList.add('active');
            console.log("Details screen is now active");
        } else {
            console.error("Details screen element not found!");
        }
    }, 50);
};

window.closeDetails = function () {
    const discoverScreen = document.getElementById('discover');
    const detailsScreen = document.getElementById('details');
    if (detailsScreen) detailsScreen.classList.remove('active');
    setTimeout(() => {
        if (discoverScreen) discoverScreen.classList.add('active');
    }, 50);
};

window.openBookingModal = function () {
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.classList.add('active');
        const dateInput = document.getElementById('bookDate');
        if (dateInput) dateInput.valueAsDate = new Date();
    }
};

window.closeBookingModal = function () {
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.classList.remove('active');
    }
};

/**
 * رندر السيارات في الجريد
 */
window.renderDiscoverCars = function (filterType = "All") {
    const cars = getCars();
    const grid = document.getElementById('dynamicCarsGrid');
    if (!grid) return;

    grid.innerHTML = '';

    let filteredCars = cars;
    if (filterType === "Featured") {
        filteredCars = cars.slice(0, 4); // Show first 4 on home
    } else if (filterType !== "All") {
        filteredCars = cars.filter(c => c.type === filterType);
    }

    if (filteredCars.length === 0) {
        grid.innerHTML = `<p style="text-align:center; color: var(--text-sub); width:100%; grid-column: 1/-1;">لا يوجد سيارات متوفرة في هذا القسم حالياً.</p>`;
        return;
    }

    filteredCars.forEach(car => {
        const div = document.createElement('div');
        div.className = 'car-card';
        // Use the global function
        div.onclick = () => { window.openDetails(car.id); };

        div.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${car.image}" alt="${car.name}" class="car-img" onerror="this.src='https://images.unsplash.com/photo-1544839655-32e7c3b889eb'">
                <button class="fav-btn" onclick="event.stopPropagation();"><i class="fa-regular fa-heart"></i></button>
            </div>
            <div class="card-info">
                <h4 class="car-name">${car.name}</h4>
                <div class="car-rating">
                    <i class="fa-solid fa-star"></i> ${(!isNaN(parseFloat(car.rating))) ? parseFloat(car.rating).toFixed(1) : "4.9"}
                </div>
            </div>
            <div class="card-footer">
                <div class="price">
                    <span class="currency">EGP</span>${car.price}<span class="period">/day</span>
                </div>
                <button class="small-book-btn" onclick="event.stopPropagation(); window.openDetails('${car.id}')"><i class="fa-solid fa-plus"></i></button>
            </div>
        `;
        grid.appendChild(div);
    });
};

/**
 * حقن الشاشات الأساسية (Details & Modal)
 */
function injectEssentialScreens() {
    const appContainer = document.querySelector('.app-container');
    if (!appContainer) return;

    // 1. Details Screen
    if (!document.getElementById('details')) {
        const detailsHTML = `
            <section id="details" class="screen">
                <div class="details-header">
                    <button class="back-btn" onclick="window.closeDetails()"><i class="fa-solid fa-arrow-left"></i></button>
                    <button class="share-btn"><i class="fa-solid fa-share-nodes"></i></button>
                </div>
                <div class="details-hero">
                    <img src="" alt="Car" id="detail-img" class="panoramic-img">
                </div>
                <div class="details-content">
                    <div class="car-title-row">
                        <h2 id="detail-name" class="detail-h2">Car Name</h2>
                        <span class="badge" id="detail-type">Sport</span>
                    </div>
                    <p class="car-desc">استمتع بتجربة قيادة فريدة من نوعها مع أفضل سيارات الخليج. رفاهية وأداء لا يضاهى.</p>
                    <h3 class="specs-title">المواصفات</h3>
                    <div class="specs-grid">
                        <div class="spec-item">
                            <i class="fa-solid fa-gauge-high"></i>
                            <span id="detail-speed" class="spec-value">--</span>
                            <span class="spec-label">السرعة</span>
                        </div>
                        <div class="spec-item">
                            <i class="fa-solid fa-gas-pump"></i>
                            <span id="detail-engine" class="spec-value">--</span>
                            <span class="spec-label">المحرك</span>
                        </div>
                        <div class="spec-item">
                            <i class="fa-solid fa-user-group"></i>
                            <span id="detail-seats" class="spec-value">--</span>
                            <span class="spec-label">المقاعد</span>
                        </div>
                    </div>
                </div>
                <div class="sticky-dock">
                    <div class="dock-container">
                        <div class="dock-price">
                            <span class="label">السعر اليومي</span>
                            <h3 id="detail-price" class="amount">--</h3>
                        </div>
                        <button class="glow-btn" onclick="window.openBookingModal()">احجز الآن</button>
                    </div>
                </div>
            </section>
        `;
        appContainer.insertAdjacentHTML('beforeend', detailsHTML);
    }

    // 2. Booking Modal
    if (!document.getElementById('booking-modal')) {
        const modalHTML = `
            <div id="booking-modal" class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 style="color: var(--accent-start);">تأكيد الحجز</h3>
                        <button class="close-modal" onclick="window.closeBookingModal()" style="background:none; border:none; color:#fff; font-size:1.5rem;"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    <form id="expressBookingForm">
                        <div class="form-group">
                            <label>تاريخ الاستلام</label>
                            <input type="date" id="bookDate" required>
                        </div>
                        <div class="form-group">
                            <label>المدة (أيام)</label>
                            <input type="number" id="bookDuration" min="1" value="1" required>
                        </div>
                        <div class="form-group">
                            <label>رقم الواتساب</label>
                            <input type="tel" id="bookPhone" placeholder="01..." required>
                        </div>
                        <div class="form-group">
                            <label>الاسم بالكامل</label>
                            <input type="text" id="bookName" placeholder="أدخل اسمك" required>
                        </div>
                        <button type="submit" class="glow-btn full-width">تأكيد عبر واتساب</button>
                    </form>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const newForm = document.getElementById('expressBookingForm');
        if (newForm) {
            newForm.addEventListener('submit', handleBookingSubmit);
        }
    }
}

async function handleBookingSubmit(e) {
    e.preventDefault();
    const carName = window.currentCar ? window.currentCar.name : "سيارة غير محددة";
    const data = {
        car: carName,
        customerName: document.getElementById('bookName').value,
        phone: document.getElementById('bookPhone').value,
        duration: document.getElementById('bookDuration').value,
        pickupDate: document.getElementById('bookDate').value,
    };

    const waMsg = `مرحباً الخليج،%0Aأريد تأكيد حجزي: ${data.car}%0Aالاسم: ${data.customerName}%0Aرقم الهاتف: ${data.phone}%0Aالمدة: ${data.duration} أيام بداية من ${data.pickupDate}`;
    const waNumber = '201111912323';

    window.open(`https://wa.me/${waNumber}?text=${waMsg}`, '_blank');
    window.closeBookingModal();
}

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    console.log("DOM Content Loaded - Initializing App");
    injectEssentialScreens();
    await loadDataFromSheet();

    const path = window.location.pathname;
    const grid = document.getElementById('dynamicCarsGrid');

    if (grid) {
        if (path.includes('wedding.html')) {
            window.renderDiscoverCars("Luxury");
        } else if (path.includes('business.html')) {
            window.renderDiscoverCars("Luxury");
        } else if (path.includes('trips.html')) {
            window.renderDiscoverCars("SUV");
        } else if (path.includes('airport.html')) {
            window.renderDiscoverCars("Van");
        } else if (path.includes('index.html') || path === '/' || path.endsWith('/')) {
            window.renderDiscoverCars("Featured");
        } else {
            window.renderDiscoverCars();
        }
    }

    // Splash handle
    const btnLetsGo = document.getElementById('btn-lets-go');
    if (btnLetsGo) {
        btnLetsGo.onclick = () => {
            const splash = document.getElementById('splash');
            const discover = document.getElementById('discover');
            if (splash) splash.classList.remove('active');
            setTimeout(() => {
                if (discover) discover.classList.add('active');
            }, 100);
        };
    }
});
