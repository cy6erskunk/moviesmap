/* eslint-env jasmine, jest */
import React from 'react'
import ReactDOM from 'react-dom'

import App from '../app/components/App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  function noop() {}
  ReactDOM.render(<App init={noop} />, div)
})
