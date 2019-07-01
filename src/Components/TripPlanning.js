import React, { useState } from 'react';
import { Jumbotron, Form, Button } from 'react-bootstrap';
import styles from './TripPlanning.module.css';
import { SearchAPI } from './index.js';

export const TripPlanning = () => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [submitted, setSubmit] = useState(false);

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

  console.log(submitted);
  return (
    <div>
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
              <option value="FR">France</option>
              <option value="PE">Peru</option>
              <option value="CL">Chile</option>
              <option value="AU">Australia</option>
              <option value="CO">Colombia</option>
              <option value="KO">Korea</option>
              <option value="EG">Egypt</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Jumbotron>
      <div className={styles.searchResults}>
        <div className={styles.placeholderTripSearch}>
          <h2>Trips</h2>
        </div>
        <div className={styles.searchAPI}>
          <h2>Things to Do</h2>
          {submitted && <SearchAPI city={city} country={country} />}
        </div>
      </div>
    </div>
  );
};

export default TripPlanning;
