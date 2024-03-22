const endpoint = 'https://localhost:7193';

const getTags = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tags`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getTagDetails = (tagId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tags/${tagId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getPostsByTag = (tagId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tags/posts/${tagId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const newTag = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tags/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateTag = (tagId, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tags/update/${tagId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteTag = (tagId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/tags/delete/${tagId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

const removeTagFromPost = (postId, tagId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/tags/remove/${postId}/${tagId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

const addTagToPost = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/tags/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getTags,
  getTagDetails,
  getPostsByTag,
  newTag,
  updateTag,
  removeTagFromPost,
  addTagToPost,
  deleteTag,
};
