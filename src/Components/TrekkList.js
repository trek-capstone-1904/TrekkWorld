import React, {useContext} from 'react'
import userContext from '../Contexts/userContext'

export const TrekkList = () => {
  const loggedInUser = useContext(userContext);

  return (
    <div>
      <h1>Trekk List</h1>
      <div>

      </div>
    </div>
  )
}

export default TrekkList
