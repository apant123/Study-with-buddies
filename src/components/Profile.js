import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { useNavigate, Navigate } from 'react-router-dom';
import './styles.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";

function hidePass(pass) {
  var str = '';
  for (var i = 0; i < pass.length; i++) {
    str += '*';
  }
  return str;
}

function EditProfile(props) {
  const [showPass, setShowPass] = useState(false);
  return (
    <div style={{justifyContent:"center", display:"flex"}} >
      <Box width="300px"  alignItems="center" p={2} sx={{border: '5px solid #6ed0d4' }} >
        <Stack spacing="30px">
          <div>
            <Typography sx={{fontSize:"25px",fontWeight:"bold"}}>Your Name</Typography>
            <Typography>{props.name}</Typography>
          </div>
          <div>
            <Typography sx={{fontSize:"25px",fontWeight:"bold"}}>Your Email</Typography>
            <Typography>{props.email}</Typography>
          </div>
          <div>
            <Typography sx={{fontSize:"25px",fontWeight:"bold"}}>Your Password</Typography>
            
              {showPass ?
                <div style={{diplay:'flex', justifyContent:"space-between"}}>
                  <Typography style={{display: 'inline-block', paddingRight:'10px'}}>{props.pass}</Typography>
                  <FaEyeSlash size={20} onClick={() => {setShowPass(!showPass)}} style={{display: 'inline-block', paddingTop:"3px"}} />
                </div>
                :
                <div style={{diplay:'flex', justifyContent:"space-between"}}>
                  <Typography style={{display: 'inline-block', paddingRight:'10px'}}>{hidePass(props.pass)}</Typography>
                  <FaEye style={{display: 'inline-block'}} onClick={() => {setShowPass(!showPass)}}/>
                </div>
                
              }
          </div>
          <div>
            <Typography sx={{fontSize:"25px",fontWeight:"bold"}}>Your Age</Typography>
            <Typography>{props.age}</Typography>
          </div>
          
        </Stack>
      </Box>
    </div>
  );
}

function Profile() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(true); // is user logged in?

  const [fullName, setName] = useState('Sunny Vinay');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('sunnyvinay7@gmail.com');
  const [password, setPassword] = useState('pass123');
  const [age, setAge] = useState('19');
  
  return (
    <>
        {loggedIn ? 
          <>
          <h1 style={{fontSize:"50px"}}><b>Your Profile</b></h1>
          <EditProfile name={fullName} email={email} pass={password} age={age} /> 
          </>
          
        : 
          <Navigate to="/login" />
        }
    </>
  );
}

export default Profile;
