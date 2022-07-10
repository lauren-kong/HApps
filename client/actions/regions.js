import { getRegions } from '../apiClient'

export const regions_requestData = 'regions/requestData'
export function requestRegionsData() {
  console.log('im here')
  return {
    type: regions_requestData,
  }
}

export const regions_receiveData = 'regions/receiveData'
export function receiveRegionsData(regionsData) {
  console.log('im here')
  return {
    type: regions_receiveData,
    payload: regionsData,
  }
}

export function getAllRegions() {
  return (dispatch) => {
    dispatch(requestRegionsData())
    return getRegions()
      .then((regionsData) => {
        dispatch(receiveRegionsData(regionsData))
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
