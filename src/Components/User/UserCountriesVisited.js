import React, { useState, useContext } from 'react';
import { Form, Button, Col, Spinner } from 'react-bootstrap';
import db from '../../firebase';
import userContext from '../../Contexts/userContext';
import history from '../../history';
import Select from 'react-select';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import { CountrySelect } from '../index.js';

export const UserCountriesVisited = () => {
  const [countries, loading, error] = useCollectionOnce(
    db.collection('AllCountries').orderBy('name')
  );
  const [selectedCountries,setSelectedCountries]=useState([])




  if (error) throw error;
  if (loading) return <Spinner animation="grow" variant="info" />;
  if (countries) {
    const options = countries.docs.map(doc => doc.data().name);
    console.log(options)
    function handleChange(value){
      setSelectedCountries([...selectedCountries,value])
    }
    return (
      <Select
        isMulti
        name="places"
        options={options}
        value={selectedCountries}
        onChange={(value)=>handleChange(value)}
      />
    );
  }
};

export default UserCountriesVisited;
