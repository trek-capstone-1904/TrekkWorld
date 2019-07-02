/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Form, Button, Col, Spinner } from 'react-bootstrap';
import db from '../firebase';

//TODO add a created by for Trips, add trip to user with submit

export const CreateTrekkForm = () => {
  //TODO update to represent actual current user ID
  const userId = 'lQNWEtdOGjXlIdmUIRb9';
  const userName = 'Patricia';

  const [values, setValues] = useState({
    tripName: '',
    locations: '',
    users: { [userId]: userName },
    startDate: '',
    endDate: '',
    tripImageUrl: '',
    tripTags: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    setLoading(true);
    try {
      //Create Trip
      const docRef = await db.collection('Trips').add(values);
      const tripDocId = docRef.id;
      console.log('Created trip/doc id:', tripDocId);

      //Add Trekk List SubCollection
      const trekkListCollection = await db
        .doc(`Trips/${tripDocId}`)
        .collection('TrekkList')
        .add({ location: values.locations });

      //Add Trip to User
      const userTrip = await db.doc(`Users/${userId}`).update({
        [`Trips.${tripDocId}`]: {
          tripName: values.tripName,
          startDate: values.startDate,
          endDate: values.endDate,
        },
      });
      //reset state to remove spinner & show comment of Trip Created Successfully!
      setLoading(false);
      setSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {loading && <Spinner animation="grow" variant="info" />}
      {!loading && !success && (
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Trip Name</Form.Label>
            <Form.Control
              name="tripName"
              value={values.tripName}
              onChange={handleChange}
              type="text"
              placeholder="Name your trip"
            />
            <Form.Label>Country</Form.Label>
            <Form.Control
              name="locations"
              value={values.locations}
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
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={values.startDate}
              onChange={handleChange}
              style={{ width: '15rem' }}
            />
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={values.endDate}
              onChange={handleChange}
              style={{ width: '15rem' }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Trip Type:</Form.Label>
            <Col sm={10}>
              <Form.Check
                inline
                type="radio"
                label="Romantic"
                name="tripTags"
                value="Romantic"
                onChange={handleChange}
              />
              <Form.Check
                inline
                type="radio"
                label="Family"
                name="tripTags"
                value="Family"
                onChange={handleChange}
              />
              <Form.Check
                inline
                type="radio"
                label="Friends"
                name="tripTags"
                value="Friends"
                onChange={handleChange}
              />
              <Form.Check
                inline
                type="radio"
                label="Solo"
                name="tripTags"
                value="Solo"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <div className="text-right">
            <Button variant="info" type="submit">
              Create Trip!
            </Button>
          </div>
        </Form>
      )}
      {success && <h4>Successfully Created Trip!</h4>}
    </div>
  );
};

export default CreateTrekkForm;
