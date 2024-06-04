import React, { useState } from 'react';
import { Button, Stack, InputLabel, MenuItem, Select, FormControl, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { useAuthContext } from "../hooks/useAuthContext";
import courseOptions from './courseOptions';

function FindBuddy() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [course, setCourse] = useState('');
const [users, setUsers] = useState([]);

  const handleChange = (event) => {
    setCourse(event.target.value);
  };

  const findUsers = async (course) => {
    try {
      /*const response = await axios.post('/api/groups/search', { course }); // Adjust the endpoint as necessary
      const groups = response.data;
      */
      const response = await fetch('/api/user/findbuddy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ course }), // Sending course as a string
      });

      console.log(response)

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const users = await response.json();
      console.log(users)

      if (users.length > 0) {
        console.log(`Users found for course "${course}":`);
        users.forEach(user => {
          console.log(`- Group: ${user.name}, Course: ${user.course}`);
        });
        setUsers(users)
        // Navigate to the groups page or handle the group data as needed
        //navigate(`/${course}`); // Adjust this to your needs
      } else {
        console.log(`No users found for course "${course}".`);
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
          <h2>Find study buddies selecting your class below</h2>
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
                  findUsers(course);
                } else {
                  alert("Please select a course");
                }
              }}
            >
              Find Buddies
            </Button>
          </Stack>
          {users.length > 0 && (
          <Box mt={4}>
            <Typography variant="h5">Users Found:</Typography>

            {users.map((user) => (
              <Box key={user._id} mt={2} p={2} border="1px solid #ccc" borderRadius={4}>
                <Typography variant="subtitle1">{user.email}</Typography>
                <Typography>Name: {user.fullName}</Typography>
                <Typography>Username: {user.userName}</Typography>
                {/* <Typography>Courses: {user.courses}</Typography> */}
                {/* <Typography>Groups: {user.myGroups}</Typography> */}
                {/* <Typography>Description: {user.description}</Typography> */}
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

export default FindBuddy;
