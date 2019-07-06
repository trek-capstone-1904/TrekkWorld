import React, { useState, useContext } from 'react';
import { Jumbotron, Form, Button, Tabs, Tab } from 'react-bootstrap';
import styles from '../TripPlanning.module.css';
import {
  SearchAPI,
  TripSearch,
  BucketList,
  TrekkList,
  CountrySelect,
} from '../index.js';
import 'firebase/auth';
import userContext from '../../Contexts/userContext';

import db from '../../firebase';
import { useDocument } from 'react-firebase-hooks/firestore';

export const TripPlanning = () => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [code, setCode] = useState('');
  const [submitted, setSubmit] = useState(false);
  const [tripId, setTripId] = useState('');

  const loggedInUser = useContext(userContext);

  const handleChange = (evt, type) => {
    setSubmit(false);
    // console.log('event target value in handlechange', evt.target.selectedOptions[0].dataset.code);
    // event.target.value - value of currently selected option
    if (evt.currentTarget.name === 'city') {
      setCity(evt.target.value);
    } else if (evt.currentTarget.name === 'country') {
      setCountry(evt.target.value);
      setCode(evt.target.selectedOptions[0].dataset.code);
    } else if (evt.currentTarget.name === 'tripId') {
      setTripId(evt.target.value);
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    // console.log()
    if (country === 'Select a Country...' || country === '') {
      alert('Please select a country');
    } else {
      // alert(`Submitting city: ${city}, ${country}`);
      setSubmit('true');
    }
  };

  //create route for trips associated with loggedInUser
  const [snapshot, loading, error] = useDocument(
    db.collection('Users').doc(`${loggedInUser.uid}`),
    {
      snapshotListenOptions: { includeMetadataChanges: false },
    }
  );

  if (loggedInUser) {
    return (
      <div>
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

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Jumbotron>
        {/* TODO: For now search requires a city and uses city to search locations. Make it flexible so city is optional ALSO fix that city must be capital for it to work*/}
        <div className={styles.searchResults}>
          <div className={styles.placeholderTripSearch}>
            <Tabs defaultActiveKey="Search-API" id="Trip Search Results">
              <Tab eventKey="Search-API" title="Search API">
                {submitted && (
                  <SearchAPI
                    city={city}
                    country={country}
                    tripId={tripId}
                    code={code}
                  />
                )}
              </Tab>
              <Tab eventKey="Trip-Search" title="Trip Search">
                {submitted && <TripSearch city={city} country={country} />}
              </Tab>
            </Tabs>
          </div>
          <div className={styles.BucketList}>
            <Form.Control
              name="tripId"
              value={tripId}
              as="select"
              onChange={handleChange}
            >
              <option>select a trip to plan</option>
              {snapshot &&
                Object.entries(snapshot.data().Trips).map(trip => (
                  <option key={trip[0]} value={trip[0]}>
                    {trip[1].tripName}
                  </option>
                ))}
            </Form.Control>
            <Tabs defaultActiveKey="Bucket List" id="Trekk-Bucket-List">
              <Tab eventKey="Bucket List" title="Bucket List">
                <BucketList tripId={tripId} />
              </Tab>
              <Tab eventKey="Trekk List" title="Trekk List">
                {tripId && <TrekkList list={'trekkList'} tripId={tripId} />}
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default TripPlanning;
