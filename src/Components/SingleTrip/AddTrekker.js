import React, { useState } from "react";
import { Form, Button, Col, Spinner } from "react-bootstrap";
import { useDocument } from "react-firebase-hooks/firestore";
import db from "../../firebase";

export const AddTrekker = props => {
  // //Todo: Check for friend //Leave out for now

  const [newTrekker, setNewTrekker] = useState({
    notFound: true,
    userName: "",
    email: ""
  });
  // const [userName, setUserName]=useState('')

  const handleChange = event => {
    event.persist();
    setNewTrekker(newTrekker => ({
      ...newTrekker,
      [event.target.name]: event.target.value
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    event.persist();
    db.collection("Users")
      .where("email", "==", newTrekker.email)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          db.collection("Users")
            .doc(doc.id)
            .update({
              [`Trips.${props.tripId}`]: {
                tripName: props.trip.tripName,
                startDate: props.trip.startDate,
                endDate: props.trip.endDate
              }
            });
          db.collection("Trips")
            .doc(props.tripId)
            .update({
              [`users.${doc.id}`]: {
                userName: doc.data().userName,
                userPicture: doc.data().userPicture
              }
            });
        });
        if (querySnapshot.empty) {
          alert("User does not exist. Please have them create an account");
          console.log(
            "User does not exist. Please have them create an account"
          );
        }
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Add Trekker</Form.Label>
        <Form.Control
          name="email"
          value={newTrekker.email}
          onChange={handleChange}
          type="text"
          placeholder="Enter trekker's email"
        />
      </Form.Group>
      <div className="text-right">
        <Button variant="info" type="submit">
          Add Trekker
        </Button>
      </div>
    </Form>
  );
};

export default AddTrekker;
