import PropTypes from 'prop-types'
import React from 'react'

const errorStyle = {
  color: 'red',
  position: 'fixed',
  top: 0,
  left: 0,
}

function ErrorBubble(props: any) {
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div style={Object.assign({}, errorStyle, {display: props.message ? 'block' : 'none'})}>
      {`Something went wrong: ${props.message}`}
    </div>
  )
}

ErrorBubble.defaultProps = {
  message: '',
}

ErrorBubble.propTypes = {
  message: PropTypes.string,
}

export default ErrorBubble
