const fs = require('fs')
const http2 = require('http2')
const express = require('express')
const path = require('path')
const app = express()
const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
  passphrase: 'test'
}
const files = fs.readdirSync(path.resolve('./public'))
const imgs = files.filter((file) => file.endsWith('.jpg')).map((img) => ({ 
  number: parseInt(img.replace(/gophertiles_(\d+).jpg/, '$1')),
  content: fs.readFileSync(path.resolve(path.join('public', img))),
  path: img,
})).sort((a, b) => a.number - b.number).slice(0, 50)
const server = http2.createSecureServer(options, app)

app.get('/', (req, res, next) => {
  imgs.forEach((image) => {
    res.createPushResponse({
      ':status': 200,
      'content-type': 'image/jpeg',
      ':path': '/' + image.path,
    }, (err, newResponse) => {
      newResponse.setHeader('content-type', 'image/jpeg')
      newResponse.end(image.content)
    })
  })
  next()
})

app.use(express.static('public'))
server.listen(3000)

