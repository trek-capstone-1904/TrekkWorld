import React, { useState, useEffect } from 'react';
import * as secret from '../secrets';
import SearchAPICard from './SearchAPICard';

function useFetch(url, defaultData) {
  const [data, updateData] = useState(defaultData);

  useEffect(() => {
    async function fetchData() {
      const resp = await fetch(url);
      const json = await resp.json();
      updateData(json);
    }
    fetchData();
  }, [url]);

  return data;
}

function fakeData(type) {
  let data;
  if (type === 'sights') {
    data = require('./APIResultsTest/ParisQuery.json');
  } else if (type === 'cities') {
    data = require('./APIResultsTest/FranceQuery.json');
  }
  return data;
}

function useFetchSights(city, country) {
  const query = `https://www.triposo.com/api/20181213/poi.json?tag_labels=eatingout|sightseeing&location_id=${city}&countrycode=${country}&order_by=-score&count=10&fields=snippet,id,name,location_id,score,tag_labels,coordinates&account=${
    secret.triposoAccount
  }&token=${secret.triposoToken}`;

  // //Uncomment this to use actual query
  // return useFetch(query, {});
  //To use saved json file of France Query
  const type = 'sights';
  return fakeData(type);
}

function useFetchCities(country) {
  const query = `https://www.triposo.com/api/20181213/location.json?tag_labels=city&countrycode=${country}&order_by=-score&count=7&&fields=name,id,snippet,intro,score&account=${
    secret.triposoAccount
  }&token=${secret.triposoToken}`;

  // /*UNCOMMENT TO USE REAL DATA*/
  // return useFetch(query, {});
  ///////////////////////////////////////
  // /*COMMENT OUT TO USE REAL DATA*/
  const type = 'cities';
  return fakeData(type);
}

export const SearchAPI = props => {
  const { city, country } = props;
  const [hasError, setErrors] = useState({});
  // const [location, setLocation] = useState("Paris,FR");
  // const [searchCity, setSearchCity] = useState(city);
  // const [popularCities, setPopularCities] = useState(country);
  // const [sights, setSights] = useState({});
  const sightsToSee = useFetchSights(city, country);
  const popularCities = useFetchCities(country);

  return (
    <div>
      <h4>Sightseeing Spots</h4>
      {/* {sightsToSee.results &&
        sightsToSee.results.map(sight => <p key={sight.id}>{sight.name}</p>)} */}
      {sightsToSee.results &&
        sightsToSee.results.map(sight => <SearchAPICard key={sight.id} sight={sight} type="sights"/>)}
      <h4>Popular Cities</h4>
      {/* {popularCities.results &&
        popularCities.results.map(sight => <p key={sight.id}>{sight.name}</p>)} */}
      {popularCities.results &&
        popularCities.results.map(sight => <SearchAPICard key={sight.id} sight={sight} type="city"/>)}
    </div>
  );
};

export default SearchAPI;
