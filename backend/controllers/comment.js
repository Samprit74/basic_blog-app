const mongoose = require("mongoose");
const PostModel = require("../models/blog");
const CommentModel = require('../models/comments');
const User = require('../models/user'); // renamed correctly

const AddComment = async (req, res) => {
    try {
        const { postId, userId, comment } = req.body;

        // Step 1: Check all fields are present
        if (!postId || !userId || !comment) {
            return res.status(400).json({ success: false, message: "All fields (postId, userId, comment) are required" });
        }

        // Step 2: Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ success: false, message: "Invalid post ID format" });
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID format" });
        }

        // Step 3: Check if post and user exist
        const [existPost, existUser] = await Promise.all([
            PostModel.findById(postId),
            User.findById(userId)
        ]);

        if (!existPost) {
            return res.status(404).json({ success: false, message: "Blog post not found" });
        }

        if (!existUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Step 4: Save new comment
        const newComment = new CommentModel({ postId, userId, comment });
        await newComment.save();

        // Step 5: Update post with comment reference
        existPost.comments.push(newComment._id);
        await existPost.save();

        // (Optional) Step 6: If your User model tracks comments:
        // existUser.comments.push(newComment._id);
        // await existUser.save();

        return res.status(201).json({
            success: true,
            message: "Comment added successfully",
            comment: newComment
        });

    } catch (err) {
        console.error("Error in AddComment:", err);
        return res.status(500).json({ success: false, message: "Internal server error (addComment)" });
    }
};

module.exports = { AddComment };
