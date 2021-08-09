import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import {
  app, auth, favorites, video,
} from './reducers'

export const rootReducer = combineReducers({
  app, auth, video, favorites,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
