const carsServices = require('../services/cars.services');
const statusCode = require('../constants/errorCodes.enum');
const messages = require('../errors/error.messages');

module.exports = {
  getAllCars: async (req, res) => {
    try {
      const cars = await carsServices.allCars();

      res.status(statusCode.OK).json(cars);
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  },
  createCar: async (req, res) => {
    try {
      await carsServices.createCar(req.body);

      res.status(statusCode.CREATED).json(messages.SUCCESS_CREATED.en);
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  },
  getCarById: async (req, res) => {
    try {
      const { carId } = req.params;
      const chosenCar = await carsServices.carById(carId);

      res.status(statusCode.OK).json(chosenCar);
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  },
  deleteCar: async (req, res) => {
    try {
      const { carId } = req.params;
      await carsServices.deleteCar(carId);

      res.status(statusCode.OK).json(messages.SUCCESS_DELETED.en);
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  }
};
