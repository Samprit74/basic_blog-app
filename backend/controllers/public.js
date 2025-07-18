const PostModel = require("../models/blog");
const CommentModel = require("../models/comments");

const GetSinglePost = async (req, res) => {
    try {
        const postId = req.params.id
        const FindPost = await PostModel.findById(postId)
            .populate({
                path: 'comments',
                populate: {
                    path: 'userId'
                }
            });
        if (!FindPost) {
            const PostModel = require("../models/blog");
            require('../models/comments');

            const GetSinglePost = async (req, res) => {
                try {
                    const postId = req.params.id;
                    const FindPost = await PostModel.findById(postId)
                        .populate({
                            path: 'comments', // <-- Correct field name
                            populate: {
                                path: 'userId'
                            }
                        });
                    if (!FindPost) {
                        return res.status(404).json({ success: false, message: "Blog not found(from getsingle post)" });
                    }
                    return res.status(200).json({ success: true, post: FindPost });
                }
                catch (err) {
                    console.log('error in GetSinglePost:', err);
                    return res.status(500).json({ success: false, message: "Internal server error (GetSinglePost)" });
                }
            };

            module.exports = { GetSinglePost };
            return res.status(404).json({ success: false, message: "Blog not found(from getsingle post)" })
        }
        return res.status(200).json({ success: true, message: "cpost is avalable in db", post: FindPost });
    }
    catch (err) {
        console.log('error  in api(Create)', err)
        return res.status(500).json({ success: false, message: "internal SERVER error(dashboard all user)" })
    }
}



module.exports = { GetSinglePost }