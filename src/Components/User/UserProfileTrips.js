import React from 'react';
import TripListItem from './TripListItem';
import { CardGroup } from 'react-bootstrap';
import styles from '../UserProfile.module.css';

export const UserProfileTrips = props => {
  let trips = Object.entries(props.trips).map(tripObj => ({
    id: tripObj[0],
    date: tripObj[1].startDate,
  }));

  trips.sort((a, b) => (a.date > b.date ? 1 : -1));

  return (
    <div style={{ maxWidth: '80rem', justifyContent: 'space-around' }}>
      <hr/>
      <h1 style={{ color: 'gray' }}>My Trekks</h1>
      <div
        className={styles.CardUser}
        style={{ flexWrap: 'wrap', justifyContent: 'center', display:'flex'}}
      >
        {trips.map(trip => (
          <TripListItem key={trip.id} tripId={trip.id} />
        ))}
      </div>
    </div>
  );
};

export default UserProfileTrips;
