const environment = process.env.NODE_ENV || 'development'

console.log(environment)
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  getRegions,
  getPostsByRegionCode,
}

function getRegions(db = connection) {
  return db('regions').select()
}

function getPostsByRegionCode(regionCode, db = connection) {
  return db('posts')
    .join('regions', 'regions.code', 'posts.regionCode')
    .select(
      'posts.id as postId',
      'code as regionCode',
      'ns',
      'name as regionName',
      'image',
      'password',
      'districtCode',
      'postImages',
      'eventName',
      'location',
      'postedTime',
      'description',
      'reliability'
    )
    .where({ regionCode })
}
