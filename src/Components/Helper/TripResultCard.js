import React, { useContext } from 'react';
import {
  Card,
  Badge,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  Accordion,
  Button,
  ListGroup,
} from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
import SearchAPICard from '../TripPlanning/SearchAPICard';
import db from '../../firebase';
import userContext from '../../Contexts/userContext';
import { useCollection } from 'react-firebase-hooks/firestore';
import './scrollbar.css';
import TripResultPlaceCard from '../TripPlanning/TripResultPlaceCard';
import styles from '../UserProfile.module.css';

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

  return (
    <Card
      style={{
        // margin: '.5rem',
        // width: '40rem',
        padding: '.5rem',
      }}
      className={styles.TripCard}
    >
      <Link to={`/trip/${props.tripId}`}>
        <Card.Title className={styles.TripTitle} style={{fontSize:'1.6rem'}}>{card.tripName}</Card.Title>
      </Link>
      <Card.Subtitle style={{fontSize:'.9rem'}} className="mb-2">
        {moment(card.startDate).format('MMM D, YYYY')}
      </Card.Subtitle>
      {card.placeImage && <img src={card.placeImage} alt="sight" />}
      <div>
        {Object.entries(card.users).map(user => (
          <Badge
            style={{
              color: '#D1495B',
              backgroundColor: 'lightgray',
              margin: '.25rem',
            }}
            key={user[0]}
          >
            {user[1].userName}
          </Badge>
        ))}
      </div>

      <div>
        <Badge
          className={styles.badge}
          style={{
            // backgroundColor: '#EDAE49',
            // color: '#EDAE49',
            margin: '.25rem',
          }}
        >
          {card.tripTags} Trip
        </Badge>
        {!tripCompleted() && (
          <Badge
            style={{
              // backgroundColor: '#D1495B',
              color: 'lightgray',
              margin: '.25rem',
            }}
          >
            {' '}
            Upcoming
          </Badge>
        )}
        {tripCompleted() && (
          <Badge className={styles.complete}  display={tripCompleted()}>
            {tripCompleted()}
          </Badge>
        )}
      </div>
      <Accordion>
        <Accordion.Toggle
          as={Button}
          style={{ color: '#00798C' }}
          variant="link"
          eventKey="0"
        >
          View Places
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <ListGroup as="ul">
            {value &&
              value.docs
                .filter(doc => !doc.data().locations)
                .map(doc => (
                  <ListGroup.Item as="li">
                    <TripResultPlaceCard
                      key={doc.id}
                      placeId={doc.id}
                      card={doc.data()}
                      tripId={tripId}
                    />
                  </ListGroup.Item>
                ))}
          </ListGroup>
        </Accordion.Collapse>
      </Accordion>
      <div />
    </Card>
  );
};

export default TripResultCard;
