import * as secret from './secrets'
const firebase = require('firebase')
// Required for side-effects
require('firebase/firestore')

require('./secrets')

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: secret.apiKey,
  authDomain: secret.authDomain,
  projectId: secret.projectId
})

var db = firebase.firestore()
export default db;



