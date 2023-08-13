const routes = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { loginValidation, createUserValidation } = require('../middlewares/validation');
const { NotFoundError } = require('../errors/not-found-err');

routes.post('/signin', loginValidation, login);
routes.post('/signup', createUserValidation, createUser);

routes.use(auth);

routes.use('/users', usersRouter);
routes.use('/cards', cardsRouter);
routes.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = routes;
