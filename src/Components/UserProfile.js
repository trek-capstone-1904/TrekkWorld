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
      info: [],
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  async componentDidMount() {
    // let users = await db
    //   .collection('Users')
    //   .doc('oXLPsIdgUTNcph63Xeew')
    //   .get();

    // this.setState({ trips: Object.keys(users.data().trips) });
    console.log('beginning of component did mount')
    let users = await db
      .collection('Users')
      .doc('lQNWEtdOGjXlIdmUIRb9')
      .get();
    console.log(
      'Object values user.data.trips:',
      Object.values(users.data().Trips)
    );
    let allTrips = Object.keys(users.data().Trips);
    console.log('allTrips', allTrips);
    let info = [];
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
    //   info.push(tripData);
    //   // this.setState({
    //   //   info: this.state.info.push(detailTrip.data()),
    //   // });
    //   console.log('detailTrip.data: ', detailTrip.data());
    // });
    const mapReturn = allTrips.map(async trip => {
      let detailTrip = await db
        .collection('Trips')
        .doc(trip)
        .get();
      const tripData = detailTrip.data();
      info.push(tripData);
      // this.setState({
      //   info: this.state.info.push(detailTrip.data()),
      // });
      console.log('detailTrip.data: ', detailTrip.data());
    });
    await Promise.all(mapReturn)
    console.log('just info array:', info);
    this.setState({
      info,
    });
    console.log('this.state.info in component did mount:', this.state.info[0]);
  }

  render() {
    console.log('this.state.info in render:', this.state.info[1]);
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
