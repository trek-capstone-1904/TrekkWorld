import React, { useState, useContext } from 'react';
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
  InputGroup,
} from 'react-bootstrap';
import userContext from '../../Contexts/userContext';
import { useDocument } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';
import { AddTrekker, TripMap, PhotoLoad } from '../index';
import {
  SearchAPI,
  TripSearch,
  BucketList,
  TrekkList,
  CountrySelect,
  TripAlbum,
} from '../index.js';
import firebase from 'firebase/app';
import styles from '../TripPage.module.css';

export const TripPage = props => {
  const loggedInUser = useContext(userContext);
  const userId = `${loggedInUser.uid}`;

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

    function isThisAFellowTrekker() {
      console.log('users on trip', users);
      let trekkersIds = Object.keys(users);
      if (trekkersIds.includes(userId)) {
        console.log('GOING ON VACATION');
        return true;
      } else {
        console.log('not my trip');
        return false;
      }
    }

    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '70vw' }}>
          <Jumbotron className={styles.Jumbotron}>
            <div>
              <h1 className={styles.headerTrip}>{tripName}</h1>
              {daysRemaining < 0 ? (
                <Badge style={{ margin: '.5rem' }} variant="success">
                  Trip completed
                </Badge>
              ) : (
                <div>
                  <h3>
                    Days until Trekk:{' '}
                    <Badge className="badge-pill" variant="success">
                      {daysRemaining}
                    </Badge>
                  </h3>
                </div>
              )}
              <hr />
              <Button variant="info" onClick={openJournal}>
                Open Journal
              </Button>
              <br />
              {daysRemaining > 0 && (
                <Button variant="info" style={{ marginTop: '1rem' }}>
                  Add Activities to Trekk
                </Button>
              )}
            </div>
            <TripMap countries={locations} />
          </Jumbotron>
          <h3
            style={{ textAlign: 'left', marginLeft: '1rem' }}
            className={styles.headerTrip}
          >
            Trekk Activities Planned
          </h3>
          {/* {daysRemaining > 0 && <Button>Add Activities to Trekk</Button>} */}
          <TrekkList tripId={tripId} />
        </div>
        <div
          style={{
            backgroundColor: '#17a2b8',
            width: '30vw',
            minHeight: '100vh',
          }}
        >
          <Card border="info" bg="info" className={styles.tripInfoCard}>
            <Card.Body>
              <Card.Title className={styles.headerTrip}>
                <h4>Trip Details</h4>
              </Card.Title>
              <Card.Text style={{ padding: '0 1rem' }}>
                Dates: {moment(startDate).format('MMM D, YYYY')} -{' '}
                {moment(endDate).format('MMM D, YYYY')}{' '}
              </Card.Text>
              <Card.Text style={{ padding: '0 1rem' }}>
                Total Days: {totalDays}{' '}
              </Card.Text>
              <Card.Text style={{ padding: '0 1rem' }}>
                Countries:
                {locations.map(country => (
                  <Badge variant="info"> {country}</Badge>
                ))}
              </Card.Text>
              <Card.Text style={{ padding: '0 1rem' }}>
                {' '}
                Trip type: {tripTags}{' '}
              </Card.Text>
            </Card.Body>
          </Card>
          <div>
            <hr />
            <h4 className={styles.headerTrip} style={{ margin: '1rem' }}>
              Trekkers
            </h4>
            <ul className={`list-unstyled ${styles.listTrekkers}`}>
              {/* <h5>Fellow Trekkers</h5> */}
              {Object.entries(users).map(user => (
                <Link to={`/profile/${user[0]}`}>
                  <Media
                    key={user[0]}
                    as="li"
                    style={{
                      alignItems: 'center',
                      border: '1px dotted teal',
                      float: 'left',
                      backgroundColor: '#e9ecef',
                      justifyContent: 'center',
                      margin: '.1rem',
                      width: '15rem',
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
                      <p style={{ margin: '0', paddingRight: '.3rem' }}>
                        {' '}
                        {user[1].userName}
                      </p>
                    </Media.Body>
                    {isThisAFellowTrekker() && (
                      <button
                        onClick={() => handleDelete(user[0], tripId)}
                        type="button"
                        className="close"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    )}
                  </Media>
                </Link>
              ))}
              {isThisAFellowTrekker() && (
                <Button
                  variant="light"
                  style={{ margin: '.5rem' }}
                  onClick={toggleForm}
                >
                  + New Trekker
                </Button>
              )}
            </ul>

            <Modal show={isShowing} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Who's trekking with?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <AddTrekker
                  userDoc={props}
                  tripId={tripId}
                  trip={trip.data()}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <hr />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignContent:'start' }}>
            <h4 className={styles.headerTrip} style={{margin:'.2rem 1rem'}}>Trip Images from Trekkers </h4>
            {isThisAFellowTrekker() && (
              <PhotoLoad from="trip" tripId={props.tripId} />
            )}
          </div>
          <TripAlbum fellowTrekker={isThisAFellowTrekker()} tripId={tripId} />
        </div>
      </div>
    );
  }
};

export default TripPage;
