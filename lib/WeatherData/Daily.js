import React from 'react'
import '../../CSS/Daily.css'

export default class Daily extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    return (
      <li className="tenday-card">
        <h3>
          {this.props.dayData.day}
        </h3>
        <img src={this.props.dayData.icon_url} alt={this.props.dayData.icon_name}/>
        <p>{this.props.dayData.condition}</p>
        <div className="tenday-high-low">
          <p>
            {this.props.dayData.low} F
          </p>
          <p>
            {this.props.dayData.high} F
          </p>
        </div>
      </li>
    )
  }
}
