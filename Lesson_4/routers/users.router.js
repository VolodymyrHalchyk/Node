const router = require('express').Router();

const usersControllers = require('../controllers/users.controllers');
const usersMiddlewares = require('../middlewares/users.middlewares');

router.get('/', usersControllers.getAllUsers);

router.post('/',
  usersMiddlewares.checkIsEmailValid,
  usersMiddlewares.checkIsPasswordValid,
  usersMiddlewares.checkIsNameValid,
  usersMiddlewares.checkIsAgeValid,

  usersControllers.createUser);

router.get('/:userId', usersMiddlewares.checkIsIdValid, usersControllers.userById);

router.delete('/:userId', usersMiddlewares.checkIsIdValid, usersControllers.deleteUser);

module.exports = router;
