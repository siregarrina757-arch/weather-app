// ============================================================
// DATA CUACA LENGKAP & LOGIKA (WEATHER.JS)
// ============================================================

const weatherData = {
    'jakarta': {
        name: 'Jakarta',
        temp: 28,
        condition: 'Berawan',
        icon: 'fa-cloud-sun',
        humidity: '78%',
        wind: '12 km/j',
        rainfall: '0.5 mm',
        code: '801',
        forecast: [
            { day: 'Jum', icon: 'fa-cloud-sun', high: 29, low: 24, rain: '0.2 mm' },
            { day: 'Sab', icon: 'fa-cloud-rain', high: 27, low: 23, rain: '2.1 mm' },
            { day: 'Min', icon: 'fa-cloud-sun', high: 28, low: 24, rain: '0.0 mm' },
            { day: 'Sen', icon: 'fa-sun', high: 31, low: 25, rain: '0.0 mm' },
            { day: 'Sel', icon: 'fa-cloud-sun', high: 30, low: 25, rain: '0.1 mm' },
            { day: 'Rab', icon: 'fa-cloud-rain', high: 26, low: 22, rain: '3.5 mm' },
            { day: 'Kam', icon: 'fa-cloud-sun', high: 28, low: 23, rain: '0.8 mm' }
        ]
    },
    'bandung': {
        name: 'Bandung',
        temp: 22,
        condition: 'Cerah Berawan',
        icon: 'fa-cloud-sun',
        humidity: '72%',
        wind: '8 km/j',
        rainfall: '0.0 mm',
        code: '802',
        forecast: [
            { day: 'Jum', icon: 'fa-sun', high: 24, low: 18, rain: '0.0 mm' },
            { day: 'Sab', icon: 'fa-cloud-sun', high: 23, low: 17, rain: '0.0 mm' },
            { day: 'Min', icon: 'fa-cloud-rain', high: 21, low: 17, rain: '1.2 mm' },
            { day: 'Sen', icon: 'fa-cloud-sun', high: 23, low: 18, rain: '0.1 mm' },
            { day: 'Sel', icon: 'fa-sun', high: 25, low: 19, rain: '0.0 mm' },
            { day: 'Rab', icon: 'fa-cloud-sun', high: 24, low: 18, rain: '0.0 mm' },
            { day: 'Kam', icon: 'fa-cloud-rain', high: 22, low: 17, rain: '0.9 mm' }
        ]
    },
    'surabaya': {
        name: 'Surabaya',
        temp: 32,
        condition: 'Cerah',
        icon: 'fa-sun',
        humidity: '65%',
        wind: '15 km/j',
        rainfall: '0.0 mm',
        code: '800',
        forecast: [
            { day: 'Jum', icon: 'fa-sun', high: 33, low: 27, rain: '0.0 mm' },
            { day: 'Sab', icon: 'fa-sun', high: 34, low: 28, rain: '0.0 mm' },
            { day: 'Min', icon: 'fa-cloud-sun', high: 32, low: 27, rain: '0.0 mm' },
            { day: 'Sen', icon: 'fa-cloud-sun', high: 31, low: 26, rain: '0.1 mm' },
            { day: 'Sel', icon: 'fa-sun', high: 33, low: 27, rain: '0.0 mm' },
            { day: 'Rab', icon: 'fa-cloud-rain', high: 30, low: 26, rain: '2.3 mm' },
            { day: 'Kam', icon: 'fa-cloud-sun', high: 31, low: 26, rain: '0.0 mm' }
        ]
    },
    'medan': {
        name: 'Medan',
        temp: 27,
        condition: 'Hujan Ringan',
        icon: 'fa-cloud-rain',
        humidity: '84%',
        wind: '6 km/j',
        rainfall: '4.2 mm',
        code: '500',
        forecast: [
            { day: 'Jum', icon: 'fa-cloud-rain', high: 28, low: 23, rain: '3.1 mm' },
            { day: 'Sab', icon: 'fa-cloud-rain', high: 27, low: 23, rain: '5.0 mm' },
            { day: 'Min', icon: 'fa-cloud-sun', high: 29, low: 24, rain: '0.2 mm' },
            { day: 'Sen', icon: 'fa-cloud-sun', high: 30, low: 24, rain: '0.0 mm' },
            { day: 'Sel', icon: 'fa-cloud-rain', high: 28, low: 23, rain: '1.8 mm' },
            { day: 'Rab', icon: 'fa-cloud-rain', high: 26, low: 22, rain: '6.2 mm' },
            { day: 'Kam', icon: 'fa-cloud-sun', high: 29, low: 24, rain: '0.1 mm' }
        ]
    },
    'yogyakarta': {
        name: 'Yogyakarta',
        temp: 26,
        condition: 'Cerah',
        icon: 'fa-sun',
        humidity: '70%',
        wind: '10 km/j',
        rainfall: '0.0 mm',
        code: '800',
        forecast: [
            { day: 'Jum', icon: 'fa-sun', high: 27, low: 22, rain: '0.0 mm' },
            { day: 'Sab', icon: 'fa-cloud-sun', high: 26, low: 21, rain: '0.0 mm' },
            { day: 'Min', icon: 'fa-cloud-rain', high: 25, low: 21, rain: '1.5 mm' },
            { day: 'Sen', icon: 'fa-cloud-sun', high: 27, low: 22, rain: '0.1 mm' },
            { day: 'Sel', icon: 'fa-sun', high: 28, low: 23, rain: '0.0 mm' },
            { day: 'Rab', icon: 'fa-cloud-sun', high: 27, low: 22, rain: '0.0 mm' },
            { day: 'Kam', icon: 'fa-cloud-rain', high: 26, low: 21, rain: '0.7 mm' }
        ]
    },
    'semarang': {
        name: 'Semarang',
        temp: 30,
        condition: 'Cerah Berawan',
        icon: 'fa-cloud-sun',
        humidity: '75%',
        wind: '11 km/j',
        rainfall: '0.0 mm',
        code: '802',
        forecast: [
            { day: 'Jum', icon: 'fa-cloud-sun', high: 31, low: 26, rain: '0.0 mm' },
            { day: 'Sab', icon: 'fa-sun', high: 32, low: 27, rain: '0.0 mm' },
            { day: 'Min', icon: 'fa-sun', high: 33, low: 27, rain: '0.0 mm' },
            { day: 'Sen', icon: 'fa-cloud-sun', high: 31, low: 26, rain: '0.0 mm' },
            { day: 'Sel', icon: 'fa-cloud-rain', high: 29, low: 25, rain: '1.5 mm' },
            { day: 'Rab', icon: 'fa-cloud-sun', high: 30, low: 26, rain: '0.1 mm' },
            { day: 'Kam', icon: 'fa-sun', high: 32, low: 27, rain: '0.0 mm' }
        ]
    },
    'makassar': {
        name: 'Makassar',
        temp: 31,
        condition: 'Cerah',
        icon: 'fa-sun',
        humidity: '68%',
        wind: '14 km/j',
        rainfall: '0.0 mm',
        code: '800',
        forecast: [
            { day: 'Jum', icon: 'fa-sun', high: 32, low: 26, rain: '0.0 mm' },
            { day: 'Sab', icon: 'fa-sun', high: 33, low: 27, rain: '0.0 mm' },
            { day: 'Min', icon: 'fa-cloud-sun', high: 31, low: 26, rain: '0.0 mm' },
            { day: 'Sen', icon: 'fa-cloud-rain', high: 30, low: 25, rain: '1.2 mm' },
            { day: 'Sel', icon: 'fa-cloud-sun', high: 31, low: 26, rain: '0.0 mm' },
            { day: 'Rab', icon: 'fa-sun', high: 32, low: 27, rain: '0.0 mm' },
            { day: 'Kam', icon: 'fa-cloud-sun', high: 31, low: 26, rain: '0.0 mm' }
        ]
    },
    'denpasar': {
        name: 'Denpasar',
        temp: 29,
        condition: 'Cerah',
        icon: 'fa-sun',
        humidity: '72%',
        wind: '9 km/j',
        rainfall: '0.0 mm',
        code: '800',
        forecast: [
            { day: 'Jum', icon: 'fa-sun', high: 30, low: 25, rain: '0.0 mm' },
            { day: 'Sab', icon: 'fa-sun', high: 31, low: 26, rain: '0.0 mm' },
            { day: 'Min', icon: 'fa-cloud-sun', high: 29, low: 24, rain: '0.0 mm' },
            { day: 'Sen', icon: 'fa-cloud-sun', high: 30, low: 25, rain: '0.1 mm' },
            { day: 'Sel', icon: 'fa-sun', high: 31, low: 26, rain: '0.0 mm' },
            { day: 'Rab', icon: 'fa-cloud-rain', high: 28, low: 24, rain: '1.8 mm' },
            { day: 'Kam', icon: 'fa-cloud-sun', high: 29, low: 25, rain: '0.0 mm' }
        ]
    }
};

