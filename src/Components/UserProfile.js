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
    // let users = await db
    //   .collection('Users')
    //   .doc('oXLPsIdgUTNcph63Xeew')
    //   .get();

    // this.setState({ trips: Object.keys(users.data().trips) });
    let users = await db
      .collection('Users')
      .doc('lQNWEtdOGjXlIdmUIRb9')
      .get();
    console.log(Object.values(users.data().Trips));
    let allTrips = Object.keys(users.data().Trips);
    console.log(allTrips);
    let info = [];
    let trip = await db
      .collection('Trips')
      .doc('5ujEWhzj0Tgc4nCu5Jgq')
      .get();

    // let details = allTrips.forEach(async trip => {
    //   let detailTrip = await db
    //     .collection('Trips')
    //     .doc(trip)
    //     .get();
    //   return info.push(detailTrip);
    // });

    console.log('trip: ', trip.data());
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
