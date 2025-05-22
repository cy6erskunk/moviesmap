import clone from 'clone';
import 'core-js/modules/es.object.assign';

import constants from '../constants';

export interface MoviesData {
  [key: string]: string[]; // Array of location names for each movie
}

export interface LocationData {
  [key: string]: {
    lat: number;
    lng: number;
    // Add other location properties as needed
  };
}

export interface MoviesState {
  title: string;
  titles: string[];
  moviesData: MoviesData;
  allLocations: LocationData;
  locations: LocationData;
  loadingData: boolean;
  loadingLocations: boolean;
  error: string;
}

type RequestMoviesAction = {
  type: typeof constants.REQUEST_MOVIES_DATA;
};

type ReceiveMoviesAction = {
  type: typeof constants.RECEIVE_MOVIES_DATA;
  data?: MoviesData;
  error?: Error;
};

type RequestLocationsAction = {
  type: typeof constants.REQUEST_LOCATIONS_DATA;
};

type ReceiveLocationsAction = {
  type: typeof constants.RECEIVE_LOCATIONS_DATA;
  data?: LocationData;
  error?: Error;
};

type InitDataAction = {
  type: typeof constants.INIT_DATA;
  data?: {
    locations?: LocationData;
    allLocations?: LocationData;
    [key: string]: any;
  };
};

type SwitchMovieAction = {
  type: typeof constants.SWITCH_MOVIE;
  title: string;
  loadingHistory?: boolean;
};

type ResetMovieAction = {
  type: typeof constants.RESET_MOVIE;
  loadingHistory?: boolean;
};

export type MoviesAction =
  | RequestMoviesAction
  | ReceiveMoviesAction
  | RequestLocationsAction
  | ReceiveLocationsAction
  | InitDataAction
  | SwitchMovieAction
  | ResetMovieAction;

const initialState: MoviesState = {
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
const reducer = (
  state: MoviesState | undefined,
  action: MoviesAction
): MoviesState => {
  const effectiveState = state || initialState;
  switch (action.type) {
    case constants.REQUEST_MOVIES_DATA:
      return Object.assign({}, clone(effectiveState), {
        loadingData: true
      });

    case constants.REQUEST_LOCATIONS_DATA:
      return Object.assign({}, clone(effectiveState), {
        loadingLocations: true
      });

    case constants.RECEIVE_MOVIES_DATA: {
      const receiveMoviesAction = action as ReceiveMoviesAction;
      return Object.assign(
        {},
        effectiveState,
        receiveMoviesAction.error
          ? {
              error: receiveMoviesAction.error.toString(),
              loadingData: false
            }
          : {
              loadingData: false,
              moviesData: receiveMoviesAction.data || {},
              titles: Object.keys(receiveMoviesAction.data || {}).sort()
            }
      );
    }

    case constants.RECEIVE_LOCATIONS_DATA: {
      const receiveLocationsAction = action as ReceiveLocationsAction;
      return Object.assign(
        {},
        effectiveState,
        receiveLocationsAction.error
          ? {
              error: receiveLocationsAction.error.toString(),
              loadingLocations: false
            }
          : {
              loadingLocations: false,
              locations: receiveLocationsAction.data || {},
              allLocations: receiveLocationsAction.data || {}
            }
      );
    }

    case constants.INIT_DATA: {
      const initDataAction = action as InitDataAction;
      if (initDataAction.data?.locations) {
        initDataAction.data.allLocations = clone(initDataAction.data.locations);
      }
      return Object.assign(
        {},
        clone(effectiveState),
        {
          title: initialState.title
        },
        initDataAction.data || {}
      );
    }

    case constants.SWITCH_MOVIE: {
      const switchMovieAction = action as SwitchMovieAction;
      if (!switchMovieAction.loadingHistory) {
        history.pushState(
          { title: switchMovieAction.title },
          switchMovieAction.title,
          encodeURIComponent(switchMovieAction.title)
        );
      }
      return Object.assign({}, clone(effectiveState), {
        title: switchMovieAction.title,
        moviesData: clone(effectiveState.moviesData),
        locations: (
          clone(effectiveState.moviesData[switchMovieAction.title]) || []
        ).reduce((prev: LocationData, locationName: string) => {
          if (
            typeof effectiveState.allLocations[locationName] !== 'undefined'
          ) {
            prev[locationName] = effectiveState.allLocations[locationName];
          }
          return prev;
        }, {})
      });
    }

    case constants.RESET_MOVIE: {
      const resetMovieAction = action as ResetMovieAction;
      if (!resetMovieAction.loadingHistory) {
        history.pushState({ title: '' }, '', '/');
      }
      return Object.assign({}, clone(effectiveState), {
        title: '',
        locations: effectiveState.allLocations
      });
    }

    default:
      return effectiveState;
  }
};

export default reducer;
