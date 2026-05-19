// --- دالة الاستقبال (doGet) هي المسؤولة عن البحث عن الاسم ---
function doGet(e) {
  try {
    if (!e.parameter.mobile) throw new Error("Missing Mobile Parameter");
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
    var data = sheet.getDataRange().getValues();
    var inputMobile = e.parameter.mobile.toString().trim();

    for (var i = 1; i < data.length; i++) {
      if (!data[i][2]) continue; // تخطي الصفوف التي ليس بها موبايل في العمود C
      var sheetMobile = data[i][2].toString().trim();

      if (sheetMobile === inputMobile || sheetMobile === "0" + inputMobile || inputMobile === "0" + sheetMobile) {
        return ContentService.createTextOutput(JSON.stringify({
          "status": "success",
          "name": data[i][1] ? data[i][1].toString().trim() : "غير معروف",
          "code": data[i][0] ? data[i][0].toString().trim() : "N/A"
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }
    return ContentService.createTextOutput(JSON.stringify({ "status": "not_found" })).setMimeType(ContentService.MimeType.JSON);
  } catch (f) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": f.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

// --- دالة الإرسال (doPost) هي المسؤولة عن تسجيل الدرجة والوقت ---
function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
    var data = sheet.getDataRange().getValues();
    var inputMobile = e.parameter.mobile.toString().trim();
    var score = e.parameter.score;
    var now = new Date();

    for (var i = 1; i < data.length; i++) {
      if (!data[i][2]) continue;
      var sheetMobile = data[i][2].toString().trim();

      if (sheetMobile === inputMobile || sheetMobile === "0" + inputMobile || inputMobile === "0" + sheetMobile) {
        // تسجيل الدرجة في العمود J (رقم 10) والوقت في العمود K (رقم 11) للاختبار النهائي
        sheet.getRange(i + 1, 10).setValue(score);
        var formattedTime = Utilities.formatDate(now, "GMT+2", "yyyy-MM-dd HH:mm:ss");
        sheet.getRange(i + 1, 11).setValue(formattedTime);
        return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
      }
    }
    return ContentService.createTextOutput("Not Found").setMimeType(ContentService.MimeType.TEXT);
  } catch (f) {
    return ContentService.createTextOutput("Error: " + f.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}