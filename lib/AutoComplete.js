import React from 'react'
import {Suggestion} from './Suggestion'
import '../CSS/AutoComplete.css'

export default class AutoComplete extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    let suggestArray = this.props.cityListTrie.suggest(this.props.locationInput.toLowerCase())

    return(
      <div className="auto-complete">
        {suggestArray.length === 0 &&
          <p className="auto-not-found">{this.props.messageObj.notFound}</p>
        }
        {suggestArray.length > 0 &&
          <ul className="auto-ul">
            <p className="auto-found">{this.props.messageObj.locationFound}</p>
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
