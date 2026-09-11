(function(){
  /* Sự kiện lấy thông tin người dùng nhập in ra thiệp mời */
  var TEN_THU = ['CHỦ NHẬT','THỨ HAI','THỨ BA','THỨ TƯ','THỨ NĂM','THỨ SÁU','THỨ BẢY'];
  var TEN_THANG_VN = ['1','2','3','4','5','6','7','8','9','10','11','12'];
  function pad2(n){ return (n < 10 ? '0' : '') + n; }
  function setText(id, value){
    var el = document.getElementById(id);
    if(el && value != null && value !== '') el.textContent = value;
  }
  function setHTML(id, html){
    var el = document.getElementById(id);
    if(el && html != null && html !== '') el.innerHTML = html;
  }
  var weddingDate = new Date(THONG_TIN.ngayCuoi);
  var validDate = !isNaN(weddingDate.getTime());
  function apply(){
    var cd = THONG_TIN.coDau, cr = THONG_TIN.chuRe;
    /* Tiêu đề trang */
    document.title = 'Thiệp cưới: ' + cr.ten + ' & ' + cd.ten;
    setText('page-title', 'Thiệp cưới: ' + cr.ten + ' & ' + cd.ten);
    /* Tên cô dâu / chú rể (mọi nơi hiển thị tên ngắn) */
    setHTML('invitation-names', cr.ten + '<span class="amp">&amp;</span>' + cd.ten);
    setHTML('wedding-names', '<span class="wedding-name-groom">' + cr.ten.toUpperCase() + '</span><span class="amp">&amp;</span><span class="wedding-name-bride">' + cd.ten.toUpperCase() + '</span>');
    setText('script-name-bride', cd.ten);
    setText('script-name-groom', cr.ten);
    setText('bride-name-detail', cd.ten);
    setText('groom-name-detail', cr.ten);
    setText('bride-dob-detail', cd.ngaySinh);
    setText('groom-dob-detail', cr.ngaySinh);
    /* Ảnh cô dâu / chú rể */
    var brideImg = document.getElementById('bride-photo-img');
    if(brideImg && cd.anhCoDau) brideImg.setAttribute('src', 'img/' + cd.anhCoDau);
    var groomImg = document.getElementById('groom-photo-img');
    if(groomImg && cr.anhChuRe) groomImg.setAttribute('src', 'img/' + cr.anhChuRe);
    /* Ảnh WEDDING, COUPLE PHOTOS, TIMELINE */
    var anh = THONG_TIN.anh || {};
    var weddingImg = document.getElementById('wedding-img');
    if(weddingImg && anh.wedding) weddingImg.setAttribute('src', 'img/' + anh.wedding);
    var duoTallImg = document.getElementById('duo-tall-img');
    if(duoTallImg && anh.duoTall) duoTallImg.setAttribute('src', 'img/' + anh.duoTall);
    var duoStack1Img = document.getElementById('duo-stack1-img');
    if(duoStack1Img && anh.duoStack1) duoStack1Img.setAttribute('src', 'img/' + anh.duoStack1);
    var duoStack2Img = document.getElementById('duo-stack2-img');
    if(duoStack2Img && anh.duoStack2) duoStack2Img.setAttribute('src', 'img/' + anh.duoStack2);
    /* Ảnh slide lightbox */
    var duoExtraContainer = document.getElementById('duo-extra');
    if(duoExtraContainer && anh.duoExtra && anh.duoExtra.length){
      duoExtraContainer.innerHTML = '';
      anh.duoExtra.forEach(function(fileName, i){
        if(!fileName) return;
        var img = document.createElement('img');
        img.className = 'duo-photo';
        img.setAttribute('src', 'img/' + fileName);
        img.setAttribute('alt', 'Ảnh cưới');
        duoExtraContainer.appendChild(img);
      });
    }
    var timelineBg = document.getElementById('timeline-bg');
    if(timelineBg && anh.timeline){
      timelineBg.style.backgroundImage = 'url("img/' + anh.timeline + '")';
    }
    /* Khung "Hộp quà mừng cưới" + Footer (hiển thị stk cô dâu hoặc chú rể) */
    var nguoiHopQua = (THONG_TIN.taiKhoan === 'chuRe') ? cr : cd;
    var bankHopQua = (nguoiHopQua.tenNganHang || '') + ' - ' + (nguoiHopQua.soTaiKhoan || '');
    var roleHopQua = (THONG_TIN.taiKhoan === 'chuRe') ? 'Chú rể' : 'Cô dâu';
    setText('gift-role', roleHopQua);
    setText('gift-name', nguoiHopQua.hoTen || nguoiHopQua.ten);
    setText('gift-bank', bankHopQua);
    setText('footer-role', roleHopQua);
    setText('footer-name', nguoiHopQua.hoTen || nguoiHopQua.ten);
    setText('footer-bank', bankHopQua);
    /*Modal chuyển khoản mừng cưới (cô dâu + chú rể)*/
    setText('gift-bride-fullname', cd.hoTen || cd.ten);
    setText('gift-groom-fullname', cr.hoTen || cr.ten);
    setText('gift-bride-account', (cd.tenNganHang || '') + ' · ' + (cd.soTaiKhoan || ''));
    setText('gift-groom-account', (cr.tenNganHang || '') + ' · ' + (cr.soTaiKhoan || ''));
    var giftBrideCopy = document.getElementById('gift-bride-copy');
    if(giftBrideCopy) giftBrideCopy.setAttribute('data-copy', cd.soTaiKhoan || '');
    var giftGroomCopy = document.getElementById('gift-groom-copy');
    if(giftGroomCopy) giftGroomCopy.setAttribute('data-copy', cr.soTaiKhoan || '');

    /* Ẩn/hiện từng dòng tài khoản nhận tiền mừng cưới */
    var brideHienTK = cd.hienTaiKhoan !== 'no';
    var groomHienTK = cr.hienTaiKhoan !== 'no';
    var giftBrideRow = document.getElementById('gift-bride-row');
    if(giftBrideRow) giftBrideRow.style.display = brideHienTK ? '' : 'none';
    var giftGroomRow = document.getElementById('gift-groom-row');
    if(giftGroomRow) giftGroomRow.style.display = groomHienTK ? '' : 'none';
    /* Ảnh QR nhận tiền mừng cưới trong modal */
    var qrImg = document.getElementById('qr-img');
    if(qrImg){
      var qrFile = 'qr-gift.webp';
      if(brideHienTK && !groomHienTK){
        qrFile = cd.maQR || 'qr-gift.webp';
      } else if(groomHienTK && !brideHienTK){
        qrFile = cr.maQR || 'qr-gift.webp';
      }
      qrImg.setAttribute('src', 'img/' + qrFile);
    }
    /* Nút Liên hệ gửi lời chúc (điện thoại / zalo / messenger) */
    var lienHeBtn = document.getElementById('lien-he');
    if(lienHeBtn && THONG_TIN.lienHe) lienHeBtn.setAttribute('href', THONG_TIN.lienHe);
    /*Thông tin gia đình */
    setHTML('family-bride-info', 'Ông. ' + cd.tenBo + '<br>Bà. ' + cd.tenMe + '<br>' + cd.diaChi);
    setHTML('family-groom-info', 'Ông. ' + cr.tenBo + '<br>Bà. ' + cr.tenMe + '<br>' + cr.diaChi);
    /* Địa điểm tổ chức */
    var diaDiem = THONG_TIN.diaDiem || {};
    var noiToChuc = diaDiem.noiToChuc || 'Tại tư gia nhà trai';
    var diaChiToChuc = diaDiem.diaChi || 'Số 1 Lương Yên, Bạch Đằng, Hải Phòng';
    setHTML('location-info', noiToChuc + '<br>' + diaChiToChuc);
    var mapFrame = document.getElementById('location-map');
    if(mapFrame){
      mapFrame.src = diaDiem.linkMap
        ? diaDiem.linkMap
        : 'https://maps.google.com/maps?q=' + encodeURIComponent(diaChiToChuc) +
          '&t=&z=15&ie=UTF8&iwloc=&output=embed';
    }
    /* Cài Ngày âm lịch */
    setText('event-time-sub', THONG_TIN.ngayAmLich);
    if(!validDate) return; // ngayCuoi cấu hình sai định dạng, giữ nguyên các giá trị mặc định còn lại
    var d = weddingDate.getDate();
    var m = weddingDate.getMonth() + 1;
    var y = weddingDate.getFullYear();
    var hh = pad2(weddingDate.getHours());
    var mm = pad2(weddingDate.getMinutes());
    var thu = TEN_THU[weddingDate.getDay()];
    /* Ngày gửi thư */
    setText('invitation-date', pad2(d) + ' . ' + pad2(m) + ' . ' + y);
    /* Ngày đám cưới */
    setText('wedding-date', pad2(d) + '.' + pad2(m) + '.' + y);
    /* Thời gian tổ chức */
    setHTML('event-time-big', hh + ':' + mm + ' - ' + thu + '<br>' + pad2(d) + '.' + pad2(m) + '.' + y);
    /* Lịch */
    setText('calendar-head', 'THÁNG ' + TEN_THANG_VN[weddingDate.getMonth()]);
  }
  apply();
  /* hiệu ứng hoa rơi */
  function spawnPetals(container, count){
    for(var i=0;i<count;i++){
      var p = document.createElement('div');
      p.className = 'petal';
      p.style.left = Math.random()*100 + '%';
      var duration = 7 + Math.random()*6;
      var delay = Math.random()*10;
      var size = 6 + Math.random()*6;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.animationDuration = duration + 's';
      p.style.animationDelay = '-' + delay + 's';
      container.appendChild(p);
    }
  }
  var invitationPetals = document.querySelector('.invitation-petals');
  var pagePetals = document.querySelector('.petals-layer');
  if(invitationPetals) spawnPetals(invitationPetals, 14);
  if(pagePetals) spawnPetals(pagePetals, 10);
  /* mở thư mời */
  var invitation = document.getElementById('invitation');
  var invitationOpenBtn = document.getElementById('invitation-open');
  var musicToggle = document.getElementById('music-toggle');
  var bgMusic = document.getElementById('bg-music');
  if(bgMusic && musicToggle){
    bgMusic.addEventListener('error', function(){
      musicToggle.hidden = true;
    });
    musicToggle.addEventListener('click', function(){
      if(bgMusic.paused){
        bgMusic.play().then(function(){
          musicToggle.classList.add('playing');
        }).catch(function(){});
      } else {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
      }
    });
  }
  if(invitation && invitationOpenBtn){
    invitationOpenBtn.addEventListener('click', function(){
      invitation.classList.add('opened');
      document.body.classList.remove('locked');
      var weddingSection = document.querySelector('.wedding');
      if(weddingSection) weddingSection.classList.add('in-view');
      if(musicToggle && bgMusic){
        musicToggle.hidden = false;
        bgMusic.play().then(function(){
          musicToggle.classList.add('playing');
        }).catch(function(){
        });
      }
      setTimeout(function(){
        if(invitation && invitation.parentNode) invitation.style.display = 'none';
      }, 950);
    }, { once:true });
  }
  /* hiệu ứng cuộn trang */
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && revealEls.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in-view'); });
  }
  /* đồng hồ đếm ngược ngày cưới */
  var target = (validDate ? weddingDate : new Date("2025-12-20T10:30:00+07:00")).getTime();
  var elDays = document.getElementById('cd-days');
  var elHours = document.getElementById('cd-hours');
  var elMins = document.getElementById('cd-mins');
  var elSecs = document.getElementById('cd-secs');
  function tick(){
    var now = Date.now();
    var diff = target - now;
    if(diff <= 0){
      elDays.textContent = '00'; elHours.textContent = '00';
      elMins.textContent = '00'; elSecs.textContent = '00';
      clearInterval(timer);
      return;
    }
    var days = Math.floor(diff / 86400000);
    var hours = Math.floor((diff % 86400000) / 3600000);
    var mins = Math.floor((diff % 3600000) / 60000);
    var secs = Math.floor((diff % 60000) / 1000);
    elDays.textContent = pad2(days);
    elHours.textContent = pad2(hours);
    elMins.textContent = pad2(mins);
    elSecs.textContent = pad2(secs);
  }
  tick();
  var timer = setInterval(tick, 1000);
  /* Cuốn lịch */
  var calGrid = document.getElementById('cal-grid');
  var dows = ['CN','T2','T3','T4','T5','T6','T7'];
  dows.forEach(function(d){
    var el = document.createElement('div');
    el.className = 'dow';
    el.textContent = d;
    calGrid.appendChild(el);
  });
  var calDate = validDate ? weddingDate : new Date(2025, 11, 20);
  var calYear = calDate.getFullYear();
  var calMonth = calDate.getMonth();
  var weddingDay = calDate.getDate();
  var firstDowOffset = new Date(calYear, calMonth, 1).getDay();
  var daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  for(var i=0;i<firstDowOffset;i++){
    var blank = document.createElement('div');
    blank.className = 'day muted';
    calGrid.appendChild(blank);
  }
  for(var d=1; d<=daysInMonth; d++){
    var cell = document.createElement('div');
    cell.className = 'day' + (d === weddingDay ? ' active' : '');
    cell.textContent = d;
    calGrid.appendChild(cell);
  }
  /* mẫu phản hồi cho bạn bè xác nhận tham dự hay không */
  var form = document.getElementById('rsvp-form');
  var guestField = document.getElementById('guest-field');
  var guestSelect = document.getElementById('rsvp-guests');
  var khacField = document.getElementById('khac-field');
  var khacInput = document.getElementById('rsvp-khac');
  var success = document.getElementById('rsvp-success');
  var radios = form.querySelectorAll('input[name="attend"]');
  function syncKhacField(){
    var showKhac = (guestField.style.display !== 'none') && guestSelect.value === 'khac';
    khacField.hidden = !showKhac;
    if(showKhac){
      khacInput.setAttribute('required', 'required');
    } else {
      khacInput.removeAttribute('required');
      khacInput.value = '';
    }
  }
  radios.forEach(function(r){
    r.addEventListener('change', function(){
      guestField.style.display = (this.value === 'no') ? 'none' : 'block';
      syncKhacField();
    });
  });
  guestSelect.addEventListener('change', syncKhacField);
  syncKhacField();
  /* đếm số người tham dự trong google sheet */
  function tinhSoNguoi(){
    if(guestSelect.value === 'mot-minh') return 1;
    if(guestSelect.value === 'di-cung-bo') return 2;
    if(guestSelect.value === 'khac') return khacInput.value.trim();
    return '';
  }
  /* Gửi dữ liệu phản hồi vào Google Sheet */
  function guiGoogleSheet(payload){
    var url = (window.THONG_TIN && window.THONG_TIN.googleSheetWebAppUrl) || '';
    if(!url) return;
    fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    }).catch(function(){ });
  }
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var name = document.getElementById('rsvp-name').value.trim();
    var attending = form.querySelector('input[name="attend"]:checked').value;
    if(!name){
      document.getElementById('rsvp-name').focus();
      return;
    }
    if(attending === 'yes' && guestSelect.value === 'khac' && !khacInput.value.trim()){
      khacInput.focus();
      return;
    }
    success.textContent = (attending === 'yes')
      ? 'Cảm ơn ' + name + '! Chúng mình rất mong được gặp bạn trong ngày trọng đại.'
      : 'Cảm ơn ' + name + ' đã phản hồi. Chúng mình sẽ nhớ bạn trong ngày vui!';
    success.classList.add('show');
    form.querySelector('.rsvp-submit').textContent = 'Đã gửi';
    form.querySelector('.rsvp-submit').disabled = true;
    guiGoogleSheet({
      hoTen: name,
      thamDu: attending === 'yes' ? 'Có' : 'Không',
      soNguoi: attending === 'yes' ? tinhSoNguoi() : ''
    });
  });
  /* sự kiện chuyển khoản mừng cưới ( hộp quà) */
  var modal = document.getElementById('gift-modal');
  var giftBoxImg = document.getElementById('gift-box-img');
  document.getElementById('gift-open').addEventListener('click', function(){
    if(giftBoxImg){
      giftBoxImg.classList.remove('pop');
      // force reflow so the animation can restart on repeated clicks
      void giftBoxImg.offsetWidth;
      giftBoxImg.classList.add('pop');
    }
    modal.classList.add('open');
  });
  if(giftBoxImg){
    giftBoxImg.addEventListener('animationend', function(){
      giftBoxImg.classList.remove('pop');
    });
  }
  document.getElementById('gift-close').addEventListener('click', function(){
    modal.classList.remove('open');
  });
  modal.addEventListener('click', function(e){
    if(e.target === modal) modal.classList.remove('open');
  });
  /* thêm ảnh cho slide */
  var galleryImgs = Array.prototype.slice.call(document.querySelectorAll('.duo-photo'));
  var lightbox = document.getElementById('photo-lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxCounter = document.getElementById('lightbox-counter');
  var lightboxIndex = 0;
  var photoList = galleryImgs.map(function(img){
    return { src: img.getAttribute('src'), alt: img.getAttribute('alt') };
  });
  function showPhoto(i){
    lightboxIndex = (i + photoList.length) % photoList.length;
    lightboxImg.src = photoList[lightboxIndex].src;
    lightboxImg.alt = photoList[lightboxIndex].alt;
    if(lightboxCounter){
      lightboxCounter.textContent = (lightboxIndex + 1) + ' / ' + photoList.length;
    }
  }
  galleryImgs.forEach(function(img, i){
    img.addEventListener('click', function(){
      showPhoto(i);
      lightbox.classList.add('open');
    });
  });
  document.getElementById('lightbox-prev').addEventListener('click', function(){ showPhoto(lightboxIndex - 1); });
  document.getElementById('lightbox-next').addEventListener('click', function(){ showPhoto(lightboxIndex + 1); });
  document.getElementById('lightbox-close').addEventListener('click', function(){ lightbox.classList.remove('open'); });
  lightbox.addEventListener('click', function(e){
    if(e.target === lightbox) lightbox.classList.remove('open');
  });
  document.addEventListener('keydown', function(e){
    if(!lightbox.classList.contains('open')) return;
    if(e.key === 'Escape') lightbox.classList.remove('open');
    if(e.key === 'ArrowLeft') showPhoto(lightboxIndex - 1);
    if(e.key === 'ArrowRight') showPhoto(lightboxIndex + 1);
  });
  /* sao chép stk chuyển khoản */
  document.querySelectorAll('.copy-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      var value = btn.getAttribute('data-copy');
      var restore = btn.textContent;
      function done(){
        btn.textContent = 'Đã chép';
        btn.classList.add('copied');
        setTimeout(function(){
          btn.textContent = restore;
          btn.classList.remove('copied');
        }, 1500);
      }
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(value).then(done).catch(done);
      } else {
        done();
      }
    });
  });
  /* nút thả tim trang trí */
  var likeBtn = document.getElementById('like-btn');
  var likeCount = document.getElementById('like-count');
  var count = 0;
  function spawnLikeHearts(){
    var n = 5 + Math.floor(Math.random() * 3); // 5-7 trái tim mỗi lần bấm
    for(var i=0;i<n;i++){
      var heart = document.createElement('span');
      heart.className = 'like-heart-fx';
      heart.textContent = '♥';
      heart.style.left = (46 * Math.random() - 4) + 'px';
      heart.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
      heart.style.fontSize = (14 + Math.random() * 10) + 'px';
      heart.style.animationDuration = (0.8 + Math.random() * 0.6) + 's';
      likeBtn.appendChild(heart);
      (function(el){
        el.addEventListener('animationend', function(){
          if(el.parentNode) el.parentNode.removeChild(el);
        });
      })(heart);
    }
  }
  likeBtn.addEventListener('click', function(){
    count++;
    likeCount.textContent = count;
    likeBtn.style.transform = 'scale(1.15)';
    setTimeout(function(){ likeBtn.style.transform = 'scale(1)'; }, 150);
    spawnLikeHearts();
  });
  /* LUÔN CUỘN VỀ ĐẦU TRANG KHI TẢI LẠI*/
  if('scrollRestoration' in history){ history.scrollRestoration = 'manual'; }
  window.scrollTo(0, 0);
  window.addEventListener('load', function(){ window.scrollTo(0, 0); });
})();
