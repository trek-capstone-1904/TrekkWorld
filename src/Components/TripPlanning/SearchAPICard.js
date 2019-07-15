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
import TripSelectButton from './TripSelectButton';

export const SearchAPICard = props => {
  //type = city if from query for top cities OR type= sights if for top sights in a city

  const { country } = props;
  const { name, snippet } = props.sight;
  const [image, setImage] = useState('');

  const loggedInUser = useContext(userContext);

  useGoogle(props.sight, country);
  function useGoogle(sight, country) {
    let searchPlace;
    if (sight.coordinates) {
      searchPlace = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${
        sight.name
      }&inputtype=textquery&fields=photos,place_id,formatted_address,name,opening_hours,rating&locationbias=circle:2000@${
        sight.coordinates.latitude
      },${sight.coordinates.longitude}&key=${secret.places}`;
    } else {
      searchPlace = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${
        sight.name
      }${country}&inputtype=textquery&fields=photos,place_id,formatted_address,name,opening_hours,rating&
      &key=${secret.places}`;
    }

    const proxyurl = 'https://cors-anywhere.herokuapp.com/';

    const response = fetch(proxyurl + searchPlace)
      .then(response => response.json())
      .then(content => {
        let photoRef = content.candidates[0].photos[0].photo_reference;
        let resp = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&maxheight=250&photoreference=${photoRef}&key=${
          secret.places
        }`;
        // console.log('resp', resp);
        setImage(resp);
        return resp;
      })
      .catch(() => console.log('HELP'));
  }

  const slicedImage = image.slice(0, image.indexOf('&key'));

  return (
    <Card style={{ margin: '.5rem 1rem', width:'21rem' }} className={styles.cardLayout}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{country}</Card.Subtitle>
        {image && <img src={image} alt="sight" />}
        <Card.Text className={styles.cardText}>{snippet}</Card.Text>
        <Button
          style={{ margin: '0 1rem', backgroundColor:'#EDAE49', border:'none' }}

          onClick={() => handleClick(slicedImage, props, loggedInUser.uid)}
        >
          + Bucket
        </Button>
        <TripSelectButton slicedImage={slicedImage} button={props} />
      </Card.Body>
    </Card>
  );
};

//use a generic handleClick so that it adds a new place to the place db
// after it adds the place to the db, it assigns the place to either the bucketList or the TrekkList

const handleClick = (slicedImage, props, uid) => {
  //query Places
  const placeRef = db.collection('Places').doc(props.sight.id);
  console.log('Handle CLick is Hitting!!!!!!!!!!!!');
  const { name, snippet } = props.sight;
  // debugger;
  console.log(
    'args for bucketList',
    slicedImage,
    uid,
    props.sight.id,
    name,
    snippet
  );
  console.log('props.sight.id', props.sight.id);
  placeRef
    .get()
    .then(function(doc) {
      if (doc.exists) {
        console.log('Document data:', doc.data());

        addToBucketList(slicedImage, uid, props.sight.id, name, snippet);
      } else {
        // doc is created in 'Places' collection
        console.log('props going to set', props);
        console.log('Place document did not exist');
        db.collection('Places')
          .doc(props.sight.id)
          .set(props)
          .then(function() {
            db.collection('Places')
              .doc(props.sight.id)
              .update({
                placeImage: slicedImage,
              });
            console.log('Document successfully written!');
          })
          .then(function() {
            addToBucketList(slicedImage, uid, props.sight.id, name, snippet);
          })
          .catch(function(error) {
            console.error('Error writing document: ', error);
          });

        // addToBucketList(slicedImage, uid, props.sight.id, name, snippet);
      }
    })
    .catch(function(error) {
      console.log('Error getting document:', error);
    });
};

const addToBucketList = (slicedImage, uid, placeId, placeName, snippet) => {
  // db.doc(`Users/${uid}`).update({
  //   [`bucketList.${placeId}`]: {
  //     placeName: placeName,
  //     snippet: snippet,
  //     placeImage: slicedImage,
  //   },
  // });

  db.collection(`Users`)
    .doc(`${uid}`)
    .update({
      [`bucketList.${placeId}`]: {
        placeName: placeName,
        snippet: snippet,
        placeImage: slicedImage,
      },
    });
};

// const addToTrekk = (slicedImage, uid, placeId, placeName, snippet, tripId) => {
//   //add to Trekklist
//   db.collection('Trips')
//     .doc(`${tripId}`)
//     .collection('TrekkList')
//     .doc(`${placeId}`)
//     .set(
//       {
//         placeName: placeName,
//         snippet: snippet,
//         placeImage: slicedImage,
//       },
//       { merge: true }
//     );

//   // delete from bucketList
//   db.collection('Users')
//     .doc(uid)
//     .update({
//       [`bucketList.${placeId}`]: firebase.firestore.FieldValue.delete(),
//     });
// };

// put in render and change to dropdown

export default SearchAPICard;
