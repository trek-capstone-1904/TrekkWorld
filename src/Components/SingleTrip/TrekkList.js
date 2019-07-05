import React, { useContext } from 'react';
import userContext from '../../Contexts/userContext';
import { CardGroup } from 'react-bootstrap';
import db from '../../firebase';
import { BucketListCard } from '../index';
import { useDocument } from 'react-firebase-hooks/firestore';
import TrekkListCard from './TrekkListCard';

export const TrekkList = props => {
  const loggedInUser = useContext(userContext);
  const { list } = props;
  const { tripId } = props;

  // const [snapshot, loading, error] = useDocument(
  //   db.collection('Users').doc(`${loggedInUser.uid}`),
  //   {
  //     snapshotListenOptions: { includeMetadataChanges: false },
  //   }
  // );
  // const [snapshot, loading, error] = useCollection(
  //   db.collection('Trips').doc(tripId).collection(''),
  //   {
  //     snapshotListenOptions: { includeMetadataChanges: true },
  //   }
  // );
  // console.log(
  //   'TrekkList Snapshot: ',
  //   snapshot.data() && Object.keys(snapshot.data())
  // );
  return (
    <div>
      {/* <CardGroup>
        {error && <strong>Error: {error}</strong>}
        {loading && <span>Document: Loading...</span>}
        {snapshot && (
          <span>
            {snapshot.data() &&
              Object.keys(snapshot.data()).map(card => (
                <TrekkListCard
                  key={card.id}
                  placeId={card.id}
                  card={card}
                  tripId={tripId}
                />
              ))}
          </span>
        )}
      </CardGroup> */}
    </div>
  );
};

export default TrekkList;
