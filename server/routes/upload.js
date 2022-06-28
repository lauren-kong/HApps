const express = require('express')

const router = express.Router()

const db = require('../db/db')

//POST /api/v1/upload
router.post('/', (req, res) => {
  const newOne = req.body
  db.addPost(newOne)
    .then((idArr) => {
      const newId = idArr[0]
      res.json(newId)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

router.get('/post/delete/:id', (req, res) => {
  const postId = req.params.id
  db.deletePostById(postId)
    .then((response) => {
      res.json(response)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

router.patch('/post/update/:id', (req, res) => {
  const postId = req.params.id
  const updated = req.body
  db.updatePost(updated)
    .then((response) => {
      res.json(response)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
