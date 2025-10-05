const mongoose = require('mongoose');
const PostModel = require('../models/blog');
const User = require('../models/user');
const CommentModel = require('../models/comments');

// Add a comment to a post
const AddComment = async (req, res) => {
  try {
    const { postId, userId, comment } = req.body;

    if (!postId || !userId || !comment) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid postId or userId" });
    }

    const [existPost, existUser] = await Promise.all([
      PostModel.findById(postId),
      User.findById(userId)
    ]);

    if (!existPost) return res.status(404).json({ success: false, message: "Post not found" });
    if (!existUser) return res.status(404).json({ success: false, message: "User not found" });

    const newComment = new CommentModel({ postId, userId, comment });
    await newComment.save();

    // Add comment reference to post
    existPost.comments.push(newComment._id);
    await existPost.save();

    // Populate user info in comment
    const populatedComment = await CommentModel.findById(newComment._id)
      .populate('userId', 'username profile');

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: populatedComment
    });

  } catch (err) {
    console.error('Error in AddComment:', err);
    return res.status(500).json({ success: false, message: "Internal server error (AddComment)" });
  }
};

// Get all comments of a post
const GetCommentsByPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ success: false, message: "Invalid postId" });
    }

    const comments = await CommentModel.find({ postId })
      .populate('userId', 'username profile')
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, comments });
  } catch (err) {
    console.error('Error in GetCommentsByPost:', err);
    return res.status(500).json({ success: false, message: "Internal server error (GetCommentsByPost)" });
  }
};

module.exports = { AddComment, GetCommentsByPost };
