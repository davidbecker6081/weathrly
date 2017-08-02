import React from 'react';
import '../../CSS/Hourly.css'

export default class Hourly extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    return(
      <li className="sevenhour-card">
        <div className="sevenhour-time">
          {this.props.hourlyData.time}
        </div>
        <div className="sevenhour-temp">
          {this.props.hourlyData.temp} F
        </div>
        <img src={this.props.hourlyData.icon_url} alt={this.props.hourlyData.icon_name} className="sevenhour-icon"/>
        <div className="sevenhour-condition">
          {this.props.hourlyData.condition}
        </div>
      </li>
    )
  }
}
