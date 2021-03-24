const carServices = require('../services/cars.services');

const statusCode = require('../constants/errorCodes.enum');
const messages = require('../errors/error.messages');

module.exports = {
  checkIsModelValid: (req, res, next) => {
    try {
      const { model } = req.body;

      if (!model) {
        throw new Error(messages.EMPTY_MODEL.en);
      }

      if (model.length < 3) {
        throw new Error(messages.SHORT_MODEL.en);
      }
      next();
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  },
  checkIsPowerValid: (req, res, next) => {
    try {
      const { power } = req.body;

      if (!power) {
        throw new Error(messages.EMPTY_POWER.en);
      }

      if (power < 0 || power.isNaN) {
        throw new Error(messages.INCORRECTLY_POWER.en);
      }
      next();
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  },
  checkIsColorValid: (req, res, next) => {
    try {
      const { color } = req.body;

      if (!color) {
        throw new Error(messages.EMPTY_COLOR.en);
      }
      if (color.length < 3) {
        throw new Error(messages.SHORT_COLOR.en);
      }
      next();
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  },
  checkIsIdValid: async (req, res, next) => {
    try {
      const { carId } = req.params;
      const findCarId = await carServices.carById(carId);

      if (carId !== 24) {
        throw new Error(messages.INCORRECTLY_ID.en);
      }
      if (!findCarId) {
        throw new Error(messages.NON_EXISTENT_CAR.en);
      }
      next();
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  }
};
