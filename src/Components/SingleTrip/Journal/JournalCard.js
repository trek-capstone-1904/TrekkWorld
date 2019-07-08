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
import { useDocument } from "react-firebase-hooks/firestore";
import db from "../../../firebase";

export const JournalCard = props => {

  //take the place ID passed down, and query the places collection to get the data that should go on the card
  const [value, loading, error] = useDocument(db.collection("Places").doc(props.place))



  if (error) throw error;
  if (loading) return <Spinner animation="grow" variant="info" />;
  if(value){
    console.log("props", props.place);

  console.log("place doc", value)
    const placeInfo = value.data()
    console.log("data in place doc", placeInfo)
  return (
    <div>
      <Card border="success"
                        style={{ width: "10rem" }}>
        <Card.Body>{placeInfo.name}</Card.Body>

        <Button>+ Review</Button>

        {/* <Form.Label>Add Your Review</Form.Label>
        <div />
        <Rating />
        <div /> */}
      </Card>
    </div>
  );

}
};

export default JournalCard;


