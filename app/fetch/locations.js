import 'whatwg-fetch';

export default () => fetch('locations.json').
  then(response => response.json());
