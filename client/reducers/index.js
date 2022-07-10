import { combineReducers } from 'redux'

import loadingReducer from './loading'
import regionsReducer from './regions'

export default combineReducers({
  regions: regionsReducer,
  loading: loadingReducer,
})
