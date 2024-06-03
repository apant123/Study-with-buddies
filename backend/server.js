require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose')
const groupRoutes = require('./routes/groups')
const userRoutes = require('./routes/users')
const uri = "mongodb+srv://aravpant17:E9lDK3ziORyTkPJM@35l.3doatcn.mongodb.net/?retryWrites=true&w=majority&appName=35L"

// express app instantiation
const app = express();
app.use(express.json())

//middlewars -> used for cors
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next()
})

// routing
app.use('/api/groups', groupRoutes)
app.use('/api/user', userRoutes)

// db connect
mongoose.connect(uri) //connecets to the mongo atlas db server
  .then(() => { 
    app.listen(4000, () => { // use local host 4000
      console.log('Connected to db and listening on port 4000');
    })
  })
  .catch((error) => {
    console.log(error)
  })
