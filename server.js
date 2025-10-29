require('dotenv').config();
const app = require('./src/app');
const { testConnection } = require('./database/connection');

const PORT = process.env.PORT || 3000;

// 서버 시작 함수
const startServer = async () => {
  try {
    // 1. 데이터베이스 연결 테스트
    console.log('📊 데이터베이스 연결 중...');
    await testConnection();
    console.log('✅ 데이터베이스 연결 성공!');
    
    // 2. 서버 시작
    app.listen(PORT, () => {
      console.log('🚀 서버 실행 중!');
      console.log(`📍 서버 주소: http://localhost:${PORT}`);
      console.log(`📍 API 주소: http://localhost:${PORT}/api`);
      console.log(`🌍 환경: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('❌ 서버 시작 실패:', error);
    process.exit(1);
  }
};

// 서버 시작
startServer();

// 프로세스 종료 처리
process.on('SIGINT', () => {
  console.log('\n👋 서버 종료 중...');
  process.exit(0);
});

process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  process.exit(1);
});