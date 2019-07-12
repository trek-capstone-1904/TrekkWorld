import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import styles from '../SearchAPICard.module.css';
import userContext from '../../Contexts/userContext';
import db from '../../firebase';
import firebase from 'firebase/app';
import * as secret from '../../secrets';
import style from '../UserProfile.module.css';

export const BucketListCard = props => {
  const loggedInUser = useContext(userContext);
  const uid = loggedInUser.uid;
  // const { tripId } = props;
  const { placeName, snippet, placeImage } = props.card;
  const placeId = props.placeId;

  let snippetShort;
  if (snippet.length > 140) {
    snippetShort = snippet.substr(0, snippet.indexOf('.') + 1);
  } else {
    snippetShort = snippet;
  }
  return (
    <Card>
      <Card.Img
        className={style.BucketCardImage}
        src={`${placeImage}&key=${secret.places}`}
      />
      <Card.ImgOverlay>
        <Card.Text className={style.BucketCardText}>{placeName}</Card.Text>
      <Button
      className={style.BucketButton}

        onClick={() => handleClick(uid, placeId)}
      >
        Remove
      </Button>
      </Card.ImgOverlay>
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
