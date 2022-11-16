/* eslint-env jasmine, jest */
import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import ReactDOM from 'react-dom'

import Selector from '../app/components/Selector'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Selector handleChange={() => undefined} titles={[]}/>, div)
})
