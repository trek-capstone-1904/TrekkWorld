import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import UserProfileHeader from '../User/UserProfileHeader';
import bucket from '../../firebase';
import { Modal, Button } from 'react-bootstrap';

export const PhotoLoad = () => {
  const [progressValue, setProgressValue] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [imageUrl, setImageUrl]=useState('')
  function handleClose() {
    setLoaded(false);
  }
  function handleChange(evt) {
    const file = evt.target.files[0];

    //TODO change tripID in Photoloader
    const tripId = 'qbzVqq6smFB5avawpsRX';

    //Create a storage ref
    const storageRef = firebase
      .storage()
      .ref(`tripImages/${tripId}/${file.name}`);

    // //Upload File
    let uploadFile = storageRef.put(file);

    //Update Progress Bar
    uploadFile.on(
      'state_changed',
      function progress(snapshot) {
        const percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(percentage);
        console.log(snapshot);
        setProgressValue(percentage);
      },
      function error(err) {
        console.log(err);
      },
      function complete() {
        console.log(uploadFile)
        uploadFile.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
          setImageUrl(downloadURL)
        });
        setLoaded(true);
      }
    );
  }
  return (
    <div>
      <h2>Add Image</h2>
      <progress value={progressValue} max="100" id="uploader">
        0%
      </progress>
      <br />
      <input type="file" id="fileButton" onChange={handleChange} />
      <Modal show={loaded} onHide={handleClose}>
        <Modal.Body>
          <h1 style={{textAlign:'center'}}>Loaded Successfully!</h1>
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
