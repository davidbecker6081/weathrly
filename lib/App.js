import React from 'react'
import Current from './Current'
import Search from './Search'
import SevenHour from './SevenHour'
import TenDay from './TenDay'
import API from './API'
import '../CSS/App.css'
import CityList from './CityList'
import Trie from './Trie'
import '../CSS/Header.css'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      apiData: undefined,
      currentLocation: '',
      isOnWelcomePage: true
    }
    this.isValidLocation = true
    this.cityListTrie = new Trie()
    this.cityListTrie.populate(CityList)
  }

  setCurrentLocation(location) {
    if (this.isValidLocation) {
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
    let onWelcomePage = localStorage.getItem('currentLocation') ? false : true
    this.setState({
      currentLocation: location,
      isOnWelcomePage: onWelcomePage
    })
    this.isValidLocation = false
  }

  setValidLocation() {
    this.setState({
      currentLocation: ''
    })
    this.isValidLocation = true
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
        console.log('Invalid Local Storage')
      })
    }
  }

  componentWillMount() {
    this.retrieveFromLocal()
  }

  render() {
    return (
      <div>
        {this.state.isOnWelcomePage &&
          <div className="App-Welcome">
            <header>
              <h1>
                Weathrly
              </h1>
              <Search setCurrentLocation={this.setCurrentLocation.bind(this)}
                    setValidLocation={this.setValidLocation.bind(this)}
                    showErrorPage={this.showErrorPage.bind(this)}
                    cityListTrie={this.cityListTrie}
                    isValidLocation={this.isValidLocation}
                    currentLocation={this.state.currentLocation}
                    />
            </header>
          </div>
        }

        {!this.state.isOnWelcomePage &&
          <div className="App">
            <header>
              <h1>
                Weathrly
              </h1>
              <Search setCurrentLocation={this.setCurrentLocation.bind(this)}
                    setValidLocation={this.setValidLocation.bind(this)}
                    showErrorPage={this.showErrorPage.bind(this)}
                    cityListTrie={this.cityListTrie}
                    isValidLocation={this.isValidLocation}
                    currentLocation={this.state.currentLocation}
                    />
            </header>

            {this.state.apiData
            &&
            <div>
              <div className="current-sevenhour-container">
                <Current apiData={this.state.apiData}/>
                <SevenHour apiData={this.state.apiData}/>
              </div>
              <TenDay apiData={this.state.apiData} />
            </div>
            }
          </div>
        }
      </div>
    )
  }
}
