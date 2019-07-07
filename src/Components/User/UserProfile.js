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
  Card,
} from 'react-bootstrap';
import userContext from '../../Contexts/userContext';
import TrekkList from '../SingleTrip/TrekkList';

const daysUntil = tripDates => {
  const today = new Date();
  for (let i = 0; i < tripDates.length; i++) {
    const dateTrip = new Date(tripDates[i]);
    if (dateTrip > today) {
      const _MS_PER_DAY = 1000 * 60 * 60 * 24;
      const daysUntil = Math.floor((dateTrip - today) / _MS_PER_DAY);
      return daysUntil;
    }
  }
  return "No Upcoming Trips Planned"
};

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
    return (
      <div>
        <UserProfileHeader user={userInfo} />
        <div style={{ display: 'flex' }}>
          <div style={{ minWidth: '60vw' }} className={styles.userProfileBody}>
            {userInfo.Trips && <UserProfileTrips trips={userInfo.Trips} />}
          </div>
          <div>
            {userInfo.countriesVisited && (
              <Card border="info">
                <Card.Header>
                  Countries Visited ({userInfo.countriesVisited.length})
                </Card.Header>
                <WorldMap />
              </Card>
            )}

            <Card>
              <Card.Header>Days Until Next Trekk:</Card.Header>
              {userInfo.Trips && (
                <Card.Title>
                  {daysUntil(
                    Object.values(userInfo.Trips)
                      .map(trip => trip.startDate)
                      .sort()
                  )}
                </Card.Title>
              )}
            </Card>
          </div>
        </div>
      </div>
    );
  }
};

export default UserProfile;

{
  /* <div className={styles.BucketList}>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
              <Tab eventKey="Bucket List" title="Trekk List" />
              <Tab eventKey="Trekk List" title="Bucket List" />
            </Tabs>
          </div> */
}
