import React, { useContext } from "react";
import userContext from "../../../Contexts/userContext";
import db from "../../../firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { Spinner, Jumbotron, Button } from "react-bootstrap";
import moment from "moment";
import JournalDay from "./JournalDay";
import style from './journal.module.css'
import history from '../../../history';

function calcDays(start, end) {
  const tripDays = [];
  while (start <= end) {
    start = moment(start).add(1, "days");
    let formattedStart = start.format("MMM D, YYYY");
    tripDays.push(formattedStart);
  }
  return tripDays;
}


export const Journal = props => {

  const loggedInUser = useContext(userContext);

  const tripInfoRef = db.collection("Trips").doc(props.match.params.tripId);

  //get the document for the current trip
  const [value, loading, error] = useDocument(
    db.collection("Trips").doc(props.match.params.tripId)
    );

  function handleClick(event){
    history.push(`/trip/${props.match.params.tripId}`)
  }
  if (error) throw error;
  if (loading) return <Spinner animation="grow" variant="info" />;

  //get contents of the current trip document
  const tripInfo = value.data();

  //current trip start and end dates
  const start = new Date(tripInfo.startDate);
  const end = new Date(tripInfo.endDate);


  const days = calcDays(start, end);

  if (value) {
    days.forEach(date => {
      // create a doc for each date in the trip in Journal collection
      tripInfoRef
        .collection("Journal")
        .doc(date)
        .set({}, { merge: true });
    });
    return (
      <div className={style.background}>
        <span>
          <div>
            <Jumbotron className={style.heading}>{tripInfo.tripName} Journal</Jumbotron>
            <Button onClick={handleClick}className="sticky-top">Close Journal</Button>
            {days.map(date => (
              <Jumbotron className={style.dayJumbo} key={date}>
                <JournalDay
                  key={date}
                  date={date}
                  tripId={props.match.params.tripId}
                />
              </Jumbotron>
            ))}
          </div>
        </span>
      </div>
    );
  }
};

export default Journal;
