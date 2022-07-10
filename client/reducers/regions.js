import { regions_receiveData } from '../actions'

export default function regionsReducer(state = [], action) {
  const { type, payload } = action
  switch (type) {
    case regions_receiveData:
      return payload
    default:
      return state
  }
}
