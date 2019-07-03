import * as secret from "./secrets.js";

import firebase from "firebase/app";
import "firebase/auth";
// import 'firebase/database'
import 'firebase/storage' // <- needed if using storage
import "firebase/firestore"; // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
// import { reduxFirestore, firestoreReducer } from 'redux-firestore' // <- needed if using firestore

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: secret.apiKey,
  authDomain: secret.authDomain,
  projectId: secret.projectId,
  storageBucket: secret.storage
});

export let loggedUser = "";
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    loggedUser = firebase.auth().currentUser;
  } else {
    // No user is signed in.
  }
});

export const auth = firebase.auth();
var db = firebase.firestore();

export default db;
