// create a functional component
// create a "write Query" => this will be on the add to bucketList button on SearchAPI Card
// make a subcollection for BucketList in the db

import React, { useContext } from 'react';
import { CardGroup, SearchAPICard } from 'react-bootstrap';
import db from '../../firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { BucketListCard } from '../index';
import userContext from '../../Contexts/userContext';

export const BucketList = () => {
  const loggedInUser = useContext(userContext);

  console.log('loggedInUser.uid', loggedInUser.uid);
  const [snapshot, loading, error] = useDocument(
    db.collection('Users').doc(`${loggedInUser.uid}`),
    {
      snapshotListenOptions: { includeMetadataChanges: false },
    }
  );

  console.log('snapshot', snapshot);
  // return <div>Its working</div>;
  // if (snapshot) {
  //   let bucketListKeys = ;
  // }
  // for (let i = 0; i < bucketListKeys.length; i++) {
  //   const key = bucketListKeys[i];
  //   console.log(
  //     'This is snapshot.data() of each key',
  //     snapshot.data().bucketList[key]
  //   );
  // }

  return (
    <div>
      <CardGroup>
        {error && <strong>Error: {error}</strong>}
        {loading && <span>Document: Loading...</span>}
        {snapshot && snapshot.data().bucketList && (
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

// db
//       .collection('Users')
//       .doc('cRClyp5mjI2WIH114XZk') //TODO make id dynamic
//       .collection('BucketList')
//       .doc('cSwjQgwvpkWNj3ijgIoz')
