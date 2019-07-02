import React from "react";
import db from "../firebase";
import firebase from "firebase/app";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const SignInScreen = props => {
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        var user = authResult.user;
        var credential = authResult.credential;
        var isNewUser = authResult.additionalUserInfo.isNewUser;
        var providerId = authResult.additionalUserInfo.providerId;
        var operationType = authResult.operationType;


        console.log("user's uid", user.uid)
        console.log("is new user?", isNewUser)
        //add user to the database if not already there
        if (isNewUser) {
          db.collection("Users")
            .doc(user.uid)
            .set({
              userName: user.displayName,
              email: user.email
            }).then(
              function(){
                props.history.push('/plantrip')
              }
            );

        } else {
          props.history.push('/plantrip')
        }
        return false;
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
