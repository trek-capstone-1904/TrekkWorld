import React from "react";
import { Card } from "react-bootstrap";
import timeago from "epoch-timeago";
import styles from './journal.module.css'

export const AllNotesCard = props => {
  return (
    <Card className={styles.cardNote}>
      <Card.Body>
        <Card.Header>{props.note.userName}</Card.Header>
        <Card.Text>{props.note.note}</Card.Text>
        {props.note.time && (
          <Card.Subtitle className="mb-2 text-muted">
            {timeago(props.note.time.seconds * 1000)}
          </Card.Subtitle>
        )}
      </Card.Body>
    </Card>
  );
};

export default AllNotesCard;
