// ============================================================
// WEATHER.JS - INTEGRASI BMKG API
// ============================================================

const BMKG_API_URL = 'https://api.bmkg.go.id/publik/prakiraan-cuaca';
const weatherCache = new Map();
const CACHE_DURATION = 30 * 60 * 1000; // 30 menit

// ============================================================
// AMBIL DATA BMKG
// ============================================================

async function fetchBMKGWeather(adm4Code) {
    // Cek cache
    if (weatherCache.has(adm4Code)) {
        const cached = weatherCache.get(adm4Code);
        if (Date.now() - cached.timestamp < CACHE_DURATION) {
            console.log('📦 Cache:', adm4Code);
            return cached.data;
        }
    }

    const url = `${BMKG_API_URL}?adm4=${adm4Code}`;
    console.log('🌐 Fetch BMKG:', url);

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    weatherCache.set(adm4Code, { data, timestamp: Date.now() });
    console.log('✅ BMKG OK:', adm4Code);
    return data;
}

// ============================================================
// PARSE DATA BMKG
// ============================================================

function parseBMKGData(bmkgData) {
    if (!bmkgData?.data?.[0]) return null;

    const lokasi = bmkgData.data[0].lokasi;
    const cuaca = bmkgData.data[0].cuaca;
    if (!Array.isArray(cuaca) || cuaca.length === 0) return null;

    const timeSlots = cuaca[0];
    const now = new Date();

    // Cari slot terdekat
    let closest = timeSlots[0];
    let closestDiff = Infinity;
    timeSlots.forEach(slot => {
        const diff = Math.abs(new Date(slot.local_datetime) - now);
        if (diff < closestDiff) {
            closestDiff = diff;
            closest = slot;
        }
    });

    const current = {
        temp: closest.t,
        condition: closest.weather_desc,
        icon: getWeatherIconFromBMKG(closest.weather_desc),
        humidity: closest.hu,
        wind: `${closest.ws} km/j`,
        rainfall: closest.tp ? `${closest.tp} mm` : '0 mm',
        code: closest.weather
    };

    // Group per hari
    const dailyMap = new Map();
    timeSlots.forEach(slot => {
        const dayKey = new Date(slot.local_datetime).toISOString().split('T')[0];
        if (!dailyMap.has(dayKey)) dailyMap.set(dayKey, []);
        dailyMap.get(dayKey).push(slot);
    });

    // Ambil 7 hari
    const forecast = [];
    const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    let count = 0;

    for (const [dateKey, slots] of dailyMap) {
        if (count >= 7) break;

        const temps = slots.map(s => s.t);
        const rains = slots.map(s => parseFloat(s.tp) || 0);
        const noon = slots.find(s => {
            const h = new Date(s.local_datetime).getHours();
            return h >= 12 && h <= 15;
        }) || slots[Math.floor(slots.length / 2)];

        const date = new Date(dateKey);
        forecast.push({
            day: dayNames[date.getDay()],
            icon: getWeatherIconFromBMKG(noon.weather_desc),
            high: Math.max(...temps),
            low: Math.min(...temps),
            rain: `${Math.max(...rains).toFixed(1)} mm`
        });
        count++;
    }

    return { current, forecast, location: lokasi };
}

// ============================================================
// KONVERSI ICON BMKG → FONT AWESOME
// ============================================================

function getWeatherIconFromBMKG(desc) {
    if (!desc) return 'fa-cloud-sun';
    const d = desc.toLowerCase();
    if (d.includes('petir') || d.includes('badai')) return 'fa-bolt';
    if (d.includes('hujan lebat')) return 'fa-cloud-showers-heavy';
    if (d.includes('hujan')) return 'fa-cloud-rain';
    if (d.includes('cerah berawan')) return 'fa-cloud-sun';
    if (d.includes('berawan')) return 'fa-cloud';
    if (d.includes('cerah')) return 'fa-sun';
    if (d.includes('kabut') || d.includes('asap')) return 'fa-smog';
    return 'fa-cloud-sun';
}

window.fetchBMKGWeather = fetchBMKGWeather;
window.parseBMKGData = parseBMKGData;
window.getWeatherIconFromBMKG = getWeatherIconFromBMKG;

console.log('🌤️ Weather module loaded!');
