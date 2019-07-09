import React from 'react'
import {Card} from 'react-bootstrap'

export const AllNotesCard = (props) => {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>{props.note.userName}</Card.Title>
          <Card.Subtitle>{props.note.time.seconds}</Card.Subtitle>
          <Card.Text>{props.note.note}</Card.Text>
        </Card.Body>

      </Card>

    </div>
  )
}

export default AllNotesCard
