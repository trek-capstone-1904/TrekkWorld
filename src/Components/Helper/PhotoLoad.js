import React, { useState, useContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import userContext from '../../Contexts/userContext';
import UserProfileHeader from '../User/UserProfileHeader';
import bucket from '../../firebase';
import { Modal, Button } from 'react-bootstrap';
import db from '../../firebase';

export const PhotoLoad = props => {
  const loggedInUser = useContext(userContext);
  const userName = `${loggedInUser.displayName}`;
  const userId = `${loggedInUser.uid}`;
  console.log(loggedInUser);
  const [progressValue, setProgressValue] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [addImage, setAddImage] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  function handleInput() {
    setAddImage(false)
  }
  function handleClickAdd() {
    setAddImage(true);
  }
  function handleClose() {
    setLoaded(false);
  }

  function handleChange(evt) {
    const file = evt.target.files[0];
    const fileRouteName = file.name.substr(0, file.name.indexOf('.'));
    let refPath;
    //TODO change tripID in Photoloader
    // const tripId = 'qbzVqq6smFB5avawpsRX';
    if (props.from === 'trip') {
      refPath = `tripImages/${props.tripId}`;
    } else if (props.from === 'userProfile') {
      refPath = `userProfilePics/${userId}`;
    }

    //Create a storage ref
    const storageRef = firebase.storage().ref(`${refPath}/${file.name}`);

    // //Upload File
    let uploadFile = storageRef.put(file);

    //Update Progress Bar
    uploadFile.on(
      'state_changed',
      function progress(snapshot) {
        const percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgressValue(percentage);
      },
      function error(err) {
        console.log(err);
      },
      function complete() {
        uploadFile.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          setImageUrl(downloadURL);
          //If want to convert to a map
          // db.doc(`Trips/${props.tripId}`)
          //   .update({
          //     [`images.${fileRouteName}`]: {
          //       URL: downloadURL,
          //       addedBy: userName,
          //     },
          //   })
          //   .then(setLoaded(true));
          //Add image to Trip Image SubCollection
          if (props.from === 'trip') {
            db.collection(`Trips/${props.tripId}/Images`)
              .add({
                fileName: file.name,
                URL: downloadURL,
                addedBy: userName,
              })
              .then(
                //Add Image to user Image Subcollection
                db.collection(`Users/${userId}/Images`).add({
                  tripId: props.tripId,
                  fileName: file.name,
                  URL: downloadURL,
                })
              )
              .then(setLoaded(true));
          } else {
            setLoaded(true);
          }
        });
      }
    );
    evt.target.value = null;
  }
  return (
    <div>
      <Button variant="light" onClick={handleClickAdd}>+ Add Image</Button>
      <Modal  style={{ padding: '2rem' }} show={addImage} onHide={handleInput}>
        <Modal.Header>Add Image From Files</Modal.Header>
        <progress value={progressValue} max="100" id="uploader">
          0%
        </progress>
        <br />
        <input type="file" id="fileButton" onChange={handleChange} />
      </Modal>
      <Modal show={loaded} onHide={handleClose}>
        <Modal.Body>
          <h1 style={{ textAlign: 'center' }}>Loaded Successfully!</h1>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PhotoLoad;
