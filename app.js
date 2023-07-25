const express = require('express')
const app = express()
const routes = require('./routes/index.route.js')
const errorHandler = require('./middlewares/errorHandler')
const morgan = require('morgan')
require('dotenv').config()

app.use(express.urlencoded({
  extended: true
}))

app.use(express.json())
app.use(morgan('dev'))

app.use(express.static('public'))
app.get('/', (req, res) => {
  res.send({
    status: 200,
    message: 'Selamat Datang Di API TILIK DESA Pengadilan Negeri Jember Kelas 1A',
  })
})
app.use(routes)
app.use(errorHandler)

module.exports = app