import React from 'react'
import Current from './Current'
import Search from './Search'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentInput: '',
      currentLocation: '',
      isOnWelcomePage: true
    }
  }

  search() {
    //validation for incorrect currentInput, if incorrect, set currentLocation to 'error' and clear localStorage
    //invalid search = create error Component with suggestions of cities (reuse autocomplete component)
    
    this.setState({
      currentLocation: this.state.currentInput,
      currentInput: '',
      isOnWelcomePage: false
    }, this.saveToLocal)

  }

  handleInputChange(e) {
    this.setState({
      currentInput: e.target.value
    })
  }

  saveToLocal() {
    //grab value of currentLocation
    //set in LocalStorage
    localStorage.setItem('currentLocation', this.state.currentLocation)
  }

  retrieveFromLocal() {
    //grab from local Storage
    let storedCurrentLocation = localStorage.getItem('currentLocation')
    //set currentLocation to value
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
        <Search search={this.search.bind(this)} inputVal={this.state.currentInput} handleInputChange={this.handleInputChange.bind(this)} showWelcomePage={this.state.isOnWelcomePage}/>
        <Current location={this.state.currentLocation}/>
      </div>
    )
  }
}
