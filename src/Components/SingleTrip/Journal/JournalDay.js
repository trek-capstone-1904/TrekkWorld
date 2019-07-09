import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import Selector from "./Selector";
import Notes from "./Notes";
import AllNotes from "./AllNotes";
import JournalCard from "./JournalCard";
import { Form, CardDeck, Spinner, Badge } from "react-bootstrap";
import db from "../../../firebase";
import style from './journal.module.css'

const JournalDay = props => {
  //get Trekk List collection for the current trip

  const [value, loading, error] = useDocument(
    db
      .collection("Trips")
      .doc(props.tripId)
      .collection("Journal")
      .doc(props.date)
  );

  //create an array to store all of the places on the Trekk List to be used in the selector drop down options
  let placesArray;

  if (error) throw error;
  if (loading) return <Spinner animation="grow" variant="info" />;
  if (value) {
    console.log("value", value)
    placesArray = value.get("places");
    console.log(placesArray)

    return (
      <div className={style.card}>
        <h3>{props.date}</h3>
        <Form style={{ maxWidth: "40rem", margin: "auto" }}>
          {/* query the journal date places map, put the results into an array, map over them, and render a journalCard for each place */}

          {/* replace selectedOption with the values you get back from querying the Journal Date Places map */}
          {placesArray && (
            <CardDeck >
              {placesArray.map(place => (
                <JournalCard key={place.value} place={place.value} />
              ))}
            </CardDeck>
          )}

          <Form.Label>
            {/* <Badge pill variant="info">
              Add a Location:
            </Badge> */}
          </Form.Label>
          <div >
            <div>All Notes</div>
            <AllNotes tripId={props.tripId} date={props.date} />
            <Notes tripId={props.tripId} date={props.date} />
          <Selector tripId={props.tripId} date={props.date} />
          </div>
        </Form>
      </div>
    );
  } else {
    return <div />;
  }
};

export default JournalDay;
