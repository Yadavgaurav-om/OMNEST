// src/models/postModel.js
const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
    content: { type: String, required: true },
    media: [{ type: String }],  // Array to store URLs of images/videos
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        content: { type: String, required: true },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        replies: [{
            user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
            content: { type: String, required: true },
        }],
    }],
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;