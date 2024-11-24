const {Router} = require('express')
const Post = require('../models/post')
const Comment = require('../models/comments')

const app = Router()


  app.post('/posts', (req, res) => {
    Post.create(req.body)
    res.json({msg: "post created"})
  })

  app.get('/posts',async (req, res) => {
   const data = await Post.find().populate("user")
    res.json(data)
  })

  app.get('/posts/:userId',async (req, res) => {
    const data = await Post.find({user:req.params.userId}).populate("user")
     res.json(data)
   })
 


  app.post('/posts/:postId/comments',async (req, res) => {
   Comment.create({...req.body, post: req.params.postId})
   res.json({msg: "comment posted!"})
   })

  app.get('/posts/:postId/comments',async (req, res) => {
    const data = await Comment.find({post: req.params.postId}).populate('commented_by')
    res.json(data)
   })

   

module.exports = app;

