const express = require('express')
const router = express.Router()

const db = require('../db/db')

// GET /v1/locations
router.get('/', (req, res) => {
  db.getRegions()
    .then((regions) => {
      res.json(regions)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
