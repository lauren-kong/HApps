const express = require('express')

const router = express.Router()

const db = require('../db/db')

router.get('/posts/:postId', (req, res) => {
  const id = req.params.postId
  console.log('I am here')
  db.getPostById(id)
    .then((response) => {
      res.send(response)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

// GET /v1/locations/district/:districtsName
router.get('/district/:districtName', (req, res) => {
  const nameOfDist = req.params.districtName
  db.getDistrictInfoByName(nameOfDist)
    .then((response) => {
      res.json(response)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

// PATCH /v1/locations/clicked/:postId/:reliabNum
router.patch('/clicked/:postId/reliab/:reliabNum', (req, res) => {
  const id = req.params.postId
  const num = req.params.reliabNum
  db.updateReliabCount(id, num)
    .then((response) => {
      res.json(response)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

// PATCH /v1/locations/clicked/:postId/:isClicked
router.patch('/clicked/:postId/:isClicked', (req, res) => {
  const id = req.params.postId
  const bool = req.params.isClicked
  db.updatePostClicked(id, bool)
    .then((response) => {
      res.json(response)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

// GET /v1/locations/:regionCode/districts
router.get('/:regionCode/districts', (req, res) => {
  const regioncode = req.params.regionCode
  db.getDistrictsByRegionCode(regioncode)
    .then((districts) => {
      res.json(districts)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

// GET /v1/locations/:regionCode
router.get('/:regionCode', (req, res) => {
  const regioncode = req.params.regionCode
  db.getPostsByRegionCode(regioncode)
    .then((posts) => {
      res.json(posts)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

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
