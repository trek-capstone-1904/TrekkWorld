import React from 'react';
import TripListItem from './TripListItem';

export const UserProfileTrips = props => {
  let trips = Object.entries(props.trips).map(tripObj => ({
    id: tripObj[0],
    date: tripObj[1].startDate,
  }));

  trips.sort((a, b) => (a.date > b.date ? 1 : -1));

  return (
    <div style={{ maxWidth: '50rem' }}>
      <h1>My Trekks</h1>
      {trips.map(trip => (
        <TripListItem key={trip.id} tripId={trip.id} />
      ))}
    </div>
  );
};

export default UserProfileTrips;
