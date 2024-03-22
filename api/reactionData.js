const dbUrl = 'https://localhost:7193';

const getReactions = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/reactions`, {
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

const getReactionsById = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/reactions/${id}`, {
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

const postReaction = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/reactions`, {
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

const updateReaction = (id, payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/reactions/edit/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteReaction = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/reactions/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getReactions,
  getReactionsById,
  postReaction,
  updateReaction,
  deleteReaction,
};
