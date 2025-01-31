const express = require('express');
const route = express.Router();
//const cors = require('cors');

// controller functions
const {
  loginUser,
  signupUser,
  addGroup,
  getUserGroups,
  getUserById,
  updateProfile,
  removeGroup,
  getUsersbyCourse
} = require('../Controller/usercontroller');

route.post('/login', loginUser);

route.post('/signup', signupUser);

route.patch('/addGroup/:id', addGroup); 

route.patch('/removeGroup/:id', removeGroup);  

route.get('/getUserGroups/:id', getUserGroups); 

route.get('/getUserByID/:id', getUserById);

route.patch('/updateProfile/:id', updateProfile);

route.post('/findbuddy', getUsersbyCourse);

module.exports = route;


//route.get('/getAllUsers', getAllUsers); // don't need

//route.post('/getUsers', cors(), getUsers); // don't need

//route.patch('/updateUser', updateUser); // don't need