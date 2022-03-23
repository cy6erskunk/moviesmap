// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'path'.
const path = require('path')

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const express = require('express')

const app = express()
const DEFAULT_PORT = 8080
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
const PORT = process.env.PORT || DEFAULT_PORT

// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => {
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  process.stdout.write(`app listening on port ${PORT}\n`)
})
