const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const DEFAULT_PROFILE = 'default/demo.png'; // Use public/images/default/demo.png

// Register a new user
const Register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(409).json({ success: false, message: "USER ALREADY EXISTS. Please login." });
    }

    const imagePath = req.file ? req.file.filename : DEFAULT_PROFILE;

    const hashedPassword = bcryptjs.hashSync(password, 11);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profile: imagePath,
      role: role || 'user'
    });

    await newUser.save();

    return res.status(200).json({ success: true, message: "USER registered successfully", user: newUser });

  } catch (err) {
    console.error('Error in Register API:', err);
    return res.status(500).json({ success: false, message: "Internal SERVER error" });
  }
};

// Login
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: "User not found" });

    const match = bcryptjs.compareSync(password, user.password);
    if (!match) return res.status(401).json({ success: false, message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.jwt_secret, { expiresIn: '1d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json({ success: true, message: "Login successful", user, token });

  } catch (err) {
    console.error('Error in Login API:', err);
    return res.status(500).json({ success: false, message: "Internal SERVER error" });
  }
};

// Logout
const Logout = async (req, res) => {
  try {
    res.clearCookie('token');
    return res.status(200).json({ success: true, message: "Logout successful" });
  } catch (err) {
    console.error('Error in Logout API:', err);
    return res.status(500).json({ success: false, message: "Internal SERVER error" });
  }
};

module.exports = { Register, Login, Logout };
