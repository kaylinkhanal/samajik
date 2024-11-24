const mongoose  = require("mongoose");

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    content: String,
    commented_by : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    
  },{
    timestamps: true
  });

  
  
  const Comment = mongoose.model('Comment', commentSchema);
  
 module.exports = Comment





