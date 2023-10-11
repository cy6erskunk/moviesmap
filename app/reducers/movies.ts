// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clon... Remove this comment to see the full error message
import clone from 'clone';
import 'core-js/modules/es.object.assign';

import constants from '../constants';

const initialState = {
  title: '',
  titles: [],
  moviesData: {},
  allLocations: {},
  locations: {},
  loadingData: false,
  loadingLocations: false,
  error: ''
};
/* eslint-disable complexity */
const reducer = (state: any, action: any) => {
  if (!state) {
    return initialState;
  }
  switch (action.type) {
    case constants.REQUEST_MOVIES_DATA:
      return Object.assign({}, clone(state), {
        loadingData: true
      });

    case constants.REQUEST_LOCATIONS_DATA:
      return Object.assign({}, clone(state), {
        loadingLocations: true
      });

    case constants.RECEIVE_MOVIES_DATA:
      return Object.assign(
        {},
        state,
        action.error
          ? {
              error: action.error.toString(),
              loadingData: false
            }
          : {
              loadingData: false,
              moviesData: action.data,
              titles: Object.keys(action.data).sort()
            }
      );

    case constants.RECEIVE_LOCATIONS_DATA:
      return Object.assign(
        {},
        state,
        action.error
          ? {
              error: action.error.toString(),
              loadingLocations: false
            }
          : {
              loadingLocations: false,
              locations: action.data,
              allLocations: action.data
            }
      );

    case constants.INIT_DATA: {
      if (action.data?.locations) {
        action.data.allLocations = clone(action.data.locations);
      }
      return Object.assign(
        {},
        clone(state),
        {
          title: initialState.title
        },
        action.data
      );
    }
    case constants.SWITCH_MOVIE: {
      if (!action.loadingHistory) {
        history.pushState(
          { title: action.title },
          action.title,
          encodeURIComponent(action.title)
        );
      }
      return Object.assign({}, clone(state), {
        title: action.title,
        moviesData: clone(state.moviesData),
        locations: (clone(state.moviesData[action.title]) || []).reduce(
          (prev: any, locationName: any) => {
            if (typeof state.allLocations[locationName] !== 'undefined') {
              prev[locationName] = state.allLocations[locationName];
            }
            return prev;
          },
          {}
        )
      });
    }

    case constants.RESET_MOVIE: {
      if (!action.loadingHistory) {
        history.pushState({ title: '' }, '', '/');
      }
      return Object.assign({}, clone(state), {
        title: '',
        locations: state.allLocations
      });
    }

    default:
      return state;
  }
};

export default reducer;
