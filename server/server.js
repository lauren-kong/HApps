const path = require('path')
const express = require('express')

const locations = require('./routes/locations')
const cors = require('cors')
const { resolve } = require('path')

const server = express()
server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))
server.use(cors('*'))
server.use(express.urlencoded({ extended: true }))

server.use('/v1/locations', locations)

server.get('*', (req, res) => {
  res.sendFile(path.resolve('server/public/index.html'))
})

module.exports = server
