import React, { useContext, useState } from "react";
import Chart from "react-google-charts";
import { useDocument } from "react-firebase-hooks/firestore";
import db from "../../firebase";
import userContext from "../../Contexts/userContext";
import { Spinner, Button } from "react-bootstrap";
import zoom from "../../images/baseline_zoom_out_map_black_18dp.png";
import styles from "../UserProfile.module.css";
import Modal from "react-bootstrap/Modal";

export const WorldMap = () => {
  const loggedInUser = useContext(userContext);
  const [isZoom, setIsZoom] = useState(false);

  const [value, loading, error] = useDocument(
    db.doc(`Users/${loggedInUser.uid}`),
    {
      valueListenOptions: { includeMetadataChanges: true }
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
    dataCountries.unshift(["Countries"]);
    return (
      <div >
        <div >
          <Chart
            chartType="GeoChart"
            // width="100%"
            height="100%"
            data={dataCountries}
            options={{
              // colorAxis: { colors: 'blue' },
              backgroundColor: "none",
              datalessRegionColor: "lightgray",
              defaultColor: "#17a2b8"
            }}
          />
          <span style={{ position: "absolute", top: "0%", left: "0%" }}>
            <button onClick={toggle} style={{ border: "0", outline: "none" }}>
              <img style={{ width: "1.25rem" }} src={zoom} alt="zoom" />
            </button>
          </span>
        </div>
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
                backgroundColor: "none",
                datalessRegionColor: "lightgray",
                defaultColor: "#17a2b8"
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

export default WorldMap;
