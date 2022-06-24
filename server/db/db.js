const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  getRegions,
  getPostsByRegionCode,
  updatePostClicked,
  updateReliabCount,
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
      'reliability',
      'clicked'
    )
    .where({ regionCode })
}

function updatePostClicked(id, bool, db = connection) {
  return db('posts').update({ clicked: bool }).where({ id })
}

function updateReliabCount(id, num, db = connection) {
  return db('posts').update({ reliability: num }).where({ id })
}
