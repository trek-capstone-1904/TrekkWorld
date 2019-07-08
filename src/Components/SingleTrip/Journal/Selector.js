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

  const [optionValue, optionLoading, optionErrror] = useDocument(db.collection("Trips").doc(props.tripId).collection("Journal").doc(props.date))


  let datePlaces;
  if(optionValue){

    datePlaces = optionValue.data().places ? optionValue.data().places : []
  }

  //initialize useState to places already on the journal date places map
  // const [selectedOption, setSelectedOptions] = useState([]);
  // useEffect(() => console.log("option state", [selectedOption]));

  if (error) throw error;
  if (loading) return <Spinner animation="grow" variant="info" />;
  if (value) {
    const trekkInfo = value;
    // console.log(trekkInfo);

    //map place document into the options array to display in selector drop down
    const options = trekkInfo.docs.map(function(doc) {
      return { value: doc.id, label: doc.data().name };
    });

    function onChange(option) {
      console.log("option", option);
      // setSelectedOptions(option);
      // console.log("selected options", selectedOption);
      //need to write the added place to the journal day places map in firestore
      if(option){
        db.collection("Trips")
          .doc(props.tripId)
          .collection("Journal")
          .doc(props.date)
          .set(
            {
              places: {
                [option[option.length - 1].value]: {
                  name: option[option.length - 1].label,
                  user: loggedInUser.uid
                }
              }
              // option
            },
            { merge: true }
          );

      } else {
        db.collection("Trips")
        .doc(props.tripId)
        .collection("Journal")
        .doc(props.date)
        .set(
          {
            places: {

            }
            // option
          },
          { merge: true }
        );
      }
    }

    if(datePlaces && datePlaces.length > 0){
      return (
        <div>
          <Select
            isMulti
            name="places"
            options={options}
            value={datePlaces}
            onChange={onChange}
          />
        </div>
      );

    } else {
      return (
        <div>
          <Select
            isMulti
            name="places"
            options={options}

            onChange={onChange}
          />
        </div>
      );
    }
  }
};

export default Selector;
