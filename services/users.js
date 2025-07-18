var User = require('../models/user');

async function getAllUsers() {
  return await User.find();
}

async function getUserById(id) {
  return await User.findById(id);
}

async function createUser(name) {
  const user = new User({ name });
  return await user.save();
}

async function updateUser(id, name) {
  return await User.findByIdAndUpdate(id, { name }, { new: true });
}

async function deleteUser(id) {
  return await User.findByIdAndDelete(id);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
