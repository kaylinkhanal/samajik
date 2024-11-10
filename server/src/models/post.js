const mongoose  = require("mongoose");

const postSchema = new mongoose.Schema({
    user_id: { type: String},       // Unique identifier for the user posting
    content: { type: String, required: true },       // The main content of the post (text, link, etc.)
    image_url: { type: String },                     // URL of the image/video (optional)
    media_type: { type: String, enum: ['image', 'video', 'audio', 'text'] },  // Type of media
    tags: [{ type: String }],                        // List of hashtags or tags associated with the post
    mentions: [{ type: String }],                    // List of user handles or mentions in the post
    location: {
      latitude: { type: Number },                    // Correct type for latitude
      longitude: { type: Number },                   // Correct type for longitude
      place_name: { type: String }                   // Optional, name of the place
    },
    privacy: { type: String, enum: ['public', 'private', 'friends'] },  // Privacy level
    post_type: { type: String, enum: ['text', 'image', 'video', 'link'] }, // Type of post
    likes_count: { type: Number, default: 0 },       // Number of likes
    comments_count: { type: Number, default: 0 },    // Number of comments
    shares_count: { type: Number, default: 0 },      // Number of shares
    is_active: { type: Boolean, default: true },     // Whether the post is active or deleted
  },{
    timestamps: true
  });
  
  const Post = mongoose.model('Post', postSchema);
  
 module.exports = Post



 //comment
 