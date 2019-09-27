import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

/*
//for prototype
const config = {
    apiKey: "AIzaSyDTVcpBm_d9g8pALjt7CKTkX3n3Byp0qjA",
    authDomain: "neww-3600d.firebaseapp.com",
    databaseURL: "https://neww-3600d.firebaseio.com",
    projectId: "neww-3600d",
    storageBucket: "neww-3600d.appspot.com",
    messagingSenderId: "782359771130",
};
*/

const config = {
  apiKey: "AIzaSyCw0adhmMWW1DYDG530pD7kL3KO3GaCRnA",
  authDomain: "test1-64187.firebaseapp.com",
  databaseURL: "https://test1-64187.firebaseio.com",
  projectId: "test1-64187",
  storageBucket: "test1-64187.appspot.com",
  messagingSenderId: "570880262877",
  
};


class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');
}

export default Firebase;
