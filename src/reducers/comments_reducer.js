import { 
  RECIEVE_COMMENTS, 
  RECIEVE_COMMENT, 
  SET_LOADING_COMMENTS, 
  SAVE_UPVOTE_LOCALLY,
  SAVE_DOWNVOTE_LOCALLY,
  RESET_LOCAL_VOTES,
  COMMENT_DELETED
} from '../actions'

function activeComments(state = { loading: false, comments: [] }, action) {
  switch(action.type) {
    case SET_LOADING_COMMENTS:
      return {...state, loading: action.payload}
    case RECIEVE_COMMENTS: 
      return {...state, comments: action.payload}
    case RECIEVE_COMMENT:
      return {...state, comments: [...state.comments, action.payload]}
    case SAVE_UPVOTE_LOCALLY:
      return {
        ...state,
        comments: state.comments.map(comment => {
          if(comment.id === action.payload){
            const myUpvotes = comment.myUpvotes || 0
            return {...comment, voteScore: comment.voteScore + 1, myUpvotes: myUpvotes + 1}
          }
          return comment
        })
      }
    case SAVE_DOWNVOTE_LOCALLY:
      return {
        ...state,
        comments: state.comments.map(comment => {
          if(comment.id === action.payload){
            const myDownvotes = comment.myDownvotes || 0
            return {...comment, voteScore: comment.voteScore - 1, myDownvotes: myDownvotes + 1}
          }
          return comment
        })
      }
    case RESET_LOCAL_VOTES: 
      return {
        ...state,
        comments: state.comments.map(comment => action.payload === comment.id
          ? {...comment, myUpvotes: 0, myDownvotes: 0}
          : comment
        )
      }
    case COMMENT_DELETED:
      console.log(action.payload)
      return {
        ...state,
        comments: state.comments.filter(comment => action.payload !== comment.id )
      }
    default:         
      return state
  }
}

export default activeComments