/* eslint-env jasmine, jest */
import React from 'react'
import ReactDOM from 'react-dom'

import Selector from '../app/components/Selector'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Selector />, div)
})
