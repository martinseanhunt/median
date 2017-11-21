
const api = "http://localhost:3001"

const headers = {
  'Accept': 'application/json',
  'Authorization': 'FaKeToKeN'
}

export const getCategoryList = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())

export const getCategoryPosts = (category) =>
  fetch(`${api}/category/${category}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

export const createPost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())

export const getPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
  .then(res => res.json())

export const getComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())

export const createComment = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json())

export const addVotes = (id, votes) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(votes)
  }).then(res => res.json())

export const addVotesToComment = (id, votes) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(votes)
  }).then(res => res.json())

export const updatePost = (id, updates) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ updates })
  }).then(res => res.json())

export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }})
    .then(res => res.json())

export const deleteComment = (id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }})
    .then(res => res.json())

// Add comments
