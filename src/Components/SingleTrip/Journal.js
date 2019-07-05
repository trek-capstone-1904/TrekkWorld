import React, { useContext, useState, useEffect } from "react";
import userContext from "../../Contexts/userContext";
import db from "../../firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import {
  Spinner,
  Button,
  Form,
  Card,
  Jumbotron,
  CardDeck
} from "react-bootstrap";
import Rating from "react-rating";
import Select from "react-select";
import JournalCard from "./JournalCard";

export const Journal = props => {
  const loggedInUser = useContext(userContext);
  const tripJournal = db
    .collection("Trips")
    .doc("bKT7bzthLifDFIwRlnPH")
    .collection("Journal");

  const tripInfoRef = db.collection("Trips").doc("bKT7bzthLifDFIwRlnPH");
  const [value, loading, error] = useDocument(tripInfoRef);
  const [selectedOption, setSelectedOptions] = useState([]);


  function onChange(option) {
    setSelectedOptions(option);
    console.log("selected options", selectedOption);
  }


  useEffect(() => console.log("selected options", selectedOption));
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

    const options = [];
    tripInfo.locations.map(e => options.push({ value: e, label: e }));
    //push each day to an array
    //const totalDayCount = Math.ceil()
    //create when trip is created
    //for each doc in journal, render a div

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
              <Form.Label>Where did I go today?</Form.Label>
              <Select
                isMulti
                name="places"
                options={options}
                value={selectedOption}
                onChange={onChange}
              />

              <div>
                <CardDeck>
                  {selectedOption.map(place => {
                    console.log("mapping", place);
                    return (
                      <JournalCard
                        border="success"
                        style={{ width: "18rem" }}
                        key={place.value}
                        place={place}
                      />

                    )
                  })}
                </CardDeck>
              </div>

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
