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
      user: '',
      trips: [],
    };
    this.componentDidMount = this.componentDidMount.bind(this);
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
    console.log(
      'users.data():',
      users.data()
    );
    this.setState({
      user: users.data().name
    })
    let allTrips = Object.keys(users.data().Trips);
    // console.log('allTrips', allTrips);
    let trips = [];
    // let trip = await db
    //   .collection('Trips')
    //   .doc('5ujEWhzj0Tgc4nCu5Jgq')
    //   .get();

    // allTrips.forEach(async trip => {
    //   let detailTrip = await db
    //     .collection('Trips')
    //     .doc(trip)
    //     .get();
    //   const tripData = detailTrip.data();
    //   trips.push(tripData);
    //   // this.setState({
    //   //   trips: this.state.trips.push(detailTrip.data()),
    //   // });
    //   console.log('detailTrip.data: ', detailTrip.data());
    // });
    const mapReturn = allTrips.map(async trip => {
      let detailTrip = await db
        .collection('Trips')
        .doc(trip)
        .get();
      const tripData = {id: trip, ...detailTrip.data()};
      trips.push(tripData);
      // this.setState({
      //   trips: this.state.trips.push(detailTrip.data()),
      // });
      // console.log('detailTrip.data: ', detailTrip.data());
    });
    await Promise.all(mapReturn)
    // console.log('just trips array:', trips);
    this.setState({
      trips,
    });
    // console.log('this.state.trips in component did mount:', this.state.trips[0]);
  }

  render() {
    console.log('this.state.trips in render:', this.state);
    return (
      <div>
        <h1>Welcome, {this.state.user} </h1>
        <ListGroup>
          {this.state.trips.map(trip => (
            <Trips key={trip.id} trip={trip} />
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default UserProfile;
