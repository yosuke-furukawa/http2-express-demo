const fs = require('fs')
const https = require('https')
const express = require('express')
const app = express()
const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
  passphrase: 'test'
}

const server = https.createServer(options, app)

app.use(express.static('public'))
server.listen(3000)
