import React, { useContext } from 'react';
import { Card, Badge, Accordion, ListGroup } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
import SearchAPICard from '../TripPlanning/SearchAPICard';
import db from '../../firebase';
import userContext from '../../Contexts/userContext';
import { useCollection } from 'react-firebase-hooks/firestore';
import { MDBContainer, MDBScrollbar } from 'mdbreact';
import './scrollbar.css';
import TripResultPlaceCard from '../TripPlanning/TripResultPlaceCard';

export const TripResultCard = props => {
  console.log('card:', props.card);

  const { card, tripId } = props;

  const [value, loading, error] = useCollection(
    db
      .collection('Trips')
      .doc(tripId)
      .collection('TrekkList'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  function tripCompleted() {
    const today = new Date();
    const start = new Date(card.startDate);
    const end = new Date(card.endDate);

    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const daysUntilEnd = Math.floor((end - today) / _MS_PER_DAY);
    const daysUntilStart = Math.floor((start - today) / _MS_PER_DAY);

    if (daysUntilEnd > 0 && daysUntilStart < 0) {
      return 'Trip In Progress';
    } else if (daysUntilEnd < 0) {
      return 'Trip Completed';
    } else {
      return false;
    }
  }
  tripCompleted();

  const scrollContainerStyle = {
    maxWidth: '66vw',
    maxHeight: '15rem',
    border: '1px dotted lightgray',
  };
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

        {/* {Object.entries(card.tripTags).map(tag => ( */}
        <div>
          <Badge variant="light">{card.tripTags} Trip</Badge>
          {!tripCompleted() && <Badge variant="light"> Upcoming</Badge>}
          {tripCompleted() && (
            <Badge variant="success" display={tripCompleted()}>
              {tripCompleted()}
            </Badge>
          )}
        </div>

        <MDBContainer>
          <div
            className="scrollbar scrollbar-primary  mt-5 mx-auto"
            style={scrollContainerStyle}
          >
            {value && (
              <Card style={{ maxWidth:'40vw',margin: '.5rem 1rem' }}>
                <Card.Header>Places</Card.Header>
                {value.docs
                  .filter(doc => !doc.data().locations)
                  .map(doc => (
                    <TripResultPlaceCard
                      key={doc.id}
                      placeId={doc.id}
                      card={doc.data()}
                      tripId={tripId}
                    />
                  ))}
              </Card>
            )}
          </div>
        </MDBContainer>
      </Card.Body>
    </Card>
  );
};

export default TripResultCard;
