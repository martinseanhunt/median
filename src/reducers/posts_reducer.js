import { RECIEVE_ALL_POSTS, NEW_POST_CREATED, RECIEVE_POST, UPVOTES_ADDED, ORDER_POSTS } from '../actions'

export function posts(state = {}, action) {
  switch(action.type) {
    case RECIEVE_ALL_POSTS: 
      return action.payload
    case NEW_POST_CREATED:
      return [...state, action.payload]
    default: 
      return state
  }
}

export function activePost(state = {}, action) {
  switch(action.type) {
    case UPVOTES_ADDED: 
      return {...state, voteScore: action.payload.voteScore}
    case RECIEVE_POST: 
      return action.payload
    default: 
      return state
  }
}

export function orderBy(state = 'score', action) {
  switch(action.type) {
    case ORDER_POSTS:
      return action.payload
    default:
      return state
  }
}

export function sortPostsSelector(posts, orderBy) {
  const sortPosts = (a,b) => {
    switch(orderBy) {
      case 'score':
        return a.voteScore < b.voteScore
      case 'title':
        return a.title > b.title
      case 'date':
        return a.timestamp < b.timestamp
      default:
        return a.voteScore < b.voteScore
    }
  }

  return posts.length 
      ? posts.sort(sortPosts)
      : []
}