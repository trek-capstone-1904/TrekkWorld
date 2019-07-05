import React from "react";
import {
  Spinner,
  Button,
  Form,
  Card,
  Jumbotron,
  CardDeck
} from "react-bootstrap";
import Rating from "react-rating";

export const JournalCard = props => {
  console.log(props)
  return (
    <div>
      <Card>
        <Card.Body>{props.place.value}</Card.Body>
        <Button>+ Review</Button>

        {/* <Form.Label>Add Your Review</Form.Label>
        <div />
        <Rating />
        <div /> */}
      </Card>
    </div>
  );
};

export default JournalCard;
