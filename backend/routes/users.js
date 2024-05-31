const express = require('express')
const route  = express.Router()
const cors = require('cors');

// controller functions
const { loginUser, 
    signupUser, 
    getUsers, 
    updateUser, 
    addEvent,  
    getGroup, 
    getAllUsers, 
    getUserById, 
    updateProfile, 
    removeEvent} = require('../controllers/userController')

