import React, { useState, useEffect } from 'react';
import { Button, Stack, InputLabel, MenuItem, Select, Chip, FormControl} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { useAuthContext } from "../hooks/useAuthContext";
import courseOptions from './courseOptions';
// const { getUser } = require('../Controller/groupcontroller');

function JoinGroup() {
  const navigate = useNavigate();
  const {user} = useAuthContext();

  const theme = useTheme();
  const [course, setCourse] = React.useState('');

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCourse(value);
  };

  const findGroup = async (course) => {
    // Find group from given course
  };

  return (
    <>
        {user ? 
          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <h2>Join a group by selecting your class below</h2>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
              <FormControl sx={{width:1000}}>
                <InputLabel id="demo-simple-select-label">Course</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={course}
                  label="Course"
                  onChange={handleChange}
                >
                  {courseOptions.map((course) => (
                  <MenuItem
                    key={course.value}
                    value={course.label}
                  >
                    {course.label}
                  </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button variant="contained" color="primary" size="large" onClick={searchGroups(course)}>Find Group</Button>
            </Stack>
          </div> 
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
