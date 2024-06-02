const mongoose = require('mongoose')
const Group = require('../models/groupModel')
const { addGroup } = require('./usercontroller')

// get all groups
const getAllGroups = async (req, res) => {
    const groups = await Group.find({}).sort({createdAt: -1})
    res.status(200).json(groups)
}
const searchGroupsByCourse = async (course) => {
    try {
        const groups = await Group.find({ course });
        if (groups.length > 0) {
            console.log(`Groups found for course "${course}":`);
            groups.forEach(group => {
                console.log(`- Group: ${group.name}, Course: ${group.course}`);
            });
        } else {
            console.log(`No groups found for course "${course}".`);
        }
    } catch (err) {
        console.error('Error searching for groups:', err.message);
    } finally {
        mongoose.connection.close();
    }
};


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
    const {groupname, course, description, meetingDay, location, meetingTime} = req.body


    
    if(!groupname || !course || !description || !meetingDay || !location || !meetingTime){
        console.log("Group contents not filled out")
    }

    try {
        const group = await Group.create({ groupname, course, description, meetingDay, location, meetingTime});
        res.status(200).json(group);
    } catch (error) {
        
        console.log("Error adding group");
        
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

module.exports = {
    getAllGroups,
    getGroup,
    createGroup,
    deleteGroup,
    updateGroup,
}