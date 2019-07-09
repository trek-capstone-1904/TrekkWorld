import React from "react";
import { useDocument, useCollectionData } from "react-firebase-hooks/firestore";
import db, { loggedUser } from "../../../firebase";
import { Spinner } from "react-bootstrap";
import AllNotesCard from './AllNotesCard'

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
    console.log(value);
    // value.forEach(function(doc){
    //   console.log(doc.data())
    // })
    return <div>{value.map(note =>(
      <div key={note.time}>

        <AllNotesCard  note={note}/>

      </div>
    ))}</div>;
  } else {
    return <div>Add a note to get started!</div>;
  }
};

export default AllNotes;
