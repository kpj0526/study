const mysql = require('mysql2/promise');

let pool = null;

const createPool = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
  return pool;
};



const getConnection = async () => {
  const pool = createPool();
  return await pool.getConnection();
};

const query = async (sql, params) => {
  const pool = createPool();
  return await pool.query(sql, params);
};

const testConnection = async () => {
  try {
    const pool = createPool();
    const connection = await pool.getConnection();
    console.log('✅ MySQL 연결 성공!');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ MySQL 연결 실패:', error.message);
    throw error;
  }
};

module.exports = {
  createPool,
  getConnection,
  query,
  testConnection
};