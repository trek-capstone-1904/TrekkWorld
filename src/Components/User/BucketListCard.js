import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import styles from '../SearchAPICard.module.css';
import userContext from '../../Contexts/userContext';
import db from '../../firebase';
import firebase from 'firebase/app';

export const BucketListCard = props => {
  const loggedInUser = useContext(userContext);
  const uid = loggedInUser.uid;
  const { tripId } = props;
  const { placeName, snippet, placeImage } = props.card;
  const placeId = props.placeId;
  return (
    <Card style={{ margin: '.5rem 1rem' }}>
      <Card.Body>
        <Card.Title>{placeName}</Card.Title>
        {placeImage && <img src={placeImage} alt="sight" />}
        <Card.Text className={styles.cardText}>{snippet}</Card.Text>
        <Button
          style={{ margin: '0 1rem' }}
          variant="info"
          onClick={() => handleClick(uid, placeId)}
        >
          - Bucket
        </Button>
        <Button
          style={{ margin: '0 1rem' }}
          variant="info"
          onClick={() => {
            handleClick(uid, placeId);
            addToTrekk(placeId, placeName, snippet, tripId);
          }}
        >
          + Trekk List
        </Button>
      </Card.Body>
    </Card>
  );
};

const handleClick = (uid, placeId) => {
  //remove entry from User.userId.bucketList
  db.collection('Users')
    .doc(uid)
    .update({
      [`bucketList.${placeId}`]: firebase.firestore.FieldValue.delete(),
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
};

export default BucketListCard;
