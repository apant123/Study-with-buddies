//const mongoose = require('mongoose')
const Group = require('../models/groupModel')
//const { addGroup } = require('./usercontroller')

async function searchGroupsByCourse(req,res) { //regen 2
    const course = req.body
    if (!course) { // don't really need this. Here just in case
        return res.status(400).json({error: "Problem with course"})
    }
    try{
        const allcourses = await Group.find(course); // we are assigned a promise to groups that hasn't been fullfilled yet
        // promise is a proxy for an unfillied "value"
        if (!allcourses){
            return res.status(400).json({error: `No ${course} courses were found `})
        }
        return res.status(200).json(allcourses)
    } catch(error) {
        //console.log("Error with getGroup")
        return res.status(400).json({error: error.message});
    }
}

async function createGroup(req,res) {
    const userId = req.params.id;
    console.log(userId)
    const {groupname, course, meetingDay, description, location, meetingTime } = req.body;
    try {
        const created = await Group.create({groupname,course,meetingDay, description, location, meetingTime});
        // const updatedGroup = await Group.findByIdAndUpdate( // this is extra
        //     created.id,
        //     {$push: {usersAssociated: userId}},
        //     {new: true}
        // );
        
        // returns saved document
        return res.status(200).json(created);
    } catch(error) {
        return res.status(400).json({error: error.message});
    }
}













// // get all groups
// const getAllGroups = async (req, res) => { // pretty sure this function is never called
//     console.log("Finding Groups")
//     const groups = await Group.find({}).sort({createdAt: -1})
//     res.status(200).json(groups)
// }

// const searchGroupsByCourse = async (req, res) => { // old version
//     const course = req.body;
//     console.log(course);
//     try {
//         const groups =  await Group.find(course); // we are assigned a promise to groups that hasn't been fullfilled yet
//         // promise is a proxy for an unfillied "value"
//         // if (groups.length > 0) {
//         //     console.log(`Groups found for course "${course}":`);
//         //     groups.forEach(group => {
//         //         console.log(`- Group: ${group.groupname}, Course: ${group.course}`);
//         //     });
//         // } else {
//         //     console.log(`No groups found for course "${course}".`);
//         // }
//         res.status(200).json(groups)
//     } catch (err) {
//         console.error('Error searching for groups:', err.message);
//     }
// };

// // get a single group
// const getGroup = async (req, res) => {
//     const { id } = req.params

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({error: 'No such group'})
//     }

//     const group = await Group.findById(id)

//     if (!group) {
//         return res.status(404).json({error: 'No such group'})
//     }

//     res.status(200).json(group)
// };

// create a new group
// const createGroup = async (req, res) => {
//     const {groupname, course, description, meetingDay, location, meetingTime} = req.body


    
//     if(!groupname || !course || !description || !meetingDay || !location || !meetingTime){
//         console.log("Group contents not filled out")
//     }

//     try {
//         const group = await Group.create({ groupname, course, description, meetingDay, location, meetingTime});
//         res.status(200).json(group);
//     } catch (error) {
        
//         console.log("Error adding group");
        
//         res.status(400).json({ error: error.message });
//     }
// }

// delete a group
// const deleteGroup = async (req, res) => {
//     const { id } = req.params

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({error: 'No such group'})
//     }

//     const group = await Group.findOneAndDelete({_id: id})
//     if (!group) {
//         return res.status(404).json({error: 'No such group'})
//     }
//     res.status(200).json(group)
// }

// // update a group
// const updateGroup = async (req, res) => {
//     const id = req.params
//     const updates = req.body
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({error: 'No such group'})
//     }

//     const group = await Group.findByIdAndUpdate(
//         id,
//         { $set: updates, $push: { usersAssociated: updates.usersAssociated } },
//         { new: true }
//     )
//     if (!group) {
//         return res.status(404).json({error: 'No such group'})
//     }
//     res.status(200).json(group)
// }

module.exports = {
    // getAllGroups,
    // getGroup,
    createGroup,
    // deleteGroup,
    // updateGroup,
    searchGroupsByCourse
}






