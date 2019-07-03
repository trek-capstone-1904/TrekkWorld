import React, { useState } from 'react';
import db from '../../firebase';
import { Spinner, Jumbotron, Media, Button, Modal } from 'react-bootstrap';
import { useDocument } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';

export const TripPage = props => {
  const [trip, loading, error] = useDocument(
    db.collection('Trips').doc(props.match.params.tripId),
    {
      valueListenOptions: { includeMetadataChanges: true },
    }
  );
  const tripId = props.match.params.tripId;

  //redirects to journal
  function handleClick() {
    props.history.push(`${tripId}/journal`);
  }

  const [isShowing, setIsShowing] = useState(false);

  function toggleForm() {
    //Open Form
    setIsShowing(!isShowing);
    //Find user by email
    //add to user map on Trips
    //add trip to user collection
  }
  function handleClose() {
    setIsShowing(false);
    // props.history.push(`/trip/${trip}`);
  }

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
    console.log(users);
    return (
      <div>
        <Jumbotron>
          <h1>{tripName}</h1>
          {/* <Link to={`trip/${props.match.params.tripId}/journal`}> */}
          <Button onClick={handleClick}>Open Journal</Button>
          {/* </Link> */}
        </Jumbotron>

        {/* <div className={styles.FellowTravelers}> */}
        <div
          style={{
            width: '33vw',
            border: '1.5px solid #17a2b8',
            padding: '1rem',
          }}
        >
          <h3>Fellow Trekkers</h3>
          <Button
            variant="info"
            style={{ margin: '.5rem' }}
            onClick={toggleForm}
          >
            {' '}
            + New Trekker
          </Button>
          <ul
            className="list-unstyled"
            style={{ display: 'flex', justifyContent: 'space-around' }}
          >
            {Object.entries(users).map(user => (
              <Media key={user[0]} as="li" style={{ margin: '.5rem' }}>
                {console.log(users)}
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
              </Media>
            ))}
          </ul>
          <Modal show={isShowing} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Who's trekking with?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* <AddTrekker userDoc={props} /> */}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
};

export default TripPage;
