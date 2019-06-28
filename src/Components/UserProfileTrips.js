import React from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import db from '../firebase';
import TripListItem from './TripListItem';

export const UserProfileTrips = () => {
  const [value, loading, error] = useDocument(
    db.doc('Users/lQNWEtdOGjXlIdmUIRb9'),
    {
      valueListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <div>
      {error && <strong>Error: {error}</strong>}
      {loading && <span>Document: Loading...</span>}
      {value &&
        Object.keys(value.data().Trips).map(trip => (
          <TripListItem key={trip} tripId={trip} />
        ))}
    </div>
  );
};

export default UserProfileTrips;
