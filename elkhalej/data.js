const DB_URL = "https://script.google.com/macros/s/AKfycby1E44-e5TKFE-5r2GsX9ZxEySQPSZhMMx0Wy3AJ2FxyZ16wZYCKFOrV0X0LQEGU78/exec";
let cachedCars = [];
let cachedDrivers = [];

/**
 * دالة ذكية لإصلاح روابط الصور (Google Drive & AppSheet)
 */
function fixImageUrl(url) {
    if (!url || typeof url !== 'string' || url.trim() === "") {
        return "https://images.unsplash.com/photo-1544839655-32e7c3b889eb";
    }

    // 1. إذا كان رابط Google Drive للمشاركة، نحوله لرابط عرض مباشر
    if (url.includes("drive.google.com")) {
        let fileId = "";
        try {
            if (url.includes("id=")) {
                fileId = url.split("id=")[1].split("&")[0];
            } else if (url.includes("/file/d/")) {
                fileId = url.split("/file/d/")[1].split("/")[0];
            }
        } catch (e) { console.warn("Error parsing ID from Drive URL", url); }

        if (fileId) return `https://docs.google.com/uc?export=view&id=${fileId}`;
    }

    return url;
}

async function loadDataFromSheet() {
    console.log("Loading data from local sync file (competitor_data.js)...");

    if (typeof COMPETITOR_CARS !== 'undefined') {
        cachedCars = [...COMPETITOR_CARS];
    } else {
        console.error("COMPETITOR_CARS not found! Ensure competitor_data.js is loaded.");
        cachedCars = [];
    }

    if (typeof COMPETITOR_DRIVERS !== 'undefined') {
        cachedDrivers = [...COMPETITOR_DRIVERS];
    } else {
        cachedDrivers = [];
    }

    return true; // Successfully loaded local data
}

function getCars() {
    return cachedCars;
}

function getDrivers() {
    return cachedDrivers;
}

/**
 * مزامنة حفظ السيارة مع جوجل شيت
 */
async function addCar(carData) {
    return await saveCarToSheet(null, carData);
}

async function updateCar(id, carData) {
    return await saveCarToSheet(id, carData);
}

async function deleteCar(id) {
    try {
        const res = await fetch(DB_URL, {
            method: 'POST',
            body: JSON.stringify({ action: 'deleteCar', id: id })
        });
        const result = await res.json();
        if (result.status === "success") {
            await loadDataFromSheet(); // Reload to sync
            return true;
        }
        return false;
    } catch (e) {
        console.error("Error deleting car from sheet", e);
        return false;
    }
}

async function saveCarToSheet(id, carData) {
    try {
        const payload = {
            action: 'saveCar',
            id: id,
            ...carData
        };
        const res = await fetch(DB_URL, {
            method: 'POST',
            body: JSON.stringify(payload)
        });
        const result = await res.json();
        if (result.status === "success") {
            await loadDataFromSheet(); // Reload local cache
            return true;
        }
        return false;
    } catch (e) {
        console.error("Error saving car to sheet", e);
        return false;
    }
}

// Drivers sync can be added here once needed, same pattern.
function addDriver() { alert('يرجى تسجيل السائقين من خلال تطبيق الكابتن في AppSheet.'); }
function updateDriver() { addDriver(); }
function deleteDriver() { addDriver(); }
