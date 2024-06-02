import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IoIosAdd } from "react-icons/io";
import './styles.css';

function CreateGroup() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(true); // is user logged in?
  
  return (
    <>
        {loggedIn ? 
          <div style={{marginTop: 40}}>
            <Button variant="contained" color="primary" size="large" startIcon={<IoIosAdd />} onClick={() => navigate('/login')}>
              Create New Group
            </Button>
          </div> 
        : 
          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <p style={{fontSize: 30}}><b>You are not logged in. Please login to create study groups!</b></p>
            <Button variant="contained" color="primary" size="large" onClick={() => navigate('/login')}>
              Login
            </Button>
          </div>
        }
    </>
  );
}

export default CreateGroup;