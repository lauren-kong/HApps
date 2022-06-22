const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  getRegions,
}

function getRegions(db = connection) {
  return db('regions').select()
}
