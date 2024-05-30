const Group = require('../models/groupModel')
const mongoose = require('mongoose')
const { addGroup } = require('./userController')

// get all groups
const getAllGroups = async (req, res) => {
    const groups = await Group.find({}).sort({createdAt: -1})
    res.status(200).json(groups)
}
// get a single group
const getGroup = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such group'})
    }

    const group = await Group.findById(id)

    if (!group) {
        return res.status(404).json({error: 'No such group'})
    }

    res.status(200).json(group)
}
// create a new group
const createGroup = async (req, res) => {
    const {title, courses, courseTotal, description, groupDate, location, groupTime} = req.body

    try {
        const group = await Group.create({title, course, courseTotal, description, groupDate, location, groupTime});
        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
// delete a event
const deleteGroup = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such group'})
    }

    const group = await Group.findOneAndDelete({_id: id})
    if (!group) {
        return res.status(404).json({error: 'No such group'})
    }
    res.status(200).json(group)
}
// update a event
const updateGroup = async (req, res) => {
    const id = req.params
    const updates = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such group'})
    }

    const group = await Group.findByIdAndUpdate(
        id,
        { $set: updates, $push: { usersAssociated: updates.usersAssociated } },
        { new: true }
    )
    if (!group) {
        return res.status(404).json({error: 'No such group'})
    }
    res.status(200).json(group)
}

const decCourse = async (req, res) => {
    const groupId = req.params.id
    console.log(groupId)
    try {
        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({ error: 'No such group' });
        }
        console.log(group)
        // Decrement courseTotal by 1
        group.courseTotal -= 1;

        // Save the updated group
        const updatedGroup = await group.save();

        res.json(updatedGroup);
    } catch (error) {
        console.error('Error decrementing course:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = {
    getAllGroups,
    getGroup,
    createGroup,
    deleteGroup,
    updateGroup,
    decCourse
}