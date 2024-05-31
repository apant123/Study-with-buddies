const express = require('express');
const route = express.Router();
const cors = require('cors');

// controller functions
const {
  loginUser,
  signupUser,
  getUsers,
  updateUser,
  addGroup,
  getUserGroups, // Assuming this is imported correctly
  getAllUsers,
  getUserById,
  updateProfile,
  removeGroup
} = require('../Controller/usercontroller');

route.post('/login', loginUser);

route.post('/signup', signupUser);

route.post('/getUsers', cors(), getUsers);

route.patch('/updateUser', updateUser);

route.patch('/addEvent/:id', addGroup);

route.patch('/removeEvent/:id', removeGroup);

route.get('/getUserEvents/:id', getUserGroups); // Assuming this is the correct function name

route.get('/getAllUsers', getAllUsers);

route.get('/getUserByID/:id', getUserById);

route.patch('/updateProfile/:id', updateProfile);

module.exports = route;
