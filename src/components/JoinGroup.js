import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { useAuthContext } from "../hooks/useAuthContext";

function JoinGroup() {
  const navigate = useNavigate();
  const {user} = useAuthContext();

  return (
    <>
        {user ? 
          <p>You are logged in.</p>  
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
