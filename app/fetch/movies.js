import 'whatwg-fetch';

export default () => fetch('https://data.sfgov.org/resource/wwmu-gmzc.json?$select=title,locations').
  then(response => response.json()).
  then(data => data.
    // filter out movies without locations
    filter(movie => movie.locations).
    // flatten structure to {`title`=>[locationName,...], ...}
    reduce((prev, m) => {
      if (!prev[m.title]) {
        prev[m.title] = [];
      }

      prev[m.title].push(m.locations);

      return prev;
    }, {})
  );
