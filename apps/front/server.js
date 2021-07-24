const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

app.prepare().then(() => {
  createServer((req, res) => {


  }).listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:4200')
  })
})
