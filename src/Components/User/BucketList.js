import React, { useContext } from 'react';
import { CardGroup } from 'react-bootstrap';
import db from '../../firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { BucketListCard } from '../index';
import userContext from '../../Contexts/userContext';

export const BucketList = () => {
  const loggedInUser = useContext(userContext);

  const [snapshot, loading, error] = useDocument(
    db.collection('Users').doc(`${loggedInUser.uid}`),
    {
      snapshotListenOptions: { includeMetadataChanges: false },
    }
  );

  return (
    <div>
      <CardGroup>
        {error && <strong>Error: {error}</strong>}
        {loading && <span>Document: Loading...</span>}
        {snapshot && (
          <span>
            {Object.keys(snapshot.data().bucketList).map(key => {
              return (
                <BucketListCard
                  key={key}
                  placeId={key}
                  card={snapshot.data().bucketList[key]}
                />
              );
            })}
          </span>
        )}
      </CardGroup>
    </div>
  );
};

export default BucketList;
