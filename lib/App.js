import React from 'react'
import Current from './Current'
import Search from './Search'
import SevenHour from './SevenHour'
import TenDay from './TenDay'
import API from './API'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      apiData: {},
      currentLocation: '',
      isOnWelcomePage: true
    }
  }

  setCurrentLocation(location) {
    let newDataObj = new API(location)
    newDataObj.updateWeatherData()

    this.setState({
      currentLocation: location,
      isOnWelcomePage: false,
      apiData: newDataObj
    }, this.saveToLocal)

  }


  saveToLocal() {
    localStorage.setItem('currentLocation', this.state.currentLocation)
  }

  retrieveFromLocal() {
    let storedCurrentLocation = localStorage.getItem('currentLocation')

    let newDataObj = new API(storedCurrentLocation)
    newDataObj.updateWeatherData()

    this.setState({
      currentLocation: storedCurrentLocation || '',
      isOnWelcomePage: storedCurrentLocation ? false : true,
      apiData: newDataObj
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
        <Current apiData={this.state.apiData}/>
        <SevenHour apiData={this.state.apiData}/>
        <TenDay apiData={this.state.apiData} />
      </div>
    )
  }
}
