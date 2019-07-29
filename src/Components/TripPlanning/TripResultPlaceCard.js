import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import styles from "../SearchAPICard.module.css";
import db from "../../firebase";
import userContext from "../../Contexts/userContext";
import { TripSelectButtonTripSearch } from "../index";
import * as secret from "../../secrets";

export const TripResultPlaceCard = props => {
  const { placeName, snippet, placeImage } = props.card;
  const { tripId, placeId } = props;
  const loggedInUser = useContext(userContext);
  const { uid } = loggedInUser;

  return (
    <Card>
      <Card.Body>
        <Card.Title>{placeName}</Card.Title>
        {placeImage && (
          <img src={`${placeImage}&key=${secret.places}`} alt="sight" />
        )}

        <Card.Text className={styles.cardText}>{snippet}</Card.Text>
        <Button
          style={{ margin: "0 1rem" }}
          variant="info"
          onClick={() => addToBucketList(uid, placeId, placeName, snippet)}
        >
          + Bucket
        </Button>
        <TripSelectButtonTripSearch slicedImage={placeImage} button={props} />
      </Card.Body>
    </Card>
  );
};

const addToBucketList = (uid, placeId, placeName, snippet) => {
  db.doc(`Users/${uid}`).update({
    [`bucketList.${placeId}`]: {
      placeName: placeName,
      snippet: snippet
    }
  });
};

export default TripResultPlaceCard;
