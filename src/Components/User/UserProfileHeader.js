import React, { useState } from "react";
import {
  Jumbotron,
  Image,
  Col,
  Row,
  Container,
  Button,
  Modal
} from "react-bootstrap";
// import WorldMap from './WorldMap'
import { CreateTrekkForm } from "../SingleTrip/CreateTrekkForm";
import { WorldMap } from "../index";

export const UserProfileHeader = props => {
  const { bio, email, userName, userPicture } = props.user;
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  function handleClose() {
    setIsShowing(false);
  }

  return (
    <div>
      <Jumbotron style={{ backgroundColor: "#30638E" }}>
        <Container>
          <Row>
            <Col>
              <Image
                src={userPicture}
                roundedCircle
                style={{
                  width: "10rem",
                  borderColor: "white",
                  borderStyle: "solid",
                  borderWidth: ".05rem"
                }}
              />
            </Col>
            <Col style={{ color: "white" }}>
              <h1>{userName}</h1>
              <p>{bio}</p>
              {/* <p>Trekking somewhere new?</p> */}
              <Button
                style={{ backgroundColor: "#D55969", borderColor: "#D55969" }}
                onClick={toggle}
              >
                + Create New Trekk
              </Button>
              <Modal show={isShowing} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Where in the world are we trekking?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <CreateTrekkForm userDoc={props} />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
            {/* <Col><WorldMap /></Col> */}
          </Row>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default UserProfileHeader;
