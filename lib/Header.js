import React from 'react';
import Search from './Search'
import '../CSS/Header.css'

export default class Header extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    return (
      <header>
        <h1>
          Weathrly
        </h1>
        <Search setCurrentLocation={this.props.setCurrentLocation}
              setInvalidLocation={this.props.setInvalidLocation}
              />
      </header>
    )
  }
}
