const PostModel = require('../models/blog');
const User = require('../models/user');
const CommentModel = require('../models/comments');
const fs = require('fs');
const path = require('path');

// Get all dashboard data (users, posts, comments count)
const GetAllData = async (req, res) => {
  try {
    const users = await User.find();
    const posts = await PostModel.find();
    const comments = await CommentModel.find();

    return res.status(200).json({
      success: true,
      users,
      posts,
      comments,
      user_no: users.length,
      post_no: posts.length,
      comment_no: comments.length
    });
  } catch (err) {
    console.error('Error in GetAllData:', err);
    return res.status(500).json({ success: false, message: "Internal server error (dashboard)" });
  }
};

// Get all users
const GetAllUser = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ success: true, users, user_no: users.length });
  } catch (err) {
    console.error('Error in GetAllUser:', err);
    return res.status(500).json({ success: false, message: "Internal server error (users)" });
  }
};

// Delete a user
const UserDelete = async (req, res) => {
  try {
    const userId = req.params.id;
    const existUser = await User.findById(userId);

    if (!existUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (existUser.role === 'admin') {
      return res.status(403).json({ success: false, message: "Cannot delete an admin" });
    }

    // Delete profile image if exists
    if (existUser.profile && existUser.profile !== 'default/demo.png') {
      const imagePath = path.join(__dirname, '..', 'public', 'images', existUser.profile);
      try {
        await fs.promises.unlink(imagePath);
      } catch (err) {
        console.warn("Failed to delete profile image:", err.message);
      }
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    return res.status(200).json({ success: true, message: "User deleted successfully", user: deletedUser });
  } catch (err) {
    console.error('Error in UserDelete:', err);
    return res.status(500).json({ success: false, message: "Internal server error (UserDelete)" });
  }
};

module.exports = { GetAllData, GetAllUser, UserDelete };

