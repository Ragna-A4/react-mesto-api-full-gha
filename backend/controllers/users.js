const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const User = require('../models/user');
const BadRequest = require('../errors/400_badrequest');
const Unauthorized = require('../errors/401_unauthorized');
const NotFound = require('../errors/404_notfound');
const Conflict = require('../errors/409_conflict');

const SECRET_KEY = 'secret';

function getUsers(_req, res, next) {
  return User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
}

function getUser(req, res, next) {
  return User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return next(new NotFound());
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest());
      }
      return next(err);
    });
}

function getSelfInfo(req, res, next) {
  return User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFound());
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest());
      }
      return next(err);
    });
}

function createUser(req, res, next) {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict());
      } else if (err.name === 'ValidationError') {
        next(new BadRequest());
      } else {
        next(err);
      }
    });
}

function updateUserinfo(req, res, next) {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotFound());
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest());
      } else {
        next(err);
      }
    });
}

function updateAvatar(req, res, next) {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotFound());
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest());
      } else {
        next(err);
      }
    });
}

function login(req, res, next) {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .orFail(() => new Unauthorized())
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new Unauthorized());
          }
          const jwt = JWT.sign({ _id: user._id }, SECRET_KEY);
          res.cookie('jwt', jwt, { expiresIn: '7d' });

          return res.status(200).send({ data: user.toJSON() });
        });
    })
    .catch(next);
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUserinfo,
  updateAvatar,
  login,
  getSelfInfo,
};
