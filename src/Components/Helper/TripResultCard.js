import React from 'react';
import { Card, Badge, Accordion, ListGroup } from 'react-bootstrap';
import moment from 'moment';

export const TripResultCard = props => {
  console.log('this is props: ', props);
  const card = props.card;
  console.log('this is card: ', card);
  // console.log('picture path', `../${card.tripImageUrl}`);
  console.log(
    'Object.entries(card.users)',
    Object.entries(card.users).map(card => card[1])
  );
  return (
    <Card border="info" style={{ width: '18px', margin: '.5rem' }}>
      {/* <Card.Img variant="top" src={`../${card.tripImageUrl}`} /> */}
      <Card.Body>
        <Card.Title>{card.tripName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {moment(card.startDate).format('MMM D, YYYY')}
        </Card.Subtitle>

        {Object.entries(card.users).map(user => (
          <Badge variant="primary" key={user[0]}>
            {user[1]}
          </Badge>
        ))}
        {card.places && (
          <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                Highlights
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <ListGroup>
                    {Object.entries(card.places).map(place => (
                      <ListGroup.Item key={place[0]}>
                        {place[1].name}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        )}
      </Card.Body>
    </Card>
  );
};

export default TripResultCard;
