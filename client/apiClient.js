// eslint-disable-next-line no-unused-vars
import request from 'superagent'
import Axios from 'axios'
// eslint-disable-next-line no-unused-vars
const url = '/api/v1/locations'
const filesURL = '/api/v1/upload'
const cloudinaryEndPoint = 'https://api.cloudinary.com/v1_1/dvftesn1v/image'

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

export function getPostById(id) {
  return request
    .get(`${url}/posts/${id}`)
    .then((res) => {
      const post = res.body
      const parsedPost = {
        ...post,
        postImages: JSON.parse(post.postImages),
      }
      return parsedPost
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

export function getDistrictInfoByName(districtName) {
  return request
    .get(`${url}/district/${districtName}`)
    .then((res) => {
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
      // console.log(res)
      return res.body
    })
    .catch((err) => {
      console.error(err)
    })
}

export function deletePost(id) {
  return request
    .get(`${filesURL}/post/delete/${id}`)
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.error(err)
    })
}

export function updatePost(updated) {
  const { id } = updated
  return request
    .patch(`${filesURL}/post/update/${id}`)
    .send(updated)
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.error(err)
    })
}

export function uploadImageToCloudinary(data) {
  return Axios.post(`${cloudinaryEndPoint}/upload`, data)
    .then((res) => {
      // console.log({ url: res.data.url, public_id: res.data.public_id })
      console.log(res)
      return {
        url: res.data.url,
        publicId: res.data.public_id,
        signature: res.data.signature,
      }
    })
    .catch((err) => {
      console.error(err)
    })
}

export function deleteImagesOnCloudinary(formData) {
  return Axios.post(`${cloudinaryEndPoint}/destroy`, formData)
    .then((res) => {
      console.log(res)
      return res
    })
    .catch((err) => {
      console.error(err)
    })
}
