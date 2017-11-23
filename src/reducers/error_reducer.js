import { SET_ERROR, CLEAR_ERRORS } from '../actions'

export function error(state = {error: false}, action) {
  switch(action.type) {
    case SET_ERROR: 
      return {error: action.payload}
    case CLEAR_ERRORS: 
      return {error: false}
    default: 
      return state
  }
}