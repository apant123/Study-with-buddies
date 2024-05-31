
const express = require('express');
const Event = require('../models/eventModel')


const route = express.Router()


const {
   createGroup,
   getGroup,
   getAllGroups,
   deleteGroup,
   updateGroup
} = require('../Controller/groupcontroller')


