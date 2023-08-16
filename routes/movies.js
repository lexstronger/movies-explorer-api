const router = require('express').Router();
const moviesController = require('../controllers/movies');
const {
  movieIdValidator,
  movieValidator,
} = require('../middlewares/joi');

router.get('/', moviesController.getMovies);
router.post('/', movieValidator, moviesController.createMovie);
router.delete('/:movieId', movieIdValidator, moviesController.deleteMovieById);

module.exports = router;
