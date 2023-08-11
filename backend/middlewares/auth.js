const jwt = require('jsonwebtoken');

const Unauthorized = require('../errors/401_unauthorized');

const SECRET_KEY = 'secret';

function checkAuthentication(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new Unauthorized());
  }
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return next(new Unauthorized());
  }

  req.user = payload;

  return next();
}

module.exports = { checkAuthentication };