// ============================================================
// FUNGSI AMBIL DATA
// ============================================================

function getWeatherData(cityKey) {
    return weatherData[cityKey] || null;
}

// ============================================================
// FUNGSI CARI KOTA (FLEKSIBEL)
// ============================================================

function searchCity(query) {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    
    const keys = Object.keys(weatherData);
    
    // Cari kecocokan langsung ATAU sebagian dari nama kota
    let exactMatch = null;
    let partialMatch = null;
    
    for (const key of keys) {
        const cityName = weatherData[key].name.toLowerCase();
        
        // Exact match (case insensitive)
        if (key === q || cityName === q) {
            exactMatch = key;
            break;
        }
        
        // Partial match (kota mengandung query)
        if (cityName.includes(q)) {
            if (!partialMatch) {
                partialMatch = key;
            }
        }
    }
    
    return exactMatch || partialMatch || null;
}

// ============================================================
// FUNGSI GET ALL CITY NAMES
// ============================================================

function getAllCityNames() {
    return Object.keys(weatherData).map(key => weatherData[key].name);
}

// ============================================================
// FUNGSI GET TOTAL CITIES
// ============================================================

function getTotalCities() {
    return Object.keys(weatherData).length;
}

// ============================================================
// EKSPOR KE GLOBAL
// ============================================================

window.weatherData = weatherData;
window.getWeatherData = getWeatherData;
window.searchCity = searchCity;
window.getAllCityNames = getAllCityNames;
window.getTotalCities = getTotalCities;

console.log('🌤️ Weather Data Loaded!');
console.log(`📍 Total kota: ${getTotalCities()} kota`);
console.log('📋 Daftar kota:', getAllCityNames().join(', '));
