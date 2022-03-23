/* eslint-env jasmine, jest */
import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import ReactDOM from 'react-dom'

import MoviesMap from '../app/components/MoviesMap'

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MoviesMap />, div)
})
