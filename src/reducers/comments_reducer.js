import { RECIEVE_COMMENTS, RECIEVE_COMMENT, SET_LOADING_COMMENTS } from '../actions'

function activeComments(state = { loading: false, comments: [] }, action) {
  switch(action.type) {
    case SET_LOADING_COMMENTS:
      return {...state, loading: action.payload}
    case RECIEVE_COMMENTS: 
      return {...state, comments: action.payload}
    case RECIEVE_COMMENT:
      return {...state, comments: [...state.comments, action.payload]}
    default:         
      return state
  }
}

export default activeComments