// const { userExtractor } = require('../middleware')
const Call = require('../models/Call')
const callsRouter = require('express').Router()

callsRouter.get('/', async (req, res) => {
  const calls = await Call.find({})
  res.send({ calls })
})
callsRouter.post('/', async (req, res) => {
  const call = {
    ...req.body,
    date: new Date()
  }
  const newCall = new Call(call)
  const savedCall = await newCall.save()
  res.send({ call: savedCall })
})

module.exports = callsRouter
