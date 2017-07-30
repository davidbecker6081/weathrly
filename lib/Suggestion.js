import React from 'react'

export const Suggestion = (props) => {
  return(
    <li onClick={props.handleInputChange}>
      {props.suggestion}
    </li>
  )
}
