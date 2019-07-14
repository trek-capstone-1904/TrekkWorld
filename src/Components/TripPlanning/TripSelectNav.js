import React, { useState, useContext, useEffect } from 'react';
import { ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import { useDocument } from 'react-firebase-hooks/firestore';
import userContext from '../../Contexts/userContext';
import db from '../../firebase';
import history from '../../history';
import styles from '../TripPlanning.module.css';

export const TripSelectNav = () => {
  const loggedInUser = useContext(userContext);
  const [tripId, setTripId] = useState('');

  const [snapshot, loading, error] = useDocument(
    db.collection('Users').doc(`${loggedInUser.uid}`),
    {
      snapshotListenOptions: { includeMetadataChanges: false },
    }
  );

  function handleClick(evt) {
    const tripId = evt;
    history.push(`/trip/${tripId}`);
  }

  return (
    <ButtonGroup>
      <DropdownButton
        as={ButtonGroup}
        title="My Trips"
        onSelect={evt => handleClick(evt)}
        id="bg-nested-dropdown"
        bg="dark"
        variant="dark"
      >
        {snapshot &&
          Object.entries(snapshot.data().Trips).map(trip => (
            <Dropdown.Item key={trip[0]} eventKey={trip[0]} value={trip[0]}>
              {trip[1].tripName}
            </Dropdown.Item>
          ))}
      </DropdownButton>
    </ButtonGroup>
  );
};

export default TripSelectNav;
