// ============================================================
//  STATE APLIKASI
// ============================================================

let currentCity = 'jakarta';
let history = ['jakarta', 'bandung', 'surabaya'];
let isLightMode = false;

// ============================================================
//  DOM ELEMENTS
// ============================================================

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const appContainer = document.getElementById('app');

// ============================================================
//  FUNGSI UTAMA
// ============================================================

// Update riwayat pencarian
function updateHistory(cityKey) {
    // Hapus duplikat
    history = history.filter((h) => h !== cityKey);
    // Tambahkan di awal
    history.unshift(cityKey);
    // Batasi maksimal 5
    if (history.length > 5) history.pop();
    
    // Render ulang riwayat
    renderHistory(history);
}

// Handler untuk klik riwayat (dipanggil dari ui.js)
window.handleHistoryClick = function(cityKey) {
    currentCity = cityKey;
    renderWeather(currentCity);
    const data = getWeatherData(cityKey);
    if (data) searchInput.value = data.name;
    updateHistory(cityKey);
};

// Handler pencarian
function handleSearch() {
    const query = searchInput.value.trim();
    if (!query) {
        showError('Silakan masukkan nama kota');
        return;
    }

    const found = searchCity(query);
    if (found) {
        currentCity = found;
        renderWeather(currentCity);
        const data = getWeatherData(found);
        searchInput.value = data.name;
        updateHistory(found);
    } else {
        showError(`Kota "${query}" tidak ditemukan.\nCoba: Jakarta, Bandung, Surabaya, Medan, Yogyakarta`);
        searchInput.focus();
        searchInput.select();
    }
}

// Handler lokasi saya (simulasi)
function handleLocation() {
    // Simulasi: gunakan Jakarta sebagai lokasi default
    // Di produksi bisa pakai Geolocation API
    currentCity = 'jakarta';
    renderWeather(currentCity);
    searchInput.value = 'Jakarta';
    updateHistory('jakarta');
    
    // Feedback
    console.log('📍 Lokasi: Jakarta (simulasi)');
}

// Toggle light/dark mode
function toggleTheme() {
    isLightMode = !isLightMode;
    document.body.classList.toggle('light-mode', isLightMode);
    
    // Simpan preferensi ke localStorage
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
}

// Load tema dari localStorage
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        isLightMode = true;
        document.body.classList.add('light-mode');
    } else {
        isLightMode = false;
        document.body.classList.remove('light-mode');
    }
}

// ============================================================
//  NAVIGATION (UI Only)
// ============================================================

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navMap = {
        'nav-beranda': '🏠 Beranda',
        'nav-tentang': 'ℹ️ Tentang',
        'nav-kontak': '📧 Kontak'
    };

    navLinks.forEach((link) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Remove active dari semua
            navLinks.forEach((l) => l.classList.remove('active'));
            // Add active ke yang diklik
            this.classList.add('active');
            
            // Tampilkan pesan (UI Only)
            const id = this.id;
            const message = navMap[id] || 'Halaman';
            console.log(`📄 Navigasi: ${message}`);
            
            // Bisa ditambahkan alert untuk demo
            // alert(`Anda berada di halaman: ${message}`);
        });
    });
}

// ============================================================
//  INISIALISASI
// ============================================================

function initApp() {
    console.log('🌤️ WeatherApp - Memulai aplikasi...');
    