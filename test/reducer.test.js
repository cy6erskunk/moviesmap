/* eslint-env jest */
import deepFreeze from 'deep-freeze'

import reducer from '../app/reducers/movies'
import constants from '../app/constants'

describe('reducer', () => {
  it('requires action', () => {
    expect(reducer).toThrow()
    expect(() => {
      reducer(null, {})
    }).not.toThrow()
  })

  it('returns default state', () => {
    const result = reducer(undefined, {})

    expect(result).toBeTruthy()
    expect(result.title).toBe('')
    expect(result.error).toBe('')
  })

  it('switches state', () => {
    const title = '180'
    let result = reducer(undefined, {type: constants.SWITCH_MOVIE, title})

    expect(result).toBeTruthy()
    expect(result.title).toBe(title)
    expect(result.error).toBe('')

    result = reducer(result, {type: constants.SWITCH_MOVIE, title})
    expect(result.title).toBe(title)
    expect(result.error).toBe('')
  })

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

    expect(firstState).toEqual(secondState)
  })

  it('RESET_MOVIE returns default state', () => {
    const title = '180'
    const defaultState = deepFreeze(reducer(undefined, {}))
    const intermediateState = deepFreeze(
      reducer(defaultState, {
        type: constants.SWITCH_MOVIE,
        title,
      }),
    )
    const result = reducer(intermediateState, {type: constants.RESET_MOVIE})

    expect(result).toEqual(defaultState)
  })

  it('does not reset error', () => {
    const errorMsg = 'something error-like'
    const state = reducer(undefined, {
      type: constants.RECEIVE_MOVIES_DATA,
      error: errorMsg,
    })
    const result = reducer(state, {type: constants.INIT_DATA})
    expect(result.error).toEqual(errorMsg)
  })

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
    expect(result.allLocations).toEqual(locations)
  })

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
    expect(result.allLocations).toEqual(locations)
  })

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

    expect(result.allLocations).toEqual(locations)
    result = reducer(result, {type: constants.SWITCH_MOVIE, title})
    expect(result.allLocations).toEqual(locations)
  })

  test(constants.REQUEST_LOCATIONS_DATA, () => {
    const state = reducer(
      {
        loadingData: false,
        loadingLocations: false,
        error: '',
      },
      {type: constants.REQUEST_LOCATIONS_DATA},
    )
    expect(state).toEqual({
      loadingData: false,
      loadingLocations: true,
      error: '',
    })
  })

  test(constants.REQUEST_MOVIES_DATA, () => {
    const state = reducer(
      {
        loadingData: false,
        loadingLocations: true,
        error: '',
      },
      {type: constants.REQUEST_MOVIES_DATA},
    )
    expect(state).toEqual({
      loadingData: true,
      loadingLocations: true,
      error: '',
    })
  })
})
