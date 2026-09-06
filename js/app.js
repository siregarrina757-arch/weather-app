// ============================================================
// WEATHER APP - APP.JS
// ============================================================

// ELEMEN DOM
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
const forecastContainer = document.getElementById('forecastContainer'); // Container untuk 7 hari


// ============================================================
// FUNGSI TAMPILKAN PRAKIRAAN 7 HARI
// ============================================================

function renderForecast(forecastData) {
    if (!forecastContainer) return;

    forecastContainer.innerHTML = ''; // Bersihkan kontainer lama

    forecastData.forEach(item => {
        const itemHTML = `
            <div class="forecast-item">
                <span class="day">${item.day}</span>
                <i class="fas ${item.icon}"></i>
                <span class="temp">${item.high}° / ${item.low}°</span>
                <span class="rain">${item.rain}</span>
            </div>
        `;
        forecastContainer.insertAdjacentHTML('beforeend', itemHTML);
    });
}


// ============================================================
// FUNGSI TAMPILKAN CUACA UTAMA
// ============================================================

function showWeather(cityKey) {
    const data = getWeatherData(cityKey);

    if (!data) {
        alert('Kota tidak ditemukan!');
        return;
    }

    // Update Cuaca Utama (Kiri)
    if (cityName) cityName.textContent = data.name;
    if (weatherTemp) weatherTemp.innerHTML = `${data.temp}<sup>°C</sup>`;
    if (weatherCondition) weatherCondition.textContent = data.condition;
    if (humidity) humidity.textContent = data.humidity;
    if (windSpeed) windSpeed.textContent = data.wind;
    if (rainfall) rainfall.textContent = data.rainfall;
    if (weatherCode) weatherCode.textContent = data.code;
    
    if (weatherIconBig) {
        weatherIconBig.innerHTML = `<i class="fas ${data.icon}"></i>`;
    }

    // Update Prakiraan 7 Hari (Kanan)
    if (data.forecast) {
        renderForecast(data.forecast);
    }

    console.log('✅ Cuaca ditampilkan:', data.name);
}


// ============================================================
// LOGIKA PENCARIAN
// ============================================================

function handleSearch() {
    const query = searchInput.value.trim();

    if (!query) {
        alert('Masukkan nama kota!');
        return;
    }

    const cityKey = searchCity(query);

    if (cityKey) {
        const data = getWeatherData(cityKey);
        showWeather(cityKey);
        searchInput.value = data.name; // Samakan teks input dengan nama resmi
    } else {
        alert(
            'Kota tidak ditemukan!\n\n' +
            'Coba cari:\n' +
            '• Jakarta\n' +
            '• Bandung\n' +
            '• Surabaya\n' +
            '• Medan\n' +
            '• Yogyakarta'
        );
    }
}


// ============================================================
// EVENT LISTENERS
// ============================================================

// Click Tombol Cari
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
    });
}


// ============================================================
// TAMPILKAN DEFAULT
// ============================================================

showWeather('jakarta');
console.log('🚀 WeatherApp siap digunakan!');
