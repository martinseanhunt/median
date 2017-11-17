import { SET_LOADING } from '../actions'

export function loading(state = { loading: false }, action) {
  switch(action.type) {
    case SET_LOADING: 
      return action.payload
    default: 
      return state
  }
}