require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose')
const groupRoutes = require('./routes/groupcontroller')
const userRoutes = require('./routes/usercontroller')
const uri = "mongodb+srv://aravpant17:E9lDK3ziORyTkPJM@35l.3doatcn.mongodb.net/?retryWrites=true&w=majority&appName=35L"

// express app instantiation
const app = express();
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next()
})

// routing
app.use('/api/groups', groupRoutes)
app.use('/api/user', userRoutes)

// db connect
mongoose.connect(uri) //process.env.MONGO_URI)
  .then(() => { 
    app.listen(4000, () => { //process.env.PORT
      console.log('Connected to db and listening on port 4000!');
    })
  })
  .catch((error) => {
    console.log(error)
  })