require('dotenv').config();
//const mongoose = require('mongoose')
//const {ObjectId} = require('mongodb')
const User = require('../models/userModel')
const Group = require('../models/groupModel')
const jwt = require('jsonwebtoken')
//const { db } = require('../models/userModel')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d' })
}

async function loginUser(req,res) {
    //console.log("We are calling loginUser here")
    const { email, password} = req.body
    
    if (!email || !password) { // redundent check
        console.log("Please enter both a username and password")
        return res.status(400).json({error: "Email or Password not found"})
    }
    try{
        const user = await User.login(email, password)
        //const token = createToken(user._id)
        return res.status(200).json({email,userId: user._id})
    } catch(error) {
        return res.status(400).json({error: error.message})
    }
}

async function signupUser(req,res){
    // want to recieve contents from the request
    // From the request we recieve email, password, userName, fullName, courses
    const {email, password, userName, fullName, courses } = req.body;
    // now we want to make sure we receive all the data
    if (!email || !password || !userName || !fullName || !courses){ // we never call this because we have validator to ensure that all data is correct
        console.log("Didn't recieve all correct data");
        //now we want to send a response saying that we didn't get all information
        //send 400 code because we had invalid syntax
        return res.status(400).json({error: "The information you entered is not in the correct format!"});
    }
    // now we want to make sure we don't have any repeat email
    try {
        const existingUser = await User.findOne({email}); // using the braces creates a parameter
        // findOne needs an Object to search the database. 
        if (existingUser) {
            //console.log("user already exists");
            res.status(400).json({error: "This email already exists"});
        }
        // now I want to create the user
        const user = await User.signup(email,password, userName, fullName, courses);
        //console.log(user._id);
        //const token = createToken(user._id);
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

async function getUsersbyCourse(req,res) {
    const courseName = req.body.course;
    // console.log("Course:", courseName);
    if(!courseName) {
        //console.log("There was an error sending the course to backend");
        return res.status(400).json({error: "Error with sending course"})
    }
    try {
        const users = await User.find({courses : courseName})
        return res.status(200).json(users)
        
    } catch(error) {
        return res.status(400).json({error : error.message});

    }
}

async function addGroup(req,res) {
    const groupId = req.body.myGroups;
    // console.log("Group ID", groupId)
    const userId = req.params.id; // route parameter
    // console.log("User ID", userId)
    try{ // could add the mongoose check here if needed
        const newUser = await User.findById(userId)
        if (newUser.myGroups.includes(groupId)) {
            console.log("Throwing Error")
            return res.status(400).json({error: "You've already joined this group"})
        }
        
        // const currentUser = await User.findByIdAndUpdate(
        //     userId,
        //     {$push: {myGroups: groupId}},
        //     {new: true}
        // );
        await newUser.updateOne({ $push: { myGroups: groupId } });

        await Group.findByIdAndUpdate(
            groupId,
            {$push: {usersAssociated: userId}},
            {new: true}
        );
        return res.status(200).json(newUser);
    } catch(error) {
        return res.status(400).json({error: error.message});
    }
}

async function removeGroup(req,res) {
    const groupId = req.body.myGroups // req looks like { myGroups: '........'}
    // console.log("Group ID", groupId)
    const userId = req.params.id; // req-params: { id: '665e845c877cb8048242852a' }
    try{ // could add mongoose check here
        const newGroup = await User.findByIdAndUpdate( // delete from user array
            userId,
            {$pull: {myGroups: groupId}},
            {new: true}
        );
        await Group.findByIdAndUpdate( // want to delete from Group's array also
            groupId,
            {$pull: {usersAssociated: userId}},
            {new: true}
        );
        return res.status(200).json(newGroup);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}

async function getUserGroups(req,res) {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        //console.log("User:", user);
        if (!user){
            return res.status(400).json({error: "User not found"})
        }
        const userGroups = user.myGroups; // groups stores all group ID's
        const groups = await Group.find({ _id: { $in: userGroups } }); // return all groups with associated information
        return res.status(200).json(groups);
    } catch(error){
        return res.status(400).json({error: error.message});
    }
}

async function updateProfile(req,res) {
    const userId = req.params.id;
    //(req.body);
    const {fullName, courses, email, userName} = req.body;
    //console.log(fullName);
    try {
        const existingEmail = await User.findOne({email}); // using the braces creates a parameter
        // findOne needs an Object to search the database. 
        const currentUser = await User.findById(userId);
        if (existingEmail && email !== currentUser.email) {
            return res.status(400).json({error: "This email already exists"});
        }
        const newUser = await User.findByIdAndUpdate(
            userId,
            { // long form shown for code clarity
            fullName : fullName,
            courses : courses,
            email : email,
            userName : userName
            },
            {
                new: true, // This returns the updated document
                runValidators: true // This ensures schema validation is applied
            }
        );
        return res.status(200).json(newUser);
    } catch(error) {
        //("Throwing Error")
        return res.status(400).json({error: error.message});
    }
}

async function getUserById(req,res) {
    const userId = req.params.id;
    //console.log(userId);
    try {
        currentUser = await User.findById(userId);
        if(!currentUser) { // this shouldn't be possible, but just in case
            return res.status(404).json({error: "No user found"})
        }
        return res.status(200).json(currentUser);
    } catch(error) {
        return res.status(400).json({error: error.message});
    }
}

module.exports = { 
    loginUser, 
    signupUser, 
   // getUsers,
    getUserGroups,
    //updateUser, // don't need
    addGroup,
   // getAllUsers,
    getUserById,
    updateProfile,
    removeGroup,
    getUsersbyCourse
}





// login user
// const loginUser = async (req, res) => { // old function
//     console.log('calling loginUser')
//     const { email, password } = req.body

//     if(!email || !password){
//         console.log("email and passowrd are not filled out")
//     }

//     try {
//         const user = await User.login(email, password)

//         const token = createToken(user._id)
//         res.status(200).json({email, token,  userId: user._id })
//     } catch (error) {
//         res.status(400).json({error: error.message})
//     }
// }

// const signupUser = async (req, res) => { // old version of function
//     const { email, password, userName, fullName, courses } = req.body;

//     console.log("signupUser called");
//     // Validate input data
//     if (!email || !password || !userName || !fullName || !courses) {
//         console.log("incorrect format");
//         return res.status(400).json({ error: "Please provide email, password, username, full name, and courses." });
//     }
//     try {
//         // Check if the email already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             console.log("Email already exists");
//             return res.status(400).json({ error: "Email already exists bruh" });
//         }
//         // Call signup method, assuming it handles validation and hashing
//         const user = await User.signup(email, password, userName, fullName, courses);
//         // Assuming createToken generates a JWT
//         console.log("creating token");
//         console.log(user._id);
//         const token = createToken(user._id);
//         // Respond with token and non-sensitive user data
//         res.status(200).json({ email, token });
//    } catch (error) {
//         //res.status(400).json({ error: "some kind of error occured" });
//         res.status(400).json({error: error.message})
//     }
// }

// const getUsersbyCourse = async (req, res) => {
//     console.log("Function getUsersbyCourse called");
//     console.log("Here");
//     console.log("Here");
//     console.log("Here");
//     const { course } = req.body;
//     console.log("Course received:", course);
  
//     try {
//       const users = await User.find({ courses: { $in: [course] } });
//       if (users.length > 0) {
//         console.log(`Users found for course "${course}":`);
//         users.forEach(user => {
//           console.log(`- User: ${user.fullName}, Courses: ${user.courses}`);
//         });
//       } else {
//         console.log(`No users found for this course "${course}".`);
//       }
//       res.status(200).json(users);
//     } catch (err) {
//       console.error('Error searching for users:', err.message);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };

// add a group to a user's myGroups
// const addGroup = async (req, res) => {
//     const userId = req.params.id
//     const groupId = req.body.myGroups; // Assuming you send the group ID in the request body

//     if (mongoose.Types.ObjectId.isValid(userId)) {
//         db.collection('users')
//             .updateOne({_id: new ObjectId(userId)}, {$push: {myGroups: groupId}})
//             .then(result =>{
//                 res.status(200).json(result)
//             })
//             .catch(err =>{
//                 res.status(500).json({error: 'Could not update the document'})
//             })
//     } else {
//         res.status(400).json({ error: 'Invalid user or group ID' });
//     }
// };

// remove an group to a user's myGroups
// const removeGroup = async (req, res) => {
//     const userId = req.params.id;
//     const groupId = req.body.myGroups; // Assuming you send the group ID in the request body
  
//     if (mongoose.Types.ObjectId.isValid(userId) && mongoose.Types.ObjectId.isValid(groupId)) {
//       try {
//         const result = await db.collection('users').updateOne(
//           { _id: new ObjectId(userId) },
//           { $pull: { myGroups: groupId }, $inc: { groupsCreated: -1 } }
//         );
  
//         if (result.modifiedCount === 0) {
//           return res.status(404).json({ error: 'User or group not found' });
//         }
  
//         res.status(200).json(result);
//       } catch (err) {
//         res.status(500).json({ error: 'Could not update the document' });
//       }
//     } else {
//       res.status(400).json({ error: 'Invalid user or group ID' });
//     }
//   };

// const getUserGroups = async(req, res) => {
//     const userId = req.params.id

//     if (mongoose.Types.ObjectId.isValid(userId)){
//         try {
//             const user = await User.findById(userId);
        
//             if (!user) {
//               throw new Error('User not found');
//             }
        
//             const groupIds = user.myGroups; // Assuming myGroups is an array of group IDs
//             console.log('groupIds', groupIds)
        
//             // Assuming you have an group model with group information
//             const Group = require('../models/groupModel'); // Replace with the actual path to your group model
//             const groups = await Group.find({ _id: { $in: groupIds } });
//             console.log('groups', groups)
//             res.status(200).json(groups)
//         } catch (error) {
//             console.log(error)
//         }
//     } else {
//         res.status(400).json({ error: 'Invalid user or group ID' });
//     }  
// }   


// add  group  to a user's myGRoupss
// const updateProfile = async (req, res) => {
//     const userId = req.params.id
//     const updates = req.body;

//     if (mongoose.Types.ObjectId.isValid(userId)) {
//         db.collection('users')
//             .updateOne({_id: new ObjectId(userId)}, {$set: updates})
//             .then(result =>{
//                 res.status(200).json(result)
//             })
//             .catch(err =>{
//                 res.status(500).json({error: 'Could not update the document'})
//             })
//     } else {
//         res.status(400).json({ error: 'Invalid user or group ID' });
//     }
// };

// const getUserById = async (req, res) => {
//     const userId = req.params.id;

//     try {
//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         res.status(200).json(user);
//     } catch (error) {
//         console.error('Error fetching user:', error.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };


// Above is code written by me
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

// const getAllUsers = async (req, res) => {
//     const users = await User.find({}).sort({createdAt: -1})
//     res.status(200).json(users)
// }

// const getUsers = async(req, res) => {
//     console.log("HEREHERERHERHRE");
//     const { courses } = req.body
//     try {
//         const users = await User.findMatches(courses)
//         if (!users){
//             res.status(200).json("No matches")
//         }
//         else {
//             res.status(200).json({users})
//         }
//     } catch (error) {
//         res.status(400).json({error: error.message})
//     }
// }

// const updateUser = async (req, res) => {
//     const { id } = req.params

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({error: 'No such User'})
//     }

//     const group = await User.findOneAndUpdate({_id: id}, {
//         ...req.body
//     })
//     if (!group) {
//         return res.status(404).json({error: 'No such User'})
//     }
//     res.status(200).json(group)
// }
  