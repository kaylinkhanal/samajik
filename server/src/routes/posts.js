const {Router} = require('express')
const Post = require('../models/post')
const User = require('../models/user')

const Comment = require('../models/comments')





const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: 'kyalin.khanal@gmail.com', // Replace with your Gmail address
    pass: 'nrbs askb sioh twox' // Your app password
  }
});

async function sendEmail(emailHtml, emailText, sendToEmail) {
  const info = await transporter.sendMail({
    from: '"kaylin" <kaylin.khanal@gmail.com>', 
    to: sendToEmail,
    subject: "Some one commented on your post", 
    text: emailText, 
    html: emailHtml, 
  });

}










const app = Router()


  app.post('/posts', (req, res) => {
    Post.create(req.body)
    res.json({msg: "post created"})
  })

  app.get('/posts',async (req, res) => {
    const totalCount = await Post.countDocuments()
   const posts = await Post.find().populate("user").limit(5).skip(req.query.page*5-5)
    res.json({posts, totalCount})
  })

  app.get('/posts/:userId',async (req, res) => {
    const data = await Post.find({user:req.params.userId}).populate("user")
     res.json(data)
   })
 


  app.post('/posts/:postId/comments',async (req, res) => {
    const post = await Post.findById(req.params.postId).populate('user')
    console.log(post.user.email)
    const user = await User.findById(req.body.commented_by)
   Comment.create({...req.body, post: req.params.postId})
   const emailBody =  `
   <div>
   ${post.content}:
    ${req.body.content}
   </div>
   `
   sendEmail(emailBody,emailBody ,post.user.email )
   res.json({msg: "comment posted!"})
   })

  app.get('/posts/:postId/comments',async (req, res) => {
    const data = await Comment.find({post: req.params.postId}).populate('commented_by')
    res.json(data)
   })

   

module.exports = app;




