import React, { useState, useContext } from 'react';
import { Jumbotron, Form, Button, Tabs, Tab } from 'react-bootstrap';
import styles from '../TripPlanning.module.css';
import { SearchAPI, TripSearch } from '../index.js';
import 'firebase/auth';
import userContext from '../../Contexts/userContext';
import BorTList from '../SingleTrip/BorTList';

export const TripPlanning = () => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [submitted, setSubmit] = useState(false);

  const loggedInUser = useContext(userContext);

  const handleChange = (evt, type) => {
    setSubmit(false);
    if (evt.currentTarget.name === 'city') {
      setCity(evt.target.value);
    } else if (evt.currentTarget.name === 'country') {
      setCountry(evt.target.value);
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
            {submitted && <SearchAPI city={city} country={country} />}
          </div>
          <div className={styles.BucketList}>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
              <Tab eventKey="Bucket List" title="Trekk List">
                <BorTList list={'trekkList'} />
              </Tab>
              <Tab eventKey="Trekk List" title="Bucket List">
                {/* <BucketList /> */}
                <BorTList list={'bucketList'} />
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
