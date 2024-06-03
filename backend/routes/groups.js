const express = require('express');
const Group = require('../models/groupModel')


const route = express.Router()


const {
   createGroup,
   getGroup,
   getAllGroups,
   deleteGroup,
   updateGroup,
   searchGroups
} = require('../Controller/groupcontroller')

route.get('/', getAllGroups)

route.get('/:id', getGroup)
  
route.patch('/searchGroupsByCourse/:id', searchGroups);

route.post('/', createGroup)
  
route.delete('/:id', deleteGroup)
  
route.patch('/:id', updateGroup)
  
module.exports = route