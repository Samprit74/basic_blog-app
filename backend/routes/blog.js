const express = require('express');
const { isAdmin } = require('../middleware/isAdmin');
const { CreatePost, DeletePost, GetAllPost, UpdatePost } = require('../controllers/blog');
const { upload } = require('../middleware/multer');

const blogRoute = express.Router();

// Create post (admin only)
blogRoute.post('/create', isAdmin, upload.single('image'), CreatePost);

// Delete post (admin only)
blogRoute.post('/delete/:id', isAdmin, DeletePost);

// Get all posts (public)
blogRoute.get('/getall', GetAllPost);

// Update post (admin only)
blogRoute.patch('/update/:id', isAdmin, upload.single('image'), UpdatePost);

module.exports = blogRoute;
