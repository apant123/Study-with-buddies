const express = require('express');
const group = require('..models/groupModel')


const route = express.Router()

const {
    createGroup,
    getGroup,
    getAllGroups,
    deleteGroup,
    updateGroup
} = require('../Controller/groupcontroller')

