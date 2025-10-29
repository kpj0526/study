// src/repositories/post.repository.js
const { pool } = require('../config/database.config');

// 모든 게시글 조회 (페이징)
const findAll = async (limit = 10, offset = 0) => { 
  const [rows] = await pool.query( //별칭 사용
    //유저 테이블에 조인하여 연결, desc를 이용하여 최근 게시글 먼저 정렬.
    `SELECT p.*, u.username  
     FROM posts p 
     JOIN users u ON p.user_id = u.id 
     ORDER BY p.created_at DESC 
     LIMIT ? OFFSET ?`,
    [limit, offset]
  );
  return rows;
};

// ID로 게시글 조회
const findById = async (id) => {
  const [rows] = await pool.query( //게시글 id로 그 id의 게시물 가져오기. 
    //join 이용해서 사용자 이름까지 조회 가능.
    `SELECT p.*, u.username  
     FROM posts p 
     JOIN users u ON p.user_id = u.id 
     WHERE p.id = ?`,
    [id]
  );
  return rows[0];
};

// 게시글 생성
const create = async (userId, title, content) => {
  const [result] = await pool.query( 
    'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)',
    [userId, title, content]
  );
  return result.insertId;
};

// 게시글 수정
const update = async (id, title, content) => {
  const [result] = await pool.query(
    'UPDATE posts SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [title, content, id]
  );
  return result.affectedRows;
};

// 게시글 삭제
const deleteById = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM posts WHERE id = ?',
    [id]
  );
  return result.affectedRows;
};

// 조회수 증가
const incrementViews = async (id) => {
  await pool.query( //게시글 조회 할때마다 db에서 조회수를 자동으로 +1
    'UPDATE posts SET views = views + 1 WHERE id = ?',
    [id]
  );
};

module.exports = { //사용하기 쉽게 모듈 내보내기.
  findAll,
  findById,
  create,
  update,
  deleteById,
  incrementViews
};