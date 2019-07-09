import React from "react";
import { useDocument, useCollectionData } from "react-firebase-hooks/firestore";
import db, { loggedUser } from "../../../firebase";
import { Spinner } from "react-bootstrap";
import AllNotesCard from "./AllNotesCard";
import style from './journal.module.css'

export const AllNotes = props => {
  const [value, loading, error] = useCollectionData(
    db
      .collection("Trips")
      .doc(props.tripId)
      .collection("Journal")
      .doc(props.date)
      .collection("Notes")
      .orderBy("time")
  );

  if (error) throw error;
  if (loading) return <Spinner animation="grow" variant="info" />;
  if (value) {
    return (
      <div className={style.cardDeck}>
        {value.map(note => (
          <div key={note.time}>
            <AllNotesCard note={note} />
          </div>
        ))}
      </div>
    );
  } else {
    return <div>Add a note to get started!</div>;
  }
};

export default AllNotes;
