import React from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import db from '../firebase';
import TripListItem from './TripListItem'



export const UserProfileHook = () => {
  const [value, loading, error] = useDocument(
    db.doc('Users/lQNWEtdOGjXlIdmUIRb9'),
    {
      valueListenOptions: { includeMetadataChanges: true },
    }
  );

  // console.log(value && value.data())
  // if()
  return (
    <div>
      <p>
        {error && <strong>Error: {error}</strong>}
        {loading && <span>Document: Loading...</span>}
        {/* {value && <span>Document: {JSON.stringify(value.data())}</span>} */}
        {value && Object.keys(value.data().Trips).map(trip=>(
          <TripListItem key={trip} tripId={trip}></TripListItem>
        ))}
      </p>
    </div>
  );
};

export default UserProfileHook;
