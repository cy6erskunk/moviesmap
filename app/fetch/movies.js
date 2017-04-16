import 'whatwg-fetch';

export default () => {
    return fetch('https://data.sfgov.org/resource/wwmu-gmzc.json?$select=title,locations')
        .then(response => response.json());
};