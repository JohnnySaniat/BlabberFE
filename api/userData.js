const getUserDetails = (uid) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7193/users/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export default getUserDetails;
