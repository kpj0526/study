  // src/config/database.config.js
  const mysql = require('mysql2/promise'); //모듈 불러오기
  require('dotenv').config();

  // 데이터베이스 연결 풀 생성
  const pool = mysql.createPool({ //DB를 요청이 들어올때마다 새 연결을 만들면 성능이 떨어지기 때문에 사용한다.
    host: process.env.DB_HOST,    //요청이 들어온다면 미리 연결해둔 db를 사용후 반납하는 형식.
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  // 연결 테스트
  const testConnection = async () => {
    try {
      const connection = await pool.getConnection(); //db 연결을 가져오는것 (pool)
      console.log('✅ DB 연결 성공!');
      connection.release(); //db 빌려온걸 반납.
      return true;
    } catch (error) {
      console.error('❌ DB 연결 실패:', error.message);
      return false;
    }
  };

  module.exports = { pool, testConnection };