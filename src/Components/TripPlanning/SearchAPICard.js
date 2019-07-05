import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import styles from '../SearchAPICard.module.css';
import db from '../../firebase';
import userContext from '../../Contexts/userContext';

export const SearchAPICard = props => {
  //type = city if from query for top cities OR type= sights if for top sights in a city
  const { country } = props;
  const { name, snippet } = props.sight;

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
          onClick={() => handleClick(props, loggedInUser.uid, 'trekkList')}
        >
          + Trekk List
        </Button>
      </Card.Body>
    </Card>
  );
};

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

        addToList(uid, props.sight.id, name, snippet, list);
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
        addToList(uid, props.sight.id, name, snippet, list);
      }
    })
    .catch(function(error) {
      console.log('Error getting document:', error);
    });
};

const addToList = (userRef, placeId, placeName, snippet, list) => {
  db.doc(`Users/${userRef}`).update({
    [`${list}.${placeId}`]: {
      placeName: placeName,
      snippet: snippet,
    },
  });
};

export default SearchAPICard;
