document.addEventListener("DOMContentLoaded", function () {
    // --- 1. TEMA DEĞİŞTİRME ETKİLEŞİMİ ---
    const btnTemaDegistir = document.getElementById("btnTemaDegistir");
    const temaIkon = document.getElementById("temaIkon");
    
    // Ikon SVG tanımları
    const sunIcon = `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`;
    const moonIcon = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;

    if (btnTemaDegistir) {
        btnTemaDegistir.addEventListener("click", function () {
            const currentTheme = document.documentElement.getAttribute("data-bs-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            
            document.documentElement.setAttribute("data-bs-theme", newTheme);
            
            // İkonu güncelle
            if (newTheme === "light") {
                temaIkon.innerHTML = moonIcon;
                btnTemaDegistir.setAttribute("title", "Koyu Tema Değiştir");
            } else {
                temaIkon.innerHTML = sunIcon;
                btnTemaDegistir.setAttribute("title", "Açık Tema Değiştir");
            }
        });
    }

    // --- 2. FORM VERİLERİNDEN ÖZET ÜRETME VE DOĞRULAMA ---
    const kayitFormu = document.getElementById("etkinlikKayitFormu");
    const formUyari = document.getElementById("formUyari");
    const sonucAlani = document.getElementById("sonucAlani");

    if (kayitFormu) {
        kayitFormu.addEventListener("submit", function (event) {
            // Formun varsayılan sayfa yenileme davranışını engelle
            event.preventDefault();

            // Form elemanlarının değerlerini al
            const adSoyad = document.getElementById("adSoyad").value.trim();
            const eposta = document.getElementById("eposta").value.trim();
            const katilimTuru = document.getElementById("katilimTuru").value;
            const mesaj = document.getElementById("mesaj").value.trim();
            
            // Seçilen ilgi alanlarını diziye aktar
            const secilenAlanlar = [];
            const alanCheckboxes = document.querySelectorAll('.form-check-input:checked');
            alanCheckboxes.forEach(function (cb) {
                secilenAlanlar.push(cb.value);
            });

            // Gerekli alanların kontrolü
            if (!adSoyad || !eposta || !katilimTuru) {
                formUyari.textContent = "Lütfen Ad Soyad, E-posta ve Katılım Türü alanlarını eksiksiz doldurunuz.";
                formUyari.classList.remove("d-none");
                
                // Formun biraz sallanması animasyonu (isteğe bağlı UI geribildirimi)
                kayitFormu.classList.add("shake");
                setTimeout(() => kayitFormu.classList.remove("shake"), 500);
                return;
            }

            // Başarılı durum: Uyarıyı gizle
            formUyari.classList.add("d-none");

            // Dinamik sonuç özeti HTML yapısını oluştur
            const alanlarMetni = secilenAlanlar.length > 0 
                ? secilenAlanlar.join(", ") 
                : "Belirtilmedi";

            const ozetHTML = `
                <div class="mt-5 pt-4 border-top">
                    <div class="alert alert-success d-flex align-items-center gap-3 border-0 bg-success-subtle text-success p-4 rounded-4 shadow-sm" role="alert">
                        <span class="p-2 bg-success text-white rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                        </span>
                        <div>
                            <h4 class="alert-heading fw-bold mb-1">Başvurunuz Başarıyla Alındı!</h4>
                            <p class="mb-0 small">Zirve katılım biletiniz ve detaylar e-posta adresinize iletilecektir.</p>
                        </div>
                    </div>

                    <div class="card card-custom p-4 mt-4 rounded-4 border shadow-sm">
                        <div class="card-body">
                            <h5 class="fw-bold mb-4 text-gradient d-flex align-items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M15 2h-6a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>
                                Başvuru Özeti Bilgileri
                            </h5>
                            
                            <div class="row g-3">
                                <div class="col-sm-6">
                                    <span class="text-secondary small d-block mb-1">Ad Soyad</span>
                                    <strong class="text-body fw-semibold">${adSoyad}</strong>
                                </div>
                                <div class="col-sm-6">
                                    <span class="text-secondary small d-block mb-1">E-posta Adresi</span>
                                    <strong class="text-body fw-semibold">${eposta}</strong>
                                </div>
                                <div class="col-sm-6">
                                    <span class="text-secondary small d-block mb-1">Katılım Rolü</span>
                                    <span class="badge bg-primary-subtle text-primary px-2 py-1">${katilimTuru}</span>
                                </div>
                                <div class="col-sm-6">
                                    <span class="text-secondary small d-block mb-1">İlgi Alanları</span>
                                    <span class="text-body small">${alanlarMetni}</span>
                                </div>
                                ${mesaj ? `
                                <div class="col-12 mt-3 pt-2 border-top">
                                    <span class="text-secondary small d-block mb-1">Ek Notlar / Beklentiler</span>
                                    <p class="text-body small fst-italic mb-0">"${mesaj}"</p>
                                </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                    
                    <div class="text-center mt-4">
                        <button type="button" id="yeniBasvuruBtn" class="btn btn-sm btn-custom-outline px-4 py-2 rounded-pill">Yeni Bir Başvuru Yap</button>
                    </div>
                </div>
            `;

            // Oluşturulan HTML'i sonuç alanına bas
            sonucAlani.innerHTML = ozetHTML;

            // Form alanlarını gizle ki özet kartı odakta kalsın
            kayitFormu.style.transition = "all 0.5s ease";
            kayitFormu.style.opacity = "0";
            setTimeout(() => {
                kayitFormu.style.display = "none";
                // Sayfayı sonuç alanına doğru kaydır
                sonucAlani.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);

            // Yeni başvuru butonuna tıklama olayı
            setTimeout(() => {
                const yeniBasvuruBtn = document.getElementById("yeniBasvuruBtn");
                if (yeniBasvuruBtn) {
                    yeniBasvuruBtn.addEventListener("click", function () {
                        kayitFormu.reset();
                        sonucAlani.innerHTML = "";
                        kayitFormu.style.display = "block";
                        setTimeout(() => kayitFormu.style.opacity = "1", 50);
                    });
                }
            }, 350);
        });
    }
});
