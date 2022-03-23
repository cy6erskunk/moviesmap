// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'fs' or its corresponding type ... Remove this comment to see the full error message
import fs from 'fs'

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const data = require('./data.json')
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const geocode = require('./lib/geocode')
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const locations = require('./locations.json')

const promises: any = []

data.forEach((elem: any) => {
  if (!locations[elem.locations]) {
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
    process.stdout.write(`requesting location: ${elem.locations}\n`)

    const p = geocode(`${elem.locations} San Francisco Bay Area, CA, USA`)
      .then((res: any) => {
        locations[elem.locations] = res
        return res
      })
      .catch((reason: any) => {
        // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.stderr.write(`${reason}\n`)
      })

    promises.push(p)
  } else {
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
    process.stdout.write('HIT!\n')
  }
})

Promise.all(promises).then(
  (results) => {
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
    process.stdout.write(`${results.length} item(s) received\n`)
    fs.writeFileSync('./locations.json', JSON.stringify(locations))
  },
  (reason) => {
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
    process.stderr.write(`Error: ${reason}\n`)
  },
)
