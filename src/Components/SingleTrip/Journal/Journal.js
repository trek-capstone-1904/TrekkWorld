import React, { useContext } from "react";
import userContext from "../../../Contexts/userContext";
import db from "../../../firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { Spinner, Jumbotron } from "react-bootstrap";
import moment from "moment";
import JournalDay from "./JournalDay";

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

  const tripInfoRef = db.collection("Trips").doc(props.match.params.tripId);

  const [value, loading, error] = useDocument(
    db.collection("Trips").doc(props.match.params.tripId)
  );

  if (error) throw error;
  if (loading) return <Spinner animation="grow" variant="info" />;

    const tripInfo = value.data();

    const start = new Date(tripInfo.startDate);
    const end = new Date(tripInfo.endDate);

    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const totalDays = Math.floor((end - start) / _MS_PER_DAY);

    const days = calcDays(start, end);

    console.log("dates", days);

    //push each day to an array
    //const totalDayCount = Math.ceil()
    //create when trip is created
    //for each doc in journal, render a div
    // console.log("doc id", trekkListRef)

    return (
      <div>
        {value && (
        <span>
          <div>
            <Jumbotron>{tripInfo.tripName} Journal</Jumbotron>
            {days.map(date => (
              <JournalDay
                key={date}
                date={date}
                tripId={props.match.params.tripId}
              />
            ))}
          </div>
        </span>

        )}
      </div>
    );

};

export default Journal;
