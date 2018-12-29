import firebase from 'firebase';

const domain = process.env.REACT_APP_FIREBASE_DOMAIN;
console.log(domain);

var config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${domain}.firebaseapp.com`,
  databaseURL: `https://${domain}.firebaseio.com`,
};

export default firebase.initializeApp(config);
