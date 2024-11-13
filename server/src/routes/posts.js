const {Router} = require('express')
const Post = require('../models/post')
const app = Router()


  app.post('/posts', (req, res) => {
    Post.create(req.body)
    res.json({msg: "post created"})
  })

  app.get('/posts',async (req, res) => {
   const data = await Post.find()
    res.json(data)
  })

module.exports = app;