// src/services/auth.service.js
const bcrypt = require('bcrypt');
const userRepository = require('../repositories/user.repository');
const { generateToken } = require('../utils/jwt.util');

// 회원가입
const register = async (username, password) => {
  // 중복 체크
  const existingUser = await userRepository.findByUsername(username);
  if (existingUser) {
    throw new Error('이미 존재하는 사용자명입니다');
  }

  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(password, 10);

  // 사용자 생성
  const userId = await userRepository.create(username, hashedPassword);

  return { id: userId, username };
};

// 로그인
const login = async (username, password) => {
  // 사용자 찾기
  const user = await userRepository.findByUsername(username);
  if (!user) {
    throw new Error('사용자명 또는 비밀번호가 틀렸습니다');
  }

  // 비밀번호 확인
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('사용자명 또는 비밀번호가 틀렸습니다');
  }

  // JWT 토큰 생성
  const token = generateToken({ id: user.id, username: user.username });

  return {
    token,
    user: {
      id: user.id,
      username: user.username
    }
  };
};

module.exports = {
  register,
  login
};