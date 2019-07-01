import React, { useState } from 'react';
import { InputGroup, Button, FormControl, CardGroup } from 'react-bootstrap';
import db from '../firebase';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import TripResultCard from './TripResultCard';

export const TripSearch = () => {
  const [values, setValues] = useState({
    searchTerm: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const [snapshot, loading, error] = useCollectionOnce(
    db.collection('Trips').where('locations', 'array-contains', 'Lima'),
    {
      valueListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <div>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="city or country"
          aria-label="city or country"
          aria-describedby="basic-addon2"
          value={values.searchTerm}
          onChange={handleChange('searchTerm')}
        />
        <InputGroup.Append>
          <Button variant="outline-secondary">Search</Button>
        </InputGroup.Append>
      </InputGroup>
      <CardGroup>
        {error && <strong>Error: {error}</strong>}
        {loading && <span>Document: Loading...</span>}
        {snapshot &&
          snapshot.docs.map(doc => <TripResultCard card={doc.data()} />)}
        {console.log(snapshot)}
      </CardGroup>
    </div>
  );
};

export default TripSearch;
