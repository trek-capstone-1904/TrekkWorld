import React, { useState } from 'react';
import moment from 'moment';
import db from '../../firebase';
import {
  Spinner,
  Jumbotron,
  Media,
  Button,
  Modal,
  Card,
  Badge,
  Row,
} from 'react-bootstrap';
import { useDocument } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';
import { AddTrekker } from '../index';
import firebase from 'firebase/app';

export const TripPage = props => {
  const [trip, loading, error] = useDocument(
    db.collection('Trips').doc(props.match.params.tripId),
    {
      valueListenOptions: { includeMetadataChanges: true },
    }
  );
  const tripId = props.match.params.tripId;

  //redirects to journal
  function openJournal() {
    props.history.push(`${tripId}/journal`);
  }

  const [isShowing, setIsShowing] = useState(false);

  function toggleForm() {
    //open add trekker form
    setIsShowing(!isShowing);
  }

  function handleClose() {
    setIsShowing(false);
  }

  const handleDelete = (uid, tripId) => {
    //remove entry from User
    const userRef = db.collection('Users').doc(uid);
    const tripRef = db.collection('Trips').doc(tripId);

    // Remove the Trip from the User collection

    const removeTripfromUser = userRef.update({
      [`Trips.${tripId}`]: firebase.firestore.FieldValue.delete(),
    });

    // //Remove User from Trip Collection doc
    const removeUserfromTrip = tripRef.update({
      [`users.${uid}`]: firebase.firestore.FieldValue.delete(),
    });
  };

  if (error) throw error;
  if (loading) return <Spinner animation="grow" variant="info" />;
  if (trip) {
    const {
      tripName,
      locations,
      endDate,
      startDate,
      tripTags,
      tripImageUrl,
      users,
    } = trip.data();

    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const daysRemaining = Math.floor((start - today) / _MS_PER_DAY);
    const totalDays = Math.floor((end - start) / _MS_PER_DAY);
    console.log('days left', daysRemaining);
    // console.log(users);
    return (
      <div>
        <Jumbotron style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ textAlign: 'left' }}>
            <h1>{tripName}</h1>
            {daysRemaining < 0 ? (
              <Badge style={{ margin: '.5rem' }} variant="success">
                Trip completed
              </Badge>
            ) : (
              <Badge variant="info"> Days until Trekk: {daysRemaining}!</Badge>
            )}
            <hr />
            <Button onClick={openJournal}>Open Journal</Button>
          </div>
          <Card style={{ width: '20rem', textAlign: 'left' }}>
            <Card.Body>
              <Card.Title>Trip Details</Card.Title>
              <Card.Text>
                Start: {moment(startDate).format('MMM D, YYYY')}{' '}
              </Card.Text>
              <Card.Text>
                End: {moment(endDate).format('MMM D, YYYY')}{' '}
              </Card.Text>
              <Card.Text>Total Days: {totalDays} </Card.Text>
              {locations.map(country => (
                <Card.Text key={country}>Countries: {country}</Card.Text>
              ))}
              <Card.Text> Trip type: {tripTags} </Card.Text>
            </Card.Body>
          </Card>
        </Jumbotron>
        {/* <div
          style={{
            width: '33vw',
            border: '1.5px solid #17a2b8',
            padding: '1rem',
          }}
        > */}
        <Card border="info" style={{ maxWidth: '25rem', margin: '.5rem' }}>
          <Card.Header>
            <h4>Fellow Trekkers</h4>
            <Button
              variant="info"
              style={{ margin: '.5rem' }}
              onClick={toggleForm}
            >
              {' '}
              + New Trekker
            </Button>
          </Card.Header>
          <ul className="list-unstyled" style={{ padding: '0 2rem' }}>
            {Object.entries(users).map(user => (
              <Media
                key={user[0]}
                as="li"
                style={{
                  margin: '.5rem',
                  alignItems: 'center',
                  border: '1px dotted teal',
                  padding: '0 1.5rem',
                }}
              >
                <img
                  width={64}
                  height={64}
                  className="mr-3"
                  src={user[1].userPicture}
                  alt="Profile Pic"
                />
                <Media.Body>
                  <h5>{user[1].userName}</h5>
                </Media.Body>
                <button
                  onClick={() => handleDelete(user[0], tripId)}
                  type="button"
                  className="close"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </Media>
            ))}
          </ul>
          <Modal show={isShowing} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Who's trekking with?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddTrekker userDoc={props} tripId={tripId} trip={trip.data()} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Card>

      </div>
    );
  }
};

export default TripPage;
