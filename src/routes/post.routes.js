const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

// 모든 post 라우트는 로그인 필요
router.use(authenticateToken);  // 여기도 바꿔야 해요!

// GET /api/posts/my - 내가 쓴 글 목록
router.get('/my', postController.getMyPosts);

// GET /api/posts - 전체 글 목록
router.get('/', postController.getAllPosts);

// GET /api/posts/:id - 글 상세 조회
router.get('/:id', postController.getPostById);

// POST /api/posts - 글 작성
router.post('/', postController.createPost);

// PUT /api/posts/:id - 글 수정
router.put('/:id', postController.updatePost);

// DELETE /api/posts/:id - 글 삭제
router.delete('/:id', postController.deletePost);

module.exports = router;