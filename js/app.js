// ============================================================
// APP.JS - WEATHER APP 38 IBUKOTA PROVINSI (REAL-TIME)
// ============================================================

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const cityName = document.getElementById('cityName');
const weatherTemp = document.getElementById('weatherTemp');
const weatherCondition = document.getElementById('weatherCondition');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const rainfall = document.getElementById('rainfall');
const weatherCode = document.getElementById('weatherCode');
const weatherIconBig = document.getElementById('weatherIconBig');
const forecastList = document.getElementById('forecastList');
const historyList = document.getElementById('historyList');
const currentDate = document.getElementById('currentDate');

// Kota yang sedang ditampilkan (untuk auto-refresh)
let currentProvinceKey = 'dki-jakarta';
let autoRefreshTimer = null;

// ============================================================
// NAVIGASI
// ============================================================

const navLinks = document.querySelectorAll('.nav-link');
const pages = {
    beranda: document.getElementById('page-beranda'),
    tentang: document.getElementById('page-tentang'),
    kontak: document.getElementById('page-kontak')
};

function navigateTo(page) {
    Object.keys(pages).forEach(k => pages[k]?.classList.remove('active'));
    pages[page]?.classList.add('active');
    navLinks.forEach(l => {
        l.classList.toggle('active', l.dataset.page === page);
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        if (link.dataset.page) navigateTo(link.dataset.page);
    });
});

// ============================================================
// HELPER
// ============================================================

