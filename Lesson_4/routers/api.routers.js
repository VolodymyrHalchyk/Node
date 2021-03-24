const router = require('express').Router();

const usersRouter = require('./users.router');
const carsRouter = require('./cars.routers');

router.use('/users', usersRouter);

router.use('/cars', carsRouter);

module.exports = router;
