const express = require('express');
const { Register, Login, Logout } = require('../controllers/auth');
const { upload } = require('../middleware/multer');

const authRoute = express.Router();

// Register user with optional profile image
authRoute.post('/register', upload.single('profile'), Register);

// Login user
authRoute.post('/login', Login);

// Logout user
authRoute.post('/logout', Logout);

module.exports = authRoute;
