const Card = require('../models/card');
const BadRequest = require('../errors/400_badrequest');
const Forbidden = require('../errors/403_forbidden');
const NotFound = require('../errors/404_notfound');

function getCards(_req, res, next) {
  return Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest());
      } else {
        next(err);
      }
    });
}

function deleteCard(req, res, next) {
  return Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFound());
      }
      if (!card.owner.equals(req.user._id)) {
        return next(new Forbidden());
      }
      return card.deleteOne()
        .then(() => res.status(200).send({ message: 'Карточка удалена' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest());
      }
      return next(err);
    });
}

function likeCard(req, res, next) {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFound());
      }
      return res.status(200).send({ message: 'Карточке добавлен лайк' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest());
      }
      return next(err);
    });
}

function unlikeCard(req, res, next) {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFound());
      }
      return res.status(200).send({ message: 'У карточки удален лайк' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest());
      }
      return next(err);
    });
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
