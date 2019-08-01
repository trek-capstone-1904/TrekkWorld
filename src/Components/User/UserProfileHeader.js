import React, { useState } from 'react';
import {
  Jumbotron,
  Image,
  Col,
  Row,
  Container,
  Button,
  Modal,
} from 'react-bootstrap';
// import WorldMap from './WorldMap'
import { CreateTrekkForm } from '../SingleTrip/CreateTrekkForm';
import { UserCountriesVisited } from './UserCountriesVisited';
import { WorldMap } from '../index';

export const UserProfileHeader = props => {
  const { bio, email, userName, userPicture } = props.user;
  const [isShowing, setIsShowing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  // console.log('userprofileheader', props.user)
  function toggle() {
    setIsShowing(!isShowing);
  }
  function toggleUpdate() {
    setIsUpdating(!isUpdating);
  }

  function handleClose() {
    setIsShowing(false);

    // props.history.push(`/trip/${trip}`);
  }
  function handleCloseUpdate() {
    setIsUpdating(false);

    // props.history.push(`/trip/${trip}`);
  }

  return (
    <div>
      <Jumbotron style={{ backgroundColor: '#30638E' }}>
        <Container>
          <Row>
            <Col>
              <Image
                src={userPicture}
                roundedCircle
                style={{
                  width: '10rem',
                  borderColor: 'white',
                  borderStyle: 'solid',
                  borderWidth: '.05rem',
                }}
              />
            </Col>
            <Col style={{ color: 'white' }}>
              <h1>{userName}</h1>
              <p>{bio}</p>
              {/* <p>Trekking somewhere new?</p> */}
              <Button
                style={{ backgroundColor: '#D55969', borderColor: '#D55969' }}
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
              <br/>
              <br/>
              <Button
                style={{ backgroundColor: '#D55969', borderColor: '#D55969' }}
                onClick={toggleUpdate}
              >
                Edit Profile
              </Button>
              <Modal show={isUpdating} onHide={handleCloseUpdate}>
                <Modal.Header closeButton>
                  <Modal.Title>Update User Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <UserCountriesVisited userDoc={props} />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseUpdate}>
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
