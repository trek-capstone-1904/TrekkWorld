import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import Selector from "./Selector";
import Notes from "./Notes";
import JournalCard from "./JournalCard";
import { Form, CardDeck, Spinner } from "react-bootstrap";
import db from "../../../firebase";

const JournalDay = props => {


  const [value, loading, error] = useCollection(
    db
      .collection("Trips")
      .doc(props.tripId)
      .collection("TrekkList")
  );

  let placesArray = [];

  if (error) throw error;
  if (loading) return <Spinner animation="grow" variant="info" />;
  if (value) {
    value.forEach(function(doc) {
      placesArray.push(doc.id);
    });
    console.log("places ids", placesArray);

    return (
      <div>
        <h3>{props.date}</h3>
        <Form style={{ maxWidth: "40vw", margin: "auto" }}>
          <Form.Label>Where did I go today?</Form.Label>
          <Selector tripId={props.tripId} />

        {/* replace selectedOption with the values you get back from querying the Journal Date Places map */}
        {(placesArray.length > 0) && (
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
