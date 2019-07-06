import React, { useContext } from 'react';
import { CardGroup, Spinner } from 'react-bootstrap';
import db from '../../firebase';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import TripResultCard from '../Helper/TripResultCard';
import userContext from '../../Contexts/userContext';

export const TripSearch = props => {
  const loggedInUser = useContext(userContext);
  const { uid } = loggedInUser;
  const { city, country } = props;
  const [snapshot, loading, error] = useCollectionOnce(
    db.collection('Trips').where('locations', 'array-contains', country),
    // .where('users', '!=', uid),
    {
      valueListenOptions: { includeMetadataChanges: true },
    }
  );
  console.log(
    'doc.data() from tripSearch',
    snapshot && snapshot.docs.map(doc => doc.data())
  );
  return (
    <div>
      {error && <strong>Error: {error}</strong>}
      {loading && <Spinner animation="grow" variant="info" />}
      {snapshot &&
        snapshot.docs.map(doc => (
          <TripResultCard key={doc.id} tripId={doc.id} card={doc.data()} />
        ))}
    </div>
  );
};

export default TripSearch;
