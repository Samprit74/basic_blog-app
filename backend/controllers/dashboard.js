const PostModel = require('../models/blog');
const User = require('../models/user');
const CommentModel = require('../models/comments');
const fs = require('fs');
const path = require('path');


const GetAllData = async (req, res) => {
    try {
        const users = await User.find();
        const posts = await PostModel.find();
        const comments = await CommentModel.find();
        if (!users && !posts) {
            return res.status(404).json({ success: false, message: " no data found" });
        }
        res.status(200).json({ success: true, users, posts, comments, user_no: users.length, post_no: posts.length, comment_no: comments.length })
        console.log('Number of users:', users.length);
        console.log('Number of posts:', posts.length);
        console.log('Number of comments:', comments.length);
    } catch (err) {
        console.log('error  in api(Create)', err)
        return res.status(500).json({ success: false, message: "internal SERVER error(dashboard all data)" })
    }
}

const GetAllUser = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(404).json({ success: false, message: " no user  found" });
        }
        res.status(200).json({ success: true, users, user_no: users.length })

    } catch (err) {
        console.log('error  in api(Create)', err)
        return res.status(500).json({ success: false, message: "internal SERVER error(dashboard all user)" })
    }
}
const UserDelete = async (req, res) => {
    try {
        const userid = req.params.id;
        const existUser = await User.findById(userid);

        if (!existUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (existUser.role === 'admin') {
            return res.status(403).json({ success: false, message: "Not authorized to remove an admin" });
        }

        if (existUser.profile) {
            try {
                const imagePath = path.join(__dirname, '..', 'public', 'images', existUser.profile);
                await fs.promises.unlink(imagePath);
                console.log("Image deleted successfully (dashboard)");
            } catch (error) {
                console.log("Failed to delete image (dashboard):", error.message);
            }
        }

        const deleteUser = await User.findOneAndDelete({ _id: userid });
        res.status(200).json({ success: true, message: "User deleted successfully (dashboard)", user: deleteUser });

    } catch (err) {
        console.log('Error in UserDelete API:', err);
        return res.status(500).json({ success: false, message: "Internal server error (dashboard all user)" });
    }
};

module.exports = { GetAllData, GetAllUser, UserDelete };