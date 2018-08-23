import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCWvbxLdisdjLDH6sxziQKtOOnEyaEJJ7s',
  authDomain: 'divethru-14f14.firebaseapp.com',
  databaseURL: 'https://divethru-14f14.firebaseio.com',
  projectId: 'divethru-14f14',
  storageBucket: 'divethru-14f14.appspot.com',
  messagingSenderId: '5071479695',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
