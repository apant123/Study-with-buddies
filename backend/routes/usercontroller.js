const mongoose = require('mongoose')
const {ObjectId} = require('mongodb')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { db } = require('../models/userModel')
const { useInRouterContext } = require('react-router-dom')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d' })
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password)

        const token = createToken(user._id)
        res.status(200).json({email, token,  userId: user._id })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const signupUser = async (req, res) => {
    const { email, password, userName } = req.body;

    // Validate input data
    if (!email || !password || !userName) {
        return res.status(400).json({ error: "Please provide email, password, and username." });
    }

    try {
        // Call signup method, assuming it handles validation and hashing
        const user = await User.signup(email, password, userName);

        // Assuming createToken generates a JWT
        const token = createToken(user._id);

        // Respond with token and non-sensitive user data
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getAllUsers = async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1})
    res.status(200).json(users)
}


const getUsers = async(req, res) => {
    const { sports } = req.body
    try {
        const users = await User.findMatches(sports)
        if (!users){
            res.status(200).json("No matches")
        }
        else {
            res.status(200).json({users})
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}




module.exports = { 
    loginUser, 
    signupUser, 
    getUsers,
    getAllUsers,
}