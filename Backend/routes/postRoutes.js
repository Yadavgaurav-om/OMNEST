// src/routes/postRoutes.js
const express = require('express');
const { createPost, addComment, likeComment, replyToComment } = require('../controllers/postController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
    .post(protect, createPost);

router.route('/comment')
    .post(protect, addComment);

router.route('/comment/like')
    .post(protect, likeComment);

router.route('/comment/reply')
    .post(protect, replyToComment);

module.exports = router;
