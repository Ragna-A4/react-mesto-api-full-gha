const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUser,
  getSelfInfo,
  updateUserinfo,
  updateAvatar,
} = require('../controllers/users');

const { validateUrl } = require('../utils/regular');

const isValidId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().required(),
  }),
});

userRouter.get('/', getUsers);

userRouter.get('/me', getSelfInfo);

userRouter.get('/:userId', isValidId, getUser);

userRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUserinfo,
);

userRouter.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().regex(validateUrl),
    }),
  }),
  updateAvatar,
);

module.exports = userRouter;
