const express = require('express')
const router = express.Router()

const { getPostsByRegionCode, getRegions } = require('../db/db')

// GET /v1/locations/:regionCode
router.get('/:regionCode', (req, res) => {
  console.log(res.params)
  const regioncode = req.params.regionCode
  getPostsByRegionCode(regioncode)
    .then((posts) => {
      res.json(posts)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

// GET /v1/locations
router.get('/', (req, res) => {
  getRegions()
    .then((regions) => {
      res.json(regions)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
