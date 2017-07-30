import React from 'react'
import '../CSS/Search.css'
import CityList from './CityList'
import Trie from './Trie'
import AutoComplete from './AutoComplete'

export default class Search extends React.Component {
  constructor(props) {
    super()
    this.state = {
      currentInput: ''
    }
    // this.cityListTrie = new Trie()
    // this.cityListTrie.populate(CityList)
  }

  // populateTrie() {
  //
  // }

  handleInputChange(e) {
    if (e.target.value) {
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
    // reset the isValidLocation to true
    this.props.setValidLocation()
    //check for zip code
    searchQuery = searchQuery.trim()
    if (!isNaN(searchQuery) && searchQuery.length === 5) {
      formattedInput = searchQuery
    } else {
      formattedInput = this.massageInput(searchQuery)
    }
    this.props.setCurrentLocation(formattedInput)
    this.state.currentInput = ''
  }

  massageInput(searchQuery) { //denver
    //invalid search = create error Component with suggestions of cities (reuse autocomplete component)
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


  validateAgainstCityList(cityState) {
    let suggestArray = this.props.cityListTrie.suggest(cityState)
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
        {this.state.currentInput.length > 0 &&
        <AutoComplete currentInput={this.state.currentInput}
                      cityListTrie={this.props.cityListTrie}
                      handleInputChange={this.handleInputChange.bind(this)}
        />}
      </div>
    )
  }

}
