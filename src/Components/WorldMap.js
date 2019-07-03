import React, { useContext, useState } from 'react';
import Chart from 'react-google-charts';
import { useDocument } from 'react-firebase-hooks/firestore';
import db from '../firebase';
import userContext from '../Contexts/userContext';
import { Spinner, Button } from 'react-bootstrap';
import zoom from '../images/baseline_zoom_out_map_black_18dp.png';
import styles from './UserProfile.module.css';
import Modal from 'react-bootstrap/Modal';

export const WorldMap = () => {
  const loggedInUser = useContext(userContext);
  const [isZoom, setIsZoom] = useState(false);

  const [value, loading, error] = useDocument(
    db.doc(`Users/${loggedInUser.uid}`),
    {
      valueListenOptions: { includeMetadataChanges: true },
    }
  );

  function toggle() {
    setIsZoom(!isZoom);
  }
  function handleClose() {
    setIsZoom(false);
  }
  if (error) throw error;
  if (loading) return <Spinner animation="grow" variant="info" />;
  if (value) {
    const countries = value && value.data().countriesVisited;
    const dataCountries = value && countries.map(country => [country]);
    return (
      <div>
        <h1>Countries Visited</h1>
        <h3>{dataCountries.length - 1}</h3>
        <p style={{ textAlign: 'right' }}>
          <button onClick={toggle} style={{ border: '0', outline: 'none' }}>
            <img style={{ width: '1rem' }} src={zoom} alt="zoom" />
          </button>
        </p>
        <Chart chartType="GeoChart" width="30rem" data={dataCountries} />
        <Modal
          // dialogClassName="modal-90w"
          // className={styles.Map}
          size="lg"
          show={isZoom}
          onHide={handleClose}
        >
          <Modal.Header>
            <Modal.Title>
              Countries Visited - Total: {dataCountries.length - 1}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Chart chartType="GeoChart" data={dataCountries} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

export default WorldMap;
