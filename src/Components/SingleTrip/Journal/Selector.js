import React, { useContext, useState, useEffect } from "react";
import Select from "react-select";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import db from "../../../firebase";
import {Spinner} from 'react-bootstrap'

export const Selector = props => {
  const [value, loading, error] = useCollection(
    db.collection("Trips").doc(props.tripId).collection("TrekkList")
  );
  const [selectedOption, setSelectedOptions] = useState([]);

  if (error) throw error;
  if (loading) return <Spinner animation="grow" variant="info" />;
  if (value){
    const trekkInfo = value;
    console.log(trekkInfo)
    //change from locations to places on the trekkList
    const options = trekkInfo.forEach(e => ({ value: e.name, label: e.name }));
    //initialize useState to places already on the journal date places map

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
