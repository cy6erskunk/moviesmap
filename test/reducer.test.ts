/* eslint-env jest */
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'deep... Remove this comment to see the full error message
import deepFreeze from 'deep-freeze'

import reducer from '../app/reducers/movies'
import constants from '../app/constants'

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('reducer', () => {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(() => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'jest'.
    history.pushState = jest.fn()
  })

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'afterEach'.
  afterEach(() => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReset' does not exist on type '(data... Remove this comment to see the full error message
    history.pushState.mockReset()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('requires action', () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(reducer).toThrow()
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(() => {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
      reducer(null, {})
    }).not.toThrow()
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('returns default state', () => {
    const result = reducer(undefined, {})

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(result).toBeTruthy()
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(result.title).toBe('')
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(result.error).toBe('')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('SWITCH_MOVIE', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('switches state', () => {
      const title = '180'
      let result = reducer(undefined, {type: constants.SWITCH_MOVIE, title})

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(result).toBeTruthy()
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(result.title).toBe(title)
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(result.error).toBe('')

      result = reducer(result, {type: constants.SWITCH_MOVIE, title})
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(result.title).toBe(title)
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(result.error).toBe('')
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('updates browser history by default', () => {
      const title = '18 0'
      reducer(undefined, {type: constants.SWITCH_MOVIE, title})

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(history.pushState).toHaveBeenLastCalledWith({title}, title, encodeURIComponent(title))
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('does not updates history whel loading from history', () => {
      const title = '18 0'
      reducer(undefined, {type: constants.SWITCH_MOVIE, title, loadingHistory: true})

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(history.pushState).not.toHaveBeenCalled()
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('ignores duplicate calls', () => {
      const title = '180'
      const firstState = reducer(undefined, {
        type: constants.SWITCH_MOVIE,
        title,
      })
      deepFreeze(firstState)
      const secondState = reducer(firstState, {
        type: constants.SWITCH_MOVIE,
        title,
      })

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(firstState).toEqual(secondState)
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('RESET_MOVIE', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('returns default state', () => {
      const title = '180'
      const defaultState = deepFreeze(reducer(undefined, {}))
      const intermediateState = deepFreeze(
        reducer(defaultState, {
          type: constants.SWITCH_MOVIE,
          title,
        }),
      )
      const result = reducer(intermediateState, {type: constants.RESET_MOVIE})

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(result).toEqual(defaultState)
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('updates browser history by default', () => {
      const defaultState = deepFreeze(reducer(undefined, {}))
      reducer(defaultState, {type: constants.RESET_MOVIE})

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(history.pushState).toHaveBeenLastCalledWith({title: ''}, '', '/')
    })

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('does not call history.pushState when loading history', () => {
      const defaultState = deepFreeze(reducer(undefined, {}))
      reducer(defaultState, {type: constants.RESET_MOVIE, loadingHistory: true})

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(history.pushState).not.toHaveBeenCalled()
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('does not reset error', () => {
    const errorMsg = 'something error-like'
    const state = reducer(undefined, {
      type: constants.RECEIVE_MOVIES_DATA,
      error: errorMsg,
    })
    const result = reducer(state, {type: constants.INIT_DATA})
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(result.error).toEqual(errorMsg)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('updates allLocations on init, does not remove', () => {
    const locations = {
      '555 Market St.': {
        lat: 37.7899844,
        lng: -122.3999366,
      },
      'Embarcadero Freeway': {
        lat: 37.7489402,
        lng: -122.3928481,
      },
    }
    const result = reducer(undefined, {
      type: constants.INIT_DATA,
      data: {locations},
    })
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(result.allLocations).toEqual(locations)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('updates allLocations on init, does not remove', () => {
    const locations = {
      '555 Market St.': {
        lat: 37.7899844,
        lng: -122.3999366,
      },
      'Embarcadero Freeway': {
        lat: 37.7489402,
        lng: -122.3928481,
      },
    }
    let result = reducer(undefined, {
      type: constants.INIT_DATA,
      data: {locations},
    })
    result = reducer(result, {type: constants.INIT_DATA, data: {locations}})
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(result.allLocations).toEqual(locations)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('does not resets allLocations', () => {
    const title = '180'
    const locations = {
      '555 Market St.': {
        lat: 37.7899844,
        lng: -122.3999366,
      },
      'Embarcadero Freeway': {
        lat: 37.7489402,
        lng: -122.3928481,
      },
    }
    let result = reducer(undefined, {
      type: constants.INIT_DATA,
      data: {locations},
    })
    result = reducer(result, {type: constants.RECEIVE_MOVIES_DATA, data: []})

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(result.allLocations).toEqual(locations)
    result = reducer(result, {type: constants.SWITCH_MOVIE, title})
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(result.allLocations).toEqual(locations)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test(constants.REQUEST_LOCATIONS_DATA, () => {
    const state = reducer(
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ loadingData: false; loadingLoc... Remove this comment to see the full error message
      {
        loadingData: false,
        loadingLocations: false,
        error: '',
      },
      {type: constants.REQUEST_LOCATIONS_DATA},
    )
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(state).toEqual({
      loadingData: false,
      loadingLocations: true,
      error: '',
    })
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test(constants.REQUEST_MOVIES_DATA, () => {
    const state = reducer(
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ loadingData: false; loadingLoc... Remove this comment to see the full error message
      {
        loadingData: false,
        loadingLocations: true,
        error: '',
      },
      {type: constants.REQUEST_MOVIES_DATA},
    )
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(state).toEqual({
      loadingData: true,
      loadingLocations: true,
      error: '',
    })
  })
})
