import React, { useContext, useState } from "react";
import {
  Card,
  Button,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  Form
} from "react-bootstrap";
import { useDocument } from "react-firebase-hooks/firestore";
import styles from "../SearchAPICard.module.css";
import db from "../../firebase";
import userContext from "../../Contexts/userContext";
import firebase from "firebase/app";
import * as secret from "../../secrets";
import Axios from "axios";

export const TripSelectButtonTripSearch = props => {
  const loggedInUser = useContext(userContext);
  const { placeId } = props.button;
  const { placeImage, placeName, snippet } = props.button.card;
  const { uid } = loggedInUser;

  const [snapshot, loading, error] = useDocument(
    db.collection("Users").doc(`${loggedInUser.uid}`),
    {
      snapshotListenOptions: { includeMetadataChanges: false }
    }
  );

  const handleClick = (slicedImage, uid, placeId, placeName, snippet, evt) => {
    //add to Trekklist
    const tripId = evt;

    db.collection("Trips")
      .doc(`${tripId}`)
      .collection("TrekkList")
      .doc(`${placeId}`)
      .set(
        {
          placeName: placeName,
          snippet: snippet,
          placeImage: slicedImage
        },
        { merge: true }
      );

    // delete from bucketList
    db.collection("Users")
      .doc(uid)
      .update({
        [`bucketList.${placeId}`]: firebase.firestore.FieldValue.delete()
      });
  };

  return (
    <ButtonGroup>
      <DropdownButton
        as={ButtonGroup}
        title="Add to Trip"
        onSelect={evt =>
          handleClick(placeImage, uid, placeId, placeName, snippet, evt)
        }
        id="bg-nested-dropdown"
      >
        {snapshot &&
          Object.entries(snapshot.data().Trips).map(trip => (
            <Dropdown.Item eventKey={trip[0]} value={trip[0]}>
              {trip[1].tripName}
            </Dropdown.Item>
          ))}
      </DropdownButton>
    </ButtonGroup>
  );
};

export default TripSelectButtonTripSearch;
