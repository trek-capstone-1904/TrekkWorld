import React, { useState, useContext} from "react";
import { Form, Button } from "react-bootstrap";
import db, { loggedUser } from "../../../firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import userContext from "../../../Contexts/userContext";
import firebase from "firebase/app";

export const Notes = props => {
  const loggedInUser = useContext(userContext)

  const [notes, setNotes] = useState("");
  function handleChangeNotes(e) {
    e.preventDefault()
    setNotes(e.target.value);
  }
  const tripJournal = db
    .collection("Trips")
    .doc(props.tripId)
    .collection("Journal").doc(props.date);

    const [value, loading, error] = useDocument(tripJournal)

  function handleClick(event) {
    event.preventDefault()
    // if(tripJournal.notes && tripJournal.notes[loggedInUser.uid]){
    //   tripJournal.notes[loggedInUser.uid]
    //     .set({
    //       [loggedInUser.uid]: notes
    //     }, {mergeFields: true})
    //     .then(function() {
    //       alert("Journal Entry Added!");

    //     });

    //    } else if(tripJournal.notes){
    //   tripJournal.notes
    //     .set({
    //        [loggedInUser.uid]: notes
    //     }, {merge: true})
    //     .then(function() {
    //       alert("Journal Entry Added!");

    //     });

    // } else {
    //   tripJournal
    //     .set({
    //        notes: {[loggedInUser.uid]: notes}
    //     }, {merge: true})
    //     .then(function() {
    //       alert("Journal Entry Added!");

    //     });
    // }

  //   tripJournal.collection("Notes").add({
  //     [loggedInUser.uid]: notes
  //   }).then(function() {
  //       alert("Journal Entry Added!");

  // })
  tripJournal.collection("Notes").add({
    time: firebase.firestore.FieldValue.serverTimestamp(),
    user: loggedInUser.uid,
    userName: loggedInUser.displayName,
    note: notes
  }).then(function(){
    alert("Journal entry added!")
  })
}

  return (
    <>

      <Form.Control
        as="input"
        rows="6"
        onChange={handleChangeNotes}
        value={notes}
      />
      <Button type="button" onClick={handleClick}>
        Post
      </Button>
      <div>
        All Notes
      </div>
    </>
  );
};


export default Notes;
