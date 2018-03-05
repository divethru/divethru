import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDBWdYDtGJsilqNGOqYMNalE9s-IAGPnTw',
  authDomain: 'divethru-71c56.firebaseapp.com',
  databaseURL: 'https://divethru-71c56.firebaseio.com',
  projectId: 'divethru-71c56',
  storageBucket: 'divethru-71c56.appspot.com',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
