// create a functional component
// create a "write Query" => this will be on the add to bucketList button on SearchAPI Card
// make a subcollection for BucketList in the db

import React, { useState } from 'react';
import { CardGroup, SearchAPICard } from 'react-bootstrap';
import db from '../firebase';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import BucketListCard from './BucketListCard';

export const BucketList = props => {
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
        {loading && <span>Document: Loading...</span>}
        {snapshot &&
          snapshot.docs.map(doc => <BucketListCard card={doc.data()} />)}
        {console.log(snapshot)}
      </CardGroup>
    </div>
  );
};

export default BucketList;
