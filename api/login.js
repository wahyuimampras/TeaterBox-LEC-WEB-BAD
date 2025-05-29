// File: api/login.js

const pool = require('./_lib/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Pastikan jwt di-import

// Kunci rahasia ini HARUS SAMA dengan yang akan kita gunakan di middleware
const JWT_SECRET = 'kunci-rahasia-super-aman-milik-anda'; 

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { email, password } = req.body;
    const isProduction = process.env.NODE_ENV === 'production';
    const sqlSelect = isProduction ? 'SELECT * FROM users WHERE email = $1' : 'SELECT * FROM users WHERE email = ?';

    try {
        const result = await pool.query(sqlSelect, [email]);
        const user = isProduction ? result.rows[0] : result[0][0];

        if (!user) {
            return res.status(401).json({ status: "error", message: "Email or Password is wrong" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // ======================================================
            // INI BAGIAN PENTING YANG MUNGKIN BELUM TERSIMPAN
            // 1. Buat Token
            const token = jwt.sign(
                { id: user.id, email: user.email },
                JWT_SECRET,
                { expiresIn: '1h' }
            );
            
            // 2. Kirim respon yang LENGKAP dengan status, pesan, DAN TOKEN
            res.status(200).json({ 
                status: "success", 
                message: "Login success! You will be directed...",
                token: token 
            });
            // ======================================================
        } else {
            res.status(401).json({ status: "error", message: "Email or Password is wrong" });
        }
    } catch (error) {
        console.error("LOGIN ERROR:", error);
        res.status(500).json({ status: "error", message: "An internal server error occurred" });
    }
};