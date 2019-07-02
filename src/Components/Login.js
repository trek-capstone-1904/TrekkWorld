import React, {useContext} from 'react'
import db from '../firebase';
import firebase from 'firebase/app'
import * as firebaseui from 'firebaseui'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import setUserContext from '../Contexts/setUserContext'
import userContext from '../Contexts/userContext'




const SignInScreen = (props) => {
  console.log(firebase.auth().currentUser)
  const setUser = useContext(setUserContext);
    //how to fire this once when the user logs in
    const uiConfig = {
      // Popup signin flow rather than redirect flow.
      signInFlow: 'popup',
      // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
      signInSuccessUrl: '/plantrip',
      // We will display Google and Facebook as auth providers.
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        //add user to the database if not already there
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          var user = authResult.user;
          var credential = authResult.credential;
          var isNewUser = authResult.additionalUserInfo.isNewUser;
          var providerId = authResult.additionalUserInfo.providerId;
          var operationType = authResult.operationType;
          // Do something with the returned AuthResult.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          // console.log(user.uid, user.email, user.displayName, isNewUser)
          // console.log("Current user", firebase.auth().currentUser)

          if(isNewUser){
            db.collection("Users").doc(user.uid).set({
              userName: user.displayName,
              email: user.email,
            })
          setUser(firebase.auth().currentUser);
          console.log(firebase.auth().currentUser)

          //const userID = useContext(userContext)
          //console.log("user", user);
        }
        return true;
      }
    }
  }

  //need to write a custom hook
  // const useRunSetUser = (() => {
  //   const setUser = useContext(setUserContext);
  //   //how to fire this once when the user logs in
  //   setUser(firebase.auth().currentUser);
  //   const user = useContext(userContext)
  //   console.log(user);

  // }, [props.children]);

    return (
      <div>
        <h1>TREKK</h1>
        <p>Please log in or sign-up:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    );
  };

export default SignInScreen;
