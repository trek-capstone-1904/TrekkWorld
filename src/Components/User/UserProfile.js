import React, { useContext } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import db from '../../firebase';
import { UserProfileHeader, UserProfileTrips, WorldMap } from '../index.js';
import styles from "../UserProfile.module.css";
import {
  InputGroup,
  Button,
  FormControl,
  CardGroup,
  Spinner,
} from 'react-bootstrap';
import userContext from '../../Contexts/userContext';

export const UserProfile = (props) => {
  const loggedInUser = useContext(userContext);
  console.log('props in userprofile:', props)
  const [value, loading, error] = useDocument(
    db.doc(`Users/${loggedInUser.uid}`),
    {
      valueListenOptions: { includeMetadataChanges: true },
    }
  );
  if (error) throw error;
  if (loading) return <Spinner animation="grow" variant="info" />;
  if (value) {
    const userInfo = value.data();
    return (
      <div>
        <UserProfileHeader user={userInfo}/>
        <div className={styles.userProfileBody}>
          {userInfo.Trips && <UserProfileTrips trips={userInfo.Trips} />}
          {userInfo.countriesVisited && <WorldMap />}
        </div>
      </div>
    );
  }
};

export default UserProfile;
