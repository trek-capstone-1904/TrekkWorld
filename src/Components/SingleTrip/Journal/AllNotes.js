import React from 'react'
import { useDocument } from 'react-firebase-hooks/firestore';
import db, { loggedUser } from "../../../firebase";
import { Spinner} from "react-bootstrap";


export const AllNotes = (props) => {
  const [value, loading, error] = useDocument(db.collection("Trips").doc(props.tripId).collection("Journal").doc(props.date))

  if (error) throw error;
  if (loading) return <Spinner animation="grow" variant="info" />;
  if (value && value.data().notes){
    let notes = value.data().notes
    console.log(notes)
    return (
      <div>
        {notes[loggedUser.uid]}
      </div>
    )

  } else {
    return(
      <div>
        Add a note to get started!
      </div>
    )
  }

}

export default AllNotes
