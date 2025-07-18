const PostModel = require("../models/blog");
const fs = require('fs');
const path = require('path');




const CreatePost = async (req, res) => {
    try {
        const { title, desc } = req.body;
        const imagePath = req.file.filename;
        const CreateBlog = new PostModel({
            title,
            desc,
            image: imagePath
        })
        await CreateBlog.save();
        res.status(200).json({ success: true, message: "Post created Successfully", post: CreateBlog });
    } catch (err) {
        console.log('error  in api(Create)', err)
        return res.status(500).json({ success: false, message: "internal SERVER error(Create)" })
    }
}

const DeletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const findPost = await PostModel.findById(postId);

        if (!findPost) {
            return res.status(404).json({ success: false, message: "Post not found(Delete)" });
        }

        // Delete the image if it exists
        if (findPost.image) {
            const imagePath = path.resolve('public', 'images', findPost.image);
            try {
                await fs.promises.unlink(imagePath);
                console.log("Image deleted successfully");
            } catch (error) {
                console.log("Image deletion failed (probably already deleted):", error.message);
            }
        }

        const deletepost = await PostModel.findByIdAndDelete(postId);

        return res.status(200).json({ success: true, message: "Post deleted successfully", post: deletepost });

    } catch (err) {
        console.log('Error in DeletePost:', err);
        return res.status(500).json({ success: false, message: "Internal server error (delete)" });
    }
};


const GetAllPost = async (req, res) => {
    try {
        const posts = await PostModel.find();
        if (!posts || posts.length === 0) {
            return res.status(404).json({ success: true, message: "No posts found" });
        }
        return res.status(200).json({ success: true, posts });
    }
    catch (err) {
        console.log('error  in api(get all post)', err)
        return res.status(500).json({ success: false, message: "internal SERVER error(get all post)" })
    }
}



const UpdatePost = async (req, res) => {
    try {
        const { title, desc } = req.body;
        const postId = req.params.id;

        const findPost = await PostModel.findById(postId);
        if (!findPost) {
            return res.status(404).json({ success: false, message: "No post found" });
        }

        // Update fields if provided
        if (title) findPost.title = title;
        if (desc) findPost.desc = desc;

        // If new image is uploaded
        if (req.file) {
            const imagePath = req.file.filename;

            // Delete old image if it exists
            if (findPost.image) {
                const oldImagePath = path.resolve('public', 'images', findPost.image);
                try {
                    await fs.promises.unlink(oldImagePath);
                    console.log("Old image deleted:", findPost.image);
                } catch (err) {
                    console.warn("Failed to delete old image (might not exist):", err.message);
                }
            }

            // Update new image
            findPost.image = imagePath;
        }

        const updatedPost = await findPost.save();

        return res.status(200).json({ success: true, post: updatedPost });

    } catch (err) {
        console.error("Error in api(update post):", err);
        return res.status(500).json({ success: false, message: "Internal server error (update post)" });
    }
};


module.exports = { CreatePost, DeletePost, GetAllPost, UpdatePost };