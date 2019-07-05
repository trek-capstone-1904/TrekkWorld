import React, { useContext } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Form, Button, Col, Spinner } from 'react-bootstrap';
import db from '../../firebase';

function CountriesSelect() {
  const [value, loading, error] = useCollection(
    db.collection('Countries').orderBy('name')
  );

  if (error) throw error;
  if (loading) return null;
  if (value) {
    return (
      <>
        <option>Select a Country...</option>
        {value.docs.map(doc => (
          <option key={doc.id} value={doc.data().name} data-code={doc.data().code}>{doc.data().name}</option>
        ))}
      </>
    );
  }
}

export default CountriesSelect;
