// eslint-disable-next-line no-unused-vars
import request from 'superagent'
// eslint-disable-next-line no-unused-vars
const url = '/v1/locations'

export function getRegions() {
  return request
    .get(url)
    .then((res) => {
      const result = res.body
      console.log(res)
      return result
    })
    .catch((err) => {
      console.error(err)
    })
}
