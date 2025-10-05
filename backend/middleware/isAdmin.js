const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware to check if user is logged in
const isLogin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "User not logged in" });
    }

    const decoded = jwt.verify(token, process.env.jwt_secret);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(403).json({ success: false, message: "User not found" });
    }

    req.user = user; // attach user to request
    next();

  } catch (err) {
    console.error('Error in isLogin middleware:', err);
    return res.status(500).json({ success: false, message: "Internal server error (isLogin)" });
  }
};

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.jwt_secret);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(403).json({ success: false, message: "Unauthorized: User not found" });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ success: false, message: "Unauthorized: Admin access only" });
    }

    req.user = user; // attach user to request
    next();

  } catch (err) {
    console.error('Error in isAdmin middleware:', err);
    return res.status(500).json({ success: false, message: "Internal server error (isAdmin)" });
  }
};

module.exports = { isAdmin, isLogin };
