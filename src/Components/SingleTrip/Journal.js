import React, { useContext } from "react";
import userContext from "../../Contexts/userContext";
import { Jumbotron } from "react-bootstrap";
import db from "../../firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { Spinner, Button } from "react-bootstrap";

export const Journal = (props) => {
  const loggedInUser = useContext(userContext);
  const tripJournal = db
    .collection("Trips")
    .doc("4aCsydg7lcVKdyHsV7g9")
    .collection("Journal");

  const tripInfoRef = db.collection("Trips").doc("4aCsydg7lcVKdyHsV7g9");
  const [value, loading, error] = useDocument(tripInfoRef);

  //console.log(snapshot.data())
  //need to get the trip id, and then the associated journal
  if (error) throw error;
  if (loading) return <Spinner animation="grow" variant="info" />;
  if (value) {
    const tripInfo = value.data()
    console.log("start date", tripInfo.startDate)
    console.log(new Date(tripInfo.startDate))
    console.log(new Date(tripInfo.endDate))

    console.log(props)

const totalDayCount = Math.ceil()

    return (
      <div>
        <span>
          <div>
            <Jumbotron>{tripInfo.tripName} </Jumbotron>

          </div>
        </span>
      </div>
    );
  }
};

export default Journal;
