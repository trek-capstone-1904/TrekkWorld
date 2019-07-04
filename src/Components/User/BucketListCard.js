import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import styles from '../SearchAPICard.module.css';
import userContext from '../../Contexts/userContext';
import db from '../../firebase';
import firebase from 'firebase/app';

export const BucketListCard = props => {
  const loggedInUser = useContext(userContext);
  const uid = loggedInUser.uid;

  const { placeName, snippet } = props.card;
  const placeId = props.placeId;
  return (
    <Card style={{ margin: '.5rem 1rem' }}>
      <Card.Body>
        <Card.Title>{placeName}</Card.Title>
        {/* <Card.Subtitle className="mb-2 text-muted">{country}</Card.Subtitle> */}
        <Card.Text className={styles.cardText}>{snippet}</Card.Text>
        <Button
          style={{ margin: '0 1rem' }}
          variant="info"
          onClick={() => handleClick(uid, placeId)}
        >
          - Bucket
        </Button>
        <Button style={{ margin: '0 1rem' }} variant="info">
          + Trekk List
        </Button>
      </Card.Body>
    </Card>
  );
};

const handleClick = (uid, placeId) => {
  //remove entry from User
  const userRef = db.collection('Users').doc(uid);
  console.log('handleClick has executed', placeId);
  console.log(userRef)
  // Remove the 'capital' field from the document
  const removeBucketListItem = userRef.update({

    [`${placeId}`]: firebase.firestore.FieldValue.delete(),
  });
};

export default BucketListCard;
