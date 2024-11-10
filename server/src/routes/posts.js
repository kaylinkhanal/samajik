const {Router} = require('express')
const Post = require('../models/post')
const app = Router()


  app.post('/posts', (req, res) => {
    Post.create(req.body)
    res.json({msg: "post created"})
  })

module.exports = app;