/* eslint-env jest */
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'deep... Remove this comment to see the full error message
import deepFreeze from 'deep-freeze';

import constants from '../app/constants';
import reducer from '../app/reducers/movies';

describe('reducer', () => {
  beforeEach(() => {
    history.pushState = jest.fn();
  });

  afterEach(() => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReset' does not exist on type '(data... Remove this comment to see the full error message
    history.pushState.mockReset();
  });

  it('requires action', () => {
    expect(reducer).toThrow();
    expect(() => {
      reducer(undefined, {});
    }).not.toThrow();
  });

  it('returns default state', () => {
    const result = reducer(undefined, {});

    expect(result).toBeTruthy();
    expect(result.title).toBe('');
    expect(result.error).toBe('');
  });

  describe('SWITCH_MOVIE', () => {
    it('switches state', () => {
      const title = '180';
      let result = reducer(undefined, { type: constants.SWITCH_MOVIE, title });

      expect(result).toBeTruthy();
      expect(result.title).toBe(title);
      expect(result.error).toBe('');

      result = reducer(result, { type: constants.SWITCH_MOVIE, title });
      expect(result.title).toBe(title);
      expect(result.error).toBe('');
    });

    it('updates browser history by default', () => {
      const title = '18 0';
      reducer(undefined, { type: constants.SWITCH_MOVIE, title });

      expect(history.pushState).toHaveBeenLastCalledWith(
        { title },
        title,
        encodeURIComponent(title)
      );
    });

    it('does not updates history whel loading from history', () => {
      const title = '18 0';
      reducer(undefined, {
        type: constants.SWITCH_MOVIE,
        title,
        loadingHistory: true
      });

      expect(history.pushState).not.toHaveBeenCalled();
    });

    it('ignores duplicate calls', () => {
      const title = '180';
      const firstState = reducer(undefined, {
        type: constants.SWITCH_MOVIE,
        title
      });
      deepFreeze(firstState);
      const secondState = reducer(firstState, {
        type: constants.SWITCH_MOVIE,
        title
      });

      expect(firstState).toEqual(secondState);
    });
  });

  describe('RESET_MOVIE', () => {
    it('returns default state', () => {
      const title = '180';
      const defaultState = deepFreeze(reducer(undefined, {}));
      const intermediateState = deepFreeze(
        reducer(defaultState, {
          type: constants.SWITCH_MOVIE,
          title
        })
      );
      const result = reducer(intermediateState, {
        type: constants.RESET_MOVIE
      });

      expect(result).toEqual(defaultState);
    });

    it('updates browser history by default', () => {
      const defaultState = deepFreeze(reducer(undefined, {}));
      reducer(defaultState, { type: constants.RESET_MOVIE });

      expect(history.pushState).toHaveBeenLastCalledWith(
        { title: '' },
        '',
        '/'
      );
    });

    it('does not call history.pushState when loading history', () => {
      const defaultState = deepFreeze(reducer(undefined, {}));
      reducer(defaultState, {
        type: constants.RESET_MOVIE,
        loadingHistory: true
      });

      expect(history.pushState).not.toHaveBeenCalled();
    });
  });

  it('does not reset error', () => {
    const errorMsg = 'something error-like';
    const state = reducer(undefined, {
      type: constants.RECEIVE_MOVIES_DATA,
      error: errorMsg
    });
    const result = reducer(state, { type: constants.INIT_DATA });
    expect(result.error).toEqual(errorMsg);
  });

  it('updates allLocations on init, does not remove', () => {
    const locations = {
      '555 Market St.': {
        lat: 37.7899844,
        lng: -122.3999366
      },
      'Embarcadero Freeway': {
        lat: 37.7489402,
        lng: -122.3928481
      }
    };
    const result = reducer(undefined, {
      type: constants.INIT_DATA,
      data: { locations }
    });
    expect(result.allLocations).toEqual(locations);
  });

  it('updates allLocations on init, does not remove', () => {
    const locations = {
      '555 Market St.': {
        lat: 37.7899844,
        lng: -122.3999366
      },
      'Embarcadero Freeway': {
        lat: 37.7489402,
        lng: -122.3928481
      }
    };
    let result = reducer(undefined, {
      type: constants.INIT_DATA,
      data: { locations }
    });
    result = reducer(result, {
      type: constants.INIT_DATA,
      data: { locations }
    });
    expect(result.allLocations).toEqual(locations);
  });

  it('does not resets allLocations', () => {
    const title = '180';
    const locations = {
      '555 Market St.': {
        lat: 37.7899844,
        lng: -122.3999366
      },
      'Embarcadero Freeway': {
        lat: 37.7489402,
        lng: -122.3928481
      }
    };
    let result = reducer(undefined, {
      type: constants.INIT_DATA,
      data: { locations }
    });
    result = reducer(result, { type: constants.RECEIVE_MOVIES_DATA, data: [] });

    expect(result.allLocations).toEqual(locations);
    result = reducer(result, { type: constants.SWITCH_MOVIE, title });
    expect(result.allLocations).toEqual(locations);
  });

  test(constants.REQUEST_LOCATIONS_DATA, () => {
    const state = reducer(
      {
        loadingData: false,
        loadingLocations: false,
        error: ''
      },
      { type: constants.REQUEST_LOCATIONS_DATA }
    );
    expect(state).toEqual({
      loadingData: false,
      loadingLocations: true,
      error: ''
    });
  });

  test(constants.REQUEST_MOVIES_DATA, () => {
    const state = reducer(
      {
        loadingData: false,
        loadingLocations: true,
        error: ''
      },
      { type: constants.REQUEST_MOVIES_DATA }
    );
    expect(state).toEqual({
      loadingData: true,
      loadingLocations: true,
      error: ''
    });
  });
});
