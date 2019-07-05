import React, { useContext } from 'react';
import userContext from '../../Contexts/userContext';
import { CardGroup } from 'react-bootstrap';
import db from '../../firebase';
import { BucketListCard } from '../index';
import { useDocument } from 'react-firebase-hooks/firestore';
import TrekkListCard from './TrekkListCard';

export const BorTList = props => {
  const loggedInUser = useContext(userContext);
  const { list } = props;
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
            {snapshot.data()[`${list}`] && (
              <p style={{ fontSize: '.8rem', fontStyle: 'italic', padding:'.2rem' }}>
                Add places you'd love to visit one day but haven't planned a trip there yet
              </p>
            )}
            {snapshot.data()[`${list}`] &&
              Object.keys(snapshot.data()[`${list}`]).map(key => {
                if (list === 'bucketList') {
                  return (
                    <BucketListCard
                      key={key}
                      placeId={key}
                      card={snapshot.data()[`${list}`][key]}
                    />
                  );
                } else if (list === 'trekkList') {
                  return (
                    <TrekkListCard
                      key={key}
                      placeId={key}
                      card={snapshot.data()[`${list}`][key]}
                    />
                  );
                }
              })}
          </span>
        )}
      </CardGroup>
    </div>
  );
};

export default BorTList;
