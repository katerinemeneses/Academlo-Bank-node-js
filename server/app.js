const express = require('express')
const { globalErrorHandler } = require('./controllers/errors.controllers')
const { userRouters } = require('./routes/users.routes')
const { transferRouters } = require('./routes/transfers.routes')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1/users', userRouters)

app.use('/api/v1/transfers', transferRouters)

app.use('*', globalErrorHandler)

module.exports = {
  app
}