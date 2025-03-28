import mysql from 'mysql2';
require('dotenv').config();

const pool = mysql.createPool({
    host: 'mysql-ce25c8b-hft-5b3f.j.aivencloud.com',
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 10690,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;
