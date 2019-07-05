import React, { useContext } from "react";
import userContext from "../../Contexts/userContext";
import { Jumbotron } from "react-bootstrap";
import db from "../../firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { Spinner, Button, Form } from "react-bootstrap";
import Rating from "react-rating";

export const Journal = props => {
  const loggedInUser = useContext(userContext);
  const tripJournal = db
    .collection("Trips")
    .doc("bKT7bzthLifDFIwRlnPH")
    .collection("Journal");

  const tripInfoRef = db.collection("Trips").doc("bKT7bzthLifDFIwRlnPH");
  const [value, loading, error] = useDocument(tripInfoRef);
  //const [notes, setNotes] =

  //console.log(snapshot.data())
  //need to get the trip id, and then the associated journal
  if (error) throw error;
  if (loading) return <Spinner animation="grow" variant="info" />;
  if (value) {
    const tripInfo = value.data();
    console.log("start date", tripInfo.startDate);
    console.log(new Date(tripInfo.startDate));
    console.log(new Date(tripInfo.endDate));

    console.log(props);
    console.log(tripInfo.locations);


    //push each day to an array
    //const totalDayCount = Math.ceil()

    return (
      <div>
        <span>
          <div>
            <Jumbotron>{tripInfo.tripName} Journal</Jumbotron>
            <div>Day 1</div>
            <Form>
              <Form.Label>Favorite Pick</Form.Label>
              <Form.Control as="select">
                {tripInfo.locations.map((e, key) => (
                  <option key={key} value={e.value}>
                    {e}
                  </option>
                ))}
              </Form.Control>
                  <Form.Label>Add Your Review</Form.Label>
                  <div></div>
                <Rating />
                <div></div>
              <Form.Label>Notes for Today</Form.Label>
              <Form.Control as="textarea" rows="3" />
            </Form>
            <Button>Submit</Button>
            {/* dropdown of places on the trek list to select one  */}
            {/* add review  */}

            {/* Notes for the day */}
            {/* save button */}
          </div>
        </span>
      </div>
    );
  }
};

export default Journal;
