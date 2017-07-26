import React from 'react';
import Hourly from './Hourly'


export default class SevenHour extends React.Component {

  constructor(props) {
    super()

  }

  render() {
    return(
      <div>
        <h1>
          header
        </h1>
        <ul>
            {this.props.apiData.sevenHour.map((hourObj) =>
              <Hourly key={hourObj.time} hourlyData={hourObj}/>
            )}
        </ul>
      </div>
    )
  }

}
