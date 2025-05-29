const pool = require('./_lib/database');
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, email, password } = req.body;
    const isProduction = process.env.NODE_ENV === 'production';

    const sqlCheck = isProduction ? 'SELECT * FROM users WHERE email = $1' : 'SELECT * FROM users WHERE email = ?';
    const sqlInsert = isProduction ? 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)' : 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    
    try {
        // --- PERBAIKAN LOGIKA DIMULAI DI SINI ---
        const result = await pool.query(sqlCheck, [email]);
        const existingUsers = isProduction ? result.rows : result[0];
        // --- AKHIR PERBAIKAN ---

        if (existingUsers && existingUsers.length > 0) {
            return res.status(400).json({ status: "error", message: "Email has been registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await pool.query(sqlInsert, [name, email, hashedPassword]);
        
        res.status(201).json({ status: "success", message: "Your registration is succes" });

    } catch (error) {
        console.error("REGISTRATION ERROR:", error); // Log error yang lebih jelas
        res.status(500).json({ status: "error", message: "Your registration is fail" });
    }
};