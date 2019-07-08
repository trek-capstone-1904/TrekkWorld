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

  const [optionValue, optionLoading, optionErrror] = useDocument(
    db
      .collection("Trips")
      .doc(props.tripId)
      .collection("Journal")
      .doc(props.date)
  );

  let datePlaces;
  if (optionValue) {
    datePlaces = optionValue.data().places ? optionValue.data().places : [];
  }

  if (error) throw error;
  if (loading) return <Spinner animation="grow" variant="info" />;
  if (value) {
    const trekkInfo = value;


    //map place document into the options array to display in selector drop down
    const options = trekkInfo.docs.map(function(doc) {
      return { value: doc.id, label: doc.data().name };
    });

    function onChange(option) {
      db.collection("Trips")
        .doc(props.tripId)
        .collection("Journal")
        .doc(props.date)
        .set(
          {
            places: option
          },
          { merge: true }
        );
    }

    if (datePlaces && datePlaces.length > 0) {
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
          <Select isMulti name="places" options={options} onChange={onChange} />
        </div>
      );
    }
  }
};

export default Selector;
