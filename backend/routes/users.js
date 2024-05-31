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

route.get('/', getAllGroups)

route.get('/:id', getGroup)
    
route.post('/', createGroup)
    
route.delete('/:id', deleteGroup)
    
route.patch('/:id', updateGroup)
    
module.exports = route




