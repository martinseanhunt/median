import { combineReducers } from 'redux'
import { posts, activePost, orderBy } from './posts_reducer'
import { loading } from './loading_reducer'
import activeComments from './comments_reducer'
import categories from './categories_reducer'

const rootReducer = combineReducers({
  activePost,
  activeComments,
  posts,
  orderBy,
  categories,
  loading
})

export default rootReducer