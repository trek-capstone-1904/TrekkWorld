import React, { useState } from 'react';
import {
  InputGroup,
  Button,
  FormControl,
  CardGroup,
  Spinner,
} from 'react-bootstrap';
import db from '../firebase';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import TripResultCard from './TripResultCard';

export const TripSearch = props => {
  const { city } = props;
  const [snapshot, loading, error] = useCollectionOnce(
    db.collection('Trips').where('locations', 'array-contains', city),
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
          snapshot.docs.map(doc => <TripResultCard card={doc.data()} />)}
        {console.log(snapshot)}
      </CardGroup>
    </div>
  );
};

export default TripSearch;
