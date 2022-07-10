import { regions_requestData, regions_receiveData } from '../actions'

export default function loadingReducer(state = false, action) {
  const { type } = action
  switch (type) {
    case regions_requestData:
      return true
    case regions_receiveData:
      return false
    default:
      return state
  }
}
