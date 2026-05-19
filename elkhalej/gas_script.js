/**
 * الخليج لتأجير السيارات - باك اند متكامل (قراءة وكتابة)
 */

function doGet(e) {
    try {
        const ss = SpreadsheetApp.getActiveSpreadsheet();

        // جلب السيارات من شيت "السيارات"
        let carsSheet = ss.getSheetByName("السيارات");
        let cars = [];
        if (carsSheet) {
            const data = carsSheet.getDataRange().getValues();
            for (let i = 1; i < data.length; i++) {
                if (data[i][1]) {
                    cars.push({
                        id: data[i][0] ? data[i][0].toString() : "CAR_" + i,
                        name: data[i][1].toString(),
                        color: data[i][2] ? data[i][2].toString() : "",
                        plate: data[i][3] ? data[i][3].toString() : "",
                        image: (data[i][4] && data[i][4].toString().trim() !== "") ? data[i][4].toString() : "https://images.unsplash.com/photo-1544839655-32e7c3b889eb",
                        status: data[i][5] ? data[i][5].toString() : "متاح",
                        rating: data[i][6] ? parseFloat(data[i][6]) : 5.0,
                        price: data[i][7] ? parseFloat(data[i][7]) : 1500,
                        seats: data[i][8] ? data[i][8].toString() : "4",
                        speed: data[i][9] ? data[i][9].toString() : "300 km/h",
                        engine: data[i][10] ? data[i][10].toString() : "V8",
                        type: data[i][11] ? data[i][11].toString() : "رفاهية VIP",
                        driverId: data[i][12] ? data[i][12].toString() : "DRV_1"
                    });
                }
            }
        }

        // جلب السائقين من شيت "السائقين"
        let driversSheet = ss.getSheetByName("السائقين");
        let drivers = [];
        if (driversSheet) {
            const dData = driversSheet.getDataRange().getValues();
            for (let i = 1; i < dData.length; i++) {
                if (dData[i][1]) {
                    drivers.push({
                        id: dData[i][0] ? dData[i][0].toString() : "DRV_" + i,
                        name: dData[i][1].toString(),
                        phone: dData[i][2] ? dData[i][2].toString() : "",
                        image: (dData[i][3] && dData[i][3].toString().trim() !== "") ? dData[i][3].toString() : "https://i.pravatar.cc/150",
                        rating: dData[i][4] ? parseFloat(dData[i][4]) : 5.0
                    });
                }
            }
        } else {
            drivers.push({ id: "DRV_1", name: "سائق افتراضي", phone: "+966", image: "https://i.pravatar.cc/150", rating: 5.0 });
        }

        return ContentService.createTextOutput(JSON.stringify({
            "status": "success", "cars": cars, "drivers": drivers
        })).setMimeType(ContentService.MimeType.TEXT);

    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({
            "status": "error", "message": error.toString()
        })).setMimeType(ContentService.MimeType.TEXT);
    }
}

function doPost(e) {
    try {
        if (e.postData === undefined) {
            return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": "No data received" }))
                .setMimeType(ContentService.MimeType.JSON);
        }

        const data = JSON.parse(e.postData.contents);

        // --- رفع الصور لـ Google Drive ---
        if (data.action === "uploadImage") {
            const folderName = "Elkhalej_Images";
            let folders = DriveApp.getFoldersByName(folderName);
            let folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);
            folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

            const blob = Utilities.newBlob(Utilities.base64Decode(data.base64), data.mimeType, data.fileName);
            const file = folder.createFile(blob);
            file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

            return ContentService.createTextOutput(JSON.stringify({
                "status": "success", "url": "https://drive.google.com/uc?export=view&id=" + file.getId()
            })).setMimeType(ContentService.MimeType.JSON);
        }

        const ss = SpreadsheetApp.getActiveSpreadsheet();

        // --- حفظ أو تعديل سيارة ---
        if (data.action === "saveCar") {
            let sheet = ss.getSheetByName("السيارات") || ss.insertSheet("السيارات");
            if (sheet.getLastRow() === 0) {
                sheet.appendRow(["ID", "Name", "Color", "Plate", "Image", "Status", "Rating", "Price", "Seats", "Speed", "Engine", "Type", "DriverID"]);
            }

            const values = sheet.getDataRange().getValues();
            let rowIndex = -1;

            if (data.id) {
                for (let i = 1; i < values.length; i++) {
                    if (values[i][0] == data.id) {
                        rowIndex = i + 1;
                        break;
                    }
                }
            }

            const rowData = [
                data.id || "CAR_" + new Date().getTime(),
                data.name,
                data.color || "",
                data.plate || "",
                data.image,
                data.status || "متاح",
                data.rating || 5,
                data.price || 1500,
                data.seats || 4,
                data.speed || "300 km/h",
                data.engine || "V8",
                data.type || "رفاهية VIP",
                data.driverId || "DRV_1"
            ];

            if (rowIndex > 0) {
                sheet.getRange(rowIndex, 1, 1, rowData.length).setValues([rowData]);
            } else {
                sheet.appendRow(rowData);
            }

            return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
                .setMimeType(ContentService.MimeType.JSON);
        }

        // --- حذف سيارة ---
        if (data.action === "deleteCar") {
            let sheet = ss.getSheetByName("السيارات");
            if (sheet) {
                const values = sheet.getDataRange().getValues();
                for (let i = 1; i < values.length; i++) {
                    if (values[i][0] == data.id) {
                        sheet.deleteRow(i + 1);
                        break;
                    }
                }
            }
            return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
                .setMimeType(ContentService.MimeType.JSON);
        }

        // --- تسجيل الحجز في شيت "امر تشغيل" ---
        let ordersSheet = ss.getSheetByName("امر تشغيل") || ss.insertSheet("امر تشغيل");
        if (ordersSheet.getLastRow() === 0) {
            ordersSheet.appendRow(["Order ID", "Car", "Driver", "Customer", "Pickup", "Dropoff", "Duration", "Service", "Revenue", "Balance", "Status", "Location", "Timestamp"]);
        }

        ordersSheet.appendRow([
            "ORD-" + ordersSheet.getLastRow(), data.car, "لم يُحدد بعد", data.customerName,
            data.pickupDate, "غير محدد", data.duration, "بسائق", 0, 0, "قيد الانتظار",
            data.pickupLocation, new Date().toLocaleString()
        ]);

        return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}
