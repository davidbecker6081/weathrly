import React from 'react';

export default class Search extends React.Component {

  search(event) {
    event.preventDefault();
    let searchInput = document.getElementById('input-search');
    console.log('Searched For: ', searchInput.value);
  }

  render() {

    return(
      <form onSubmit={this.search.bind(this)}>
        <input type="text" id="input-search" className="input-search"/>
        <input type="submit" className="search-submit" value="Submit"/>
      </form>
    )
  }

}
