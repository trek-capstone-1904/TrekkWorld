import React from 'react';
import { Card, Badge, Accordion, ListGroup } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
import SearchAPICard from '../TripPlanning/SearchAPICard';

export const TripResultCard = props => {
  const card = props.card;
  return (
    <Card border="info" style={{ margin: '.5rem' }}>
      {/* <Card.Img variant="top" src={`../${card.tripImageUrl}`} /> */}
      <Card.Body>
        <Link to={`trip/${props.tripId}`}>
          <Card.Title>{card.tripName}</Card.Title>
        </Link>
        <Card.Subtitle className="mb-2 text-muted">
          {moment(card.startDate).format('MMM D, YYYY')}
        </Card.Subtitle>

        {Object.entries(card.users).map(user => (
          <Badge variant="primary" key={user[0]}>
            {user[1].userName}
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
                    {/* {Object.entries(card.places).map(place => (
                    <SearchAPICard key={place[0]} card={place[1]} />
                  ))} */}
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
