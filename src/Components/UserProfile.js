import React from 'react';
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

export const UserProfile = () => {
  const [value, loading, error] = useDocument(
    db.doc('Users/lQNWEtdOGjXlIdmUIRb9'),
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
      {value && <UserProfileTrips trips={userInfo.Trips}/>}
    </div>
  );
};

export default UserProfile;
