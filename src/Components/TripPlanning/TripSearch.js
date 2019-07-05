import React, { useState } from 'react';
import { CardGroup, Spinner } from 'react-bootstrap';
import db from '../../firebase';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import TripResultCard from '../Helper/TripResultCard';

export const TripSearch = props => {
  const { city, country } = props;
  const [snapshot, loading, error] = useCollectionOnce(
    db.collection('Trips').where('locations', 'array-contains', country),
    {
      valueListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <div>
      <CardGroup>
        {error && <strong>Error: {error}</strong>}
        {loading && <Spinner animation="grow" variant="info" />}
        {snapshot &&
          snapshot.docs.map(doc => (
            <TripResultCard key={doc.id} card={doc.data()} />
          ))}
      </CardGroup>
    </div>
  );
};

export default TripSearch;
