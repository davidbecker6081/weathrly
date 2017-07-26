import React from 'react'
import Current from './Current'
import Search from './Search'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentLocation: '',
      isOnWelcomePage: true
    }
  }

  setCurrentLocation(location) {
    this.setState({
      currentLocation: location,
      isOnWelcomePage: false
    }, this.saveToLocal)
  }


  saveToLocal() {
    localStorage.setItem('currentLocation', this.state.currentLocation)
  }

  retrieveFromLocal() {
    let storedCurrentLocation = localStorage.getItem('currentLocation')
    this.setState({
      currentLocation: storedCurrentLocation || '',
      isOnWelcomePage: storedCurrentLocation ? false : true
    })
  }

  componentWillMount() {
    this.retrieveFromLocal()
  }

  render() {
    return (
      <div className="App">
        <Search showWelcomePage={this.state.isOnWelcomePage}
                setCurrentLocation={this.setCurrentLocation.bind(this)}
        />
        <Current location={this.state.currentLocation}/>
      </div>
    )
  }
}
