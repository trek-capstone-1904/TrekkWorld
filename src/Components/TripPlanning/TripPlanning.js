import React, { useState, useContext, useEffect } from "react";
import { Jumbotron, Form, Button, Tabs, Tab } from "react-bootstrap";
import styles from "../TripPlanning.module.css";
import { SearchAPI, TripSearch, CountrySelect } from "../index.js";
import "firebase/auth";
import userContext from "../../Contexts/userContext";
import db from "../../firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import history from "../../history";

export const TripPlanning = props => {
  const query = props.location.search;
  const countryIdx = 9;
  const cityIdx = query.indexOf("&city=") + 6;
  const codeIdx = query.indexOf("&code=") + 6;

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [code, setCode] = useState("");
  const [tripId, setTripId] = useState("");

  const [submitted, setSubmit] = useState(false);

  const loggedInUser = useContext(userContext);

  const [snapshot, loading, error] = useDocument(
    db.collection("Users").doc(`${loggedInUser.uid}`),
    {
      snapshotListenOptions: { includeMetadataChanges: false }
    }
  );

  const handleChange = (evt, type) => {
    setSubmit(false);
    if (evt.currentTarget.name === "city") {
      setCity(evt.target.value);
    } else if (evt.currentTarget.name === "country") {
      setCity("");
      setCountry(evt.target.value);
      setCode(evt.target.selectedOptions[0].dataset.code);
    }
  };

  const changeTripId = (evt, type) => {
    if (evt.currentTarget.name === "tripId") {
      setTripId(evt.target.value);
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (country === "Select a Country..." || country === "") {
      alert("Please select a country");
    } else {
      history.replace(`/plantrip?country=${country}&city=${city}&code=${code}`);
      setSubmit("true");
    }
  };

  //create route for trips associated with loggedInUser

  if (loggedInUser) {
    console.log("render!");
    return (
      <div className={styles.background}>
        <Jumbotron className={styles.tripPlanningJumbo}>
          <h1>Where in the world are YOU trekking?</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className={styles.tripPlanningLabel}>
                Country
              </Form.Label>
              <Form.Control
                name="country"
                value={country}
                as="select"
                onChange={handleChange}
              >
                <CountrySelect />
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label className={styles.tripPlanningLabel}>City</Form.Label>
              <Form.Control
                name="city"
                value={city}
                onChange={handleChange}
                type="text"
                placeholder="Enter city i.e. Paris"
              />
            </Form.Group>

            <Button
              style={{ backgroundColor: "#EDAE49", border: "none" }}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Jumbotron>
        {/* TODO: For now search requires a city and uses city to search locations. Make it flexible so city is optional ALSO fix that city must be capital for it to work*/}
        {submitted && (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <h1 style={{ width: "65%" }} className={styles.headerFont}>
                Search Results
              </h1>
            </div>
            <div className={styles.searchResults}>
              <div className={styles.placeholderTripSearch}>
                <Tabs defaultActiveKey="Trip-Search" id="Trip Search Results">
                  <Tab eventKey="Trip-Search" title="Trip Ideas">
                    {submitted && <TripSearch city={city} country={country} />}
                  </Tab>
                  <Tab eventKey="Search-API-Sights" title="Search Local Sights">
                    {submitted && (
                      <SearchAPI
                        city={city}
                        country={country}
                        code={code}
                        type={"sights"}
                      />
                    )}
                  </Tab>
                  <Tab eventKey="Search-API-Cities" title="Popular Cities">
                    {submitted && (
                      <SearchAPI
                        city={city}
                        country={country}
                        code={code}
                        type={"cities"}
                      />
                    )}
                  </Tab>
                </Tabs>
              </div>
            </div>
          </>
        )}
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default TripPlanning;
