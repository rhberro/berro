import PropTypes from 'prop-types'
import React from 'react'

function Button(props) {
  return <button onClick={props.onClick}>{props.children}</button>
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  onClick: console.log,
}

export default Button
