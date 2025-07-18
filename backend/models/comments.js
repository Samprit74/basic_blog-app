const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    comment: {
        type: String,
        required: true,
    }

}, { timestamps: true });

const CommentModel = mongoose.model('Comments', CommentSchema);

module.exports = CommentModel;