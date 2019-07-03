import React from 'react';
import TripListItem from './TripListItem';


export const UserProfileTrips = props => {
  return (
    <div style={{width:"33vw"}}>
      <h1>My Trekks</h1>
      {Object.keys(props.trips).map(trip => (
        <TripListItem key={trip} tripId={trip} />
      ))}
    </div>
  );
};

export default UserProfileTrips;
