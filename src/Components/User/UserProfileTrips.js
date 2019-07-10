import React from 'react';
import TripListItem from './TripListItem';
import { CardGroup } from 'react-bootstrap';

export const UserProfileTrips = props => {
  let trips = Object.entries(props.trips).map(tripObj => ({
    id: tripObj[0],
    date: tripObj[1].startDate,
  }));

  trips.sort((a, b) => (a.date > b.date ? 1 : -1));

  return (
    <div style={{ maxWidth: '100rem', justifyContent: "space-around" }}>
      <h1>My Trekks</h1>
      <CardGroup>
      {trips.map(trip => (
        <TripListItem key={trip.id} tripId={trip.id} />
        ))}
        </CardGroup>

    </div>
  );
};

export default UserProfileTrips;
