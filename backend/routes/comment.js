const express = require('express');
const { AddComment, GetCommentsByPost } = require('../controllers/comment');
const { isLogin } = require('../middleware/isAdmin');

const commentRoute = express.Router();

// Add comment (logged-in users)
commentRoute.post('/addcomment', isLogin, AddComment);

// Get all comments of a post (public)
commentRoute.get('/post/:postId', GetCommentsByPost);

module.exports = commentRoute;
