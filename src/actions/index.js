import * as Api from '../utils/Api.js'

export const RECIEVE_ALL_POSTS = 'RECIEVE_ALL_POSTS'
export const RECIEVE_ALL_CATEGORIES = 'RECIEVE_ALL_CATEGORIES'
export const NEW_POST_CREATED = 'NEW_POST_CREATED'
export const RECIEVE_POST = 'RECIEVE_POST'
export const RECIEVE_COMMENTS = 'RECIEVE_COMMENTS'
export const SET_LOADING  = 'SET_LOADING'
export const SET_LOADING_COMMENTS = 'SET_LOADING_COMMENTS'
export const RECIEVE_COMMENT = 'RECIEVE_COMMENT'
export const UPVOTES_ADDED = 'UPVOTES_ADDED'
export const ORDER_POSTS = 'ORDER_POSTS'

export const recieveAllPosts = payload => ({
  type: RECIEVE_ALL_POSTS,
  payload
})

export const getAllPosts = () => dispatch => (
  Api.getAllPosts()
    .then(posts => dispatch(recieveAllPosts(posts)))
)

export const orderPosts = payload => ({
  type: ORDER_POSTS,
  payload
})


export const setLoading = payload => ({
  type: SET_LOADING,
  payload
})

export const recievePost = payload => ({
  type: RECIEVE_POST,
  payload
})

export const getPost = (id) => dispatch => {
  dispatch(setLoading(true))
  return Api.getPost(id)
    .then(post => {
      dispatch(recievePost(post))
      dispatch(setLoading(false))
    })
}


export const recieveComments = payload => ({
  type: RECIEVE_COMMENTS,
  payload
})

export const setLoadingComments = payload => ({
  type: SET_LOADING_COMMENTS,
  payload
})

export const getComments = (id) => dispatch => {
  dispatch(setLoadingComments(true))
  return Api.getComments(id)
    .then(comments => {
      dispatch(recieveComments(comments))
      dispatch(setLoadingComments(false))
    })
}


export const recieveComment = payload => ({
  type: RECIEVE_COMMENT,
  payload
})

export const createNewComment = comment => dispatch => {
  return Api.createComment(comment)
    .then(comment => {
      dispatch(recieveComment(comment))
    })
}


export const newPostCreated = payload => ({
  type: NEW_POST_CREATED,
  payload
})

export const createNewPost = post => dispatch => {
  Api.createPost(post)
    .then(post => dispatch(newPostCreated(post)))
}


export const recieveAllCategories = payload => ({
  type: RECIEVE_ALL_CATEGORIES,
  payload
})

export const getAllCategories = () => dispatch => (
  Api.getCategoryList()
    .then(categories => dispatch(recieveAllCategories(categories)))
)


export const upvotesAdded = payload => ({
  type: UPVOTES_ADDED,
  payload
})

export const addUpvotes = (id, votes) => dispatch => {
  return Api.addVotes(id, votes)
    .then(res => dispatch(upvotesAdded(res)))
    .then(() => dispatch(getAllPosts()))
}
