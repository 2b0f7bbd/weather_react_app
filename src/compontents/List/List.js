import React from 'react';
import classes from './List.module.css';

function List(props) {
  const daylyData = props.weatherInfo.daily.data,
    options = {
      month: 'short',
      day: 'numeric',
      weekday: 'short'
    };

  if (daylyData) {
    return daylyData.map((item, index) => {
      return (
        <div key={index.toString()} className={classes.weatherContainer}>
          <h1 className={classes.dates}>
            {index === 0 ? 'Today: ' : null}
            {new Date(item.time * 1000).toLocaleDateString('en-us', options)}
          </h1>
          <img
            src={require(`../../img/${item.icon}.svg`)}
            alt={item.icon}
          ></img>
          <div>
            {index === 0 ? (
              <div>
                <span>
                  {Math.trunc(props.weatherInfo.currently.temperature)}
                </span>
                , feels like:{' '}
                <span>
                  {Math.trunc(props.weatherInfo.currently.apparentTemperature)}
                </span>
              </div>
            ) : null}
          </div>
          <div>
            High: <span>{Math.trunc(item.temperatureMax)}</span>, Low:{' '}
            <span>{Math.trunc(item.temperatureMin)}</span>
          </div>
          <div className={classes.summary}>{item.summary}</div>
        </div>
      );
    });
  }
}

export default List;
