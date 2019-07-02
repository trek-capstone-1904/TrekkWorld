import React, {useState, useEffect} from 'react';
import userContext from '../Contexts/userContext'
import firebase from 'firebase/app'

export const ProviderWrapper = (props) => {
  let [user, setUser] = useState(null)

  useEffect(function(){
    const unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        setUser(user);
      } else {
        // No user is signed in.
        console.log("user not logged in")
      }
    });
    return unsubscribe;
  }, [])
  console.log("state in provider wrapper", user)

  return (
      <userContext.Provider value={user}>
      {props.children}
      </userContext.Provider>
  )
}

export default ProviderWrapper
