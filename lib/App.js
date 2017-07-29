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
      apiData: undefined,
      currentLocation: '',
      isOnWelcomePage: true
    }
  }

  setCurrentLocation(location) {
    if (location !== 'errorMessage') {
      let newDataObj = new API(location)
      newDataObj.updateWeatherData()
      .then(() => {
        this.setState({
          currentLocation: location,
          isOnWelcomePage: false,
          apiData: newDataObj
        }, this.saveToLocal)
      })
      .catch((e) => {
        console.error(e)
      })
    } else {
      this.setState({
        currentLocation: location,
        isOnWelcomePage: false
      })
    }
  }


  saveToLocal() {
    localStorage.setItem('currentLocation', this.state.currentLocation)
  }

  retrieveFromLocal() {
    let storedCurrentLocation = localStorage.getItem('currentLocation')
    if (storedCurrentLocation) {
      let newDataObj = new API(storedCurrentLocation)
      newDataObj.updateWeatherData()
      .then(() => {
        this.setState({
          currentLocation: storedCurrentLocation,
          isOnWelcomePage: false,
          apiData: newDataObj
        })
      })
      .catch(() => {
        console.error()
      })
    }
  }

  // why does render seem to run before this function finishes?
  componentWillMount() {
    this.retrieveFromLocal()
  }

  render() {
    return (
      <div className="App">
        <Search showWelcomePage={this.state.isOnWelcomePage}
                setCurrentLocation={this.setCurrentLocation.bind(this)}
        />

        {this.state.currentLocation === 'errorMessage' &&
        <div>
          error
        </div>
        }

          {this.state.apiData
          &&
          <div>
            <Current apiData={this.state.apiData}/>
            <SevenHour apiData={this.state.apiData}/>
            <TenDay apiData={this.state.apiData} />
          </div>
          }


      </div>
    )
  }
}
