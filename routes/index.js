const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../utils/errors/NotFoundError');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const {
  signinValidator,
  signupValidator,
} = require('../middlewares/joi');

router.post('/signin', signinValidator, login);
router.post('/signup', signupValidator, createUser);
router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use((req, res, next) => next(new NotFoundError('Страницы по данному адресу не существует')));

module.exports = router;
