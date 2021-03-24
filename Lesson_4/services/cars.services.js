const Car = require('../dataBase/models/Car');
require('../dataBase/models/User');

module.exports = {
  allCars: () => Car.find(),
  createCar: (car) => Car.create(car),
  carById: (carId) => Car.findById(carId),
  deleteCar: (carId) => Car.findById(carId),
};
