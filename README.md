## StudyWithBuddies
StudyWithBuddies is a **MERN Stack** full stack web application that connects users with study groups and study buddies so that they can succeed in class!

## Table of Contents
- [Features](https://github.com/SunnyGotSkillz/study-with-buddies/#features)
- [Technologies](https://github.com/SunnyGotSkillz/study-with-buddies/#technologies)
- [Setup](https://github.com/SunnyGotSkillz/study-with-buddies/#setup)
- [Authors](https://github.com/SunnyGotSkillz/study-with-buddies/#authors)

## Features

- **Creating Study Groups:** Our website allows users to create their own study groups, specifying the course for which the study group is for while setting the time to meet, the day to meet, location to meet, a group name, and a group description. 
- **Finding Study Groups** Users can find study groups to join by searching for study groups based on a certain course. This allows users to quickly and easily find study groups to join. 
- **Joining Study Groups:** Users can join study groups after they found one which matches a course they are taking and meet a time which they are availibe. 
- **Finding Study Buddies:** Users can use our website to find other users who are taking the same courses as them. Our website displyas their contact informaitno which users can use to reach out and study with. 

## Technologies
 - Javascript <img src="https://seeklogo.com/images/J/javascript-logo-8892AEFCAC-seeklogo.com.png" alt="javascript" width="30px">
 - Node.js <img src="https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png" alt="node.js" width="30px">
 - React.js <img src="[https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js[text](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)_logo-512.png" alt="react.js" width="30px">
 - Express.js <img src="https://www.sohamkamani.com/static/65137ed3c844d05124dcfdab28263c21/38cea/express-routing-logo.png" alt="Express.js" height="30px">
 - MongoDB <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/MongoDB_Logo.png/1598px-MongoDB_Logo.png?20180423174357" alt="MongoDB" height="30px">

## Setup
In order to run a local instance of StudyWithBuddies, first clone or download a copy of this repository. Follow the instructions below to initialize a local instance of each part of the application.

#### Secrets
Create a `.env` file in the backend folder with the following contents:
```
SECRET=aravpant
MONGO_URI=mongodb+srv://aravpant17:E9lDK3ziORyTkPJM@35l.3doatcn.mongodb.net/?retryWrites=true&w=majority&appName=35L
```

#### Setup
To setup the dependencies for the frontend and backend application, run:
```
npm install --legacy-peer-deps or npm install
```
which should download a set of `node_modules` for the backend server and frontend servers

Main frontend dependencies:
- React.js
- react-router-dom - simulates paths for different pages

Main backend dependencies:
- Express.js - the web server library which powers everything
- Mongoose - an object-document mapping library for MongoDB

#### Running Project
To start the project application, run:
```
npm start
```
Since we have the concurrently package, this command will start up the backend and the frontend servers at the same time. 


## Authors
StudyWithBuddies was made as a project for **CS 35L** taught by Professor Paul Eggert at UCLA in Spring 2024. **Made by**: Anish Goswami, Ryan Tang, Sunny Vinay, Krishna Kumanan, Arav Pant
