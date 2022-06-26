const express = require('express')

const router = express.Router()

const db = require('../db/db')
const fileUpload = require('express-fileupload')

//'/api/v1/fileUpload',
router.post('/', (req, res) => {
  console.log(res.files)
})

module.exports = router
