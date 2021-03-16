const router = require('express').Router();

const  usersControllers = require('../controller/users.controller');
const usersMiddlewares = require('../middlewares/users.middlewares');


router.get('/', usersControllers.getAllUsers);

router.post('/', usersMiddlewares.checkIsNameValid, usersMiddlewares.checkIsEmailValid, usersMiddlewares.checkIsPasswordValid, usersControllers.authorizationUser);

router.get('/:userId', usersMiddlewares.checkIsIdValid, usersControllers.getChosenUser);

router.delete('/:userId', usersMiddlewares.checkIsIdValid, usersControllers.deleteChosenUser);

module.exports = router;
