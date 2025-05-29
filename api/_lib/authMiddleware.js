// File: api/_lib/authMiddleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'kunci-rahasia-super-aman-milik-anda'; // Pastikan ini sama persis dengan yang di login.js

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

    if (token == null) {
        return res.status(401).json({ status: 'error', message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ status: 'error', message: 'Token is not valid' });
        }
        
        // Simpan informasi user dari token ke object request
        // agar bisa digunakan oleh endpoint selanjutnya.
        req.user = user;
        next(); // Lanjutkan ke fungsi endpoint utama
    });
};

module.exports = authMiddleware;