import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import Trips from './TripList';
import db from '../firebase';

// let trips = [
//   {
//     id: 1,
//     name: 'Paris',
//   },
//   {
//     id: 2,
//     name: 'Peru',
//   },
//   {
//     id: 3,
//     name: 'Colombia',
//   },
//   {
//     id: 4,
//     name: 'Costa Rica',
//   },
// ];

export class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      trips: [],
    };
  }
  async componentDidMount() {
    let users = await db
      .collection('Users')
      .doc('oXLPsIdgUTNcph63Xeew')
      .get();
    // console.log(users.data().trips);
    this.setState({ trips: Object.keys(users.data().trips) });
    // let details = Object.values(users.data().trips)
    // console.log(tripss);

    // users.forEach(trip => {
    //   console.log(trip.data());
    // });
  }

  render() {
    return (
      <div>
        <ListGroup>
          {this.state.trips.map(trip => (
            <Trips key={trip} trip={trip} />
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default UserProfile;
