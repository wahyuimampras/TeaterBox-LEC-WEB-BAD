// File: api/user.js
const pool = require('./_lib/database');
const authMiddleware = require('./_lib/authMiddleware');

const express = require('express');
const router = express.Router();

// Rute GET untuk mendapatkan data user yang sedang login
// Rute ini diproteksi oleh authMiddleware
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Ambil user id dari token yang sudah diverifikasi middleware
        const isProduction = process.env.NODE_ENV === 'production';
        const sqlSelect = isProduction ? 'SELECT id, name, email, dob, phone_number, gender, address FROM users WHERE id = $1' : 'SELECT id, name, email, dob, phone_number, gender, address FROM users WHERE id = ?';
        
        const result = await pool.query(sqlSelect, [userId]);
        const userData = isProduction ? result.rows[0] : result[0][0];

        if (!userData) return res.status(404).json({ status: 'error', message: 'User not found' });
        
        res.status(200).json({ status: 'success', user: userData });

    } catch (error) {
        console.error("GET USER PROFILE ERROR:", error);
        res.status(500).json({ status: "error", message: "Failed to fetch user profile" });
    }
});

// Rute PUT untuk mengupdate data user yang sedang login
// Rute ini juga diproteksi
router.put('/me', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, dob, phone_number, gender, address } = req.body;

        const isProduction = process.env.NODE_ENV === 'production';
        const sqlUpdate = isProduction ? 
            'UPDATE users SET name = $1, dob = $2, phone_number = $3, gender = $4, address = $5 WHERE id = $6' :
            'UPDATE users SET name = ?, dob = ?, phone_number = ?, gender = ?, address = ? WHERE id = ?';
            
        await pool.query(sqlUpdate, [name, dob, phone_number, gender, address, userId]);
        
        res.status(200).json({ status: 'success', message: 'Profile updated successfully' });

    } catch (error) {
        console.error("UPDATE USER PROFILE ERROR:", error);
        res.status(500).json({ status: "error", message: "Failed to update profile" });
    }
});

module.exports = router;