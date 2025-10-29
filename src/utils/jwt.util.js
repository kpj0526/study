// src/utils/jwt.util.js
const jwt = require('jsonwebtoken');
const config = require('../config/app.config');

// JWT 토큰 생성
const generateToken = (payload) => { 
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  });
};

// JWT 토큰 검증
const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch (error) {
    throw new Error('유효하지 않은 토큰');
  }
};

module.exports = {
  generateToken,
  verifyToken
};