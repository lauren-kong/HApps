const express = require('express')

const router = express.Router()

const {
  getPostsByRegionCode,
  getRegions,
  updatePostClicked,
  updateReliabCount,
} = require('../db/db')

// GET /v1/locations/clicked/:postId/:reliabNum
router.patch('/clicked/:postId/reliab/:reliabNum', (req, res) => {
  const id = req.params.postId
  const num = req.params.reliabNum
  updateReliabCount(id, num).then((response) => {
    res.json(response)
  })
})

// GET /v1/locations/clicked/:postId/:isClicked
router.patch('/clicked/:postId/:isClicked', (req, res) => {
  const id = req.params.postId
  const bool = req.params.isClicked
  updatePostClicked(id, bool).then((response) => {
    res.json(response)
  })
})

// GET /v1/locations/:regionCode
router.get('/:regionCode', (req, res) => {
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
