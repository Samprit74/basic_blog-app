const express = require('express');
const { GetSinglePost } = require('../controllers/public');

const publicRoute = express.Router();

// Get a single post with comments
publicRoute.get('/singlepost/:id', GetSinglePost);

module.exports = publicRoute;
