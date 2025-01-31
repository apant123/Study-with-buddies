const express = require('express');
const Group = require('../models/groupModel')
const route = express.Router()


const {
   createGroup,
   searchGroupsByCourse
} = require('../Controller/groupcontroller')


route.post('/search', searchGroupsByCourse)

route.post('/createGroup/:id', createGroup)

module.exports = route





















//route.get('/', getAllGroups) // prolly don't need

//route.get('/:id', getGroup) // prolly don't need
  
//route.delete('/:id', deleteGroup) // prolly don't need
  
//route.patch('/:id', updateGroup) // prolly don't need

   //getGroup,
   //getAllGroups,
   //deleteGroup,
   //updateGroup,
  


