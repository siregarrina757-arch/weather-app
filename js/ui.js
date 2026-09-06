// ============================================================
// UI.JS - FUNGSI TAMBAHAN UNTUK UI
// ============================================================

// ============================================================
// FUNGSI TOGGLE TEMA (LIGHT/DARK MODE)
// ============================================================

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    
    // Simpan preferensi ke localStorage
    const isLightMode = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    
    // Update icon jika ada
    const themeIcon = document.querySelector('.theme-toggle i');
    if (themeIcon) {
        if (isLightMode) {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
    }
}

// ============================================================
// FUNGSI LOAD THEME DARI LOCALSTORAGE
// ============================================================

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        const themeIcon = document.querySelector('.theme-toggle i');
        if (themeIcon) {
            themeIcon.className = 'fas fa-moon';
        }
    }
}

// ============================================================
// FUNGSI LOADING
// ============================================================

function showLoading() {
    const weatherCard = document.querySelector('.weather-card');
    if (weatherCard) {
        weatherCard.classList.add('loading');
    }
}

function hideLoading() {
    const weatherCard = document.querySelector('.weather-card');
    if (weatherCard) {
        weatherCard.classList.remove('loading');
    }
}

// ============================================================
// FUNGSI NOTIFIKASI
// ============================================================

function showNotification(message, type = 'info') {
    // Cek apakah sudah ada notifikasi
    let notification = document.querySelector('.notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
    }
    
    // Set style berdasarkan type
    const colors = {
        success: '#4ade80',
        error: '#f87171',
        info: '#60a5fa',
        warning: '#fbbf24'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: #fff;
        padding: 12px 24px;
        border-radius: 12px;
        font-weight: 500;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 9999;
        transform: translateX(120%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    notification.textContent = message;
    
    // Tampilkan notifikasi
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Sembunyikan setelah 3 detik
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
    }, 3000);
}

// ============================================================
// FUNGSI SCROLL TO TOP
// ============================================================

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
// EKSPOR KE GLOBAL
// ============================================================

window.toggleTheme = toggleTheme;
window.loadTheme = loadTheme;
window.showLoading = showLoading;
window.hideLoading = hideLoading;
window.showNotification = showNotification;
window.scrollToTop = scrollToTop;

// Load tema saat halaman dimuat
document.addEventListener('DOMContentLoaded', loadTheme);

console.log('✅ UI.js loaded');
