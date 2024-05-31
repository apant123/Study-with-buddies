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


route.post('/login', loginUser)


route.post('/signup', signupUser)
      
route.post('/getUsers', cors(), getUsers)
    
    
route.patch('/updateUser', updateUser)
      
route.patch('/addEvent/:id', addEvent)
      
route.patch('/removeEvent/:id', removeGroup)
      
route.get('/getUserEvents/:id', getUserGroup)
      
route.get('/getAllUsers', getAllUsers)
      
route.get('/getUserByID/:id', getUserById)
      
route.patch('/updateProfile/:id', updateProfile)
      
module.exports = route   






