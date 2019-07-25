import React, { useContext } from 'react';
import { CardGroup } from 'react-bootstrap';
import db from '../../firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { BucketListCard } from '../index';
import userContext from '../../Contexts/userContext';

export const BucketList = props => {
  const loggedInUser = useContext(userContext);
  const { tripId } = props;
  const [snapshot, loading, error] = useDocument(
    db.collection('Users').doc(`${loggedInUser.uid}`),
    {
      snapshotListenOptions: { includeMetadataChanges: false },
    }
  );

  return (
    <div style={{ justifyContent: 'space-around' }}>
      <hr />
      <h1 style={{ color: 'gray' }}>My Bucket List</h1>
      <CardGroup>
        {error && <strong>Error: {error}</strong>}
        {loading && <span>Document: Loading...</span>}
        {/* //TODO: add spinner */}
        {snapshot &&
          snapshot.data().bucketList &&
          Object.keys(snapshot.data().bucketList).map(key => {
            return (
              <BucketListCard
                key={key}
                placeId={key}
                tripId={tripId}
                card={snapshot.data().bucketList[key]}
              />
            );
          })

        }
      </CardGroup>
    </div>
  );
};

export default BucketList;
