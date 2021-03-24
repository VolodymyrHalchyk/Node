const router = require('express').Router();

const carControllers = require('../controllers/cars.controllers');
const carMiddlewares = require('../middlewares/cars.middlewares');

router.get('/', carControllers.getAllCars);

router.get('/:carId', carMiddlewares.checkIsIdValid, carControllers.getCarById);

router.get('/:carId', carMiddlewares.checkIsIdValid, carControllers.deleteCar);

router.post('/',
  carMiddlewares.checkIsColorValid,
  carMiddlewares.checkIsModelValid,
  carMiddlewares.checkIsPowerValid,

  carControllers.createCar);

module.exports = router;
