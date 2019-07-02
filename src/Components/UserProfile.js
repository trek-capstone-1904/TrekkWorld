import React, {useContext} from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import db from '../firebase';
import {UserProfileHeader, UserProfileTrips} from './index.js';
import {
  InputGroup,
  Button,
  FormControl,
  CardGroup,
  Spinner,
} from 'react-bootstrap';
import userContext from '../Contexts/userContext';

export const UserProfile = () => {
  const loggedInUser = useContext(userContext)

  const [value, loading, error] = useDocument(
    db.doc(`Users/${loggedInUser.uid}`),
    {
      valueListenOptions: { includeMetadataChanges: true },
    }
  );

  const userInfo = value && value.data();
  return (
    <div>
      {error && <strong>Error: {error}</strong>}
      {loading && <Spinner animation="grow" variant="info" />}
      {value && <UserProfileHeader user={userInfo} />}
      {value && value.data().Trips && <UserProfileTrips trips={userInfo.Trips}/>}
    </div>
  );
};

export default UserProfile;
