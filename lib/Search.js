import React from 'react'
import '../CSS/Search.css'
import CityList from './CityList'

export default class Search extends React.Component {
  constructor(props) {
    super()
    this.state = {
      currentInput: ''
    }
  }

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
      formattedInput = searchQuery
    } else {
      formattedInput = this.massageInput(searchQuery)
    }
    console.log('formattedInput', formattedInput)
    this.props.setCurrentLocation(formattedInput)
  }

  massageInput(searchQuery) {
    //invalid search = create error Component with suggestions of cities (reuse autocomplete component)
    let indexOfComma = searchQuery.indexOf(',')
    let formattedQuery

    if (indexOfComma !== -1) {
	    let state = searchQuery.slice(indexOfComma + 1).trim()
    	let city = searchQuery.slice(0, indexOfComma)

    	if (state.length < 1 || city.length < 1) {
    		formattedQuery = 'errorMessage'
    	} else {
        formattedQuery = state + '/' + city
        formattedQuery = formattedQuery.replace(' ', '_')
      }

    } else {
    	let indexOfSpace = searchQuery.indexOf(' ')

    	if (indexOfSpace !== -1) {
    		let state = searchQuery.slice(indexOfSpace + 1).trim()
    		let city = searchQuery.slice(0, indexOfSpace)
        if (state.length < 1 || city.length < 1) {
      		formattedQuery = 'errorMessage'
      	} else {
          formattedQuery = state + '/' + city
          formattedQuery = formattedQuery.replace(' ', '_')
        }
    	} else {
    		formattedQuery = 'errorMessage'
    	}
    }
    //run function that checks if formatted query is in CityList
    //if found, return and formatted
    //if not found, return 'errorMessage'
    return formattedQuery
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
