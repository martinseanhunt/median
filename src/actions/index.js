import * as Api from '../utils/Api.js'

export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const RECIEVE_ALL_POSTS = 'RECIEVE_ALL_POSTS'

export const recieveAllPosts = payload => {
  type: RECIEVE_ALL_POSTS,
  payload
}

export const getAllPosts = () => dispatch => {
  Api
    .getAllPosts()
    .then(data => dispatch(recieveAllPosts(data)))
}