const Guest = require('../models/Guest')
const guestRouter = require('express').Router()

guestRouter.get('/', async (req, res) => {
  const { query } = req
  console.log(query)
  // eslint-disable-next-line no-extend-native
  Date.prototype.isValid = d => !isNaN(Date.parse(d))

  if (query.datesFrom || query.datesTo) {
    const { datesFrom, datesTo } = query
    const guests = await Guest.find({})
    const lastDate = Math.max(...guests.map(el => Number(el.dates.to)))
    console.log(lastDate)
    const from = isNaN(new Date(datesFrom)) ? new Date(0) : new Date(datesFrom)
    const to = isNaN(new Date(datesTo)) ? new Date(lastDate) : new Date(datesTo)
    const filteredGuests = await Guest.find({ 'dates.from': { $gte: from }, 'dates.to': { $lte: to } })
    res.send({ from, to, guests: filteredGuests })
  } else {
    const guests = await Guest.find({}).sort({ 'dates.from': -1 })
    res.send({ guests })
  }
})
guestRouter.post('/', async (req, res) => {
  const { guest } = req.body
  const newGuest = new Guest(guest)
  const savedGuest = await newGuest.save()
  res.send(savedGuest)
})

guestRouter.get('/today', async (req, res) => {
  const now = new Date()

  // console.log(now)
  const guests = await Guest.find({ 'dates.from': { $lte: now }, 'dates.to': { $gte: now } })
  // const to = guests[0].dates.to
  console.log(now, guests)
  // console.log()
  res.send({ guests, now })
})

module.exports = guestRouter
