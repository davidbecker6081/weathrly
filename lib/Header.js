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
              setValidLocation={this.props.setValidLocation}
              showErrorPage={this.props.showErrorPage}
              cityListTrie={this.props.cityListTrie}
              isValidLocation={this.props.isValidLocation}
              currentLocation={this.props.currentLocation}
              />
      </header>
    )
  }
}
