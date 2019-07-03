import React from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import db from '../../firebase';
import { Link } from 'react-router-dom';
import { ListGroup, Spinner, CardGroup } from 'react-bootstrap';
import TripResultCard from '../Helper/TripResultCard';

export const TripListItem = props => {
  const [value, loading, error] = useDocument(db.doc(`Trips/${props.tripId}`), {
    valueListenOptions: { includeMetadataChanges: true },
  });

  return (
    <>
      {error && <strong>Error: {error}</strong>}
      {loading && <Spinner animation="grow" variant="info" />}
      {value && (
        <CardGroup>
          <TripResultCard card={value.data()} />
        </CardGroup>
      )}
    </>
  );
};

export default TripListItem;
