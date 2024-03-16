import firebase from 'firebase/app';
import 'firebase/auth';

const checkUser = (uid) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7193/checkuser/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(async (res) => {
      let data;
      console.log('status:', res);
      if (res.status === 204) {
        resolve({});
      } else {
        data = await res.json();
        console.log('data:', data);
        resolve(data);
      }
    })
    .catch(reject);
});

const registerUser = (userInfo) => new Promise((resolve, reject) => {
  fetch('https://localhost:7193/users/', {
    method: 'POST',
    body: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  firebase.auth().signOut();
};

export {
  signIn, //
  signOut,
  checkUser,
  registerUser,
};
