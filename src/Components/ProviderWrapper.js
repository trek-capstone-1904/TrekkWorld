import React, {useState} from 'react';
import userContext from '../Contexts/userContext'
import setUserContext from '../Contexts/setUserContext'


export const ProviderWrapper = (props) => {

  let [user, setUser] = useState(null)
  setUser = (user) => {
    console.log("user in setUser", user)
    setUser(user)
  }
  console.log("state in provider wrapper", user)

  return (
    <setUserContext.Provider value={setUser}>
      <userContext.Provider value={user}>
      {props.children}
      </userContext.Provider>
    </setUserContext.Provider>
  )
}

export default ProviderWrapper
