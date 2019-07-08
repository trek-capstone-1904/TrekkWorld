import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import Selector from "./Selector";
import Notes from "./Notes";
import JournalCard from "./JournalCard";
import { Form, CardDeck, Spinner } from "react-bootstrap";
import db from "../../../firebase";

const JournalDay = props => {
  //get Trekk List collection for the current trip
  const [value, loading, error] = useCollection(
    db
      .collection("Trips")
      .doc(props.tripId)
      .collection("TrekkList")
  );

  //create an array to store all of the places on the Trekk List to be used in the selector drop down options
  let placesArray = [];

  if (error) throw error;
  if (loading) return <Spinner animation="grow" variant="info" />;
  if (value) {
    //push each doc ID (place) into the places array
    value.forEach(function(doc) {
      placesArray.push(doc.id);
    });

    return (
      <div>
        <h3>{props.date}</h3>
        <Form style={{ maxWidth: "40rem", margin: "auto" }}>
          <Form.Label>Places Visited</Form.Label>
          <Selector tripId={props.tripId} />

          {/* replace selectedOption with the values you get back from querying the Journal Date Places map */}
          {placesArray && (
            <CardDeck>
              {placesArray.map(place => (
                <JournalCard key={place} place={place} />
              ))}
            </CardDeck>
          )}

          <Notes tripId={props.tripId} />
        </Form>

        {/* query the journal date places map, put the results into an array, map over them, and render a journalCard for each place */}
      </div>
    );
  } else {
    return <div />;
  }
};

export default JournalDay;
