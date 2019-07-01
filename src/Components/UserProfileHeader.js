import React from 'react';
import { Jumbotron, Image, Col, Row, Container, Button } from 'react-bootstrap';

export const UserProfileHeader = props => {
  const { bio, email, userName, userPicture } = props.user;
  console.log(props);
  return (
    <div>
      <Jumbotron>
        <Container>
          <Row>
            <Col xs={6} md={4}>
              <Image src={userPicture} roundedCircle style={{width: '10rem', border:'1px solid black'}} />
            </Col>
            <Col xs={6} md={4}>
              <h1>{userName}</h1>
              <p>{bio}</p>
              <Button variant="info">+ Create New Trekk</Button>
            </Col>

          </Row>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default UserProfileHeader;
