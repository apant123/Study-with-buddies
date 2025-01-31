require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose')
const groupRoutes = require('./routes/groups')
const userRoutes = require('./routes/users')
//const uri = "mongodb+srv://aravpant17:AgIetxNlSAzvrAjL@35l.3doatcn.mongodb.net/?retryWrites=true&w=majority&appName=35L"


// express app instantiation
const app = express();
app.use(express.json()) // allows server to be able to parse JSON


// routing
app.use('/api/groups', groupRoutes)
app.use('/api/user', userRoutes)

// db connect
mongoose.connect(process.env.MONGO_URI) //connecets to the mongo atlas db server
  .then(() => { //success
    app.listen(4000, () => { // use local host 4000
      console.log('Connected to db and listening on port 4000');
    })
  })
  .catch((error) => { //failure
    console.log(error)
  })
