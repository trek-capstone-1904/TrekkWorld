import React, { useContext } from 'react';
import userContext from '../../Contexts/userContext';
import { CardGroup, Spinner } from 'react-bootstrap';
import db from '../../firebase';
import { BucketListCard } from '../index';
import { useCollection } from 'react-firebase-hooks/firestore';
import TrekkListCard from './TrekkListCard';
import { validateArgCount } from '@firebase/util';

export const TrekkList = props => {
  const { tripId } = props;

  console.log('tripId on trekklist', tripId && tripId[0].key);
  // console.log('trekk List props', props);

  const [value, loading, error] = useCollection(
    db
      .collection('Trips')
      .doc(tripId)
      .collection('TrekkList'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <div>
      {error && <strong>Error: {error}</strong>}
      {loading && <Spinner animation="grow" variant="info" />}
      {value && (
        <span>
          {value.docs
            .filter(doc => !doc.data().locations)
            .map(doc => (
              <TrekkListCard
                key={doc.id}
                placeId={doc.id}
                card={doc.data()}
                tripId={tripId}
              />
            ))}
        </span>
      )}
    </div>
  );
};

export default TrekkList;
