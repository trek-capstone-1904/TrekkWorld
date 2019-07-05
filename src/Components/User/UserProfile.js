import React, { useContext } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { Tabs, Tab } from 'react-bootstrap';
import db from '../../firebase';
import { UserProfileHeader, UserProfileTrips, WorldMap } from '../index.js';
import styles from '../UserProfile.module.css';
import {
  InputGroup,
  Button,
  FormControl,
  CardGroup,
  Spinner,
} from 'react-bootstrap';
import userContext from '../../Contexts/userContext';
import TrekkList, { BorTList } from '../SingleTrip/BorTList';

export const UserProfile = props => {
  const loggedInUser = useContext(userContext);
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
    console.log('userInfo', userInfo);
    return (
      <div>
        <UserProfileHeader user={userInfo} />
        <div className={styles.userProfileBody}>
          {userInfo.Trips && <UserProfileTrips trips={userInfo.Trips} />}
          {userInfo.countriesVisited && <WorldMap />}
          {/* {userInfo.trekkList && <BorTList list={`trekkList`} />}
           */}
          <div className={styles.BucketList}>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
              <Tab eventKey="Bucket List" title="Trekk List">
                <BorTList list={'trekkList'} />
              </Tab>
              <Tab eventKey="Trekk List" title="Bucket List">
                {/* <BucketList /> */}
                <BorTList list={'bucketList'} />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
};

export default UserProfile;
