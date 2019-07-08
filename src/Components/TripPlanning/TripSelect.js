import React, { useState, useContext, useEffect } from 'react';
import { TrekkList } from '../index.js';
import { Form, Tab, Tabs } from 'react-bootstrap';
import { useDocument } from 'react-firebase-hooks/firestore';
import userContext from '../../Contexts/userContext';
import db from '../../firebase';
import styles from '../TripPlanning.module.css';

export const TripSelect = () => {
  const loggedInUser = useContext(userContext);
  const [tripId, setTripId] = useState('');

  const [snapshot, loading, error] = useDocument(
    db.collection('Users').doc(`${loggedInUser.uid}`),
    {
      snapshotListenOptions: { includeMetadataChanges: false },
    }
  );

  const changeTripId = (evt, type) => {
    if (evt.currentTarget.name === 'tripId') {
      setTripId(evt.target.value);
    }
  };

  return (
    <div className={styles.BucketList}>
      {snapshot &&
        snapshot.data().Trips &&
        Object.keys(snapshot.data().Trips).length !== 0 && (
          <Form.Control
            name="tripId"
            value={tripId}
            as="select"
            onChange={changeTripId}
          >
            <option>select a trip to plan</option>
            {Object.entries(snapshot.data().Trips).map(trip => (
              <option key={trip[0]} value={trip[0]}>
                {trip[1].tripName}
              </option>
            ))}
          </Form.Control>
        )}
      <Tabs defaultActiveKey="Trekk List" id="Trekk-Bucket-List">
        {/* <Tab eventKey="Bucket List" title="Bucket List"> */}
        {/* <BucketList tripId={tripId} /> */}
        {/* </Tab> */}
        <Tab eventKey="Trekk List" title="Trekk List">
          {tripId && <TrekkList list={'trekkList'} tripId={tripId} />}
        </Tab>
      </Tabs>
    </div>
  );
};

export default TripSelect;
