import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import db, { loggedUser } from "../../../firebase";
import { useDocument } from "react-firebase-hooks/firestore";

export const Notes = props => {
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
    if(tripJournal.notes){
      tripJournal.notes
        .set({
           [loggedUser.uid]: notes
        }, {merge: true})
        .then(function() {
          alert("Journal Entry Added!");

        });

    } else {
      tripJournal.notes
        .set({
           notes: {[loggedUser.uid]: notes}
        }, {merge: true})
        .then(function() {
          alert("Journal Entry Added!");

        });
    }
  }

  return (
    <>
      <Form.Label>Notes for Today</Form.Label>
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
