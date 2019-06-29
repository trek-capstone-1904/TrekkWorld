import React, { useState } from 'react';
import { ListGroup, InputGroup } from 'react-bootstrap';
import db from '../firebase';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';


export const  TripSearch = () => {
  
  const [value, setValue] = useState('');


  var searchTerm = "Lima"
  var tripsRef = db.collection("places");

  tripsRef.where("locations", "==", searchTerm) 
  
  return (
    <div>
      <InputGroup className="mb-3">
  <FormControl
    placeholder="Recipient's username"
    aria-label="Recipient's username"
    aria-describedby="basic-addon2"
  />
  <InputGroup.Append>
    <Button variant="outline-secondary" value={`${value}`}>Search</Button>
  </InputGroup.Append>
  </InputGroup>
      <ListGroup>
        {this.state.trips.map(trip => (
          <Trips key={trip} trip={trip} />
        ))}
      </ListGroup>
    </div>
  );
  
}

var tripLocationSearch = db.collectionGroup('trip_places')
.where('location_id', '===', searchTerm);
tripLocationSearch.get().then(function (querySnapshot) {
 // Do something with these reviews!
 console.log(querySnapshot)
})

const [values, loading, error] = useCollectionDataOnce(db.collection('Trips'), options)

const [value, loading, error] = useDocument(
db.doc('Users/lQNWEtdOGjXlIdmUIRb9'),
{
  valueListenOptions: { includeMetadataChanges: true },
}
);


export default UserProfile;

export const UserProfileTrips = () => {
 

  return (
    <div>
      {error && <strong>Error: {error}</strong>}
      {loading && <span>Document: Loading...</span>}
      {value &&
        Object.keys(value.data().Trips).map(trip => (
          <TripListItem key={trip} tripId={trip} />
        ))}
    </div>
  );
};

export default UserProfileTrips;

// import React, { useState, useEffect } from 'react';

// function FriendStatus(props) {
//   const [isOnline, setIsOnline] = useState(null);

//   function handleStatusChange(status) {
//     setIsOnline(status.isOnline);
//   }

//   useEffect(() => {
//     ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

//     return () => {
//       ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
//     };
//   });

//   if (isOnline === null) {
//     return 'Loading...';
//   }
//   return isOnline ? 'Online' : 'Offline';
// }



