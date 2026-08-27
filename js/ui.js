// ============================================================
//  DOM ELEMENTS
// ============================================================

const cityName = document.getElementById('cityName');
const currentDate = document.getElementById('currentDate');
const weatherIconBig = document.getElementById('weatherIconBig');
const weatherCondition = document.getElementById('weatherCondition');
const weatherTemp = document.getElementById('weatherTemp');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const rainfall = document.getElementById('rainfall');
const weatherCode = document.getElementById('weatherCode');
const forecastList = document.getElementById('forecastList');
const historyList = document.getElementById('historyList');

// ============================================================
//  HELPER FUNCTIONS
// ============================================================

// Mendapatkan nama hari dalam bahasa Indonesia
function getDayName(date) {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    return days[date.getDay()];
}

// Format tanggal ke bahasa Indonesia
function formatDate(date) {
    const d = new Date(date);
    const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                   'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return `${getDayName(d)}, ${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
}

// Mendapatkan ikon cuaca berdasarkan kondisi
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
//  RENDER FUNCTIONS
// ============================================================

// Render cuaca utama
function renderWeather(cityKey) {
    const data = getWeatherData(cityKey);
    if (!data) {
        console.error(`Data untuk ${cityKey} tidak ditemukan`);
        renderWeather('jakarta');
        return;
    }

    // Update kota & tanggal
    cityName.textContent = data.name;
    currentDate.textContent = formatDate(new Date());

    // Update ikon & kondisi
    const iconClass = getWeatherIcon(data.condition);
    weatherIconBig.innerHTML = `<i class="fas ${iconClass}"></i>`;
    weatherCondition.textContent = data.condition;

    // Update suhu
    weatherTemp.innerHTML = `${data.temp}<sup>°C</sup>`;

    // Update detail cuaca
    humidity.textContent = data.humidity;
    windSpeed.textContent = data.wind;
    rainfall.textContent = data.rainfall;
    weatherCode.textContent = data.code;

    // Render forecast
    renderForecast(data.forecast);
}

// Render forecast 7 hari
function renderForecast(forecastData) {
    if (!forecastData || !Array.isArray(forecastData)) {
        forecastList.innerHTML = '<p class="text-muted">Data forecast tidak tersedia</p>';
        return;
    }

    forecastList.innerHTML = '';
    forecastData.forEach((f) => {
        const item = document.createElement('div');
        item.className = 'forecast-item';
        
        // Dapatkan ikon untuk forecast
        const iconMap = {
            'fa-sun': 'fa-sun',
            'fa-cloud-sun': 'fa-cloud-sun',
            'fa-cloud-rain': 'fa-cloud-rain',
            'fa-cloud-showers-heavy': 'fa-cloud-showers-heavy',
            'fa-bolt': 'fa-bolt',
            'fa-smog': 'fa-smog'
        };
        const icon = iconMap[f.icon] || 'fa-cloud-sun';
        
        item.innerHTML = `
            <span class="forecast-day">${f.day}</span>
            <span class="forecast-icon"><i class="fas ${icon}"></i></span>
            <div class="forecast-temps">
                <span class="forecast-temp-high">${f.high}°</span>
                <span class="forecast-temp-low">${f.low}°</span>
            </div>
            <span class="forecast-rain"><i class="fas fa-droplet"></i> ${f.rain}</span>
        `;
        forecastList.appendChild(item);
    });
}

// Render riwayat pencarian
function renderHistory(history) {
    if (!historyList) return;
    
    historyList.innerHTML = '';
    if (!history || history.length === 0) {
        historyList.innerHTML = '<span class="text-muted">Belum ada riwayat pencarian</span>';
        return;
    }

    history.forEach((key) => {
        const btn = document.createElement('button');
        btn.className = 'history-item';
        const data = getWeatherData(key);
        btn.textContent = data ? data.name : key;
        btn.title = `Klik untuk melihat cuaca ${data ? data.name : key}`;
        btn.addEventListener('click', () => {
            // Panggil fungsi dari app.js via window
            if (typeof window.handleHistoryClick === 'function') {
                window.handleHistoryClick(key);
            }
        });
        historyList.appendChild(btn);
    });
}

// Tampilkan pesan error
function showError(message) {
    // Bisa ditambahkan toast/alert
    alert(message);
}

// ============================================================
//  EKSPOR UNTUK DIGUNAKAN DI FILE LAIN
// ============================================================
// export { 
//     renderWeather, 
//     renderForecast, 
//     renderHistory, 
//     formatDate, 
//     getDayName,
//     showError 
// };