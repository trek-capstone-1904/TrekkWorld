import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import styles from '../SearchAPICard.module.css';
import userContext from '../../Contexts/userContext';
import db from '../../firebase';
import firebase from 'firebase/app';
import * as secret from '../../secrets';

export const BucketListCard = props => {
  const loggedInUser = useContext(userContext);
  const uid = loggedInUser.uid;
  const { tripId } = props;
  const { placeName, snippet, placeImage } = props.card;
  const placeId = props.placeId;

  let snippetShort;
  if (snippet.length > 140) {
    snippetShort = snippet.substr(0, snippet.indexOf('.') + 1);
  } else {
    snippetShort = snippet;
  }
  return (
    <Card
      style={{ margin: '.5rem 1rem', maxHeight: '20rem', maxWidth: '15rem' }}
    >
      <Card.Body>
        <Card.Title>{placeName}</Card.Title>
        {placeImage && (
          <img src={`${placeImage}&key=${secret.places}`} alt="sight" />
        )}
        <Card.Text className={styles.cardText}>{snippetShort}</Card.Text>
        <Button
          style={{ margin: '0 1rem' }}
          variant="info"
          onClick={() => handleClick(uid, placeId)}
        >
          Remove
        </Button>
        {/* <Button
          style={{ margin: '0 1rem' }}
          variant="info"
          onClick={() => {
            handleClick(uid, placeId);
            addToTrekk(placeId, placeName, snippet, tripId);
          }}
        >
          + Trekk List
        </Button> */}
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
