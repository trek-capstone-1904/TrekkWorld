// create a functional component
// create a "write Query" => this will be on the add to bucketList button on SearchAPI Card
// make a subcollection for BucketList in the db

import React, { useState } from 'react';
import { CardGroup, SearchAPICard } from 'react-bootstrap';
import db from '../../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import {BucketListCard} from '../index'


export const BucketList = () => {
  const [value, loading, error] = useCollection(
    db
      .collection('Users')
      .doc('cRClyp5mjI2WIH114XZk')
      .collection('BucketList'),
    {
      valueListenOptions: { includeMetadataChanges: true },
    }
  );
  // console.log('snapshot', snapshot);
  return (
    <div>
      {/* <CardGroup> */}
      {/* {error && <strong>Error: {error}</strong>}
        {loading && <span>Document: Loading...</span>} */}

      {/* {snapshot && snapshot.docs.map(doc => <BucketListCard card={doc.data()} />)} */}
      {/* </CardGroup> */}
      {/* <p>
        {value && (
           <span>
            {value.docs.map(doc => (
          <BucketListCard key={doc.id} card={doc.data()}>
           ))}
          </span>
         )}
      </p> */}
    </div>
  );
};

export default BucketList;

// db
//       .collection('Users')
//       .doc('cRClyp5mjI2WIH114XZk') //TODO make id dynamic
//       .collection('BucketList')
//       .doc('cSwjQgwvpkWNj3ijgIoz')
