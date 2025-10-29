const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { errorHandler } = require('./middlewares/error.middleware');  // 이 줄 수정!

const app = express();

// CORS 설정
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:8080',
  credentials: true
}));

// JSON 파싱
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ 
    message: 'HyunT API Server',
    version: '1.0.0'
  });
});

// API 라우트
app.use('/api', routes);

// 404 에러 처리
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: '요청한 경로를 찾을 수 없습니다.'
  });
});

// 에러 핸들러 (마지막에!)
app.use(errorHandler);  // 이건 그대로

module.exports = app;