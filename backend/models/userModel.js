const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: false
    },
    userName: {
        type: String,
        required: false
    },
    courses: {
        type: Array,
        required: false
    },
    myGroups: {
        type: Array,
        required: false
    },

    // groupsCreated: {
    //     type: Number,
    //     required: true,
    //     default: 0
    // }
}, { timestamps: true })

userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error('Email and password must be filled out')
    }

    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Email doesn\'t exist in database')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

// static signup
// want to keep 'controllers' for HTTP and schema for "business logic"
userSchema.statics.signup = async function(email, password, userName, fullName, courses) {
    // data validation
    
    if (!email || !password || !userName || !fullName || !courses) {
        console.log('Fields must be filled out')
    }
    
    if (!validator.isEmail(email)) {
        console.log('Invalid email')
    }
    
    const alreadyExists = await this.findOne({ email })
    if (alreadyExists) {
        throw Error('Email already exists')
    }
    // hashing password
    const uniquify = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, uniquify)
    
    const userData = await this.create({ email, password: hash, userName, fullName, courses})
    // 'this' referes to the model not a specific instance of the schema
    return userData
}


module.exports = mongoose.model('User', userSchema) // creates model
// we point to User collection




















// userSchema.statics.findMatches = async function(userCourses) { // not needed
//     const users = await this.find({
//         courses: { $in: userCourses }
//     });
//     const result = [];
//     await users.forEach(user => {
//       result.push(user);
//     });
//     return result;
// }
