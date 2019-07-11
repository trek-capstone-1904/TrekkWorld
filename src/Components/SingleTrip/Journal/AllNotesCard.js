import React from 'react';
import { Card } from 'react-bootstrap';
import timeago from 'epoch-timeago';
import styles from './journal.module.css';

export const AllNotesCard = props => {
  return (
    <Card className={styles.cardNote}>
      <Card.Body className={styles.cardNoteBody}>
        {/* <Card.Header className={styles.cardHeader}>{props.note.userName}</Card.Header> */}
        <Card.Text >{props.note.note}</Card.Text>
        {props.note.time && (
          <footer style={{fontSize: ".8rem"}} className="mb-2 text-muted">
           {props.note.userName} | {timeago(props.note.time.seconds * 1000)}
          </footer>
        )}
      </Card.Body>
    </Card>
  );
};

export default AllNotesCard;
