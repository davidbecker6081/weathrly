import React from 'react'
import {Suggestion} from './Suggestion'
import '../CSS/Error.css'

export default class Error extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    let suggestArray = this.props.cityListTrie.suggest(this.props.currentLocation.toLowerCase())

    return(
      <div className="error">
      {suggestArray.length === 0 &&
        <p className="error-not-found">Invalid search. Please enter a city and state or zipcode</p>
      }
      {suggestArray.length > 0 &&
        <div>
          <p className="error-header">Invalid search</p>
          <p className="error-header">Did You mean:</p>
          <ul>
            {suggestArray.map((suggestion, i) =>
              <Suggestion key={i} suggestion={suggestion} handleInputChange={this.props.handleInputChange}/>
            )}
          </ul>
        </div>
      }
      </div>
    )
  }

}
