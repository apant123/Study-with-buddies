import React, { useEffect, useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

function MyGroups() {
  const userId = localStorage.getItem('userId');
  const { user } = useAuthContext();
  const [groups, setGroups] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (groupId) => {
    try {
      const jsonId = { myGroups: groupId };
      console.log(JSON.stringify(jsonId));
      console.log(userId);

      const response2 = await fetch(`/api/user/removeGroup/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify(jsonId), // sends groupID in JSON format
        headers: {
          'Content-Type': 'application/json',
        },
      });
      

      if (!response2.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedUser = await response2.json();
      console.log('User updated:', updatedUser);

      // Update the local state by filtering out the removed group
      setGroups((prevGroups) => prevGroups.filter((group) => group._id !== groupId));
    } catch (error) {
      console.error('Failed to remove group:', error);
    }
  };

  useEffect(() => {
    const fetchUserGroups = async () => {
      const response = await fetch(`/api/user/getUserGroups/${userId}`);
      const json = await response.json();

      if (response.ok) {
        setGroups(json);
        console.log(json);
      }
    };

    if (user) {
      fetchUserGroups();
    } else {
      console.log("no user");
    }
  }, [userId, user]);

  return (
    <>
    {user ?
      <Box bg="white" className="home" mt="50px" ml={4} mr={4} style={{ zIndex: 1 }}>
        <h1>My Groups</h1>
        <Box
          className="groups"
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          gap={4}
          style={{ zIndex: 3 }}
        >
          {groups &&
            groups.map((group) => (
              <Box
                key={group._id}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                mb={4}
                style={{ zIndex: 3, backgroundColor: '#f0f9ff' }}
              >
                <Typography fontSize="lg" fontWeight="bold" mb={2}>
                  {group.groupname}
                </Typography>
                <Typography>Course: {group.course}</Typography>
                <Typography>Date: {new Date(group.meetingDay).toLocaleDateString('en-US')}</Typography>
                <Typography>Time: {group.meetingTime}</Typography>
                <Typography>Location: {group.location}</Typography>
                <Typography>Description: {group.description}</Typography>
                <Typography>People Coming: {Array.from(new Set(group.usersAssociated)).length}</Typography>
                <Button style={{ backgroundColor: "#e53e3e", marginTop: "10px"}}
                  variant="contained"
                  size="small"
                  onClick={() => handleSubmit(group._id)}
                >
                  Leave Group
                </Button>
              </Box>
            ))}
        </Box>
      </Box>
    :
    <div style={{ marginTop: 40, textAlign: 'center' }}>
      <p style={{fontSize: 30}}><b>You are not logged in. Please login to see your study groups!</b></p>
      <Button variant="contained" color="primary" size="large" onClick={() => navigate('/login')}>
        Login
      </Button>
    </div>
    }
    </>
  );
}

export default MyGroups;
