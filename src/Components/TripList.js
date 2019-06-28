import React, { Component } from 'react'
import {ListGroup} from 'react-bootstrap'

export class TripList extends Component {
  render() {
    return (
    <ListGroup.Item>
      <h1>{this.props.trip}</h1>
    </ListGroup.Item>
    )
  }
}

export default TripList
