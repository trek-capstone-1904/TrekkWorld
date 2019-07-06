import React, { useContext, useState, useEffect } from "react";
import Select from "react-select";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import db from "../../firebase";

export const Selector = props => {
  const [value, loading, error] = useDocument(
    db.collection("Trips").doc(props.tripId)
  );
  const tripInfo = value.data();
  const options = tripInfo.locations.map(e => ({ value: e, label: e }));
  //initialize useState to places already on the journal date places map
  const [selectedOption, setSelectedOptions] = useState([]);

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
};

export default Selector;
