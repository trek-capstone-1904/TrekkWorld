import React, { useContext, useState, useEffect } from "react";
import userContext from "../../../Contexts/userContext";
import Select from "react-select";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import db from "../../../firebase";
import { Spinner, Modal, Button } from "react-bootstrap";


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

  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  function handleClose(){
    setIsShowing(false);
  }

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
      return { value: doc.id, label: doc.data().placeName };
    });
    console.log(options)

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

    //the only difference in the two renders is whether or not there will already be places selected
    if (datePlaces && datePlaces.length > 0) {
      return (
        <>
        <Button type="button" onClick={toggle}>Add a Location</Button>
        <Modal show={isShowing} onHide={toggle} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Locations</Modal.Title>
        </Modal.Header>
          <Select
            isMulti
            name="places"
            options={options}
            value={datePlaces}
            onChange={onChange}
          />
          <Button
          style={{ width: "5rem", align: "centered" }}
          type="button"
          onClick={handleClose}
        >
          Done
        </Button>
        </Modal>
        </>
      );
    } else {
      return (
        <>
         <Button type="button" onClick={toggle}>Add a Location</Button>
         <Modal show={isShowing} onHide={toggle} size="lg" centered>
         <Modal.Header closeButton>
          <Modal.Title>Add Locations</Modal.Title>
        </Modal.Header>
          <Select isMulti name="places" options={options} onChange={onChange} />
        </Modal>
        </>
      );
    }
  }
};

export default Selector;
