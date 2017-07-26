import React from 'react';
import '../CSS/Search.css'

export default class Search extends React.Component {
  constructor(props) {
    super()
    this.isDisabled = 'search-btn-disabled'
  }

  toggleButton() {
    this.isDisabled = this.props.inputVal ? 'search-btn' : 'search-btn-disabled'
  }

  //how do we combine onChange and onKeyPress?

  render() {

    return (
      <div className='search-container'>
        <input type="text" className="input-search" value={this.props.inputVal}
        onChange={this.props.handleInputChange} onKeyPress={this.toggleButton()}/>
      <input type="submit" className={this.isDisabled} value="Search" onClick={this.props.search}/>
      </div>
    )
  }

}
