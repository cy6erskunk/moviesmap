import { Wrapper } from '@googlemaps/react-wrapper';
import React, { Component } from 'react';

import { resetMovie, switchMovie } from '../actions';
import store from '../store';
import updateMarkers from '../tools/updateMarkers';

import ErrorBubble from './ErrorBubble';
import MoviesMap from './MoviesMap';
import MovieSelector from './Selector';

type Props = {
  locations: Record<string, any>;
  movieTitle?: string;
  titles: string[];
  loadingData?: boolean;
  error?: string;
  loadingLocations?: boolean;
  init: () => void;
};

class SomeApp extends Component<Props> {
  constructor(props: Props) {
    super(props);
    props.init();
  }

  componentDidMount = () =>
    window.addEventListener('popstate', this.popStateHandler);

  componentWillUnmount = () =>
    window.removeEventListener('popstate', this.popStateHandler);

  popStateHandler = (event: any) =>
    this.dispatchChange(event.state ? event.state.title : '', true);

  dispatchChange(title: any, loadingHistory: any) {
    store.dispatch(
      title ? switchMovie(title, loadingHistory) : resetMovie(loadingHistory)
    );
  }

  render() {
    return (
      <React.StrictMode>
        <ErrorBubble message={this.props.error} />
        <MovieSelector
          titles={this.props.titles}
          className="title-select"
          handleChange={this.dispatchChange}
          value={this.props.movieTitle}
          loadingData={this.props.loadingData}
        />
        <Wrapper apiKey={`${process.env.REACT_APP_GMAPS_API_KEY}`}>
          <MoviesMap
            locations={this.props.locations}
            movieTitle={this.props.movieTitle}
            loadingLocations={this.props.loadingLocations}
            updateMarkers={updateMarkers}
          />
        </Wrapper>
      </React.StrictMode>
    );
  }
}

export default SomeApp;
