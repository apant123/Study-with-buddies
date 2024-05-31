import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function JoinGroup() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false); // is user logged in?

  return (
    <>
        {loggedIn ? 
          null 
        : 
        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <p style={{fontSize: 30}}><b>You are not logged in. Please login to join study groups!</b></p>
          <Button variant="contained" color="primary" size="large" onClick={() => navigate('/login')}>
            Login
          </Button>
        </div>
        }
    </>
  );
}

export default JoinGroup;
