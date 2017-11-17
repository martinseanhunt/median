import { RECIEVE_ALL_CATEGORIES } from '../actions'

function categories(state = {}, action) {
  switch(action.type) {
    case RECIEVE_ALL_CATEGORIES: 
      return action.payload.categories
    default: 
      return state
  }
}

export default categories