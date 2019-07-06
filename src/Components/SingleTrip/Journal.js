import React, { useContext, useState, useEffect } from "react";
import userContext from "../../Contexts/userContext";
import db from "../../firebase";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import {
  Spinner,
  Button,
  Form,
  Card,
  Jumbotron,
  CardDeck,
  Carousel
} from "react-bootstrap";
import Rating from "react-rating";
import Select from "react-select";
import JournalCard from "./JournalCard";
import moment from "moment";
import CreateTrekkForm from "./CreateTrekkForm";

function calcDays(start, end) {
  const tripDays = [];
  while (start <= end) {
    start = moment(start).add(1, "days");
    let formattedStart = start.format("MMM D, YYYY");
    tripDays.push(formattedStart);
    //console.log(start)
  }
  return tripDays;
}

export const Journal = props => {
  //console.log(props)
  const loggedInUser = useContext(userContext);
  const tripJournal = db
    .collection("Trips")
    .doc(props.match.params.tripId)
    .collection("Journal");

  const tripInfoRef = db.collection("Trips").doc(props.match.params.tripId);

  const trekkListRef = db
    .collection("Trips")
    .doc(props.match.params.tripId)
    .collection("TrekkList");

  const [trekkValue, trekkLoad, trekkError] = useCollection(trekkListRef);
  let placesArray = [];
  if (trekkValue) {
    trekkValue.forEach(function(doc) {
      placesArray.push(doc.id);
    });
    console.log("places ids", placesArray);
  }

  const [value, loading, error] = useDocument(
    db.collection("Trips").doc(props.match.params.tripId)
  );
  const [selectedOption, setSelectedOptions] = useState([]);
  const [notes, setNotes] = useState("");

  function onChange(option) {
    setSelectedOptions(option);
    console.log("selected options", selectedOption);
    //need to write the added place to the journal day places map
  }

  function handleChangeNotes(e) {
    setNotes(e.target.value);
  }

  function handleClick(event) {
    //event.preventDefault()
    console.log("in submit");
    tripJournal
      .add({
        notes
      })
      .then(function() {
        alert("Journal Entry Added!");
      });
  }

  useEffect(() => {
    console.log("selected options", selectedOption);
    console.log("notes", notes);
  });

  if (error) throw error;
  if (loading) return <Spinner animation="grow" variant="info" />;
  if (value) {
    const tripInfo = value.data();

    const start = new Date(tripInfo.startDate);
    const end = new Date(tripInfo.endDate);

    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const totalDays = Math.floor((end - start) / _MS_PER_DAY);

    const days = calcDays(start, end);

    console.log("dates", days);

    const options = tripInfo.locations.map(e => ({ value: e, label: e }));

    //push each day to an array
    //const totalDayCount = Math.ceil()
    //create when trip is created
    //for each doc in journal, render a div
    // console.log("doc id", trekkListRef)

    return (
      <div>
        <span>
          <div>
            <Jumbotron>{tripInfo.tripName} Journal</Jumbotron>
            <h3>Day 1</h3>
            <Carousel>
              <Carousel.Item>Day 1</Carousel.Item>
              <Carousel.Item>Day 2</Carousel.Item>
            </Carousel>
            <Form style={{ maxWidth: "40vw", margin: "auto" }}>
              <Form.Label>Where did I go today?</Form.Label>
              <Select
                isMulti
                name="places"
                options={options}
                // value={selectedOption}
                onChange={onChange}
              />

              <div>
                {selectedOption && (
                  <CardDeck>
                    {selectedOption.map(place => {
                      console.log("mapping", place);
                      return <JournalCard key={place.value} place={place} />;
                    })}
                  </CardDeck>
                )}
              </div>

              <Form.Label>Notes for Today</Form.Label>
              <Form.Control
                as="input"
                rows="6"
                onChange={handleChangeNotes}
                value={notes}
              />
            </Form>
            <Button type="submit" onClick={handleClick}>
              Submit
            </Button>
          </div>
        </span>
      </div>
    );
  }
};

export default Journal;
