import React, { useContext } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { Tabs, Tab, Media } from 'react-bootstrap';
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
import BucketList from './BucketList'
import {MdDateRange} from 'react-icons/md'

const daysUntil = trips => {
  let tripDates = Object.values(trips)
    .map(trip => trip.startDate)
    .sort();
  const today = new Date();
  for (let i = 0; i < tripDates.length; i++) {
    const dateTrip = new Date(tripDates[i]);
    if (dateTrip > today) {
      const _MS_PER_DAY = 1000 * 60 * 60 * 24;
      const daysUntil = Math.floor((dateTrip - today) / _MS_PER_DAY);
      return daysUntil;
    }
  }
  return <div>No Trekks Planned.</div>;
};

export const UserProfile = props => {

  console.log('props.match.params',props.match.params)
  const loggedInUser = useContext(userContext);
  let user;
  if(props.match.params.userId){
    user=props.match.params.userId
  }else{
    user=loggedInUser.uid
  }
  const [value, loading, error] = useDocument(
    db.doc(`Users/${user}`),
    {
      valueListenOptions: { includeMetadataChanges: true },
    }
  );
  if (error) throw error;
  if (loading) return <Spinner animation="grow" variant="info" />;
  if (value) {
    const userInfo = value.data();
    console.log("userInfo", userInfo)
    return (
      <div>
        <UserProfileHeader user={userInfo} />
        <div className={styles.userBody}>
          <div style={{ minWidth: '60vw' }} className={styles.userProfileBody}>
            {userInfo.bucketList && <BucketList trips={'123'} />}
          </div>
        <h1>My Bucket List</h1>
          <div style={{ minWidth: '60vw' }} className={`${styles.userProfileBody} ${styles.userProfileBackground}`}>
            {userInfo.Trips && <UserProfileTrips trips={userInfo.Trips} />}
          </div>
          <div className={styles.userStats}>

              {/* <Card.Header>Trekkers Stats</Card.Header> */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: "space-around"}}>
              <Media>
              {/* <MdDateRange style={{minHeight: "10rem"}} /> */}
              <img alt="img"src='src/Components/User/iconfinder_ic_card_travel_48px_3669137.png' />
                <Card>
                  {/* <Card.Header>
                    <MdDateRange  />Days Until Next Trekk</Card.Header> */}
                  {userInfo.Trips && (
                    <Card.Title>{daysUntil(userInfo.Trips)} Days Until The Next Trekk</Card.Title>
                  )}
                </Card>
              </Media>
                <Card>
                  <Card.Header>Number Of Trekks</Card.Header>
                  {userInfo.Trips && (
                    <Card.Title>
                      {Object.values(Object.values(userInfo.Trips)).length}
                    </Card.Title>
                  )}
                </Card>
                <Card >
                  <Card.Header>% of Countries Visited</Card.Header>
                  {userInfo.countriesVisited && (
                    <Card.Title>
                      {Math.ceil(
                        (userInfo.countriesVisited.length / 193) * 100
                      )}
                      %
                    </Card.Title>
                  )}
                </Card>
              </div>

            {userInfo.countriesVisited && (
              <Card style={{ margin: '.5rem', minWidth: "50%" }}>
                <Card.Header>
                  Countries Visited ({userInfo.countriesVisited.length})
                </Card.Header>
                <WorldMap />
              </Card>
            )}
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
