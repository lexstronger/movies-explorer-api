const router = require('express').Router();
const usersController = require('../controllers/users');
const {
  profileInfoValidator,
} = require('../middlewares/joi');

router.get('/me', usersController.getUserById);
router.patch('/me', profileInfoValidator, usersController.updateProfile);

module.exports = router;
