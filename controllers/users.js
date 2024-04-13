// const config = require('../config')
const { userExtractor } = require('../middleware')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const userRouter = require('express').Router()

userRouter.get('/', userExtractor, async (req, res) => {
  const users = await User.find({})
  res.send(users)
})

userRouter.post('/', userExtractor, async (req, res) => {
  const { user } = req.body
  const { name, username, password } = user
  if (!username || !password || password.length < 5) res.status(400).json({ error: 'username and password are required' }).end()

  const passwordHash = await bcrypt.hash(password, 10)
  const newUser = new User({ name, username, passwordHash })
  const savedUser = await newUser.save()
  res.status(201).json(savedUser)
})
module.exports = userRouter
