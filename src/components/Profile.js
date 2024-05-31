import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate, Navigate } from 'react-router-dom';
import './styles.css';

function Profile() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false); // is user logged in?

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <>
        {loggedIn ? 
          null 
        : 
        <Navigate to="/login" />
        }
    </>
  );
}

export default Profile;
