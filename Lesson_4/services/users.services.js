const User = require('../dataBase/models/User');

module.exports = {
  allUsers: () => User.find(),
  createUser: (user) => User.create(user),
  userById: (userId) => User.findById(userId),
  deleteUser: (userId) => User.findByIdAndDelete(userId),
};
