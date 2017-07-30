import React from 'react';
import Hourly from './Hourly'
import '../CSS/SevenHour.css'


export default class SevenHour extends React.Component {

  constructor(props) {
    super()

  }

  render() {
    return(
      <div className="seven-hour">
        <ul className="seven-hour-header">
          <li>
            <h3>
              7 Hour
            </h3>
            <p>
              Temp
            </p>
            <p>
              Forecasted Condition
            </p>
          </li>
        </ul>
        <ul className="sevenhour-card-container">
            {this.props.apiData.sevenHour.map((hourObj) =>
              <Hourly key={hourObj.time} hourlyData={hourObj}/>
            )}
        </ul>
      </div>
    )
  }

}
