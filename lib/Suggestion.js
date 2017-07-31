import React from 'react'
import '../CSS/Suggestion.css'

export const Suggestion = (props) => {
  return(
    <li className="suggest-li" onClick={props.handleInputChange}>
      <span className="suggest-span">{props.suggestion}</span>
    </li>
  )
}
