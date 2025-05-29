require('dotenv').config();
const express = require('express');
const path = require('path');

// 1. Mengaktifkan kembali pemanggilan file handler
const registerHandler = require('./api/register.js');
const loginHandler = require('./api/login.js');
const userHandler = require('./api/user.js');

const app = express();
const port = process.env.PORT || 3000;

// Middleware untuk membaca JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Mengaktifkan kembali RUTE API
// Server sekarang akan mengenali alamat /api/register dan /api/login
app.use('/api/register', registerHandler);
app.use('/api/login', loginHandler);
app.use('/api/user', userHandler);

// Middleware untuk menyajikan file statis (CSS, JS Client-side, Gambar)
app.use(express.static(path.join(__dirname, 'public')));

// Fallback Route: Untuk semua request GET yang bukan file atau API,
// kirimkan halaman utama. Ini penting untuk Single Page Application.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(port, () => {
    console.log(`🚀 Server berjalan mulus di http://localhost:${port}`);
});