const dbUrl = 'https://localhost:7193';

const getPostComments = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/posts/${id}/comments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    }).catch(reject);
});

const postComment = (id, payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/posts/${id}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const updateComment = (postId, payload, commentId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/posts/${postId}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteComment = (postId, commentId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/posts/${postId}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getPostComments,
  postComment,
  updateComment,
  deleteComment,
};
