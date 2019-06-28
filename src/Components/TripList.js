import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class TripList extends Component {
  render() {
    console.log(Object.values(this.props.trip));
    return (
      <ListGroup.Item>
        <Link to={`/trip/${this.props.trip.id}`}>
          <h1>{this.props.trip.Name}</h1>
        </Link>
        {Object.values(this.props.trip.Users).map(user => (
          <p key={user}>{user}</p>
        ))}
      </ListGroup.Item>
    );
  }
}

export default TripList;
