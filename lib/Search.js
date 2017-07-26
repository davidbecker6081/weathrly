import React from 'react'
import '../CSS/Search.css'

export default class Search extends React.Component {
  constructor(props) {
    super()
    this.isDisabled = 'search-btn-disabled'
    this.state = {
      currentInput: ''
    }
  }

  toggleButton() {
    this.isDisabled = this.state.currentInput ? 'search-btn' : 'search-btn-disabled'
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

  //how do we combine onChange and onKeyPress?
  //use props.showWelcomePage to set welcome screen class

  render() {

    return (
      <div className='search-container'>
        <input type="text" className="input-search"
                value={this.state.currentInput}
                onChange={this.handleInputChange.bind(this)}
                onKeyPress={this.toggleButton()}/>
        <input type="submit" className={this.isDisabled}
                value="Search"
                onClick={this.search.bind(this)}/>
      </div>
    )
  }

}
