import { 
  RECIEVE_ALL_POSTS, 
  NEW_POST_CREATED, 
  RECIEVE_POST, 
  ORDER_POSTS, 
  SAVE_UPVOTE_LOCALLY,
  SAVE_DOWNVOTE_LOCALLY,
  RESET_LOCAL_VOTES,
  POST_DELETED,
  POST_EDITED
} from '../actions'

export function posts(state = {}, action) {
  switch(action.type) {
    case RECIEVE_ALL_POSTS: 
      return action.payload
    case NEW_POST_CREATED:
      return [...state, action.payload]
    case SAVE_UPVOTE_LOCALLY:
      return state.map(post => {
        if(post.id === action.payload){
          const myUpvotes = post.myUpvotes || 0
          return {...post, voteScore: post.voteScore + 1, myUpvotes: myUpvotes + 1}
        }
        return post
      })
    case SAVE_DOWNVOTE_LOCALLY:
      return state.map(post => {
        if(post.id === action.payload){
          const myDownvotes = post.myDownvotes || 0
          return {...post, voteScore: post.voteScore - 1, myDownvotes: myDownvotes + 1}
        }
        return post
      })
    case RESET_LOCAL_VOTES: 
      return state.map(post => action.payload === post.id
        ? {...post, myUpvotes: 0, myDownvotes: 0}
        : post
      )
    case POST_DELETED:
      return state.filter(post => post.id !== action.payload)
    case POST_EDITED: 
      return [...state.filter(post => post.id !== action.payload.id), action.payload]
    case ORDER_POSTS: 
      return [...state.sort((a,b) => {
        switch(action.payload) {
          case 'score':
            return a.voteScore < b.voteScore
          case 'title':
            return a.title > b.title
          default:
            return a.timestamp < b.timestamp
        }                       
      })]
      
    default: 
      return state
  }
}

export function activePost(state = {}, action) {
  switch(action.type) {
    case RECIEVE_POST: 
      return action.payload
    case SAVE_UPVOTE_LOCALLY:
      const myUpvotes = state.myUpvotes || 0
      return action.payload === state.id 
        ? {...state, voteScore: state.voteScore + 1, myUpvotes: myUpvotes + 1}
        : state
    case SAVE_DOWNVOTE_LOCALLY:
      const myDownvotes = state.myDownvotes || 0
      return action.payload === state.id 
        ? {...state, voteScore: state.voteScore - 1, myDownvotes: myDownvotes + 1}
        : state
    case RESET_LOCAL_VOTES: 
      return {...state, myUpvotes: 0, myDownvotes: 0}
    case POST_DELETED: 
      return {}
    case POST_EDITED:
      return action.payload
    default: 
      return state
  }
}

export function orderBy(state = 'date', action) {
  switch(action.type) {
    case ORDER_POSTS:
      return action.payload
    default:
      return state
  }
}

export function voting(state = false, action) {
  switch(action.type) {
    case SAVE_UPVOTE_LOCALLY:
    case SAVE_DOWNVOTE_LOCALLY:
      return true
    case RESET_LOCAL_VOTES:
      return false
    default:
      return state
  }
}