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
server.listen(3000)
