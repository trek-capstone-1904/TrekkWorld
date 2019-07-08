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
  console.log(props)
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

  const scrollContainerStyle = { width: '66vw', maxHeight: '30vw' };
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
        <MDBContainer>
          <div
            className="scrollbar scrollbar-primary  mt-5 mx-auto"
            style={scrollContainerStyle}
          >
            {value && (
              <span>
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
              </span>
            )}
          </div>
        </MDBContainer>
      </Card.Body>
    </Card>
  );
};

export default TripResultCard;
