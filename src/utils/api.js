
const api = "http://localhost:3001/"

const headers = {
  'Accept': 'application/json',
  'Authorization': 'FaKeToKeN'
}

export const getCategoryList = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => console.log(data))

export const getCategoryPosts = (category) =>
  fetch(`${api}/category/${category}`, { headers })
    .then(res => res.json())
    .then(data => console.log(data))

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => console.log(data))

export const createPost = (post) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())
    .then(data => console.log(data))

export const getPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
  .then(res => res.json())
  .then(data => console.log(data))

export const votePost = (id, option) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(option)
  }).then(res => res.json())
    .then(data => console.log(data))

export const updatePost = (id, updates) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ updates })
  }).then(res => res.json())
    .then(data => console.log(data))

export const deletePost = (id, updates) =>
  fetch(`${api}/books/${id}`, {
    method: 'DELETE',
    headers: { headers }})
    .then(res => res.json())
    .then(data => console.log(data))

// Add comments
