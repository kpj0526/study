// src/services/post.service.js
const postRepository = require('../repositories/post.repository');

// 게시글 목록 조회
const getAllPosts = async (page = 1, limit = 10) => { //페이지를 10개씩 보여주는것.
  const offset = (page - 1) * limit;
  const posts = await postRepository.findAll(limit, offset);
  return posts;
};

// 게시글 상세 조회
const getPostById = async (id) => {
  const post = await postRepository.findById(id);
  if (!post) {
    throw new Error('게시글을 찾을 수 없습니다');
  }

  // 조회수 증가
  await postRepository.incrementViews(id);

  return post;
};

// 게시글 작성
const createPost = async (userId, title, content) => {
  if (!title || !content) {
    throw new Error('제목과 내용은 필수입니다');
  }

  const postId = await postRepository.create(userId, title, content);
  return await postRepository.findById(postId);
};

// 게시글 수정
const updatePost = async (postId, userId, title, content) => {
  const post = await postRepository.findById(postId);
  if (!post) {
    throw new Error('게시글을 찾을 수 없습니다');
  }

  // 작성자 확인
  if (post.user_id !== userId) {
    throw new Error('수정 권한이 없습니다');
  }

  await postRepository.update(postId, title, content);
  return await postRepository.findById(postId);
};

// 게시글 삭제
const deletePost = async (postId, userId) => {
  const post = await postRepository.findById(postId);
  if (!post) {
    throw new Error('게시글을 찾을 수 없습니다');
  }

  // 작성자 확인
  if (post.user_id !== userId) {
    throw new Error('삭제 권한이 없습니다');
  }

  await postRepository.deleteById(postId);
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};