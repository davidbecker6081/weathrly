import React from 'react'
import {Suggestion} from './Suggestion'

export default class AutoComplete extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    let suggestArray = this.props.cityListTrie.suggest(this.props.currentInput.toLowerCase())

    return(
      <div>
        AUTO COMPLETE LIST:
        {suggestArray.length === 0 &&
          <div>No Suggestions Found</div>
        }
        {suggestArray.length > 0 &&
          <ul>
            {suggestArray.map((suggestion, i) =>
              <Suggestion key={i} suggestion={suggestion} />
            )}
          </ul>
        }
      </div>
    )
  }
}
