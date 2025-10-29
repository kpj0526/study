const postService = require('../services/post.service');
const { success } = require('../utils/response.util');

// 내가 쓴 글 목록 조회
exports.getMyPosts = async (req, res, next) => {
  try {
    const userId = req.user.id; // auth.middleware에서 설정
    const { page = 1, limit = 10 } = req.query;
    
    const result = await postService.getMyPosts(
      userId, 
      parseInt(page), 
      parseInt(limit)
    );
    
    return success(res, result, '내 게시글 목록 조회 성공');
  } catch (err) {
    next(err);
  }
};

// 전체 글 목록 조회
exports.getAllPosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const result = await postService.getAllPosts(
      parseInt(page), 
      parseInt(limit)
    );
    
    return success(res, result, '전체 게시글 목록 조회 성공');
  } catch (err) {
    next(err);
  }
};

// 글 상세 조회
exports.getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const post = await postService.getPostById(id);
    
    return success(res, { post }, '게시글 조회 성공');
  } catch (err) {
    next(err);
  }
};

// 글 작성
exports.createPost = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { title, content } = req.body;
    
    const post = await postService.createPost(userId, title, content);
    
    return success(res, { post }, '게시글 작성 성공', 201);
  } catch (err) {
    next(err);
  }
};

// 글 수정
exports.updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, content } = req.body;
    
    const post = await postService.updatePost(id, userId, title, content);
    
    return success(res, { post }, '게시글 수정 성공');
  } catch (err) {
    next(err);
  }
};

// 글 삭제
exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    await postService.deletePost(id, userId);
    
    return success(res, null, '게시글 삭제 성공');
  } catch (err) {
    next(err);
  }
};