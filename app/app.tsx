import './wdyr'

import * as React from 'react'
import {connect, Provider} from 'react-redux'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import {render} from 'react-dom'
import 'core-js/features/promise'

// @ts-expect-error ts-migrate(6142) FIXME: Module './components/App' was resolved to '/Users/... Remove this comment to see the full error message
import SomeApp from './components/App'
import store from './store'
import {init} from './actions'

const mapStateToProps = (state: any) => ({
  locations: state.locations,
  titles: state.titles,
  movieTitle: state.title,
  loadingData: state.loadingData,
  loadingLocations: state.loadingLocations,
  error: state.error
})

const mapDispatchToProps = {
  init,
}

const SomeAppContainer = connect(mapStateToProps, mapDispatchToProps)(SomeApp)

render(
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <Provider store={store}>
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <SomeAppContainer />
  </Provider>,
  document.querySelector('.app-container'),
)
