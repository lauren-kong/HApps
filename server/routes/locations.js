const express = require('express')

const router = express.Router()

const db = require('../db/db')

router.get('/posts/:postId', (req, res) => {
  const id = req.params.postId
  db.getPostById(id)
    .then((response) => {
      res.send(response)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

router.get('/posts/district/:districtCode', (req, res) => {
  const code = req.params.districtCode
  db.getPostsByDistrictCode(code)
    .then((response) => {
      console.log(response)
      res.json(response)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

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

router.get('/districts/all', (req, res) => {
  db.getDistricts()
    .then((response) => {
      res.json(response)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

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

router.get('/posts/region/:regionCode', (req, res) => {
  const regioncode = req.params.regionCode
  db.getPostsByRegionCode(regioncode)
    .then((posts) => {
      res.json(posts)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

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
