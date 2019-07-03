import React from 'react';
import { Card, Button } from 'react-bootstrap';
import styles from '../SearchAPICard.module.css';

export const BucketListCard = props => {
  //type = city if from query for top cities OR type= sights if for top sights in a city
  const { type, country } = props;
  const { name, snippet, score, intro } = props.sight;

  return (
    <Card style={{ margin: '.5rem 1rem' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{country}</Card.Subtitle>
        <Card.Text className={styles.cardText}>{snippet}</Card.Text>
        <Button style={{ margin: '0 1rem' }} variant="info">
          - Bucket
        </Button>
        <Button style={{ margin: '0 1rem' }} variant="info">
          + Trekk List
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BucketListCard;
