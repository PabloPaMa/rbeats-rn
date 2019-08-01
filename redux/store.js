import { createStore, combineReducers } from 'redux'

import appStateReducer from './reducers/appState'
import userReducer from './reducers/user'

const reducers = combineReducers({
  app: appStateReducer,
  user: userReducer,
})

const store = createStore(reducers)

export default store
