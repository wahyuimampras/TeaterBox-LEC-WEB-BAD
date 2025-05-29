const { createPool } = require('mysql2/promise');
const { Pool: PgPool } = require('pg');

let pool;

// Jika di-deploy ke Vercel, Vercel akan set NODE_ENV ke 'production'
// dan kita akan menggunakan Vercel Postgres.
if (process.env.NODE_ENV === 'production') {
    pool = new PgPool({
        connectionString: process.env.POSTGRES_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
} else {
    // Jika lokal, kita gunakan koneksi ke MySQL XAMPP dari file .env
    pool = createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
}

module.exports = pool;