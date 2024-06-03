import React, { useEffect, useState } from 'react';
import { ChakraProvider, Box, Button, Flex, Text } from '@chakra-ui/react';
import { useAuthContext } from '../hooks/useAuthContext';

function MyGroups() {
  const userId = localStorage.getItem('userId');
  const { user } = useAuthContext();
  const [groups, setGroups] = useState(null);

  const handleSubmit = async (groupId) => {
    try {
      const jsonId = { myGroups: groupId };
      console.log(JSON.stringify(jsonId));
      console.log(userId);

      const response2 = await fetch(`/api/user/removeGroups/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify(jsonId),
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
    <ChakraProvider>
      <Box bg="white" className="home" mt="102px" ml={4} mr={4} style={{ zIndex: 1 }}>
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
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  {group.groupname}
                </Text>
                <Text>Course: {group.course}</Text>
                <Text>Date: {new Date(group.meetingDay).toLocaleDateString('en-US')}</Text>
                <Text>Time: {group.meetingTime}</Text>
                <Text>Location: {group.location}</Text>
                <Text>Description: {group.description}</Text>
                <Button
                  mt={4}
                  bg="#e53e3e"
                  color="white"
                  size="sm"
                  onClick={() => handleSubmit(group._id)}
                >
                  Leave Group
                </Button>
              </Box>
            ))}
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default MyGroups;
