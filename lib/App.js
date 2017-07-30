import React from 'react'
import Current from './Current'
import Search from './Search'
import SevenHour from './SevenHour'
import TenDay from './TenDay'
import API from './API'
import Header from './Header'
import '../CSS/App.css'


export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      apiData: undefined,
      currentLocation: '',
      isOnWelcomePage: true,
      isValidLocation: true
    }
  }

  setCurrentLocation(location) {
    if (this.state.isValidLocation) {
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
        // handle invalid API call
        console.log('API ERROR:', e)
        this.showErrorPage(location);
      })
    } else {
      this.showErrorPage(location);
    }
  }

  showErrorPage(location) {
    this.setState({
      currentLocation: location,
      isValidLocation: false,
      isOnWelcomePage: false
    })
  }

  setInvalidLocation() {
    this.setState({
      isValidLocation: false
    })
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
        // this sould never hit
        console.log('Invalid Local Storage')
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
        <Header setCurrentLocation={this.setCurrentLocation.bind(this)}
                setInvalidLocation={this.setInvalidLocation.bind(this)}
        />

        {!this.state.isValidLocation &&
        <div>
          <Error location={this.state.currentLocation} />
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
