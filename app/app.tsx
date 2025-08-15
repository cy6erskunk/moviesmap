import './wdyr';

import 'core-js/features/promise';
import { createRoot } from 'react-dom/client';
import { connect, Provider } from 'react-redux';

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

const container = document.querySelector('.app-container');
if (!container) throw new Error('Could not find app container');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <SomeAppContainer />
  </Provider>
);
