import * as Api from '../utils/Api.js'

export const RECIEVE_ALL_POSTS = 'RECIEVE_ALL_POSTS'
export const RECIEVE_ALL_CATEGORIES = 'RECIEVE_ALL_CATEGORIES'
export const NEW_POST_CREATED = 'NEW_POST_CREATED'
export const RECIEVE_POST = 'RECIEVE_POST'
export const RECIEVE_COMMENTS = 'RECIEVE_COMMENTS'
export const SET_LOADING  = 'SET_LOADING'
export const SET_LOADING_COMMENTS = 'SET_LOADING_COMMENTS'
export const RECIEVE_COMMENT = 'RECIEVE_COMMENT'
export const VOTES_SAVED_TO_SERVER = 'VOTES_SAVED_TO_SERVER'
export const SAVE_UPVOTE_LOCALLY = 'SAVE_UPVOTE_LOCALLY'
export const SAVE_DOWNVOTE_LOCALLY = 'SAVE_DOWNVOTE_LOCALLY'
export const ORDER_POSTS = 'ORDER_POSTS'
export const RESET_LOCAL_VOTES = 'RESET_LOCAL_VOTES'
export const POST_DELETED = 'POST_DELETED'
export const POST_EDITED = 'POST_EDITED'
export const COMMENT_DELETED = 'COMMENT_DELETED'
export const SET_COMMENT_EDITING = 'SET_COMMENT_EDITING'
export const COMMENT_UPDATED = 'COMMENT_UPDATED'
export const SET_ERROR = 'SET_ERROR'
export const CLEAR_ERRORS = 'CLEAR_ERRORS'

export const recieveAllPosts = (payload) => ({
  type: RECIEVE_ALL_POSTS,
  payload
})

export const getAllPosts = () => dispatch => {
  dispatch(setLoading(true))
  Api.getAllPosts()
    .then(posts => dispatch(recieveAllPosts(posts)))
    .then(() => {
      dispatch(orderPosts('date'))
      dispatch(setLoading(false))
    })
}

export const orderPosts = payload => ({
  type: ORDER_POSTS,
  payload
})


export const setLoading = payload => ({
  type: SET_LOADING,
  payload
})

export const setError = payload => ({
  type: SET_ERROR,
  payload
})

export const clearErrors = payload => ({
  type: CLEAR_ERRORS,
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

// I don't think this is the way to handle the error when the post is too long but I couldn't
// Figure out how else to do it? Help?
export const createNewPost = post => dispatch => {
  dispatch(clearErrors())
  return Api.createPost(post)
    .then(post => dispatch(newPostCreated(post)))
    .catch(() => dispatch(setError('There was an error on our server, maybe your post was too long!')))
}


export const postEdited = payload => ({
  type: POST_EDITED,
  payload
})

// I don't think this is the way to handle the error when the post is too long but I couldn't
// Figure out how else to do it? Help?
export const editPost = (id, post) => dispatch => {
  dispatch(clearErrors())
  return Api.updatePost(id, post)
    .then(post => dispatch(postEdited(post)))
    .catch(() => dispatch(setError('There was an error on our server, maybe your post was too long!')))
}


export const postDeleted = payload => ({
  type: POST_DELETED,
  payload
})

export const deletePost = (id) => dispatch => {
  return Api.deletePost(id)
    .then(post => {
      dispatch(postDeleted(id))
    })
}


export const commentDeleted = payload => ({
  type: COMMENT_DELETED,
  payload
})

export const deleteComment = (id) => dispatch => {
  return Api.deleteComment(id)
    .then(post => {
      dispatch(commentDeleted(id))
    })
}


export const commentUpdated = payload => ({
  type: COMMENT_UPDATED,
  payload
})

export const updateComment = (id, update) => dispatch => {
  return Api.updateComment(id, update)
    .then(post => {
      dispatch(commentUpdated(post))
    })
}


export const recieveAllCategories = payload => ({
  type: RECIEVE_ALL_CATEGORIES,
  payload
})

export const getAllCategories = () => dispatch => (
  Api.getCategoryList()
    .then(categories => dispatch(recieveAllCategories(categories)))
)

export const setCommentEditing = (id, editing) => ({
  type: SET_COMMENT_EDITING,
  payload: {
    id,
    editing
  }
})

export const upvotesSaved = payload => ({
  type: VOTES_SAVED_TO_SERVER,
  payload
})

export const addVoteLocally = (postId, voteType) => {
  const actionType = voteType === 'upVote' 
    ? SAVE_UPVOTE_LOCALLY
    : SAVE_DOWNVOTE_LOCALLY

  return { 
    type: actionType,
    payload: postId
  }
}

export const resetLocalVotes = (payload) => ({
  type: RESET_LOCAL_VOTES,
  payload
})

export const postVotesToServer = (id, votes, contentType) => dispatch => {
  dispatch(resetLocalVotes(id))  
  if(contentType === 'comment')
    return Api.addVotesToComment(id, votes)
      .then(res => dispatch(upvotesSaved(res)))

  return Api.addVotes(id, votes)
    .then(res => dispatch(upvotesSaved(res)))
}
