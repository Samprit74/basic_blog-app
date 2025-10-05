const PostModel = require('../models/blog');
const fs = require('fs');
const path = require('path');

// Create a new post (Admin only)
const CreatePost = async (req, res) => {
  try {
    const { title, desc } = req.body;
    if (!title) return res.status(400).json({ success: false, message: "Title is required" });

    const imagePath = req.file ? req.file.filename : null;

    const newPost = new PostModel({
      title,
      desc,
      image: imagePath
    });

    await newPost.save();

    return res.status(200).json({ success: true, message: "Post created successfully", post: newPost });
  } catch (err) {
    console.error('Error in CreatePost:', err);
    return res.status(500).json({ success: false, message: "Internal server error (CreatePost)" });
  }
};

// Delete a post (Admin only)
const DeletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findById(postId);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    if (post.image) {
      const imagePath = path.join(__dirname, '..', 'public', 'images', post.image);
      try {
        await fs.promises.unlink(imagePath);
      } catch (err) {
        console.warn("Failed to delete image:", err.message);
      }
    }

    await PostModel.findByIdAndDelete(postId);

    return res.status(200).json({ success: true, message: "Post deleted successfully" });
  } catch (err) {
    console.error('Error in DeletePost:', err);
    return res.status(500).json({ success: false, message: "Internal server error (DeletePost)" });
  }
};

// Get all posts
const GetAllPost = async (req, res) => {
  try {
    const posts = await PostModel.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, posts });
  } catch (err) {
    console.error('Error in GetAllPost:', err);
    return res.status(500).json({ success: false, message: "Internal server error (GetAllPost)" });
  }
};

// Update a post (Admin only)
const UpdatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, desc } = req.body;

    const post = await PostModel.findById(postId);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    if (title) post.title = title;
    if (desc) post.desc = desc;

    if (req.file) {
      // Delete old image
      if (post.image) {
        const oldImage = path.join(__dirname, '..', 'public', 'images', post.image);
        try {
          await fs.promises.unlink(oldImage);
        } catch (err) {
          console.warn("Failed to delete old image:", err.message);
        }
      }
      post.image = req.file.filename;
    }

    const updatedPost = await post.save();
    return res.status(200).json({ success: true, message: "Post updated successfully", post: updatedPost });
  } catch (err) {
    console.error('Error in UpdatePost:', err);
    return res.status(500).json({ success: false, message: "Internal server error (UpdatePost)" });
  }
};

module.exports = { CreatePost, DeletePost, GetAllPost, UpdatePost };
