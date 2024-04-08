require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
app.use(cors())

const MONGO_URI = 'mongodb+srv://rsvives:jBzryEezhHWo2rcU@cluster0.8yvecow.mongodb.net/intercomApi?retryWrites=true&w=majority'
mongoose.set('strictQuery', false)
mongoose.connect(MONGO_URI)
  .then((res) => console.log('connected to MongoDB'))
  .catch((err) => console.error(err))

app.get('/', (req, res) => {
  res.send(
    '<h1>Intercom App</h1>'
  )
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
