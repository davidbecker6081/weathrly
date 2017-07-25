import React from 'react'
import Current from './Current'
import Search from './Search'

export default class App extends React.Component {

  render() {

    return (
      <div className="App">
        <Search />
        <Current />
      </div>
    )
  }
}
