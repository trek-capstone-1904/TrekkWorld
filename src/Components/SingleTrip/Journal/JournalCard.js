import React, { useContext } from "react";
import { Spinner, Button, Card, CardDeck } from "react-bootstrap";
import Rating from "react-rating";
import { useDocument } from "react-firebase-hooks/firestore";
import db from "../../../firebase";
import userContext from "../../../Contexts/userContext";
import style from "./journal.module.css";
import * as secret from "../../../secrets";

export const JournalCard = props => {
  const loggedInUser = useContext(userContext);
  //take the place ID passed down, and query the places collection to get the data that should go on the card
  const [value, loading, error] = useDocument(
    db.collection("Places").doc(props.place)
  );

  if (error) throw error;
  if (loading) return <Spinner animation="grow" variant="info" />;
  if (value) {
    const placeInfo = value.data();

    return (
      <div>
        <Card className={style.card}>
          <Card.Img
            variant="top"
            src={`${placeInfo.sight.placeImage}&key=${secret.places}`}
          />

          <Card.Body style={{ maxHeight: "6rem", justifyContent: "center" }}>
            <Card.Text>
              {placeInfo.sight.name}
              <footer style={{ fontSize: ".8rem" }} className="mb-2 text-muted">
                Added by {props.placeUser}
              </footer>
            </Card.Text>
            {/* <Rating /> */}
          </Card.Body>

          {/* <Button >+Review</Button> */}

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