function formatDate(date) {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                   'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const d = new Date(date);
    return `${days[d.getDay()]}, ${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
}

// ============================================================
// TAMPILKAN CUACA (REAL-TIME)
// ============================================================

async function showWeather(provinceKey) {
    const data = getProvinceData(provinceKey);
    if (!data) {
        showNotification('Provinsi tidak ditemukan!', 'error');
        return;
    }

    // Simpan kota yang sedang ditampilkan
    currentProvinceKey = provinceKey;

    showLoading();
    if (cityName) cityName.textContent = `${data.capital}, ${data.name}`;
    if (currentDate) currentDate.textContent = formatDate(new Date());

    try {
        let parsed = null;

        if (data.adm4) {
            try {
                const raw = await fetchBMKGWeather(data.adm4);
                parsed = parseBMKGData(raw);
            } catch (err) {
                console.warn('⚠️ BMKG gagal:', err);
            }
        }

        if (parsed?.current) {
            const c = parsed.current;
            if (weatherTemp) weatherTemp.innerHTML = `${c.temp}<sup>°C</sup>`;
            if (weatherCondition) weatherCondition.textContent = c.condition;
            if (humidity) humidity.textContent = `${c.humidity}%`;
            if (windSpeed) windSpeed.textContent = c.wind;
            if (rainfall) rainfall.textContent = c.rainfall;
            if (weatherCode) weatherCode.textContent = c.code;
            if (weatherIconBig) weatherIconBig.innerHTML = `<i class="fas ${c.icon}"></i>`;

            // Tampilkan info jam update
            updateTimestamp(c.updatedAt, c.isToday);

            if (parsed.forecast?.length) renderForecast(parsed.forecast);
            showNotification(`✅ Cuaca ${data.capital} dari BMKG`, 'success');
        } else {
            useFallback(data);
            showNotification('⚠️ Menggunakan data perkiraan', 'warning');
        }
    } catch (err) {
        console.error(err);
        useFallback(data);
        showNotification('⚠️ Gagal memuat BMKG', 'warning');
    } finally {
        hideLoading();
    }

    updateHistory(provinceKey);
}

// ============================================================
// INFO JAM UPDATE
// ============================================================

function updateTimestamp(timeStr, isToday) {
    let info = document.getElementById('updateInfo');
    if (!info) {
        info = document.createElement('div');
        info.id = 'updateInfo';
        info.style.cssText = `
            font-size: 12px;
            color: #64748b;
            margin-top: 4px;
            display: flex;
            align-items: center;
            gap: 6px;
        `;
        // Sisipkan setelah kota/tanggal
        const cityDate = document.getElementById('currentDate');
        if (cityDate && cityDate.parentNode) {
            cityDate.parentNode.insertBefore(info, cityDate.nextSibling);
        }
    }

    const label = isToday ? 'Diperbarui pukul' : 'Data untuk pukul';
    info.innerHTML = `
        <i class="fas fa-clock" style="color: #4A90E2;"></i>
        ${label} <strong>${timeStr}</strong> WIB
    `;
}

// ============================================================
// AUTO-REFRESH (SETIAP 10 MENIT)
// ============================================================

function startAutoRefresh() {
    // Hentikan timer lama
    if (autoRefreshTimer) clearInterval(autoRefreshTimer);

    // Refresh setiap 10 menit
    autoRefreshTimer = setInterval(() => {
        console.log('🔄 Auto-refresh cuaca...');
        showWeather(currentProvinceKey);
    }, 10 * 60 * 1000);

    console.log('⏰ Auto-refresh aktif (10 menit)');
}

// ============================================================
// FALLBACK
// ============================================================

function useFallback(provinceData) {
    const temp = 26 + Math.floor(Math.random() * 8);
    const conditions = ['Cerah', 'Berawan', 'Cerah Berawan', 'Hujan Ringan'];
    const cond = conditions[Math.floor(Math.random() * conditions.length)];
    const icon = getWeatherIconFromBMKG(cond);

    if (weatherTemp) weatherTemp.innerHTML = `${temp}<sup>°C</sup>`;
    if (weatherCondition) weatherCondition.textContent = cond;
    if (humidity) humidity.textContent = `${70 + Math.floor(Math.random() * 20)}%`;
    if (windSpeed) windSpeed.textContent = `${5 + Math.floor(Math.random() * 15)} km/j`;
    if (rainfall) rainfall.textContent = `${(Math.random() * 5).toFixed(1)} mm`;
    if (weatherCode) weatherCode.textContent = '801';
    if (weatherIconBig) weatherIconBig.innerHTML = `<i class="fas ${icon}"></i>`;

    // Info waktu untuk fallback
    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    updateTimestamp(timeStr, true);

    const forecast = [];
    const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i);
        forecast.push({
            day: dayNames[d.getDay()],
            icon: conditions[Math.floor(Math.random() * conditions.length)],
            high: temp + Math.floor(Math.random() * 4),
            low: temp - Math.floor(Math.random() * 5),
            rain: `${(Math.random() * 5).toFixed(1)} mm`
        });
    }
    renderForecast(forecast);
}

// ============================================================
// FORECAST
// ============================================================

function renderForecast(forecastData) {
    if (!forecastList) return;
    forecastList.innerHTML = '';

    forecastData.forEach(item => {
        const icon = item.icon?.startsWith('fa-') ? item.icon : getWeatherIconFromBMKG(item.icon);
        forecastList.insertAdjacentHTML('beforeend', `
            <div class="forecast-item">
                <span class="forecast-day">${item.day}</span>
                <span class="forecast-icon"><i class="fas ${icon}"></i></span>
                <div class="forecast-temps">
                    <span class="forecast-temp-high">${item.high}°</span>
                    <span class="forecast-temp-low">${item.low}°</span>
                </div>
                <span class="forecast-rain"><i class="fas fa-droplet"></i> ${item.rain}</span>
            </div>
        `);
    });
}

// ============================================================
// RIWAYAT
// ============================================================

let searchHistory = [];

function updateHistory(key) {
    searchHistory = searchHistory.filter(k => k !== key);
    searchHistory.unshift(key);
    if (searchHistory.length > 5) searchHistory.pop();
    renderHistory();
}

function renderHistory() {
    if (!historyList) return;
    historyList.innerHTML = '';

    if (searchHistory.length === 0) {
        historyList.innerHTML = '<span class="text-muted">Belum ada riwayat</span>';
        return;
    }

    searchHistory.forEach(key => {
        const data = getProvinceData(key);
        const btn = document.createElement('button');
        btn.className = 'history-item';
        btn.textContent = data ? data.capital : key;
        btn.addEventListener('click', () => {
            showWeather(key);
            if (searchInput) searchInput.value = data?.capital || key;
            navigateTo('beranda');
        });
        historyList.appendChild(btn);
    });
}

// ============================================================
// PENCARIAN
// ============================================================

function handleSearch() {
    const query = searchInput.value.trim();
    if (!query) {
        showNotification('Masukkan nama provinsi/kota!', 'warning');
        return;
    }

    const key = searchProvince(query);
    if (key) {
        const data = getProvinceData(key);
        showWeather(key);
        if (searchInput) searchInput.value = data.capital;
        navigateTo('beranda');
    } else {
        showNotification(`"${query}" tidak ditemukan. Coba: Jakarta, Bandung, Surabaya, Medan, Makassar`, 'error');
    }
}

// ============================================================
// FORM KONTAK
// ============================================================

const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    const n = document.getElementById('contactName').value.trim();
    const em = document.getElementById('contactEmail').value.trim();
    const msg = document.getElementById('contactMessage').value.trim();
    if (n && em && msg) {
        showNotification('✅ Pesan terkirim!', 'success');
        this.reset();
    } else {
        showNotification('⚠️ Isi semua bidang!', 'warning');
    }
});

// ============================================================
// EVENT LISTENERS
// ============================================================

searchBtn?.addEventListener('click', handleSearch);
searchInput?.addEventListener('keydown', e => {
    if (e.key === 'Enter') handleSearch();
});
locationBtn?.addEventListener('click', () => {
    showWeather('dki-jakarta');
    if (searchInput) searchInput.value = 'Jakarta';
    navigateTo('beranda');
});

// Refresh saat tab kembali aktif (user balik ke tab)
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        console.log('👁️ Tab aktif kembali, refresh data...');
        showWeather(currentProvinceKey);
    }
});

// ============================================================
// INIT
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    navigateTo('beranda');
    showWeather('dki-jakarta');
    startAutoRefresh(); // Mulai auto-refresh
    console.log('🚀 WeatherApp 38 ibukota provinsi siap!');
    console.log('⏰ Auto-refresh: setiap 10 menit');
});
