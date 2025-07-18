const express = require('express');
const {isAdmin} = require('../middleware/isAdmin');
const {CreatePost,DeletePost,GetAllPost,UpdatePost} = require('../controllers/blog');
const {upload} = require('../middleware/multer');

const blogRoute = express.Router();

blogRoute.post('/create',isAdmin,upload.single('image'),CreatePost);

blogRoute.post('/delete/:id',isAdmin,DeletePost);
blogRoute.get('/getall',GetAllPost);
blogRoute.patch('/update/:id',isAdmin,upload.single('image'),UpdatePost)

module.exports = blogRoute;

