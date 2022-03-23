/* eslint-env jasmine, jest */
import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import ReactDOM from 'react-dom'

// @ts-expect-error ts-migrate(6142) FIXME: Module '../app/components/MoviesMap' was resolved ... Remove this comment to see the full error message
import MoviesMap from '../app/components/MoviesMap'

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
it('renders without crashing', () => {
  const div = document.createElement('div')
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  ReactDOM.render(<MoviesMap />, div)
})
