import React from 'react'
import Current from './Current'
import Search from './Search'
import SevenHour from './SevenHour'
import TenDay from './TenDay'
import API from './API'
import Header from './Header'
import '../CSS/App.css'
import CityList from './CityList'
import Trie from './Trie'
import Error from './Error'

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
    this.setState({
      currentLocation: location,
      isOnWelcomePage: false
    })
    this.isValidLocation = false
  }

  setValidLocation() {
    this.isValidLocation = true
  }

  // setInvalidLocation() {
  //   this.setState({
  //     isValidLocation: false
  //   })
  // }

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

  // MOVE SEARCH INTO HEADER COMPONENT
  // <Search setCurrentLocation={this.setCurrentLocation.bind(this)}
  //         showErrorPage={this.showErrorPage.bind(this)}
  //         cityListTrie={this.cityListTrie}
  //         setValidLocation={this.setValidLocation.bind(this)}



  render() {
    return (
      <div className="App">

        <Header setCurrentLocation={this.setCurrentLocation.bind(this)}
                setValidLocation={this.setValidLocation.bind(this)}
                showErrorPage={this.showErrorPage.bind(this)}
                cityListTrie={this.cityListTrie}
        />

        {!this.isValidLocation &&
        <div>
          <Error  location={this.state.currentLocation}
                  cityListTrie={this.cityListTrie}
          />
        </div>
        }

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
    )
  }
}
