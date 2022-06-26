// eslint-disable-next-line no-unused-vars
import request from 'superagent'
// eslint-disable-next-line no-unused-vars
const url = '/api/v1/locations'
const filesURL = '/api/v1/files'

export function getRegions() {
  return request
    .get(url)
    .then((res) => {
      const result = res.body
      return result
    })
    .catch((err) => {
      console.error(err)
    })
}

export function getPostsByRegionCode(code) {
  return request
    .get(`${url}/${code}`)
    .then((res) => {
      const posts = res.body
      const parsedPosts = posts.map((post) => {
        const parsedPost = {
          ...post,
          postImages: JSON.parse(post.postImages),
        }
        return parsedPost
      })
      return parsedPosts
    })
    .catch((err) => {
      console.error(err)
    })
}

export function updatePostClicked(id, bool) {
  return request
    .patch(`${url}/clicked/${id}/${bool}`)
    .then((res) => {
      // console.log(res.body)
      return res.body
    })
    .catch((err) => {
      console.error(err)
    })
}

export function getDistrictsByRegionCode(regionCode) {
  return request
    .get(`${url}/${regionCode}/districts`)
    .then((res) => {
      // console.log(res.body)
      return res.body
    })
    .catch((err) => {
      console.error(err)
    })
}

export function addPost(newPost) {
  return request
    .post(`${filesURL}`)
    .send(newPost)
    .then((res) => {
      console.log(res.body)
      return res.body
    })
    .catch((err) => {
      console.error(err)
    })
}
