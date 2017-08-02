import React from 'react';
import Daily from './Daily'
import '../CSS/TenDay.css'

export default class TenDay extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    return (
      <div className="tenday">
        <h2>
          10 Day
        </h2>
        <ul className="tenday-card-container">
            {this.props.apiData.tenDay.map((dayObj) =>
              <Daily key={dayObj.date} dayData={dayObj}/>
            )}
        </ul>
      </div>
    )
  }
}
