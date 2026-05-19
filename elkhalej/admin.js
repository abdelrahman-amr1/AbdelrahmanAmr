const UPLOAD_URL = 'https://script.google.com/macros/s/AKfycby1E44-e5TKFE-5r2GsX9ZxEySQPSZhMMx0Wy3AJ2FxyZ16wZYCKFOrV0X0LQEGU78/exec';

document.addEventListener('DOMContentLoaded', async () => {
    // Initial data load from Google Sheet
    const grid = document.getElementById('carsTableBody');
    grid.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#fff;">جاري تحميل البيانات من جوجل شيت...</td></tr>';

    await loadDataFromSheet();
    renderCarsTable();
    renderDriversTable();
});

function switchTab(tab) {
    document.getElementById('nav-cars').classList.remove('active');
    document.getElementById('nav-drivers').classList.remove('active');
    document.getElementById('section-cars').style.display = 'none';
    document.getElementById('section-drivers').style.display = 'none';

    document.getElementById(`nav-${tab}`).classList.add('active');
    document.getElementById(`section-${tab}`).style.display = 'block';
}

// --- Upload Logic to Google Drive via GAS ---
async function uploadToDrive(fileInput, statusElem) {
    return new Promise((resolve, reject) => {
        if (!fileInput.files.length) {
            resolve(null);
            return;
        }

        const file = fileInput.files[0];
        statusElem.innerText = 'Uploading to Google Drive... Please wait...';
        statusElem.style.color = '#ED8F03';

        const reader = new FileReader();
        reader.onload = async function () {
            const base64 = reader.result.split(',')[1];
            try {
                const res = await fetch(UPLOAD_URL, {
                    method: 'POST',
                    body: JSON.stringify({
                        action: 'uploadImage',
                        base64: base64,
                        mimeType: file.type,
                        fileName: file.name
                    })
                });
                const result = await res.json();
                if (result.status === "success") {
                    statusElem.innerText = 'Upload Successful! ✔️';
                    statusElem.style.color = '#25D366';
                    resolve(result.url);
                } else {
                    reject(result.message);
                }
            } catch (error) {
                statusElem.innerText = 'Upload Error. (Fake URL for test: using generic image)';
                statusElem.style.color = '#dc3545';
                resolve('https://images.unsplash.com/photo-1544839655-32e7c3b889eb');
            }
        };
        reader.readAsDataURL(file);
    });
}

// --- CARS LOGIC ---
const carModal = document.getElementById('carModal');
const carForm = document.getElementById('carForm');

function populateDriverSelect() {
    const drivers = getDrivers();
    const select = document.getElementById('carDriver');
    select.innerHTML = '<option value="" disabled selected>Select a driver</option>';
    drivers.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.id;
        opt.innerText = d.name;
        select.appendChild(opt);
    });
}

