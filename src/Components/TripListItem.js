import React from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import db from '../firebase';

export const TripListItem = props => {
  const [value, loading, error] = useDocument(db.doc(`Trips/${props.tripId}`), {
    valueListenOptions: { includeMetadataChanges: true },
  });

  console.log(value && value.data());
  // if()
  return (
    <>
      {error && <strong>Error: {error}</strong>}
      {loading && <span>Document: Loading...</span>}
      {/* {value && <span>Document: {JSON.stringify(value.data())}</span>} */}
      {value && <span>{value.data().Name}</span>}
    </>
  );
};

export default TripListItem;
