// File: public/js/auth.js
(() => {
    const token = localStorage.getItem('authToken');
    // Jika tidak ada token, dan kita tidak sedang di halaman login/register (index.html)
    if (!token && !window.location.pathname.endsWith('index.html')) {
        // Tendang user ke halaman login
        window.location.href = 'index.html';
    }
})();