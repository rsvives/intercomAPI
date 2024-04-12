const mongoose = require('mongoose')

const guestSchema = new mongoose.Schema({
  name: String,
  platform: ['HomeExchange', 'Airbnb'],
  dates: {
    from: {
      type: Date
    },
    to: {
      type: Date
    }
  },
  password: {
    type: Number,
    default: 3
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Guest', guestSchema)
