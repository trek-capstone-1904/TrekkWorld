import React, { useContext, useState, useEffect } from "react";
import userContext from "../../../Contexts/userContext";
import Select from "react-select";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import db from "../../../firebase";
import { Spinner } from "react-bootstrap";

export const Selector = props => {
  const loggedInUser = useContext(userContext);

  //gets Trekk list collection, where each doc is a place ID
  const [value, loading, error] = useCollection(
    db
      .collection("Trips")
      .doc(props.tripId)
      .collection("TrekkList")
  );

  //initialize useState to places already on the journal date places map
  const [selectedOption, setSelectedOptions] = useState([]);
  useEffect(()=> console.log("option state", [selectedOption]))

  if (error) throw error;
  if (loading) return <Spinner animation="grow" variant="info" />;
  if (value) {
    const trekkInfo = value;
    console.log(trekkInfo);

    //map place document into the options array to display in selector drop down
    const options = trekkInfo.docs.map(function(doc) {
      return { value: doc.id, label: doc.data().name };
    });


    function onChange(option) {
      console.log(option)
      setSelectedOptions(option);
      console.log("selected options", selectedOption);
      //need to write the added place to the journal day places map in firestore
      db
      .collection("Trips")
      .doc(props.tripId).collection("Journal").doc(props.date).set({places: {[option[option.length-1].value]: {name: option[option.length-1].label, user: loggedInUser.uid } }}, {merge: true})


      //   let {value} = option[option.length - 1]
      //   let {label} = option[option.length - 1]
      //   console.log(value, label)


      // db.collection("Trips")
      //   .doc(props.tripId)
      //   .collection("Journal")
      //   .doc(props.date)
      //   .set(
      //     { places: { [value]: {name: label, user: loggedInUser.uid}} },
      //     { merge: true }
      //   );
    }
    return (
      <div>
        <Select
          isMulti
          name="places"
          options={options}
          // value={selectedOption}
          onChange={onChange}
        />
      </div>
    );
  }
};

export default Selector;
