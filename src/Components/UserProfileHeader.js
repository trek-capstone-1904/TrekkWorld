import React, { useState } from 'react';
import { Jumbotron, Image, Col, Row, Container, Button, Modal } from 'react-bootstrap';
import {CreateTrekkForm} from './CreateTrekkForm'

export const UserProfileHeader = props => {
  const { bio, email, userName, userPicture } = props.user;
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  function handleClose(){
    setIsShowing(false)
  }

  return (
    <div>
      <Jumbotron>
        <Container>
          <Row>
            <Col xs={6} md={4}>
              <Image
                src={userPicture}
                roundedCircle
                style={{ width: '10rem', border: '1px solid black' }}
              />
            </Col>
            <Col xs={6} md={4}>
              <h1>{userName}</h1>
              <p>{bio}</p>
              <Button variant="info" onClick={toggle}>
                + Create New Trekk
              </Button>
              <Modal show={isShowing} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Where in the world are we trekking?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <CreateTrekkForm/>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default UserProfileHeader;