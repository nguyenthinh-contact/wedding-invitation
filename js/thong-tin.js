/* ==== THONG-TIN.JS : Sửa dung hiển thị trong file này===== */

var THONG_TIN = {
   /* --- CÔ DÂU --- */
   coDau: {
      ten: "Cô Ngốc",               // tên hiển thị
      hoTen: "Nguyễn Thị Ngốc",          // họ tên đầy đủ
      ngaySinh: "17/11/2000",       // ngày sinh
      tenBo: "Nguyễn Văn C",      // tên bố
      tenMe: "Nguyễn Thị D",     // tên mẹ
      diaChi: "TP. Hải Phòng",      // địa chỉ nhà
      tenNganHang: "TPBank",       // tên ngân hàng
      soTaiKhoan: "0857122816",     // số tài khoản
      hienTaiKhoan: "no",           // "yes" = hiện dòng tài khoản trong khung chuyển khoản mừng cưới, "no" = ẩn
      maQR: "qr-bride.webp",        // ảnh QR chuyển khoản riêng (đặt file vào img/)
      anhCoDau: "bride.webp"        // ảnh đại diện trong thư mục img/
   },

   /* --- CHÚ RỂ --- */
   chuRe: {
      ten: "Chàng Khờ",
      hoTen: "Nguyễn Văn Khờ",
      ngaySinh: "12/12/2000",
      tenBo: "Nguyễn Văn A",
      tenMe: "Nguyễn Thị B",
      diaChi: "Tỉnh Hưng Yên",
      tenNganHang: "TPBank",
      soTaiKhoan: "0857122816",
      hienTaiKhoan: "yes",
      maQR: "qr-groom.webp",
      anhChuRe: "groom.webp"
   },

   /* --- NGÀY CƯỚI --- */
   ngayCuoi: "2028-04-28T10:30:00+07:00", //Ngày cưới Định dạng ISO: "YYYY-MM-DDTHH:mm:00+07:00"
   ngayAmLich: "Nhằm ngày 04 tháng 04 năm Mậu Thân", //ngày cưới âm lịch

  /* --- ĐỊA ĐIỂM TỔ CHỨC --- */
   diaDiem: {
      noiToChuc: "Tại tư gia nhà trai",                     // mặc định
      diaChi: "Số 17 Đường Nam Hưng, Nam Hưng, Bắc Thái Ninh, Hưng Yên",       // mặc định
      linkMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d71109.02307608846!2d106.52520706500974!3d20.497711698872635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135f7f53c0d0325%3A0x24f1774944f99fee!2zVGjDoG5oIFRoxqEgRmFtaWx5!5e0!3m2!1svi!2s!4v1789035370542!5m2!1svi!2s"  // nhúng link map nếu cần địa chỉ chi tiết
   },

  /* --- HÌNH ẢNH --- */
   anh: {
      wedding: "wedding.webp",     // ảnh nền phần "WE GET MARRIED" ngay đầu trang
      duoTall: "duo-1.webp",       // ảnh dọc to (bên trái) trong mục ẢNH CƯỚI
      duoStack1: "duo-2.webp",     // ảnh nhỏ phía trên (bên phải) trong mục ẢNH CƯỚI
      duoStack2: "duo-3.webp",     // ảnh nhỏ phía dưới (bên phải) trong mục ẢNH CƯỚI
      timeline: "timeline.webp",   // ảnh nền mờ phía sau mục TIMELINE
      duoExtra: ["duo-4.webp", "duo-5.webp", "duo-6.webp"] //thêm ảnh cưới ở đây để hiển thị trong slide lightbox VD duoExtra: ["duo-4.webp", "duo-5.webp", "duo-6.webp"]
  },

  /* --- LIÊN HỆ --- */
  lienHe: "https://zalo.me/0857122816", //thay link để mở chat có thể dùng "tel:0857122816" để gọi điện

  /* --- GOOGLE SHEET (RSVP) --- */
  googleSheetWebAppUrl: "https://script.google.com/macros/s/AKfycbyHsIiDm5actqP3w3xHYhO30vjPyfKSQAAt5SRDhhT-HBYk9wHFvBVnX2RCMW_YwcPibw/exec", // gắn googleSheetWebAppUrl để xem danh sách bạn bè tham dự hướng dẫn trong file google-apps-script/Code.gs

  /* --- HỘP QUÀ MỪNG CƯỚI --- */
  taiKhoan: "chuRe" //Tên/số tài khoản hiển thị ở dòng tóm tắt ngay dưới nút mở hộp quà chọn Nhập "coDau" hoặc "chuRe" để hiển thị
};
