import React, { useState } from 'react';
import db from '../../firebase';
import { Spinner, Jumbotron, Media, Button } from 'react-bootstrap';
import { useDocument } from 'react-firebase-hooks/firestore';
import {Link} from 'react-router-dom'

export const TripPage = props => {
  const [trip, loading, error] = useDocument(
    db.collection('Trips').doc(props.match.params.tripId),
    {
      valueListenOptions: { includeMetadataChanges: true },
    }
  );
  const tripId = props.match.params.tripId
  console.log(tripId)
  function handleClick(){
    console.log(props.history)
    console.log(props.match)
    props.history.push(`${tripId}/journal`)
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
    console.log(Object.keys(users));
    return (
      <div>
        <Jumbotron>
          <h1>{tripName}</h1>
          {/* <Link to={`trip/${props.match.params.tripId}/journal`}> */}
            <Button onClick={handleClick}>Open Journal</Button>
          {/* </Link> */}
        </Jumbotron>
        {/* <div className={styles.FellowTravelers}> */}
        <div style={{ border: '1px solid teal', width: '33vw' }}>
          <h3>Fellow Trekkers</h3>
          <ul className="list-unstyled">
            <Media as="li">
              <img
                width={64}
                height={64}
                className="mr-3"
                src="holder.js/64x64"
                alt="Generic placeholder"
              />
              <Media.Body>
                <h5>List-based media object</h5>
                <p>
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                  scelerisque ante sollicitudin commodo. Cras purus odio,
                  vestibulum in vulputate at, tempus viverra turpis. Fusce
                  condimentum nunc ac nisi vulputate fringilla. Donec lacinia
                  congue felis in faucibus.
                </p>
              </Media.Body>
            </Media>

            <Media as="li">
              <img
                width={64}
                height={64}
                className="mr-3"
                src="holder.js/64x64"
                alt="Generic placeholder"
              />
              <Media.Body>
                <h5>List-based media object</h5>
                <p>
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                  scelerisque ante sollicitudin commodo. Cras purus odio,
                  vestibulum in vulputate at, tempus viverra turpis. Fusce
                  condimentum nunc ac nisi vulputate fringilla. Donec lacinia
                  congue felis in faucibus.
                </p>
              </Media.Body>
            </Media>

            <Media as="li">
              <img
                width={64}
                height={64}
                className="mr-3"
                src="holder.js/64x64"
                alt="Generic placeholder"
              />
              <Media.Body>
                <h5>List-based media object</h5>
                <p>
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                  scelerisque ante sollicitudin commodo. Cras purus odio,
                  vestibulum in vulputate at, tempus viverra turpis. Fusce
                  condimentum nunc ac nisi vulputate fringilla. Donec lacinia
                  congue felis in faucibus.
                </p>
              </Media.Body>
            </Media>
          </ul>
        </div>
      </div>
    );
  }
};

export default TripPage;
