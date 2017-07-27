import React from 'react'
import '../CSS/Search.css'

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
    //invalid search = create error Component with suggestions of cities (reuse autocomplete component)

    //only run this when we know we have a valid location
    this.props.setCurrentLocation(this.state.currentInput)
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
