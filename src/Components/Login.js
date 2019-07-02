import React from "react";
import db from "../firebase";
import firebase from "firebase/app";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const SignInScreen = props => {
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful.
    signInSuccessUrl: "/plantrip",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        var user = authResult.user;
        var credential = authResult.credential;
        var isNewUser = authResult.additionalUserInfo.isNewUser;
        var providerId = authResult.additionalUserInfo.providerId;
        var operationType = authResult.operationType;

        //add user to the database if not already there
        if (isNewUser) {
          db.collection("Users")
            .doc(user.uid)
            .set({
              userName: user.displayName,
              email: user.email
            });
        }
        return true;
      }
    }
  };
  return (
    <div>
      <h1>TREKK</h1>
      <p>Please log in or sign-up:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};

export default SignInScreen;
