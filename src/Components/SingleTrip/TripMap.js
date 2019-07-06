import React, { useContext, useState } from 'react';
import Chart from 'react-google-charts';
import { useDocument } from 'react-firebase-hooks/firestore';
import db from '../../firebase';
import userContext from '../../Contexts/userContext';
import { Spinner, Button } from 'react-bootstrap';
import zoom from '../../images/baseline_zoom_out_map_black_18dp.png';
import styles from '../UserProfile.module.css';
import Modal from 'react-bootstrap/Modal';

export const TripMap = props => {
  const [isZoom, setIsZoom] = useState(false);
  const [value, loading, error] = useDocument(
    db.doc(`Countries/${props.countries[0]}`),
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
  console.log(props);
  const regions = {
    Africa: '002',
    Europe: '150',
    Americas: '019',
    Asia: '142',
    Oceania: '009',
    'South America': '005',
    'Central America': '013',
    'North America': '021'
  };
  // const countries = value && value.data().countriesVisited;
  const dataCountries = props.countries.map(country => [country]);
  dataCountries.unshift(['Countries']);
  if (error) throw error;
  if (loading) return <Spinner animation="grow" variant="info" />;
  if (value) {
    console.log(value.data());
    const regionCode = regions[value.data().region];
    console.log(regionCode);
    return (
      // <div>hi</div>
      <div styles={{ maxWidth: '30rem' }}>
        <span>
          <Chart
            chartType="GeoChart"
            width="30rem"
            data={dataCountries}
            options={{
              region: regionCode,
              backgroundColor: 'none',
              datalessRegionColor: 'lightgray',
              defaultColor: '#17a2b8',
            }}
          />

          <button onClick={toggle} style={{ border: '0', outline: 'none' }}>
            <img style={{ width: '1rem' }} src={zoom} alt="zoom" />
          </button>
        </span>
        <Modal
          // dialogClassName="modal-90w"
          // className={styles.Map}
          size="lg"
          show={isZoom}
          onHide={handleClose}
        >
          <Modal.Header>
            <Modal.Title>
              Countries Visited (Total: {dataCountries.length - 1})
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Chart
              chartType="GeoChart"
              data={dataCountries}
              options={{
                // colorAxis: { colors: 'blue' },
                backgroundColor: 'none',
                datalessRegionColor: 'lightgray',
                defaultColor: '#17a2b8',
              }}
            />
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

export default TripMap;
