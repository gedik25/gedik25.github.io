(function () {
    'use strict';

    var form = document.getElementById('grade-form');
    if (!form) return;

    var adInput = document.getElementById('ad-soyad');
    var vizeInput = document.getElementById('vize');
    var finalInput = document.getElementById('final');
    var errorEl = document.getElementById('form-error');
    var resultBox = document.getElementById('result-box');

    var outAd = document.getElementById('out-ad');
    var outVize = document.getElementById('out-vize');
    var outFinal = document.getElementById('out-final');
    var outOrt = document.getElementById('out-ortalama');
    var outHarf = document.getElementById('out-harf');
    var outDurum = document.getElementById('out-durum');

    function parseNota(raw) {
        if (raw == null) return NaN;
        var cleaned = String(raw).trim().replace(',', '.');
        if (cleaned === '') return NaN;
        var n = Number(cleaned);
        return Number.isFinite(n) ? n : NaN;
    }

    function harfNotu(ort) {
        if (ort >= 90) return 'AA';
        if (ort >= 85) return 'BA';
        if (ort >= 75) return 'BB';
        if (ort >= 70) return 'CB';
        if (ort >= 60) return 'CC';
        if (ort >= 55) return 'DC';
        if (ort >= 50) return 'DD';
        if (ort >= 40) return 'FD';
        return 'FF';
    }

    function showError(msg) {
        errorEl.textContent = msg;
        resultBox.classList.remove('visible');
    }

    function clearError() {
        errorEl.textContent = '';
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        clearError();

        var ad = adInput.value.trim();
        var vize = parseNota(vizeInput.value);
        var fin = parseNota(finalInput.value);

        if (ad === '') {
            showError('Lütfen ad ve soyadınızı giriniz.');
            adInput.focus();
            return;
        }

        if (Number.isNaN(vize) || Number.isNaN(fin)) {
            showError('Vize ve final notları geçerli birer sayı olmalıdır.');
            return;
        }

        if (vize < 0 || vize > 100 || fin < 0 || fin > 100) {
            showError('Notlar 0 ile 100 arasında olmalıdır.');
            return;
        }

        var ortalama = vize * 0.40 + fin * 0.60;
        var ortYuvarli = Math.round(ortalama * 100) / 100;
        var harf = harfNotu(ortalama);
        var gecti = ortalama >= 50;

        outAd.textContent = ad;
        outVize.textContent = vize.toFixed(2);
        outFinal.textContent = fin.toFixed(2);
        outOrt.textContent = ortYuvarli.toFixed(2);
        outHarf.textContent = harf;

        outDurum.textContent = gecti ? 'Geçti' : 'Kaldı';
        outDurum.classList.remove('status-pass', 'status-fail');
        outDurum.classList.add(gecti ? 'status-pass' : 'status-fail');

        resultBox.classList.remove('is-fail');
        if (!gecti) resultBox.classList.add('is-fail');

        resultBox.classList.add('visible');
    });

    form.addEventListener('reset', function () {
        clearError();
        resultBox.classList.remove('visible', 'is-fail');
    });
})();