function renderCarsTable() {
    const cars = getCars();
    const drivers = getDrivers();
    const tbody = document.getElementById('carsTableBody');
    tbody.innerHTML = '';

    if (cars.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:#888;">No cars found.</td></tr>`;
        return;
    }

    cars.forEach(car => {
        const driver = drivers.find(d => d.id === car.driverId) || { name: 'Unassigned' };

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${car.image}" class="car-thumb" alt="${car.name}" onerror="this.src='https://images.unsplash.com/photo-1544839655-32e7c3b889eb'"></td>
            <td><strong>${car.name}</strong></td>
            <td><span class="badge" style="color:var(--accent)">${car.type}</span></td>
            <td>${driver.name}</td>
            <td><strong>$${car.price}</strong> <span style="font-size: 0.8em; color: var(--text-sub)">/ day</span></td>
            <td>
                <button class="action-btn edit-btn" onclick="editCarSetup('${car.id}')" title="Edit Car"><i class="fa-solid fa-pen"></i></button>
                <button class="action-btn delete-btn" onclick="removeCarSetup('${car.id}')" title="Delete Car"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function openCarModal() {
    carForm.reset();
    populateDriverSelect();
    document.getElementById('carId').value = '';
    document.getElementById('carImageUrl').value = 'https://images.unsplash.com/photo-1544839655-32e7c3b889eb';
    document.getElementById('carImageStatus').innerText = 'يمكنك رفع صورة جديدة أو وضع رابط مباشر.';
    document.getElementById('modalTitle').innerText = 'إضافة سيارة جديدة لـ جوجل شيت';
    carModal.classList.add('active');
}

function closeCarModal() { carModal.classList.remove('active'); }

function editCarSetup(id) {
    populateDriverSelect();
    const car = getCars().find(c => c.id === id);
    if (car) {
        document.getElementById('carId').value = car.id;
        document.getElementById('carName').value = car.name;
        document.getElementById('carType').value = car.type;
        document.getElementById('carDriver').value = car.driverId || '';
        document.getElementById('carImageUrl').value = car.image;
        document.getElementById('carPrice').value = car.price;
        document.getElementById('carColor').value = car.color || '';
        document.getElementById('carPlate').value = car.plate || '';
        document.getElementById('carEngine').value = car.engine;
        document.getElementById('carSpeed').value = car.speed;
        document.getElementById('carSeats').value = car.seats;
        document.getElementById('carRating').value = car.rating;
        document.getElementById('modalTitle').innerText = 'تعديل بيانات السيارة';
        carModal.classList.add('active');
    }
}

async function removeCarSetup(id) {
    if (confirm('هل أنت متأكد من حذف هذه السيارة من جوجل شيت؟')) {
        const delBtn = document.querySelector(`.delete-btn[onclick*="${id}"]`);
        delBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
        const success = await deleteCar(id);
        if (success) {
            renderCarsTable();
        } else {
            alert('حدث خطأ أثناء الحذف.');
            delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        }
    }
}

carForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('carSubmitBtn');
    btn.disabled = true;
    btn.innerText = 'جاري المزامنة مع جوجل شيت...';

    const fileInput = document.getElementById('carImageFile');
    const statusElem = document.getElementById('carImageStatus');

    let imageUrl = document.getElementById('carImageUrl').value;

    if (fileInput.files.length > 0) {
        const uploadedUrl = await uploadToDrive(fileInput, statusElem);
        if (uploadedUrl) imageUrl = uploadedUrl;
    }

    const carData = {
        name: document.getElementById('carName').value,
        type: document.getElementById('carType').value,
        color: document.getElementById('carColor').value,
        plate: document.getElementById('carPlate').value,
        driverId: document.getElementById('carDriver').value,
        image: imageUrl,
        price: Number(document.getElementById('carPrice').value),
        engine: document.getElementById('carEngine').value,
        speed: document.getElementById('carSpeed').value,
        seats: document.getElementById('carSeats').value,
        rating: Number(document.getElementById('carRating').value)
    };

    const id = document.getElementById('carId').value;
    let success = false;

    if (id) {
        success = await updateCar(id, carData);
    } else {
        success = await addCar(carData);
    }

    if (success) {
        closeCarModal();
        renderCarsTable();
    } else {
        alert('حدث خطأ أثناء المزامنة. تأكد من أن رابط الـ Web App مفعل.');
    }

    btn.disabled = false;
    btn.innerText = 'حفظ البيانات';
});

// --- DRIVERS LOGIC (View Only for now) ---
function renderDriversTable() {
    const drivers = getDrivers();
    const tbody = document.getElementById('driversTableBody');
    tbody.innerHTML = '';
    drivers.forEach(drv => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${drv.image}" class="car-thumb" style="border-radius:50%; width:45px; height:45px;" alt="${drv.name}"></td>
            <td><strong>${drv.name}</strong></td>
            <td>${drv.phone}</td>
            <td><i class="fa-solid fa-star" style="color:var(--accent)"></i> ${parseFloat(drv.rating).toFixed(1)}</td>
            <td>
                <span style="font-size:0.8rem; color:#888;">يُدار عبر AppSheet</span>
            </td>
        `;
        tbody.appendChild(tr);
    });
}
