import React from 'react';
import Daily from './Daily'

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
              <Daily key={dayObj.date} dayData={dayObj}/>
            )}
        </ul>
      </div>
    )
  }

}
