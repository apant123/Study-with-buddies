const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
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
    
    // [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Event' // Replace 'Event' with the name of your event model, if applicable
    // }],

    groupsCreated: {
        type: Number,
        required: true,
        default: 0
    }
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
userSchema.statics.signup = async function(email, password, userName, fullName, age, courses) {
    // data validation
    if (!email || !password || !userName || !fullName || !age || !courses) {
        throw Error('Fields must be filled out')
    }
    if (!validator.isEmail(email)) {
        throw Error('Invalid email')
    }
    if (!validator.isStrongPassword(password)) { throw Error ('Password weak')}
    // email exists
    console.log("trying singup")
    try {
        const alreadyExists = await this.findOne({ email })
    } catch (error) {
        throw Error('failure to access database')
    }
    if (alreadyExists) {
       throw Error('Email already exists')
    }
    // hashing password
    const uniquify = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, uniquify)
    
    const userData = await this.create({ email, password: hash, userName})
    
    return userData
}

userSchema.statics.findMatches = async function(userCourses) {
    const users = await this.find({
        sports: { $in: userCourses }
    });
    const result = [];
    await users.forEach(user => {
      result.push(user);
    });
    return result;
}

module.exports = mongoose.model('User', userSchema)