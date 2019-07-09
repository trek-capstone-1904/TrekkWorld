import React, { useContext, useState } from 'react';
import {
  Card,
  Button,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  Form,
} from 'react-bootstrap';
import { useDocument } from 'react-firebase-hooks/firestore';
import styles from '../SearchAPICard.module.css';
import db from '../../firebase';
import userContext from '../../Contexts/userContext';
import firebase from 'firebase/app';
import * as secret from '../../secrets';
import Axios from 'axios';

export const TripSelectButton = props => {
  const loggedInUser = useContext(userContext);
  const { slicedImage } = props;
  const { button } = props;

  const [snapshot, loading, error] = useDocument(
    db.collection('Users').doc(`${loggedInUser.uid}`),
    {
      snapshotListenOptions: { includeMetadataChanges: false },
    }
  );

  return (
    <ButtonGroup
    // name="tripId"
    // value={tripId}
    // as="select"
    >
      <DropdownButton
        as={ButtonGroup}
        // name={tripId}
        title="Add to Trip"
        // onChange={changeTripId}
        onSelect={evt =>
          handleClick(slicedImage, button, loggedInUser.uid, evt)
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

const handleClick = (slicedImage, props, uid, evt) => {
  //query Places

  const tripId = evt;
  console.log(tripId);

  const placeRef = db.collection('Places').doc(props.sight.id);

  const { name, snippet } = props.sight;
  console.log('props.sight.id', props.sight.id);
  console.log('props', props);
  let { sight, country, type } = props;
  sight.placeImage = slicedImage;
  const placeObj = { sight, country, type };

  // debugger;
  placeRef
    .get()
    .then(function(doc) {
      if (doc.exists) {
        //add the props.id to the user
        console.log('Document data:', doc.data());
        if (tripId) {
          addToTrekk(slicedImage, uid, props.sight.id, name, snippet, tripId);
        }
      } else {
        // doc is created in 'Places' collection
        console.log('Place document did not exist');
        console.log(props);
        db.collection('Places')
          .doc(props.sight.id)
          .set(placeObj)
          .then(function() {
            console.log('Document successfully written!');
          })
          .catch(function(error) {
            console.error('Error writing document: ', error);
          });
        if (tripId) {
          addToTrekk(slicedImage, uid, props.sight.id, name, snippet, tripId);
        }
      }
    })
    .catch(function(error) {
      console.log('Error getting document:', error);
    });
};

const addToTrekk = (slicedImage, uid, placeId, placeName, snippet, tripId) => {
  //add to Trekklist
  db.collection('Trips')
    .doc(`${tripId}`)
    .collection('TrekkList')
    .doc(`${placeId}`)
    .set(
      {
        placeName: placeName,
        snippet: snippet,
        placeImage: slicedImage,
      },
      { merge: true }
    );

  // delete from bucketList
  db.collection('Users')
    .doc(uid)
    .update({
      [`bucketList.${placeId}`]: firebase.firestore.FieldValue.delete(),
    });
};

export default TripSelectButton;
