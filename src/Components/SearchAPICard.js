import React from 'react';
import { Card, Button } from 'react-bootstrap';
import styles from './SearchAPICard.module.css';
import db from '../firebase';

export const SearchAPICard = props => {
  //type = city if from query for top cities OR type= sights if for top sights in a city
  const { type } = props;
  const { name, country, snippet, score, intro } = props.sight;
  console.log(props);
  // Users/cRClyp5mjI2WIH114XZk/BucketList
  const addToBucketList = () => {
    db.collection('Users')
      .doc('LAcRClyp5mjI2WIH114XZk') // TODO
      .collection('BucketList')
      .set({
        name: 'Los Angeles',
        state: 'CA',
        country: 'USA',
      });
  };

  return (
    <Card style={{ margin: '.5rem 1rem' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{country}</Card.Subtitle>
        <Card.Text className={styles.cardText}>{snippet}</Card.Text>
        <Button
          style={{ margin: '0 1rem' }}
          variant="info"
          onClick={addToBucketList}
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
