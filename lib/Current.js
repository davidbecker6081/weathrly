import React from 'react';
import MockDataCurrent from './mock-data-current'
import MockDataForecast from './mock-data-forecast'

export default class Current extends React.Component {

  render() {

    const { high, low } = MockDataForecast.forecast.simpleforecast.forecastday[0];
    console.log(high, low);
    return(
      <div className="Current">
        <p>{MockDataCurrent.current_observation.display_location.full}</p>
        <p>{MockDataCurrent.current_observation.display_location.zip}</p>
        <p>{MockDataCurrent.current_observation.observation_time}</p>
        <p>{MockDataCurrent.current_observation.weather}</p>
        <p>{MockDataCurrent.current_observation.temp_f} F</p>
        <p>{MockDataCurrent.current_observation.relative_humidity}</p>
        <p>{MockDataCurrent.current_observation.wind_string}</p>
        <p>{MockDataCurrent.current_observation.icon}</p>
        <img src={MockDataCurrent.current_observation.icon_url}/>

        <p>H: {high.fahrenheit} F</p>
        <p>L: {low.fahrenheit} F</p>


      </div>
    )
  }

}
