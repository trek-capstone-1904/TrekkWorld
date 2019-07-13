import React from 'react';
import { useDocument, useCollection } from 'react-firebase-hooks/firestore';

export const Toast = (props) => {
  const {tripId} = props
  const [trekk, loading, error] = useCollection(
    db
      .collection('Trips')
      .doc(tripId)
      .collection('TrekkList'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  return <div />;
};

export default Toast;
