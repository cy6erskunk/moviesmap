const data = require('./data.json');
const geocode = require('./lib/geocode');
let locations = require('./locations.json');

let promises = [];

// let i = 12;
data.forEach((elem) => {
    // if (i-- <=0) { return; }

    if (!locations[elem.locations]) {
        process.stdout.write(`requesting location: ${elem.locations}` + '\n');

        let p = geocode(`${elem.locations} San Francisco Bay Area, CA, USA`)
            .then(res => {
                locations[elem.locations] = res;
                return res;
            })
            .catch(reason => {
                process.stderr.write(reason + '\n');
            });

        promises.push(p);
    } else {
        process.stdout.write('HIT!' + '\n');
    }
});

const fs = require('fs');

Promise.all(promises)
    .then(results => {
        process.stdout.write(`${results.length} item(s) received` + '\n');
        fs.writeFileSync('./locations.json', JSON.stringify(locations));
    }, reason => {
        process.stderr.write(`Error: ${reason}` + '\n');
    });