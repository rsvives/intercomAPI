require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./middleware')
const guestsRouter = require('./controllers/guests')
const usersRouter = require('./controllers/users')
const callsRouter = require('./controllers/calls')
const loginRouter = require('./controllers/login')

const app = express()
app.use(express.json())
app.use(cors())
app.use(middleware.tokenExtractor)
// app.use(middleware.userExtractor)

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

app.get('/', (req, res) => {
  res.send(
    '<h1>Intercom App</h1>'
  )
})
app.use('/api/guests', guestsRouter)
app.use('/api/users', usersRouter)
app.use('/api/calls', callsRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const PORT = process.env.PORT || 3001
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('listening for requests')
  })
})
