import React from 'react'
import db from '../firebase';
import firebase from 'firebase/app'
import * as firebaseui from 'firebaseui'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import styles from './Login.module.css';


const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/plantrip',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ]
};

class SignInScreen extends React.Component {
  render() {
    return (
      <div className={styles.LogIn}>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    );
  }
}

export default SignInScreen;
