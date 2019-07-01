import * as secret from './secrets'

import firebase from 'firebase/app'
import 'firebase/auth'
// import 'firebase/database'
// import 'firebase/storage' // <- needed if using storage
import 'firebase/firestore' // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
// import { reduxFirestore, firestoreReducer } from 'redux-firestore' // <- needed if using firestore




// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: secret.apiKey,
  authDomain: secret.authDomain,
  projectId: secret.projectId
})

class Firebase{
  constructor(){
    this.auth = firebase.auth()
    this.db = firebase.firestore()

  }

  login(email, password){
    return this.auth.signInWithEmailAndPassword(email, password)
  }
  logout(){
    return this.auth.signOut()
  }
  async register(name, email, password){
    await this.auth.createUserWithEmailAndPassword(email, password)
    return this.auth.currentUser
  }
}

var db = firebase.firestore()
export default db;



