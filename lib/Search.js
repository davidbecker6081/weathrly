import React from 'react'
import '../CSS/Search.css'
import CityList from './Trie/CityList'
import Trie from './Trie/Trie'
import AutoComplete from './AutoComplete/AutoComplete'

export default class Search extends React.Component {
  constructor(props) {
    super()
    this.state = {
      currentInput: ''
    }
  }

  handleInputChange(e) {
    if (e.target.value || e.target.value === '') {
      this.props.setValidLocation()
      this.setState({
        currentInput: e.target.value
      })
    } else {
      this.setState({
        currentInput: e.target.textContent
      }, this.search)
    }
  }

  search() {
    let formattedInput
    let searchQuery = this.state.currentInput
    this.props.setValidLocation()
    searchQuery = searchQuery.trim()
    if (!isNaN(searchQuery) && searchQuery.length === 5) {
      formattedInput = searchQuery
    } else {
      formattedInput = this.massageInput(searchQuery)
    }
    this.props.setCurrentLocation(formattedInput)
    this.state.currentInput = ''
  }

  massageInput(searchQuery) {
    searchQuery = searchQuery.toLowerCase()
    let indexOfDelimiter = searchQuery.indexOf(',')
    let formattedQuery

    if (indexOfDelimiter === -1) {
      indexOfDelimiter = searchQuery.indexOf(' ')
    }

    if (indexOfDelimiter === -1) {
      formattedQuery = searchQuery
      this.props.showErrorPage(formattedQuery)
    } else {
      let state = searchQuery.slice(indexOfDelimiter + 1).trim()
    	let city = searchQuery.slice(0, indexOfDelimiter)

    	if (state.length < 1 || city.length < 1) {
    		formattedQuery = searchQuery
        this.props.showErrorPage(formattedQuery)
    	} else {
        formattedQuery = state + '/' + city
        formattedQuery = formattedQuery.replace(' ', '_')
      }
    }
    return formattedQuery
  }

  render() {
    const messageObj = {
      notFound: (this.state.currentInput.length > 0) ? 'No Suggestions Found' : 'Invalid search. Please enter a city and state or zipcode',
      locationFound: (this.state.currentInput.length > 0) ? 'Location Matches Found:' : 'Invalid search. Did You Mean:'
    }

    return (
      <div className='search-container'>
        <input type="text" className="input-search"
                value={this.state.currentInput}
                onChange={this.handleInputChange.bind(this)}
        />
        <input type="submit" className="search-btn"
                value="Search"
                onClick={this.search.bind(this)}
                disabled={!this.state.currentInput}
        />
        {this.state.currentInput.length > 0 &&
          <AutoComplete locationInput={this.state.currentInput}
                        cityListTrie={this.props.cityListTrie}
                        handleInputChange={this.handleInputChange.bind(this)}
                        messageObj={messageObj}
          />
        }
        {!this.props.isValidLocation &&
          <AutoComplete  locationInput={this.props.currentLocation}
                  cityListTrie={this.props.cityListTrie}
                  handleInputChange={this.handleInputChange.bind(this)}
                  messageObj={messageObj}
          />
        }
      </div>
    )
  }
}
