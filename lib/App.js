import React from 'react'
import Current from './Current'
import Search from './Search'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentInput: '',
      currentLocation: '',
      isOnWelcomePage: false
    }
  }

  search() {
    //validation for incorrect currentInput, if incorrect, set currentLocation to 'error'
    this.setState({
      currentLocation: this.state.currentInput,
      currentInput: ''
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
      currentLocation: storedCurrentLocation || ''
    })
  }

  toggleWelcomePageState() {
    
  }

  componentWillMount() {
    this.retrieveFromLocal()
  }

  render() {
    return (
      <div className="App">
        <Search search={this.search.bind(this)} inputVal={this.state.currentInput} handleInputChange={this.handleInputChange.bind(this)}/><Current location={this.state.currentLocation}/>
      </div>
    )
  }
}
