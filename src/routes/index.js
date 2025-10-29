const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const postRoutes = require('./post.routes');

// /api/auth 경로
router.use('/auth', authRoutes);

// /api/posts 경로
router.use('/posts', postRoutes);

module.exports = router;
