import React, { useState } from 'react';
import { ListGroup, InputGroup, Button, FormControl } from 'react-bootstrap';
import db from '../firebase';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';

export const TripSearch = () => {
  const [values, setValues] = useState({
    searchTerm: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const [snapshot, loading, error] = useCollectionOnce(
    db.collection('Trips').where('locations', 'array-contains', 'Lima'),
    options
  );
  console.log('snapshot');
  // let searchTerm = 'Lima';
  // let tripsRef = db.collection('Trips');

  // tripsRef.where('locations', 'array-contains', searchTerm);

  return (
    <div>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={values.searchTerm}
          onChange={handleChange('searchTerm')}
        />
        <InputGroup.Append>
          <Button variant="outline-secondary">Search</Button>
        </InputGroup.Append>
      </InputGroup>
      <ListGroup />
    </div>
  );
};
