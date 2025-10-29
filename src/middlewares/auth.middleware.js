// src/middlewares/auth.middleware.js
const { verifyToken } = require('../utils/jwt.util');
const { error } = require('../utils/response.util');

// 로그인 확인 미들웨어
const authenticateToken = (req, res, next) => {
  try {
    // Authorization 헤더에서 토큰 가져오기
    const authHeader = req.headers['authorization']; //토큰을 가져와서
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

    if (!token) {
      return error(res, '토큰이 없습니다', 401);
    }

    // 토큰 검증
    const decoded = verifyToken(token); //토큰을 검증
    req.user = decoded; // 유효하면 req.user에 저장
    next(); // 다음 미들웨어/컨트롤러로 발송
  } catch (err) {
    return error(res, '유효하지 않은 토큰', 403); //유효하지 않으면 에러발생.
  }
};

module.exports = {
  authenticateToken
};