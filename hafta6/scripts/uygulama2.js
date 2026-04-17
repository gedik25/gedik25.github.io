(function () {
    'use strict';

    var CATEGORIES = {
        temperature: {
            label: 'Sıcaklık',
            units: [
                { id: 'C', label: 'Celsius (°C)', short: '°C' },
                { id: 'F', label: 'Fahrenheit (°F)', short: '°F' },
                { id: 'K', label: 'Kelvin (K)', short: 'K' }
            ],
            toBase: function (value, from) {
                switch (from) {
                    case 'C': return value;
                    case 'F': return (value - 32) * 5 / 9;
                    case 'K': return value - 273.15;
                    default: return NaN;
                }
            },
            fromBase: function (base, to) {
                switch (to) {
                    case 'C': return base;
                    case 'F': return base * 9 / 5 + 32;
                    case 'K': return base + 273.15;
                    default: return NaN;
                }
            }
        },
        length: {
            label: 'Uzunluk',
            units: [
                { id: 'm',  label: 'Metre (m)',     short: 'm'   },
                { id: 'km', label: 'Kilometre (km)', short: 'km' },
                { id: 'mi', label: 'Mil (mi)',      short: 'mi'  }
            ],
            toBase: function (value, from) {
                switch (from) {
                    case 'm':  return value;
                    case 'km': return value * 1000;
                    case 'mi': return value * 1609.344;
                    default: return NaN;
                }
            },
            fromBase: function (base, to) {
                switch (to) {
                    case 'm':  return base;
                    case 'km': return base / 1000;
                    case 'mi': return base / 1609.344;
                    default: return NaN;
                }
            }
        }
    };

    var state = { category: 'temperature' };

    var tabs = document.querySelectorAll('.tab-btn');
    var valueInput = document.getElementById('value');
    var fromSelect = document.getElementById('from-unit');
    var toSelect = document.getElementById('to-unit');
    var errorEl = document.getElementById('form-error');
    var form = document.getElementById('converter-form');
    var resultBox = document.getElementById('result-box');
    var bigNumber = document.getElementById('big-number');
    var unitLabel = document.getElementById('unit-label');
    var expression = document.getElementById('expression');

    function populateUnits() {
        var cfg = CATEGORIES[state.category];
        fromSelect.innerHTML = '';
        toSelect.innerHTML = '';
        cfg.units.forEach(function (u, i) {
            var optA = document.createElement('option');
            optA.value = u.id;
            optA.textContent = u.label;
            fromSelect.appendChild(optA);

            var optB = document.createElement('option');
            optB.value = u.id;
            optB.textContent = u.label;
            toSelect.appendChild(optB);
        });
        fromSelect.selectedIndex = 0;
        toSelect.selectedIndex = Math.min(1, cfg.units.length - 1);
    }

    function setCategory(cat) {
        if (!CATEGORIES[cat]) return;
        state.category = cat;
        tabs.forEach(function (t) {
            t.classList.toggle('active', t.dataset.category === cat);
        });
        populateUnits();
        resultBox.classList.remove('visible');
        errorEl.textContent = '';
    }

    function parseVal(raw) {
        if (raw == null) return NaN;
        var cleaned = String(raw).trim().replace(',', '.');
        if (cleaned === '') return NaN;
        var n = Number(cleaned);
        return Number.isFinite(n) ? n : NaN;
    }

    function formatNumber(n) {
        if (!Number.isFinite(n)) return '—';
        var rounded = Math.round(n * 10000) / 10000;
        return rounded.toLocaleString('tr-TR', { maximumFractionDigits: 4 });
    }

    function convert() {
        errorEl.textContent = '';
        var raw = valueInput.value;
        var value = parseVal(raw);

        if (Number.isNaN(value)) {
            errorEl.textContent = 'Lütfen geçerli bir sayı giriniz.';
            resultBox.classList.remove('visible');
            return;
        }

        var cfg = CATEGORIES[state.category];
        var fromId = fromSelect.value;
        var toId = toSelect.value;

        if (state.category === 'temperature' && fromId === 'K' && value < 0) {
            errorEl.textContent = 'Kelvin değeri 0\'dan küçük olamaz.';
            resultBox.classList.remove('visible');
            return;
        }
        if (state.category === 'length' && value < 0) {
            errorEl.textContent = 'Uzunluk değeri negatif olamaz.';
            resultBox.classList.remove('visible');
            return;
        }

        var base = cfg.toBase(value, fromId);
        var result = cfg.fromBase(base, toId);

        var fromUnit = cfg.units.find(function (u) { return u.id === fromId; });
        var toUnit = cfg.units.find(function (u) { return u.id === toId; });

        bigNumber.textContent = formatNumber(result);
        unitLabel.textContent = toUnit.short;
        expression.textContent = formatNumber(value) + ' ' + fromUnit.short + ' = ' +
            formatNumber(result) + ' ' + toUnit.short;

        resultBox.classList.add('visible');
    }

    tabs.forEach(function (t) {
        t.addEventListener('click', function () {
            setCategory(t.dataset.category);
        });
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        convert();
    });

    valueInput.addEventListener('input', function () {
        if (valueInput.value.trim() === '') {
            resultBox.classList.remove('visible');
            errorEl.textContent = '';
            return;
        }
        convert();
    });

    fromSelect.addEventListener('change', function () {
        if (valueInput.value.trim() !== '') convert();
    });

    toSelect.addEventListener('change', function () {
        if (valueInput.value.trim() !== '') convert();
    });

    form.addEventListener('reset', function () {
        errorEl.textContent = '';
        resultBox.classList.remove('visible');
    });

    setCategory('temperature');
})();
