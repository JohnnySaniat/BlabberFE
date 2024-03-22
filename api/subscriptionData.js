const endpoint = 'https://localhost:7193';

const newSubscription = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/subscription/new`, {
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

const getSubscriptionsByUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/subscriptions/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const removeSubscription = (userId, authorId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/subscriptions/${userId}/remove/${authorId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

export {
  newSubscription,
  getSubscriptionsByUser,
  removeSubscription,
};
