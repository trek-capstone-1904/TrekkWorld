import * as secret from './secrets.js';

import firebase from 'firebase/app';
import 'firebase/auth';
// import 'firebase/database'
// import 'firebase/storage' // <- needed if using storage
import 'firebase/firestore'; // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
// import { reduxFirestore, firestoreReducer } from 'redux-firestore' // <- needed if using firestore

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: secret.apiKey,
  authDomain: secret.authDomain,
  projectId: secret.projectId,
});

var db = firebase.firestore();
export default db;
