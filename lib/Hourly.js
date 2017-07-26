import React from 'react';

export default class Hourly extends React.Component {

  constructor(props) {
    super()
  }

  render() {
    return(
      <li>
        {this.props.hourlyData.time} - {this.props.hourlyData.temp} - {this.props.hourlyData.condition}
      </li>
    )
  }

}
