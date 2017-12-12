import fs from 'fs';

const data = require('./data.json');
const geocode = require('./lib/geocode');
const locations = require('./locations.json');

const promises = [];

data.forEach(elem => {

  if (!locations[elem.locations]) {
    process.stdout.write(`requesting location: ${elem.locations}\n`);

    const p = geocode(`${elem.locations} San Francisco Bay Area, CA, USA`).
      then(res => {
        locations[elem.locations] = res;
        return res;
      }).
      catch(reason => {
        process.stderr.write(`${reason }\n`);
      });

    promises.push(p);
  } else {
    process.stdout.write('HIT!\n');
  }
});

Promise.all(promises).
  then(results => {
    process.stdout.write(`${results.length} item(s) received\n`);
    fs.writeFileSync('./locations.json', JSON.stringify(locations));
  }, reason => {
    process.stderr.write(`Error: ${reason}\n`);
  });
