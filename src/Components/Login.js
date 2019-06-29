import React from 'react'
import db from '../firebase';
import firebase from 'firebase/app'
import * as firebaseui from 'firebaseui'
import StyleFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'


// Initialize the FirebaseUI Widget using Firebase.
// var ui = new firebaseui.auth.AuthUI(firebase.auth());

// const uiConfig = {
//   sign
// }
var ui = new firebaseui.auth.AuthUI(firebase.auth());

export const Login = () => {

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');


  var uiConfig = {
    signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: '<your-tos-url>',
    // Privacy policy url/callback.
    privacyPolicyUrl: function() {
      window.location.assign('<your-privacy-policy-url>');
    }
  };

  // Initialize the FirebaseUI Widget using Firebase.
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);

  return(
    <div id='firebaseui-auth-container'>
    </div>

  )
}

export default Login;
