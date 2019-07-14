import React, { useState, useEffect } from 'react';
import * as secret from '../../secrets';
import SearchAPICard from './SearchAPICard';
import { CardColumns } from 'react-bootstrap';
import styles from '../SearchAPICard.module.css';

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
    data = require('../../TestAPIResults/ParisQuery.json');
  } else if (type === 'cities') {
    data = require('../../TestAPIResults/FranceQuery.json');
  }
  return data;
}

function useFetchSights(city, country, code) {
  city = city.slice(0, 1).toUpperCase() + city.slice(1);
  if (city.includes(' ')) {
    city = city.split(' ').join('_');
  }

  const query = `https://www.triposo.com/api/20181213/poi.json?tag_labels=eatingout|sightseeing&location_id=${city}&countrycode=${code}&order_by=-score&count=15&fields=snippet,id,name,location_id,score,tag_labels,coordinates&account=${
    secret.triposoAccount
  }&token=${secret.triposoToken}`;

  // //Uncomment this to use actual query
  return useFetch(query, {});
  //To use saved json file of France Query
  // const type = 'sights';
  // return fakeData(type);
}

function useFetchCities(country, code) {
  const query = `https://www.triposo.com/api/20181213/location.json?tag_labels=city&countrycode=${code}&order_by=-score&count=7&&fields=name,id,snippet,intro,score&account=${
    secret.triposoAccount
  }&token=${secret.triposoToken}`;

  // /*UNCOMMENT TO USE REAL DATA*/
  return useFetch(query, {});
  ///////////////////////////////////////
  // /*COMMENT OUT TO USE REAL DATA*/
  // const type = 'cities';
  // return fakeData(type);
}

export const SearchAPI = props => {
  const { code, city, country } = props;
  const { type } = props;

  // const [hasError, setErrors] = useState({});
  // const [location, setLocation] = useState("Paris,FR");
  // const [searchCity, setSearchCity] = useState(city);
  // const [popularCities, setPopularCities] = useState(country);
  // const [sights, setSights] = useState({});
  const sightsToSee = useFetchSights(city, country, code);
  const popularCities = useFetchCities(country, code);
  console.log('sightsToSee', sightsToSee.results && sightsToSee.results);

  if (type === 'sights') {
    return (
      <div>
        <h4>Sightseeing Spots</h4>
        <CardColumns className={styles.CardColumn}>
          {sightsToSee.results &&
            sightsToSee.results.map(sight => (
              <SearchAPICard
                key={sight.id}
                sight={sight}
                country={country}
                code={code}
                type="sights"
              />
            ))}
        </CardColumns>
      </div>
    );
  } else {
    return (
      <div>
        <h4>Popular Cities</h4>
        <CardColumns className={styles.CardColumn}>
          {popularCities.results &&
            popularCities.results.map(sight => (
              <SearchAPICard
                key={sight.id}
                sight={sight}
                country={country}
                code={code}
                type="city"
              />
            ))}
        </CardColumns>
      </div>
    );
  }
};

export default SearchAPI;
