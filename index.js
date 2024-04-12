require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./middleware')
const guestsRouter = require('./controllers/guests')
const usersRouter = require('./controllers/users')
const callsRouter = require('./controllers/calls')

const app = express()
app.use(express.json())
app.use(cors())
app.use(middleware.tokenExtractor)

const MONGO_URI = process.env.MONGO_URI
mongoose.set('strictQuery', false)
mongoose.connect(MONGO_URI)
  .then((res) => console.log('connected to MongoDB'))
  .catch((err) => console.error(err))

app.get('/', (req, res) => {
  res.send(
    '<h1>Intercom App</h1>'
  )
})
app.use('/api/guests', guestsRouter)
app.use('/api/users', usersRouter)
app.use('/api/calls', callsRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
