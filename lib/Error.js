import React from 'react'
import {Suggestion} from './Suggestion'

export default class Error extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    let suggestArray = this.props.cityListTrie.suggest(this.props.location.toLowerCase())

    return(
      <div>
      {suggestArray.length === 0 &&
        <div>
          <p>Error Component</p>
          <p>No Suggestions Found</p>
        </div>
      }
      {suggestArray.length > 0 &&
        <div>
          <p>Error Component</p>
          <p>Did You mean:</p>
          <ul>
            {suggestArray.map((suggestion, i) =>
              <Suggestion key={i} suggestion={suggestion} />
            )}
          </ul>
        </div>
      }
      </div>
    )
  }

}
