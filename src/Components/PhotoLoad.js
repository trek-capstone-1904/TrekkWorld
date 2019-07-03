import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import UserProfileHeader from './UserProfileHeader';
import bucket from '../firebase';
export const PhotoLoad = () => {
  const [progressValue, setProgressValue] = useState(0);

  function handleChange(evt) {
    alert('Hi');
    const file = evt.target.files[0];
    //TODO change tripID in Photoloader
    const tripId = 'qbzVqq6smFB5avawpsRX';
    // console.log(firebase.storage().ref())

    //Create a storage ref
    const storageRef = firebase
      .storage()
      .ref(`tripImages/${tripId}/${file.name}`);
    // bucket.upload(`/tripImages/${tripId}/${file.name}`, function(err,file,apiResponse){
    //   //DO SOmething
    //   console.log('Success!')
    // })

    // //Upload File
    let uploadFile = storageRef.put(file);

    //Update Progress Bar
    uploadFile.on('state_changed',
    function progress(snapshot){
      const percentage = (snapshot.bytesTransferred /snapshot.totalBytes)*100;
      setProgressValue(percentage);
    })
  }
  return (
    <div>
      <h2>Add Image</h2>
      <progress value={progressValue} max="100" id="uploader">
        0%
      </progress>
      <br />
      <input type="file" id="fileButton" onChange={handleChange} />
    </div>
  );
};

export default PhotoLoad;
