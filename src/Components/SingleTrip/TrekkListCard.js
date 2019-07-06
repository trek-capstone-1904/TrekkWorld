import React, { useContext } from 'react';
import { Card, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import styles from '../SearchAPICard.module.css';
import userContext from '../../Contexts/userContext';
import db from '../../firebase';
import firebase from 'firebase/app';

export const TrekkListCard = props => {
  const loggedInUser = useContext(userContext);
  const uid = loggedInUser.uid;
  const { tripId, placeId } = props;
  const { placeName, snippet } = props.card;
  return (
    <Card style={{ margin: '.5rem 1rem' }}>
      <Card.Body>
        <Card.Title>{placeName}</Card.Title>
        <Card.Text className={styles.cardText}>{snippet}</Card.Text>
        <Button
          style={{ margin: '0 1rem' }}
          variant="info"
          onClick={() => handleClick(tripId, placeId)}
        >
          - Trekk List
        </Button>
      </Card.Body>
    </Card>
  );
};

const handleClick = (tripId, placeId) => {
  //remove entry from Trips.tripId.TrekkList.placeId
  db.collection('Trips')
    .doc(tripId)
    .collection('TrekkList')
    .doc(placeId)
    .delete();
};

export default TrekkListCard;
