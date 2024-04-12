const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  const token = (authorization && authorization.startsWith('Bearer ')) ? authorization.replace('Bearer ', '') : null
  request.token = token
  next()
}

const userExtractor = (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (decodedToken.id) {
    req.decodedToken = decodedToken
  }
  next()
}
module.exports = {
  tokenExtractor,
  userExtractor
}
