import React, { useContext } from 'react';
import { Card, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import styles from '../SearchAPICard.module.css';
import userContext from '../../Contexts/userContext';
import db from '../../firebase';
import firebase from 'firebase/app';

export const TrekkListCard = props => {
  const loggedInUser = useContext(userContext);
  const uid = loggedInUser.uid;
  const { trekk } = props;
  const { placeName, snippet } = props.card;
  const placeId = props.placeId;
  console.log('trekk on listCard Props', trekk);
  return (
    <Card style={{ margin: '.5rem 1rem' }}>
      <Card.Body>
        <Card.Title>{placeName}</Card.Title>
        <Card.Text className={styles.cardText}>{snippet}</Card.Text>
        <Button
          style={{ margin: '0 1rem' }}
          variant="info"
          onClick={() => handleClick(uid, placeId)}
        >
          - Trekk List
        </Button>
        {/* <Button
          style={{ margin: '0 1rem' }}
          variant="info"
          onClick={() => {
            addToTrekk(uid, placeId, placeName, snippet, trekk);
          }}
        >
          + Trip
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
      [`trekkList.${placeId}`]: firebase.firestore.FieldValue.delete(),
    });
};

const queryTrips = userRef => {
  db.doc(`Users/${userRef}`);
};

const addToTrekk = (userRef, placeId, placeName, snippet, trip) => {
  db.doc(`Users/${userRef}`).update({
    [`Trips.${trip}.${placeId}`]: {
      placeName: placeName,
      snippet: snippet,
    },
  });
};

export default TrekkListCard;
