import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import styles from '../SearchAPICard.module.css';
import db from '../../firebase';
import userContext from '../../Contexts/userContext';
import firebase from 'firebase/app';

export const SearchAPICard = props => {
  //type = city if from query for top cities OR type= sights if for top sights in a city
  const { country } = props;
  const { name, snippet } = props.sight;
  const { tripId } = props;
  const loggedInUser = useContext(userContext);
  console.log('tripId on searchAPIcard', tripId);

  // const placeImage =

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
        <Button
          style={{ margin: '0 1rem' }}
          variant="info"
          onClick={() => handleClick(props, loggedInUser.uid, tripId)}
        >
          + Trekk List
        </Button>
      </Card.Body>
    </Card>
  );
};

//use a generic handleClick so that it adds a new place to the place db
// after it adds the place to the db, it assigns the place to either the bucketList or the TrekkList

const handleClick = (props, uid, tripId) => {
  //query Places
  const placeRef = db.collection('Places').doc(props.sight.id);

  const { name, snippet } = props.sight;

  placeRef
    .get()
    .then(function(doc) {
      if (doc.exists) {
        //add the props.id to the user
        console.log('Document data:', doc.data());
        if (tripId) {
          addToTrekk(uid, props.sight.id, name, snippet, tripId);
        } else {
          addToBucketList(uid, props.sight.id, name, snippet);
        }
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
        if (tripId) {
          addToTrekk(uid, props.sight.id, name, snippet, tripId);
        } else {
          addToBucketList(uid, props.sight.id, name, snippet);
        }
      }
    })
    .catch(function(error) {
      console.log('Error getting document:', error);
    });
};

const addToBucketList = (uid, placeId, placeName, snippet) => {
  db.doc(`Users/${uid}`).update({
    [`bucketList.${placeId}`]: {
      placeName: placeName,
      snippet: snippet,
    },
  });
};

const addToTrekk = (uid, placeId, placeName, snippet, tripId) => {
  //add to Trekklist
  db.collection('Trips')
    .doc(`${tripId}`)
    .collection('TrekkList')
    .doc(`${placeId}`)
    .set(
      {
        placeName: placeName,
        snippet: snippet,
      },
      { merge: true }
    );

  //delete from bucketList
  db.collection('Users')
    .doc(uid)
    .update({
      [`bucketList.${placeId}`]: firebase.firestore.FieldValue.delete(),
    });
};

export default SearchAPICard;
