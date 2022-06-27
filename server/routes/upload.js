const express = require('express')

const router = express.Router()

const db = require('../db/db')

//POST /api/v1/upload
router.post('/', (req, res) => {
  const newOne = req.body
  console.log(newOne)
  db.addPost(newOne)
    .then((idArr) => {
      console.log(idArr)
      const newId = idArr[0]
      res.json(newId)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
