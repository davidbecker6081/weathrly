import React from 'react'
import '../CSS/Search.css'
import CityList from './CityList'
import Trie from './Trie'

export default class Search extends React.Component {
  constructor(props) {
    super()
    this.state = {
      currentInput: ''
    }
    this.cityListTrie = new Trie()
    this.cityListTrie.populate(CityList)
  }

  // populateTrie() {
  //
  // }

  handleInputChange(e) {
    this.setState({
      currentInput: e.target.value
    })
  }

  search() {
    let formattedInput
    let searchQuery = this.state.currentInput
    //check for zip code
    searchQuery = searchQuery.trim()
    if (!isNaN(searchQuery) && searchQuery.length === 5) {
      formattedInput = this.validateAgainstCityList(searchQuery) ? searchQuery : 'errorMessage'
    } else {
      formattedInput = this.massageInput(searchQuery)
    }
    console.log('formattedInput', formattedInput)
    this.props.setCurrentLocation(formattedInput)
  }

  massageInput(searchQuery) {
    //invalid search = create error Component with suggestions of cities (reuse autocomplete component)
    searchQuery = searchQuery.toLowerCase()
    let indexOfDelimiter = searchQuery.indexOf(',')
    let formattedQuery

    if (indexOfDelimiter === -1) {
      indexOfDelimiter = searchQuery.indexOf(' ')
    }

    if (indexOfDelimiter === -1) {
      formattedQuery = 'errorMessage'
    } else {
      let state = searchQuery.slice(indexOfDelimiter + 1).trim()
    	let city = searchQuery.slice(0, indexOfDelimiter)

    	if (state.length < 1 || city.length < 1) {
    		formattedQuery = 'errorMessage'
    	} else {
        //city ,space state
        let TrieLookupFormat = city + ', ' + state
        let didPass = this.validateAgainstCityList(TrieLookupFormat)
        if (didPass) {
          formattedQuery = state + '/' + city
          formattedQuery = formattedQuery.replace(' ', '_')
        } else {
          formattedQuery = 'errorMessage'
        }
      }
    }
    return formattedQuery
  }

  validateAgainstCityList(cityState) {
    let suggestArray = this.cityListTrie.suggest(cityState)
    return suggestArray.length ? true : false
  }

  render() {

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
      </div>
    )
  }

}
