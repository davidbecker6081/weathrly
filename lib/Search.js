import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super()
  }

  render() {

    return (
      <div className='search-container'>
        <input type="text" className="input-search" value={this.props.inputVal}
        onChange={this.props.handleInputChange}/>
        <input type="submit" className="search-submit" value="Search" onClick={this.props.search}/>
      </div>
    )
  }

}
