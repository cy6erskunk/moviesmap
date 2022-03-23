// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fetch'.
const fetch = require('node-fetch')

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = async (req: any, res: any) => {
  const movies = await fetch(
    'https://data.sfgov.org/resource/wwmu-gmzc.json?$select=title,locations',
  )
    .then((response) => response.json())
    .then((data) =>
      data
        // filter out movies without locations
        .filter((movie: any) => movie.locations)
        // flatten structure to {`title`=>[locationName,...], ...}
        .reduce((prev: any, m: any) => {
          if (!prev[m.title]) {
            prev[m.title] = []
          }

          prev[m.title].push(m.locations)

          return prev
        }, {}),
    )

  return res.json(movies)
}
