import React from 'react';
import { useDocument, useCollection } from 'react-firebase-hooks/firestore';
import db from '../../firebase';

export const Toast = props => {
  const { tripId } = props;

  // const [trekk, loading, error] = useCollection(
  //   db
  //     .collection('Trips')
  //     .doc(tripId)
  //     .collection('TrekkList'),
  //   {
  //     snapshotListenOptions: { includeMetadataChanges: true },
  //   }
  // );
  db.collection('Trips')
    .doc(tripId)
    .collection('TrekkList')
    .onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
        if (change.type === 'added') {
          console.log('New place: ', change.doc.data());
        }
        if (change.type === 'modified') {
          console.log('Modified place: ', change.doc.data());
        }
        if (change.type === 'removed') {
          console.log('Removed city: ', change.doc.data());
        }
      });
    });

  return (
    <div>hi</div>
    // <Toast show={showA} onClose={toggleShowA}>
    //   <Toast.Header>
    //     <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
    //     <strong className="mr-auto">Bootstrap</strong>
    //     <small>11 mins ago</small>
    //   </Toast.Header>
    //   <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
    // </Toast>
  );
};

export default Toast;
