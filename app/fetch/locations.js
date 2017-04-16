import 'whatwg-fetch';

export default () => {
    return fetch('locations.json')
        .then(response => response.json());
};