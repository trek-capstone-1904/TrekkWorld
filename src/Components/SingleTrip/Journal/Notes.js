import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import db from "../../../firebase";

export const Notes = (props) => {
  const [notes, setNotes] = useState("");
  function handleChangeNotes(e) {
    setNotes(e.target.value);
  }
  const tripJournal = db
  .collection("Trips")
  .doc(props.tripId)
  .collection("Journal");

  function handleClick(event) {
    tripJournal
      .add({
        notes
      })
      .then(function() {
        alert("Journal Entry Added!");
      });
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
              <Button type="submit" onClick={handleClick}>
              Post
            </Button>
      </>
  )
}

export default Notes
