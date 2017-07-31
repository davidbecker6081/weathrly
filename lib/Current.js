import React from 'react';
import '../CSS/Current.css'

export default class Current extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    const { city,
            zip,
            time,
            condition,
            temp,
            icon_url,
            icon_name,
            high,
            low,
            weather_summary} = this.props.apiData.current

    return (
      <div className="current">
        <h2>
          {city}
        </h2>
        {zip}
        <div className="current-temp">
          <h3>
            {temp} F
          </h3>
          <img src={icon_url} alt={icon_name} className="current-img"/>
          {condition}
        </div>
        <div className="high-low-container">
          <div className="low-temp">
            {low} F
          </div>
          <div className="high-temp">
            {high} F
          </div>
        </div>
        <p className="weather-summary">
          {weather_summary}
        </p>
        {time}
      </div>
    )
  }

}
