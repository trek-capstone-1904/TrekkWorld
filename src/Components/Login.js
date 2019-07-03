import React from 'react';
import db from '../firebase';
import firebase from 'firebase/app';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import styles from './Login.module.css';

const SignInScreen = props => {
  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        var user = authResult.user;
        var credential = authResult.credential;
        var isNewUser = authResult.additionalUserInfo.isNewUser;
        var providerId = authResult.additionalUserInfo.providerId;
        var operationType = authResult.operationType;
        console.log(user);
        //add user to the database if not already there
        if (isNewUser) {
          db.collection('Users')
            .doc(user.uid)
            .set({
              userName: user.displayName,
              email: user.email,
              //adds either the google image or adds a robohash image
              userPicture:
                user.providerData[0].photoURL ||
                `https://robohash.org/${user.displayName}`,
            })
            .then(function() {
              props.history.push("/user");
            });
        } else {
          props.history.push("/user");
        }
        return false;
      },
    },
  };
  return (
    <div className={styles.LogIn}>
      <h1>TREKK</h1>
      <p>Please log in or sign-up:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};

export default SignInScreen;
