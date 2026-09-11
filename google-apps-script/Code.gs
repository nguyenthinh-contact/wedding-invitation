/**
 * =========================================================================
 * CODE.GS — Nhận dữ liệu RSVP (phản hồi của người nhận thiệp) từ thiệp cưới và ghi vào Google Sheet
 * =========================================================================
 * HƯỚNG DẪN CÀI ĐẶT:
 * 1. Tạo Sheet mới và Đổi tên sheet (tab) đầu tiên thành RSVP
 *    Dòng 1 điền tiêu đề cột: STT | Thời gian | Họ tên | Tham dự | Số người tham gia
 * 2. Trong Google Sheet, vào menu: Tiện ích mở rộng > Apps Script
 *    Xoá hết code mẫu (Code.gs mặc định), dán đoạn code này vào.
 * 3. Bấm nút Triển khai (Deploy) > Triển khai mới (New deployment):
 *      - Chọn loại: Ứng dụng web (Web app)
 *      - Execute as: Me (tài khoản của bạn)
 *      - Who has access: Anyone (Bất kỳ ai)
 *    Bấm Deploy, cấp quyền truy cập khi được hỏi.
 * 4. Sau khi deploy xong, copy "Web app URL" (dạng https://script.google.com/macros/s/xxxxx/exec)
 * 5. Mở file js/thong-tin.js, dán URL đó vào: googleSheetWebAppUrl: "https://script.google.com/macros/s/xxxxx/exec"
 * Lưu ý: mỗi khi bạn sửa code trong Apps Script, cần Deploy lại phiên bản
 * mới (Manage deployments > Edit > New version) thì URL mới nhận thay đổi.
 * =========================================================================
 */

var SHEET_NAME = 'RSVP';
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);
      sheet.appendRow(['STT', 'Thời gian', 'Họ tên', 'Tham dự', 'Số người tham gia']);
    }
    var lastRow = sheet.getLastRow();
    var stt = lastRow; // dòng 1 là tiêu đề nên STT = lastRow (dòng 2 -> STT 1)
    sheet.appendRow([
      stt,
      new Date(),
      data.hoTen || '',
      data.thamDu || '',
      data.soNguoi != null ? data.soNguoi : ''
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
