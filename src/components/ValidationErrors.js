import React from 'react'
import '../styles/ValidationErrors.css'

function ValidationErrors(props) {
  return (
    <div className="error">
      <span className="error__message">{props.errors.length ? props.errors : 'Please fill in all fields...'}</span> 
      <span className="error__emoji" role="img" aria-label="Poop emoji">💩</span>
    </div>
  )
}

export default ValidationErrors