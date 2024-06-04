import React, { useState } from 'react';
import { Button, Stack, InputLabel, MenuItem, Select, FormControl, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import './styles.css';
import { useAuthContext } from "../hooks/useAuthContext";
import courseOptions from './courseOptions';

function JoinGroup() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [course, setCourse] = useState('');
  const [groups, setGroups] = useState([]);

  const handleChange = (event) => {
    setCourse(event.target.value);
  };

  const findGroup = async (course) => {
    try {
      /*const response = await axios.post('/api/groups/search', { course }); // Adjust the endpoint as necessary
      const groups = response.data;
      */
      const response = await fetch('/api/groups/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ course }), // Sending course as a string
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const groups = await response.json();
      console.log(groups)

      if (groups.length > 0) {
        console.log(`Groups found for course "${course}":`);
        groups.forEach(group => {
          console.log(`- Group: ${group.name}, Course: ${group.course}`);
        });
        setGroups(groups)
        // Navigate to the groups page or handle the group data as needed
        //navigate(`/${course}`); // Adjust this to your needs
      } else {
        console.log(`No groups found for course "${course}".`);
        alert(`No groups found for course "${course}".`);
      }
    } catch (err) {
      console.error('Error searching for groups:', err.message);
      alert('Error searching for groups. Please try again later.');
    }
  };

  return (
    <>
      {user ? (
        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <h2>Join a group by selecting your class below</h2>
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={5}>
            <FormControl sx={{ width: 1000 }}>
              <InputLabel id="demo-simple-select-label">Course</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={course}
                label="Course"
                onChange={handleChange}
              >
                {courseOptions.map((course) => (
                  <MenuItem key={course.value} value={course.label}>
                    {course.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                if (course) {
                  findGroup(course);
                } else {
                  alert("Please select a course");
                }
              }}
            >
              Find Group
            </Button>
          </Stack>
          {groups.length > 0 && (
          <Box mt={4}>
            <Typography variant="h5">Groups Found:</Typography>

            {groups.map((group) => (
              <Box key={group._id} mt={2} p={2} border="1px solid #ccc" borderRadius={4}>
                <Typography variant="subtitle1">{group.groupname}</Typography>
                <Typography>Course: {group.course}</Typography>
                <Typography>Date: {new Date(group.meetingDay).toLocaleDateString('en-US')}</Typography>
                <Typography>Time: {group.meetingTime}</Typography>
                <Typography>Location: {group.location}</Typography>
                <Typography>Description: {group.description}</Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  //onClick={() => }
                  mt={2}
                >
                  Join Group
                </Button>
              </Box>
            ))}
          </Box>)}

        
        </div>
      ) : (
        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <p style={{ fontSize: 30 }}>
            <b>You are not logged in. Please login to join study groups!</b>
          </p>
          <Button variant="contained" color="primary" size="large" onClick={() => navigate('/login')}>
            Login
          </Button>
        </div>
      )}
    </>
  );
}

export default JoinGroup;
