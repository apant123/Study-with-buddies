import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Nav from './components/Nav.js';
import Home from './components/Home.js';
import Profile from './components/Profile.js';
import CreateGroup from './components/CreateGroup.js';
//import searchGroups from './components/CreateGroup.js';
import JoinGroup from './components/JoinGroup.js';
import FindBuddy from './components/FindBuddy.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import MyGroups from './components/MyGroups.js';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [shouldRedirect, setShouldRedirect] = useState(false);


  const handleProfile = () => {
    navigate("/profile");
  };

  useEffect(() => {
    if (shouldRedirect) {
      navigate("http://localhost:3000/profile"); // replace "/some-path" with the actual path you want to redirect to
    }
  }, [shouldRedirect, navigate]);

  return (
      <div className="App">
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/findbuddy" element={<FindBuddy />} />
            <Route path="/joingroup" element={<JoinGroup />} />
            <Route path="/creategroup" element={<CreateGroup />} />
            <Route path="/mygroups" element={<MyGroups />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={user ? <Navigate to="/profile" /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
  );
}

export default App;
