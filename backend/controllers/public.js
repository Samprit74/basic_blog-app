const PostModel = require("../models/blog");

// Get single post with comments populated
const GetSinglePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await PostModel.findById(postId).populate({
      path: "comments",
      populate: {
        path: "userId",
        select: "username profile", // only include username and profile
      },
    });

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    return res.status(200).json({ success: true, post });
  } catch (err) {
    console.error("Error in GetSinglePost:", err);
    return res.status(500).json({ success: false, message: "Internal server error (GetSinglePost)" });
  }
};

module.exports = { GetSinglePost };
