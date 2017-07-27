import React from 'react'

export default class Daily extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    return (
      <li>
        {this.props.dayData.day} - {this.props.dayData.high} - {this.props.dayData.low} - {this.props.dayData.condition}
      </li>
    )
  }
}
