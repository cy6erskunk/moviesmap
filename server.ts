const path = require('path')

const express = require('express')

const app = express()
const DEFAULT_PORT = 8080
const PORT = process.env.PORT || DEFAULT_PORT

app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => {
  process.stdout.write(`app listening on port ${PORT}\n`)
})
