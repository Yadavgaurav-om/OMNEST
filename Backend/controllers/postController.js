// src/controllers/postController.js
const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');

// Create a new post with media
exports.createPost = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    const files = req.files || [];

    const mediaUrls = files.map(file => file.path);

    const post = await Post.create({
        user: req.user._id,
        title,
        content,
        media: mediaUrls,
    });

    res.status(201).json(post);
});

// Add a comment to a post
exports.addComment = asyncHandler(async (req, res) => {
    const { postId, content } = req.body;
    const post = await Post.findById(postId);

    if (post) {
        post.comments.push({
            user: req.user._id,
            content,
        });

        const updatedPost = await post.save();
        res.json(updatedPost);
    } else {
        res.status(404);
        throw new Error('Post not found');
    }
});

// Like a comment
exports.likeComment = asyncHandler(async (req, res) => {
    const { postId, commentId } = req.body;
    const post = await Post.findById(postId);

    if (post) {
        const comment = post.comments.id(commentId);
        if (comment) {
            const isLiked = comment.likes.includes(req.user._id);
            if (isLiked) {
                comment.likes.pull(req.user._id);
            } else {
                comment.likes.push(req.user._id);
            }

            await post.save();
            res.json(post);
        } else {
            res.status(404);
            throw new Error('Comment not found');
        }
    } else {
        res.status(404);
        throw new Error('Post not found');
    }
});

// Reply to a comment
exports.replyToComment = asyncHandler(async (req, res) => {
    const { postId, commentId, content } = req.body;
    const post = await Post.findById(postId);

    if (post) {
        const comment = post.comments.id(commentId);
        if (comment) {
            comment.replies.push({
                user: req.user._id,
                content,
            });

            const updatedPost = await post.save();
            res.json(updatedPost);
        } else {
            res.status(404);
            throw new Error('Comment not found');
        }
    } else {
        res.status(404);
        throw new Error('Post not found');
    }
});
