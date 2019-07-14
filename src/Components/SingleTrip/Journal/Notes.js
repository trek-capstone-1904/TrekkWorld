import React, { useState, useContext } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import db from "../../../firebase";
import userContext from "../../../Contexts/userContext";
import firebase from "firebase/app";

export const Notes = props => {
  const loggedInUser = useContext(userContext);

  const [notes, setNotes] = useState("");
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  function handleClose() {
    setIsShowing(false);
    tripJournal
      .collection("Notes")
      .add({
        time: firebase.firestore.FieldValue.serverTimestamp(),
        user: loggedInUser.uid,
        userName: loggedInUser.displayName,
        note: notes
      });
  }
  function handleChangeNotes(e) {
    e.preventDefault();
    setNotes(e.target.value);
  }
  const tripJournal = db
    .collection("Trips")
    .doc(props.tripId)
    .collection("Journal")
    .doc(props.date);

  return (
    <div>
      <Button style={{margin: ".5rem", backgroundColor: "#00798C", border: "none"}} type="button" onClick={toggle}>
        Add a Note
      </Button>
      <Modal show={isShowing} onHide={toggle} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add a Note</Modal.Title>
        </Modal.Header>
        <Form.Control
          as="input"
          rows="6"
          onChange={handleChangeNotes}
          value={notes}
          placeholder={"Start typing..."}
        />
        <Button
          style={{ width: "5rem", backgroundColor: "#00798C", border: "none", align: "centered" }}
          type="button"
          onClick={handleClose}
        >
          Post
        </Button>
      </Modal>
    </div>
  );
};

export default Notes;
