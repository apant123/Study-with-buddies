const express = require('express');
const Group = require('../models/groupModel')



const route = express.Router()


const {
   createGroup,
   getGroup,
   getAllGroups,
   deleteGroup,
   updateGroup,
   searchGroupsByCourse
} = require('../Controller/groupcontroller')

route.get('/', getAllGroups)

route.get('/:id', getGroup)
  
route.patch('/:id', searchGroupsByCourse);

route.post('/', createGroup)
  
route.delete('/:id', deleteGroup)
  
route.patch('/:id', updateGroup)
  
module.exports = route