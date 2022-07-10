import {
  regions_requestData,
  regions_receiveData,
  posts_receiveData,
  posts_requestData,
} from '../actions'

export default function loadingReducer(state = false, action) {
  const { type } = action
  switch (type) {
    case regions_requestData:
    case posts_requestData:
      return true
    case regions_receiveData:
    case posts_receiveData:
      return false
    default:
      return state
  }
}
