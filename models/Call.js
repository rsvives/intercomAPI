const mongoose = require('mongoose')

const callSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: new Date()
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Call', callSchema)
