const fs = require('fs')
const http2 = require('http2')
const express = require('express')
const app = express()
const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
  passphrase: 'test'
}

const server = http2.createSecureServer(options, app)

app.use(express.static('public'))

app.get('/response-fetch.json', (req, res) => {
  const response = JSON.stringify({
    message: "hello world"
  })
  res.send(response)
})
app.get('/response-jsonp.js', (req, res) => {
  const json = JSON.stringify({
    message: "hello world"
  })
  const response = `jsonp${req.query.rnd}(${json})`
  res.send(response)
})

server.listen(3000)
console.log('http2 server listening on https://localhost:3000')
