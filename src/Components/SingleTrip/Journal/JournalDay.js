import React, { useContext } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import Selector from "./Selector";
import Notes from "./Notes";
import AllNotes from "./AllNotes";
import JournalCard from "./JournalCard";
import { Form, CardDeck, Spinner, Badge, CardColumns } from "react-bootstrap";
import db from "../../../firebase";
import style from "./journal.module.css";
import userContext from "../../../Contexts/userContext";

const JournalDay = props => {
  //get Trekk List collection for the current trip

  const loggedInUser = useContext(userContext);
  const userId = `${loggedInUser.uid}`;
  const [value, loading, error] = useDocument(
    db
      .collection("Trips")
      .doc(props.tripId)
      .collection("Journal")
      .doc(props.date)
  );

  const [tripValue, tripLoading, tripError] = useDocument(
    db.collection("Trips").doc(props.tripId),
    {
      valueListenOptions: { includeMetadataChanges: true }
    }
  );

  if (tripLoading || tripError) {
    return <Spinner animation="grow" variant="info" />;
  }
  const { users } = tripValue.data();
  //create an array to store all of the places on the Trekk List to be used in the selector drop down options
  let placesArray;

  if (error) throw error;
  if (loading) return <Spinner animation="grow" variant="info" />;
  if (value) {
    placesArray = value.get("places");

    function isThisAFellowTrekker() {
      let trekkersIds = Object.keys(users);
      if (trekkersIds.includes(userId)) {

        return true;
      } else {

        return false;
      }
    }
    return (
      <div className={style.card}>
        <h3 style={{ padding: "1rem" }}>{props.date}</h3>
        <Form style={{ maxWidth: "40rem", margin: "auto" }}>
          {/* query the journal date places map, put the results into an array, map over them, and render a journalCard for each place */}

          {placesArray && (
            <CardColumns style={{ alignContent: "middle" }}>
              {placesArray.map(place => (
                <JournalCard
                  key={place.value}
                  place={place.value}
                  placeUser={place.user}
                />
              ))}
            </CardColumns>
          )}

          <Form.Label />
          <div>
            <AllNotes tripId={props.tripId} date={props.date} />
            <div style={{ display: "flex", justifyContent: "center" }}>
              {isThisAFellowTrekker() && (
                <>
                  <Notes tripId={props.tripId} date={props.date} />
                  <Selector tripId={props.tripId} date={props.date} />
                </>
              )}
            </div>
          </div>
        </Form>
      </div>
    );
  } else {
    return <div />;
  }
};

export default JournalDay;
