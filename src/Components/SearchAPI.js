import React, { useState, useEffect } from 'react';
import * as secret from '../secrets';

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

function useFetchSights(city, country) {
  // const query = `https://www.triposo.com/api/20181213/poi.json?tag_labels=eatingout|sightseeing&location_id=Paris&countrycode=${location}&order_by=-score&count=10&fields=snippet,id,name,location_id,score,tag_labels,coordinates&account=${
  //   secret.triposoAccount
  // }&token=${secret.triposoToken}`;
  // let locationArr= location.split(',');
  // let city = locationArr[0];
  // let country = locationArr[1];
  // console.log(locationArr)

  const query = `https://www.triposo.com/api/20181213/poi.json?tag_labels=eatingout|sightseeing&location_id=${city}&countrycode=${country}&order_by=-score&count=10&fields=snippet,id,name,location_id,score,tag_labels,coordinates&account=${
    secret.triposoAccount
  }&token=${secret.triposoToken}`;
  return useFetch(query, {});
}

function useFetchCities(country) {
  const query = `https://www.triposo.com/api/20181213/location.json?tag_labels=city&countrycode=${country}&order_by=-score&count=7&fields=name,id&account=${
    secret.triposoAccount
  }&token=${secret.triposoToken}`;
  return useFetch(query, {});
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

  // setPopularCities(response.results)
  console.log(popularCities.results)
  console.log(sightsToSee.results)
  return (
    <div>
      <h2>
        in {city} {country}{' '}
      </h2>
      <h4>Sightseeing Spots</h4>
      {/* <input
        type="input"
        value={location}
        onChange={evt => setLocation(evt.target.value)}
      /> */}
      {sightsToSee.results && sightsToSee.results.map(sight => <p key={sight.id}>{sight.name}</p>)}
      <h4>Popular Cities</h4>
      {popularCities.results && popularCities.results.map(sight => <p key={sight.id}>{sight.name}</p>)}
    </div>
  );
};

export default SearchAPI;
