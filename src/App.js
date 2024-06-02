import { Route, Routes, Navigate } from "react-router-dom";
import React from 'react';
import {useLogout} from './hooks/useLogout'
import Nav from './components/Nav.js';
import Home from './components/Home.js';
import Profile from './components/Profile.js';
import CreateGroup from './components/CreateGroup.js';
import JoinGroup from './components/JoinGroup.js';
import FindBuddy from './components/FindBuddy.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import { AuthContextProvider } from './context/AuthContext';
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const {logout} = useLogout()
  const {user} = useAuthContext();

  const handleLogout = () => {
    logout()
  }

  const handleProfile = () => {
    window.location.href="http://localhost:3000/profile";
  }

    useEffect(() => {
    setShouldRedirect(true);
  }, []);

  return (
      <div className="App">
        <Nav/>
        <div className="container">
          <Routes>
            <Route path="/findbuddy" element={<FindBuddy />} />
            <Route path="/joingroup" element={<JoinGroup />} />
            <Route path="/creategroup" element={<CreateGroup />} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/login" element={user ? <Navigate to ="/profile" /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to ="/profile" /> : <Signup />} />
            <Route path="/" element={<Home/>} />
          </Routes>
        </div>
      </div>
  );
}

export default App;
