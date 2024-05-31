import { Route, Routes } from "react-router-dom";
import React from 'react';
import Nav from './components/Nav.js';
import Home from './components/Home.js';
import Profile from './components/Profile.js';
import CreateGroup from './components/CreateGroup.js';
import JoinGroup from './components/JoinGroup.js';
import FindBuddy from './components/FindBuddy.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import { AuthContextProvider } from './context/AuthContext'; // Assuming the correct import path for AuthContextProvider

function App() {
  return (
    <AuthContextProvider> {/* Wrap your application with AuthContextProvider */}
      <div className="App">
        <Nav/>
        <div className="container">
          <Routes>
            <Route path="/findbuddy" element={<FindBuddy />} />
            <Route path="/joingroup" element={<JoinGroup />} />
            <Route path="/creategroup" element={<CreateGroup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/" element={<Home/>} />
          </Routes>
        </div>
      </div>
    </AuthContextProvider>
  );
}

export default App;
