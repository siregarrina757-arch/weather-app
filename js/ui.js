// ============================================================
// UI.JS
// ============================================================

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

function loadTheme() {
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
    }
}

function showLoading() {
    document.querySelector('.weather-card')?.classList.add('loading');
}

function hideLoading() {
    document.querySelector('.weather-card')?.classList.remove('loading');
}

function showNotification(message, type = 'info') {
    let notif = document.querySelector('.notification');
    if (!notif) {
        notif = document.createElement('div');
        notif.className = 'notification';
        document.body.appendChild(notif);
    }

    const colors = {
        success: '#4ade80',
        error: '#f87171',
        info: '#60a5fa',
        warning: '#fbbf24'
    };

    notif.style.cssText = `
        position: fixed; top: 20px; right: 20px;
        background: ${colors[type] || colors.info};
        color: #fff; padding: 12px 24px;
        border-radius: 12px; font-weight: 500;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 9999; max-width: 400px;
        transform: translateX(120%);
        transition: transform 0.3s ease;
    `;
    notif.textContent = message;

    setTimeout(() => notif.style.transform = 'translateX(0)', 100);
    setTimeout(() => notif.style.transform = 'translateX(120%)', 3000);
}

window.toggleTheme = toggleTheme;
window.showLoading = showLoading;
window.hideLoading = hideLoading;
window.showNotification = showNotification;

document.addEventListener('DOMContentLoaded', loadTheme);

console.log('✅ UI.js loaded');
