import React, { useState, useEffect } from 'react';
import List from '../List/List';
import classes from './Card.module.css';

function Card() {
  const [weatherInfo, setWeatherInfo] = useState('');

  useEffect(() => {
    const key = 'af1000ee120ca1f6469133dccf46491b',
      proxy = 'https://cors-anywhere.herokuapp.com/',
      myHeaders = new Headers();
    myHeaders.append(
      'X-Requested-With',
      'XMLHttpRequest',
      'Access-Control-Allow-Origin: *'
    );

    if (localStorage.getItem('lat') && localStorage.getItem('long')) {
      const lat = localStorage.getItem('lat'),
        long = localStorage.getItem('long'),
        query = `${proxy}https://api.darksky.net/forecast/${key}/${Number(
          lat
        )},${Number(long)}?units=auto`;

      fetch(query, { headers: myHeaders })
        .then(data => data.json())
        .then(data => setWeatherInfo(data))
        .catch(error => console.log(error));
    }

    if (!localStorage.getItem('lat') && !localStorage.getItem('long')) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude,
          long = position.coords.longitude,
          query = `${proxy}https://api.darksky.net/forecast/${key}/${Number(
            lat
          )},${Number(long)}?units=auto`;

        localStorage.setItem('lat', lat);
        localStorage.setItem('long', long);

        fetch(query, { headers: myHeaders })
          .then(data => data.json())
          .then(data => setWeatherInfo(data))
          .catch(error => console.log(error));
      });
    }
  }, []);

  if (weatherInfo) {
    return (
      <div className={classes.Card}>
        <List weatherInfo={weatherInfo} />
      </div>
    );
  } else {
    return <div className={classes.loading}>Loading...</div>;
  }
}

export default Card;
