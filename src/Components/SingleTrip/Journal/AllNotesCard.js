import React from 'react'
import {Card} from 'react-bootstrap'


export const AllNotesCard = (props) => {
  console.log(props.note.time.toDate().toDateString())

  return (

      <Card>
        <Card.Body>
          <Card.Title>{props.note.userName}</Card.Title>
          {props.note.time && (

            <Card.Subtitle>{props.note.time.toDate().toDateString()}</Card.Subtitle>

          )}
          <Card.Text>{props.note.note}</Card.Text>
        </Card.Body>

      </Card>


  )
}

export default AllNotesCard
