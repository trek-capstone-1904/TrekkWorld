import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import styles from '../SearchAPICard.module.css';
import db from '../../firebase';
import userContext from '../../Contexts/userContext';

export const SearchAPICard = props => {
  //type = city if from query for top cities OR type= sights if for top sights in a city

  const { country } = props;
  const { name, snippet } = props.sight;
  const { tripId } = props;
  const loggedInUser = useContext(userContext);

  return (
    <Card style={{ margin: '.5rem 1rem' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{country}</Card.Subtitle>
        <Card.Text className={styles.cardText}>{snippet}</Card.Text>
        <Button
          style={{ margin: '0 1rem' }}
          variant="info"
          onClick={() => handleClick(props, loggedInUser.uid, 'bucketList')}
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

const handleClick = (props, uid, list) => {
  //query Places
  const placeRef = db.collection('Places').doc(props.sight.id);
  const userRef = db.collection('Users').doc(uid);

  const { name, snippet } = props.sight;

  placeRef
    .get()
    .then(function(doc) {
      if (doc.exists) {
        //add the props.id to the user
        console.log('Document data:', doc.data());
        if (list === 'bucketList') {
          addToBucketList(uid, props.sight.id, name, snippet, list);
        } else {
          addToTrekk(props.sight.id, name, snippet, list);
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
        if (list === 'bucketList') {
          addToBucketList(uid, props.sight.id, name, snippet, list);
        } else {
          addToTrekk(props.sight.id, name, snippet, list);
        }
      }
    })
    .catch(function(error) {
      console.log('Error getting document:', error);
    });
};

const addToBucketList = (userRef, placeId, placeName, snippet, list) => {
  db.doc(`Users/${userRef}`).update({
    [`${list}.${placeId}`]: {
      placeName: placeName,
      snippet: snippet,
    },
  });
};

const addToTrekk = (placeId, placeName, snippet, tripId) => {
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

  // db.doc(`Trips/${trekk}`)
};

export default SearchAPICard;
