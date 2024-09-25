const {Router} = require('express')
const app = Router()
app.get('/posts', (req, res) => {
    res.send(['ram', 'shyam', 'gita'])
  })

  app.post('/posts', (req, res) => {
    res.send(['ram', 'shyam', 'gita'])
  })


  app.put('/posts', (req, res) => {
    res.send(['ram', 'shyam', 'gita'])
  })


  app.delete('/posts', (req, res) => {
    res.send(['ram', 'shyam', 'gita'])
  })
module.exports = app;