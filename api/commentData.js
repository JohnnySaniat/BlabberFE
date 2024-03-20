import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getPostComments = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/posts/${id}/comments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export default getPostComments;
