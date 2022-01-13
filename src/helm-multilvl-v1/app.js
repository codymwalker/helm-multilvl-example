const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.json({
      version: 'v1',
      env: process.env,
  })
})

app.listen(port, () => {
  console.log(`V1 listening at http://localhost:${port}`)
})