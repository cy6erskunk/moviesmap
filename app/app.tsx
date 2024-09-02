import './wdyr';

import 'core-js/features/promise';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';

import { init } from './actions';
import SomeApp from './components/App';
import store from './store';

const mapStateToProps = (state: any) => ({
  locations: state.locations,
  titles: state.titles,
  movieTitle: state.title,
  loadingData: state.loadingData,
  loadingLocations: state.loadingLocations,
  error: state.error
});

const mapDispatchToProps = {
  init
};

const SomeAppContainer = connect(mapStateToProps, mapDispatchToProps)(SomeApp);

render(
  <Provider store={store}>
    <SomeAppContainer />
  </Provider>,
  document.querySelector('.app-container')
);
