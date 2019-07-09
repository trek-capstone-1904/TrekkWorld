import React, { useContext } from 'react';
import { CardGroup, Spinner } from 'react-bootstrap';
import db from '../../firebase';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import TripResultCard from '../Helper/TripResultCard';
import userContext from '../../Contexts/userContext';

export const TripSearch = props => {
  console.log('props in tripsearch', props);
  const loggedInUser = useContext(userContext);
  const { uid } = loggedInUser;
  const { city, country } = props;

  const [snapshot, loading, error] = useCollectionOnce(
    db.collection('Trips').where('locations', 'array-contains', country),
    {
      valueListenOptions: { includeMetadataChanges: true },
    }
  );

  // console.log(
  //   'doc.data() from tripSearch',
  //   snapshot &&
  //     snapshot.docs
  //       .filter(doc =>
  //         Object.keys(doc.data().users).reduce((accum, elem) => {
  //           if (elem === uid) {
  //             accum = false;
  //           }
  //           return accum;
  //         }, true)
  //       )
  //       .map(doc => (
  //         <TripResultCard key={doc.id} tripId={doc.id} card={doc.data()} />
  //       ))
  // );

  // .filter(doc => (!doc.data().users.uid) )
  // .filter(doc => Object.keys(doc.data().users).reduce((accum, elem) => {if(elem === uid){ accum = true} return accum},false )) )

  return (
    <div>
      {/* {error && <strong>Error: {error}</strong>}
      {loading && <Spinner animation="grow" variant="info" />}
      {snapshot &&
        snapshot.docs
          .filter(doc =>
            Object.keys(doc.data().users).reduce((accum, elem) => {
              if (elem === uid) {
                accum = false;
              }
              return accum;
            }, true)
          )
          .map(doc => (
            <TripResultCard key={doc.id} tripId={doc.id} card={doc.data()} />
          ))} */}
    </div>
  );
};

export default TripSearch;
