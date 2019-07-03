import React, { Component } from 'react';
import db from '../../firebase';

export class TripSingle extends Component {
  constructor() {
    super();
    this.state = {
      tripId: '',
      travelers: [],
      details: {},
    };
  }
  async componentDidMount() {
    this.setState({
      tripId: this.props.match.params.tripId,
    });
    const tripDocument = await db
      .collection('Trips')
      .doc(this.props.match.params.tripId)
      .get();
    this.setState({ details: tripDocument.data() });

    let travelers = tripDocument.data().users;
    this.setState({ travelers: Object.values(travelers) });
  }
  render() {
    const { tripId } = this.state;
    return (
      <div>
        <h2>{this.state.details.Name}</h2>
        <p>Location: {this.state.details.locations}</p>
        <p>Travelers: {this.state.travelers}</p>
        <p>Id {tripId}</p>
      </div>
    );
  }
}

export default TripSingle;
