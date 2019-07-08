import React, { useContext, useState, useEffect } from "react";
import Select from "react-select";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import db from "../../../firebase";
import { Spinner } from "react-bootstrap";

export const Selector = props => {

  //get Trekk list collection, which is one doc per place on trekk list
  const [value, loading, error] = useCollection(
    db
      .collection("Trips")
      .doc(props.tripId)
      .collection("TrekkList")
  );

    //initialize useState to places already on the journal date places map
  const [selectedOption, setSelectedOptions] = useState([]);

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
      setSelectedOptions(option);
      console.log("selected options", selectedOption);
      //need to write the added place to the journal day places map in firestore
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
