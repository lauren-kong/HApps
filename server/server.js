const path = require('path')
const express = require('express')

const widgets = require('./routes/widgets')

const server = express()
server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use(cors('*'))

server.get('*', (req, res) => {
  res.sendFile(path.resolve('server/public/index.html'))
})


server.use('/api/v1/widgets', widgets)

module.exports = server
