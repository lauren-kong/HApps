// eslint-disable-next-line no-unused-vars
import request from 'superagent'
// eslint-disable-next-line no-unused-vars
const url = '/api/v1/locations'

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
        const parsedPost = { ...post, postImages: JSON.parse(post.postImages) }
        return parsedPost
      })
      return parsedPosts
    })
    .catch((err) => {
      console.error(err)
    })
}
