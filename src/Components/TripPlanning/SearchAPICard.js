import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import styles from '../SearchAPICard.module.css';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import db from '../../firebase';
import userContext from '../../Contexts/userContext';

export const SearchAPICard = props => {
  //type = city if from query for top cities OR type= sights if for top sights in a city

  const { type, country } = props;
  const { name, snippet, score, intro, id } = props.sight;
  console.log('props:', props);

  const loggedInUser = useContext(userContext);
  console.log('loggedInUser', loggedInUser);

  return (
    <Card style={{ margin: '.5rem 1rem' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{country}</Card.Subtitle>
        <Card.Text className={styles.cardText}>{snippet}</Card.Text>
        <Button
          style={{ margin: '0 1rem' }}
          variant="info"
          onClick={() => handleClick(props, loggedInUser.uid)}
        >
          + Bucket
        </Button>
        <Button style={{ margin: '0 1rem' }} variant="info">
          + Trekk List
        </Button>
      </Card.Body>
    </Card>
  );
};

const handleClick = (props, uid) => {
  //query Places
  const placeRef = db.collection('Places').doc(props.sight.id);
  const userRef = db.collection('Users').doc(uid);
  console.log('placeRef', placeRef);
  console.log('userRef', userRef);

  const { name, snippet } = props.sight;

  placeRef
    .get()
    .then(function(doc) {
      if (doc.exists) {
        //add the props.id to the user
        console.log('Document data:', doc.data());

        addToBucketList(uid, props.sight.id, name, snippet);
      } else {
        // doc is created in 'Places' collection
        console.log('Place document did not exist');
        db.collection('Places')
          .doc(props.sight.id)
          .set(props)
          .then(function() {
            console.log('Document successfully written!');
          })
          .catch(function(error) {
            console.error('Error writing document: ', error);
          });
        addToBucketList(uid, props.sight.id, name, snippet);
      }
    })
    .catch(function(error) {
      console.log('Error getting document:', error);
    });
};

const addToBucketList = async (userRef, placeId, placeName, snippet) => {
  console.log(
    'userRef, placeId, placeName, snippet',
    `${userRef}`,
    `${placeId}`,
    placeName,
    snippet
  );
  const userDoc = await db.doc(`Users/${userRef}`).update({
    [`bucketList.${placeId}`]: {
      placeName: placeName,
      snippet: snippet,
    },
  });
  console.log(userDoc);
};

export default SearchAPICard;

// const userTrip = await db.doc(`Users/${userRef}`).update({
//   [`bucketList.${placeRef}`]: {
//     tripName: values.tripName,
//     startDate: values.startDate,
//     endDate: values.endDate,
//   },
// });

// const userTrip = await db.doc(`Users/${userId}`).update({
//   [`Trips.${tripDocId}`]: {
//     tripName: values.tripName,
//     startDate: values.startDate,
//     endDate: values.endDate,
//   },
// });
