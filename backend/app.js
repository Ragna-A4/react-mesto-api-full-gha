const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookies = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const { checkAuthentication } = require('./middlewares/auth');
const { validateUrl } = require('./utils/regular');
const mainErrorHandler = require('./middlewares/errors');
const NotFound = require('./errors/404_notfound');

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

const app = express();

app.use(cookies());
app.use(bodyParser.json());

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(validateUrl),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
app.use('/users', checkAuthentication, usersRouter);
app.use('/cards', checkAuthentication, cardsRouter);
app.use('*', (_req, _res, next) => {
  next(new NotFound());
});

app.use(errors());
app.use(mainErrorHandler);

app.listen(PORT, () => {
  // console.log(`Application is runnig on port ${PORT}`);
});
