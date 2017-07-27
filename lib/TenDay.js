import React from 'react';
import Day from './Day'

export default class TenDay extends React.Component {
  constructor(props) {
    super()
  }

  render() {

    return (
      <div>
        <h1>
          header - ten day
        </h1>
        <ul>
            {this.props.apiData.tenDay.map((dayObj) =>
              <Day key={dayObj.date} dayData={dayObj}/>
            )}
        </ul>
      </div>
    )
  }

}
