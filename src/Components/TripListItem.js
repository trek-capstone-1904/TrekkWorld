import React from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import db from '../firebase';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

export const TripListItem = props => {
  const [value, loading, error] = useDocument(db.doc(`Trips/${props.tripId}`), {
    valueListenOptions: { includeMetadataChanges: true },
  });

  return (
    <>
      {error && <strong>Error: {error}</strong>}
      {loading && <span>Document: Loading...</span>}
      {value && (
        <ListGroup.Item>
          <Link to={`/trip/${props.tripId}`}>
            <h3>{value.data().tripName}</h3>
          </Link>
          {Object.entries(value.data().users).map(user => (
            <p key={user[0]}>{user[1]}</p>
          ))}
        </ListGroup.Item>
      )}
    </>
  );
};

export default TripListItem;
