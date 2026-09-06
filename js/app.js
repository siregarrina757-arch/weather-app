// ============================================================
// WEATHER APP - APP.JS (APLIKASI UTAMA)
// ============================================================

// ============================================================
// ELEMEN DOM
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

// ============================================================
// NAVIGASI HALAMAN
// ============================================================

const navLinks = document.querySelectorAll('.nav-link');
const pages = {
    beranda: document.getElementById('page-beranda'),
    tentang: document.getElementById('page-tentang'),
    kontak: document.getElementById('page-kontak')
};

function navigateTo(page) {
    // Sembunyikan semua halaman
    Object.keys(pages).forEach(key => {
        if (pages[key]) {
            pages[key].classList.remove('active');
        }
    });
    
    // Tampilkan halaman yang dipilih
    if (pages[page]) {
        pages[page].classList.add('active');
    }
    
    // Update active class pada nav
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) {
            link.classList.add('active');
        }
    });
}

// Event listener untuk navigasi
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const page = this.dataset.page;
        if (page) {
            navigateTo(page);
        }
    });
});

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function getDayName(date) {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    return days[date.getDay()];
}

function formatDate(date) {
    const d = new Date(date);
    const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                   'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return `${getDayName(d)}, ${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
}

function getWeatherIcon(condition) {
    const iconMap = {
        'Cerah': 'fa-sun',
        'Berawan': 'fa-cloud',
        'Cerah Berawan': 'fa-cloud-sun',
        'Hujan Ringan': 'fa-cloud-rain',
        'Hujan': 'fa-cloud-showers-heavy',
        'Badai': 'fa-bolt',
        'Kabut': 'fa-smog'
    };
    return iconMap[condition] || 'fa-cloud-sun';
}

// ============================================================
// FUNGSI TAMPILKAN CUACA UTAMA
// ============================================================

function showWeather(cityKey) {
    const data = getWeatherData(cityKey);

    if (!data) {
        showNotification('Kota tidak ditemukan!', 'error');
        return;
    }

    console.log('Menampilkan cuaca untuk:', data.name);

    // Update kota & tanggal
    if (cityName) cityName.textContent = data.name;
    if (currentDate) currentDate.textContent = formatDate(new Date());

    // Update ikon & kondisi
    const iconClass = getWeatherIcon(data.condition);
    if (weatherIconBig) {
        weatherIconBig.innerHTML = `<i class="fas ${iconClass}"></i>`;
    }
    if (weatherCondition) weatherCondition.textContent = data.condition;

    // Update suhu
    if (weatherTemp) weatherTemp.innerHTML = `${data.temp}<sup>°C</sup>`;

    // Update detail cuaca
    if (humidity) humidity.textContent = data.humidity;
    if (windSpeed) windSpeed.textContent = data.wind;
    if (rainfall) rainfall.textContent = data.rainfall;
    if (weatherCode) weatherCode.textContent = data.code;

    // Update prakiraan 7 hari
    if (data.forecast && forecastList) {
        renderForecast(data.forecast);
    }

    // Update riwayat pencarian
    updateHistory(cityKey);

    console.log('✅ Cuaca ditampilkan:', data.name);
}

// ============================================================
// FUNGSI TAMPILKAN PRAKIRAAN 7 HARI
// ============================================================

function renderForecast(forecastData) {
    if (!forecastList) return;

    forecastList.innerHTML = '';

    forecastData.forEach(item => {
        const itemHTML = `
            <div class="forecast-item">
                <span class="forecast-day">${item.day}</span>
                <span class="forecast-icon"><i class="fas ${item.icon}"></i></span>
                <div class="forecast-temps">
                    <span class="forecast-temp-high">${item.high}°</span>
                    <span class="forecast-temp-low">${item.low}°</span>
                </div>
                <span class="forecast-rain"><i class="fas fa-droplet"></i> ${item.rain}</span>
            </div>
        `;
        forecastList.insertAdjacentHTML('beforeend', itemHTML);
    });
}

// ============================================================
// FUNGSI RIWAYAT PENCARIAN
// ============================================================

let searchHistory = [];

function updateHistory(cityKey) {
    const data = getWeatherData(cityKey);
    if (!data) return;

    // Hapus duplikat
    searchHistory = searchHistory.filter(key => key !== cityKey);
    searchHistory.unshift(cityKey);

    // Batasi riwayat maksimal 5
    if (searchHistory.length > 5) {
        searchHistory.pop();
    }

    renderHistory();
}

function renderHistory() {
    if (!historyList) return;

    historyList.innerHTML = '';
    
    if (searchHistory.length === 0) {
        historyList.innerHTML = '<span class="text-muted">Belum ada riwayat pencarian</span>';
        return;
    }

    searchHistory.forEach((key) => {
        const btn = document.createElement('button');
        btn.className = 'history-item';
        const data = getWeatherData(key);
        btn.textContent = data ? data.name : key;
        btn.title = `Klik untuk melihat cuaca ${data ? data.name : key}`;
        btn.addEventListener('click', function() {
            showWeather(key);
            if (searchInput) searchInput.value = data ? data.name : key;
            // Kembali ke halaman beranda saat klik riwayat
            navigateTo('beranda');
        });
        historyList.appendChild(btn);
    });
}

// ============================================================
// FUNGSI PENCARIAN
// ============================================================

function handleSearch() {
    const query = searchInput.value.trim();

    if (!query) {
        showNotification('Masukkan nama kota!', 'warning');
        return;
    }

    const cityKey = searchCity(query);

    if (cityKey) {
        const data = getWeatherData(cityKey);
        showWeather(cityKey);
        if (searchInput) searchInput.value = data.name;
        // Pastikan di halaman beranda
        navigateTo('beranda');
        showNotification(`Menampilkan cuaca ${data.name}`, 'success');
    } else {
        showNotification(
            'Kota tidak ditemukan!\nCoba: Jakarta, Bandung, Surabaya, Medan, Yogyakarta',
            'error'
        );
    }
}

// ============================================================
// FORM KONTAK
// ============================================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const message = document.getElementById('contactMessage').value.trim();
        
        if (name && email && message) {
            // Simulasi pengiriman pesan
            showNotification('✅ Pesan berhasil dikirim! Terima kasih!', 'success');
            
            // Reset form
            this.reset();
        } else {
            showNotification('⚠️ Mohon isi semua bidang!', 'warning');
        }
    });
}

// ============================================================
// EVENT LISTENERS
// ============================================================

// Tombol Cari
if (searchBtn) {
    searchBtn.addEventListener('click', handleSearch);
}

// Enter pada Input
if (searchInput) {
    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });
}

// Tombol Lokasi Saya
if (locationBtn) {
    locationBtn.addEventListener('click', function() {
        showWeather('jakarta');
        if (searchInput) searchInput.value = 'Jakarta';
        navigateTo('beranda');
        showNotification('📍 Menampilkan lokasi Jakarta', 'info');
    });
}

// ============================================================
// TAMPILKAN DEFAULT
// ============================================================

// Tampilkan halaman beranda dan cuaca Jakarta
navigateTo('beranda');
showWeather('jakarta');

console.log('🚀 WeatherApp siap digunakan!');
console.log('💡 Tips: Coba cari kota seperti "bandung" atau "surabaya"');
