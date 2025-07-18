const express = require('express');
const { Register, Login,Logout } = require('../controllers/auth');
const { upload } = require('../middleware/multer');

const authRoute = express.Router();

authRoute.post('/register',upload.single('profile') ,Register);

authRoute.post('/login', Login);

authRoute.post('/logout', Logout);

module.exports = authRoute;