import React from 'react';
import db from '../../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

import { Card, Image } from 'react-bootstrap';
import { PhotoLoad } from '../index';

export const TripAlbum = props => {
  const [value, loading, error] = useCollection(
    db
      .collection('Trips')
      .doc(props.tripId)
      .collection('Images'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  // console.log(value && value.docs());
  return (
    <Card style={{ maxWidth: '33rem' }}>
      <Card.Header>Trip Album</Card.Header>
      <Card.Body>
        {value && (
          <span>
            {value.docs.map(doc => (
              // console.log(doc.data().URL)
              <Image
                style={{ maxHeight: '7rem', margin:'.2rem' }}
                key={doc.id}
                src={doc.data().URL}
                thumbnail
              />
            ))}
          </span>
        )}
      </Card.Body>
      <Card.Footer>
        <PhotoLoad from="trip" tripId={props.tripId} />
      </Card.Footer>
    </Card>
  );
};

export default TripAlbum;
