const userServices = require('../services/users.services');

const message = require('../errors/error.messages');
const statusCode = require('../constants/errorCodes.enum');

module.exports = {
  checkIsNameValid: (req, res, next) => {
    try {
      const { name } = req.body;

      if (!name) {
        throw new Error(message.EMPTY_NAME.en);
      }

      if (name.length < 3) {
        throw new Error(message.SHORT_NAME.en);
      }
      next();
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  },
  checkIsPasswordValid: (req, res, next) => {
    try {
      const { password } = req.body;

      if (!password) {
        throw new Error(message.EMPTY_PASS.en);
      }

      if (password.length < 6) {
        throw new Error(message.SHORT_PASS.en);
      }
      next();
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  },
  checkIsEmailValid: (req, res, next) => {
    try {
      const { email } = req.body;

      if (!email) {
        throw new Error(message.EMPTY_EMAIL.en);
      }

      if (email.length < 6) {
        throw new Error(message.SHORT_EMAIL.en);
      }
      next();
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  },
  checkIsIdValid: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const findUserId = await userServices.userById(userId);

      if (userId.length !== 24) {
        throw new Error(message.INCORRECTLY_ID.en);
      }
      if (!findUserId) {
        throw new Error(message.NON_EXISTENT_USER.en);
      }

      next();
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  },
  checkIsAgeValid: (req, res, next) => {
    try {
      const { age } = req.body;

      if (!age) {
        throw new Error(message.EMPTY_AGE.en);
      }
      if (age < 0 || !Number.isInteger(age) || age.isNaN) {
        throw new Error(message.INCORRECTLY_AGE.en);
      }
      next();
    } catch (e) {
      res.status(statusCode.BAD_REQUEST).json(e.message);
    }
  },
};
