import React, { useState, useContext } from 'react';
import {
  Jumbotron,
  Form,
  Button,
  Tabs,
  Tab,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';
import styles from '../TripPlanning.module.css';
import { SearchAPI, TripSearch, BucketList, TrekkList } from '../index.js';
import 'firebase/auth';
import userContext from '../../Contexts/userContext';

import db from '../../firebase';
import { useDocument } from 'react-firebase-hooks/firestore';

export const TripPlanning = () => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [submitted, setSubmit] = useState(false);

  const [tripId, setTripId] = useState('');
  const loggedInUser = useContext(userContext);

  const handleChange = (evt, type) => {
    setSubmit(false);
    if (evt.currentTarget.name === 'city') {
      setCity(evt.target.value);
    } else if (evt.currentTarget.name === 'country') {
      setCountry(evt.target.value);
    } else if (evt.currentTarget.name === 'tripId') {
      setTripId(evt.target.value);
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (country === 'Select...' || country === '') {
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
        <h1>{loggedInUser.uid}</h1>
        <Jumbotron className={styles.tripPlanningJumbo}>
          <h1>Where in the world are YOU trekking?</h1>
          <Form onSubmit={handleSubmit}>
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
                <option value="Select...">Select...</option>
                <option value="France">France</option>
                <option value="Peru">Peru</option>
                <option value="Chile">Chile</option>
                <option value="Australia">Australia</option>
                <option value="Colombia">Colombia</option>
                <option value="Korea">Korea</option>
                <option value="Egypt">Egypt</option>
                <option value="Spain">Spain</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Jumbotron>
        {/* TODO: For now search requires a city and uses city to search locations. Make it flexible so city is optional ALSO fix that city must be capital for it to work*/}
        <div className={styles.searchResults}>
          <div className={styles.placeholderTripSearch}>
            <h2>Trips</h2>
            {submitted && <TripSearch city={city} country={country} />}
          </div>
          <div className={styles.searchAPI}>
            <h2>Things to Do</h2>
            {submitted && (
              <SearchAPI city={city} country={country} tripId={tripId} />
            )}
          </div>
          <div className={styles.BucketList}>
            {/* <DropdownButton id="dropdown-basic-button" title="Trekk">
              {snapshot &&
                Object.entries(snapshot.data().Trips).map(trip => (
                  <option value={trekk} onChange={handleChange}>
                    {trip[1].tripName}
                  </option>
                ))}
            </DropdownButton> */}
            <Form.Control
              name="tripId"
              value={tripId}
              as="select"
              onChange={handleChange}
            >
              <option>select</option>
              {snapshot &&
                Object.entries(snapshot.data().Trips).map(trip => (
                  <option key={trip[0]} value={trip[0]}>
                    {trip[1].tripName}
                  </option>
                ))}
            </Form.Control>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
              <Tab eventKey="Bucket List" title="Trekk List">
                <TrekkList list={'trekkList'} tripId={tripId} />
              </Tab>
              <Tab eventKey="Trekk List" title="Bucket List">
                {/* <BucketList /> */}
                <BucketList />
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
