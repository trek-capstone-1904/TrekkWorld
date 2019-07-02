import React from 'react';
import { Card, Button } from 'react-bootstrap';
import styles from './SearchAPICard.module.css';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import db from '../firebase';
// import { DocumentSnapshot } from '@google-cloud/firestore';

export const SearchAPICard = props => {
  //type = city if from query for top cities OR type= sights if for top sights in a city

  const { type, country } = props;
  const { name, snippet, score, intro } = props.sight;
  console.log('props:', props);
  // Users/cRClyp5mjI2WIH114XZk/BucketList

  //how can I query the collection only when an add to bucketlist button is clicked?
  //make the button a subcomponent
  const [snapshot, loading, error] = useCollectionOnce(
    db.collection('Places').where('name', '==', name),
    {
      valueListenOptions: { includeMetadataChanges: true },
    }
  );

  snapshot.docs.data();

  // const addToBucketList = () => {
  //   //check if place exists in db

  //   if (placeFound) {
  //     db.collection('Users')
  //       .doc('cRClyp5mjI2WIH114XZk')
  //       // TODO update so that it adapts to specific user
  //       //add it to the map
  //       .add(props.sight);
  //   }
  //if not create a new place w/ props

  //
  // };

  return (
    <Card style={{ margin: '.5rem 1rem' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{country}</Card.Subtitle>
        <Card.Text className={styles.cardText}>{snippet}</Card.Text>
        <Button
          style={{ margin: '0 1rem' }}
          variant="info"
          // onClick={addToBucketList}
        >
          + Bucket
        </Button>
        <Button style={{ margin: '0 1rem' }} variant="info">
          + Trekk List
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SearchAPICard;
