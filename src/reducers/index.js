import { combineReducers } from 'redux'
import posts from './posts_reducer'
import comments from './comments_reducer'

const rootReducer = combineReducers({
  posts,
  comments
})

export default rootReducer