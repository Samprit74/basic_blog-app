const express = require('express');
const {AddComment} = require('../controllers/comment');
const { isLogin } = require('../middleware/isAdmin');
const commentRoute = express.Router();


commentRoute.post('/addcomment',isLogin,AddComment )



module.exports = commentRoute;