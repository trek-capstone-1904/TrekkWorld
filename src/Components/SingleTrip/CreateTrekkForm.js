/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { Form, Button, Col, Spinner } from 'react-bootstrap';
import db from '../../firebase';
import userContext from '../../Contexts/userContext';
import CountriesSelect from '../Helper/CountrySelect';
import history from '../../history';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { CountrySelect } from '../index.js';

//TODO add a created by for Trips, add trip to user with submit

export const CreateTrekkForm = props => {
  //TODO update to represent actual current user ID
  const loggedInUser = useContext(userContext);
  const userId = `${loggedInUser.uid}`;
  const userName = `${loggedInUser.displayName}`;
  const [userPicture, setUserPicture] = useState('');

  const [values, setValues] = useState({
    tripName: '',
    locations: '',
    users: {
      [userId]: {
        userName: userName,
        userPicture: props.userDoc.user.userPicture,
      },
    },
    startDate: '',
    endDate: '',
    tripImageUrl: '',
    tripTags: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tripId, setTripId] = useState('');

  const handleChange = event => {
    event.persist();
    if (event.target.name === 'locations') {
      //TODO currently only allows for one country to be selected otherwise will overwrite maybe?
      setValues(values => ({
        ...values,
        [event.target.name]: [event.target.value],
      }));
    } else {
      setValues(values => ({
        ...values,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();

    setLoading(true);

    try {
      //Create Trip
      const docRef = await db.collection('Trips').add(values);
      const tripDocId = docRef.id;
      setTripId(tripDocId);
      console.log('Created trip/doc id:', tripDocId);

      //Add Trekk List SubCollection
      // const trekkListCollection = await db
      //   .doc(`Trips/${tripDocId}`)
      //   .collection('TrekkList')
      //   .add();
      // //Add Journal
      // const Journal = await db
      //   .doc(`Trips/${tripDocId}`)
      //   .collection('Journal')

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
  function handleClick(evt) {
    history.push(`/trip/${tripId}`);
  }

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
              value={values.locations[0]}
              as="select"
              onChange={handleChange}
            >
              <CountrySelect />
            </Form.Control>
            {/* <CountriesSelect
              value={values.locations[0]}
              onChange={handleChange}
            /> */}
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
                label="Couples"
                name="tripTags"
                value="Couples"
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
      {success && (
        <div>
          <h4>Successfully Created Trip!</h4>
          <Button onClick={handleClick}> > Go To Trip Page</Button>
        </div>
      )}
    </div>
  );
};

export default CreateTrekkForm;
