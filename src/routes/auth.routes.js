const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

// POST /api/auth/signup - 회원가입
router.post('/signup', authController.signup);

// POST /api/auth/login - 로그인
router.post('/login', authController.login);

// GET /api/auth/me - 내 정보 조회 (로그인 필요)
router.get('/me', authenticateToken, authController.getMe);

module.exports = router;