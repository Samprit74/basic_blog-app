const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
    },
    image: {
        type: String,
       
    },
    comments: [ 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments', //  Must match exactly
    }
]
  
}, { timestamps: true });

const PostModel = mongoose.model('Post', blogSchema);

module.exports = PostModel;