export default () =>
  fetch('/api/locations').then((response) => response.json());
