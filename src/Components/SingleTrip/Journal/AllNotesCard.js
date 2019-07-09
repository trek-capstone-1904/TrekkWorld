import React from 'react';
import { Card } from 'react-bootstrap';
import timeago from 'epoch-timeago';

export const AllNotesCard = props => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.note.userName}</Card.Title>
        {props.note.time && (
          <Card.Subtitle>
            {timeago(props.note.time.seconds * 1000)}
          </Card.Subtitle>
        )}
        <Card.Text>{props.note.note}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default AllNotesCard;
