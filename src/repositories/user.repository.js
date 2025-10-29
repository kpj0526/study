// src/repositories/user.repository.js
const { pool } = require('../config/database.config'); //모듈 가꼬오기

// 사용자명으로 사용자 찾기
const findByUsername = async (username) => { 
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE username = ?', //로그인 시 사용자 이름 찾고
    [username]
  );
  return rows[0];
};

// ID로 사용자 찾기
const findById = async (id) => { //로그인 후 사용자의 정보를 조회한다.
  const [rows] = await pool.query(
    'SELECT id, username, created_at FROM users WHERE id = ?',
    [id]
  );
  return rows[0];
};

// 새 사용자 생성
const create = async (username, hashedPassword) => {
  const [result] = await pool.query(
    'INSERT INTO users (username, password) VALUES (?, ?)', //사용자 추가.
    [username, hashedPassword]
  );
  return result.insertId;
};

module.exports = {
  findByUsername,
  findById,
  create
};