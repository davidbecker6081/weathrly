import React from 'react'
import Current from './Current'
import Search from './Search'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentInput: '',
      currentLocation: '',
      isOnWelcomePage: false
    }
  }

  search() {
    this.setState({
      currentLocation: this.state.currentInput,
      currentInput: ''
    })
  }

  handleInputChange(e) {
    this.setState({
      currentInput: e.target.value
    })
  }

  render() {

    return (
      <div className="App">
        <Search search={this.search.bind(this)} inputVal={this.state.currentInput} handleInputChange={this.handleInputChange.bind(this)}/>
        <Current />
      </div>
    )
  }
}
