const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  getRegions,
  getPostsByRegionCode,
  updatePostClicked,
  updateReliabCount,
  getDistrictsByRegionCode,
  getDistrictInfoByName,
  addPost,
  getPostById,
  deletePostById,
  updatePost,
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

function getPostById(id, db = connection) {
  return db('posts').select().where({ id }).first()
}

function deletePostById(id, db = connection) {
  return db('posts').delete().where({ id })
}

function getDistrictsByRegionCode(regionCode, db = connection) {
  return db('districts').select().where({ regionCode })
}

function getDistrictInfoByName(name, db = connection) {
  return db('districts').select().where({ name }).first()
}

function addPost(newPost, db = connection) {
  const {
    password,
    regionCode,
    districtCode,
    postImages,
    eventName,
    location,
    postedTime,
    description,
  } = newPost
  return db('posts').insert({
    password,
    regionCode,
    districtCode,
    postImages,
    eventName,
    location,
    postedTime,
    description,
    reliability: 0,
    clicked: false,
  })
}

function updatePost({ id, eventName, location, description }, db = connection) {
  return db('posts').update({ eventName, location, description }).where({ id })
}
