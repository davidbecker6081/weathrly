import React from 'react'
import '../CSS/Daily.css'

export default class Daily extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    return (
      <li className="tenday-card">
        {this.props.dayData.day} - {this.props.dayData.high} - {this.props.dayData.low} - {this.props.dayData.condition}
      </li>
    )
  }
}
