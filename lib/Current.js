import React from 'react';
import MockDataCurrent from './mock-data-current'
import MockDataForecast from './mock-data-forecast'

export default class Current extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    const { high, low } = MockDataForecast.forecast.simpleforecast.forecastday[0];

    return (
      <div className="Current">
        {
          this.props.location === 'SF' &&
          <div>
            <p>{MockDataCurrent[this.props.location].display_location.full}</p>
            <p>{MockDataCurrent[this.props.location].display_location.zip}</p>
            <p>{MockDataCurrent[this.props.location].observation_time}</p>
            <p>{MockDataCurrent[this.props.location].weather}</p>
            <p>{MockDataCurrent[this.props.location].temp_f} F</p>
            <p>{MockDataCurrent[this.props.location].relative_humidity}</p>
            <p>{MockDataCurrent[this.props.location].wind_string}</p>
            <img  src={MockDataCurrent[this.props.location].icon_url}
                  alt={MockDataCurrent[this.props.location].icon}/>
            <p>H: {high.fahrenheit} F</p>
            <p>L: {low.fahrenheit} F</p>
          </div>
        }
      </div>
    )
  }

}
