import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import styles from '../SearchAPICard.module.css';
import db from '../../firebase';
import userContext from '../../Contexts/userContext';

export const TripResultPlaceCard = props => {
  const { placeName, snippet } = props.card;
  const { tripId, placeId } = props;
  const loggedInUser = useContext(userContext);
  const { uid } = loggedInUser;

  console.log('tripId on TripResultPlaceCard', tripId);
  return (
    <Card style={{ margin: '.5rem 1rem' }}>
      <Card.Body>
        <Card.Title>{placeName}</Card.Title>
        <Card.Text className={styles.cardText}>{snippet}</Card.Text>
        <Button
          style={{ margin: '0 1rem' }}
          variant="info"
          onClick={() => addToBucketList(uid, placeId, placeName, snippet)}
        >
          + Bucket
        </Button>
        <Button
          style={{ margin: '0 1rem' }}
          variant="info"
          onClick={() => addToTrekk(uid, placeId, placeName, snippet, tripId)}
        >
          + Trekk List
        </Button>
      </Card.Body>
    </Card>
  );
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
};

export default TripResultPlaceCard;
