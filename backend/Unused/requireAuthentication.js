// //require('dotenv').config();
// const jwt = require('jsonwebtoken')
// const User = require('../models/userModel')

// const requireAuth = async (req,res,next) => {
    
//     const { auth } = req.headers
//     console.log(req)

//     if (!auth){
//         return res.status(401).json({error:'requires Auth token'})
//     }

//     const token = auth.split(' ')[1] //gives us token
//     console.log(token)

//     try {
//         console.log(process.env.SECRET)
//         const {_id} = jwt.verify(token, process.env.SECRET)

//         req.user = await User.findOne({ _id }).select('_id')
//         next()

//     } catch (error) {
//         console.log(error)
//         res.status(401).json({error: 'Unauthorized request'})
//     }

// }

// module.exports = requireAuth