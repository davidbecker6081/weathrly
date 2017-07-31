import React from 'react'
import {Suggestion} from './Suggestion'
import '../CSS/AutoComplete.css'

export default class AutoComplete extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    let suggestArray = this.props.cityListTrie.suggest(this.props.currentInput.toLowerCase())

    return(
      <div className="auto-complete">
        {suggestArray.length === 0 &&
          <p className="auto-not-found">No Suggestions Found</p>
        }
        {suggestArray.length > 0 &&
          <ul className="auto-ul">
            <p className="auto-found">Location Matches Found:</p>
            {suggestArray.map((suggestion, i) =>
              <Suggestion key={i}
                          suggestion={suggestion}
                          handleInputChange={this.props.handleInputChange}
              />
            )}
          </ul>
        }
      </div>
    )
  }
}
