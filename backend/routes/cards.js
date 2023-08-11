const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} = require('../controllers/cards');

const { validateUrl } = require('../utils/regular');

const isValidId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().required(),
  }),
});

cardsRouter.get('/', getCards);

cardsRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(validateUrl),
    }),
  }),
  createCard,
);

cardsRouter.delete('/:cardId', isValidId, deleteCard);

cardsRouter.put('/:cardId/likes', isValidId, likeCard);

cardsRouter.delete('/:cardId/likes', isValidId, unlikeCard);

module.exports = cardsRouter;
