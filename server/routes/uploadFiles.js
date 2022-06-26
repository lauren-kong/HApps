const express = require('express')

const router = express.Router()
const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
})

const db = require('../db/db')

//'/api/v1/files',
router.post('/', (req, res) => {
  const newOne = req.body.newPost
  db.addPost(newOne)
    .then((res) => {
      res.json(res)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
module.exports = cloudinary
