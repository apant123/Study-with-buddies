import React, { useState, useEffect } from 'react';
import { Box, Text, SimpleGrid, Skeleton, ChakraProvider, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

function FindUserMatch() {
  const [matchedUsers, setMatchedUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`/api/user/getUserById/${userId}`);
        const userData = await response.json();
        const coursesArray = userData.courses;

        const usersResponse = await fetch('/api/user/getUsers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ courses: coursesArray }),
        });

        const usersData = await usersResponse.json();

        if (usersResponse.ok) {
          setMatchedUsers(usersData.users);
        } else {
          console.error('API Error:', usersData);
        }
      } catch (error) {
        console.error('Fetch Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUsers();
    }
  }, [user]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <ChakraProvider>
      <div style={{ textAlign: 'center', paddingTop: '15vh' }}>
        <Link to="/findusermatch" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="primary"
            style={{
              background: 'linear-gradient(to right, #7dd3fc, #075985)',
              color: 'white',
              fontSize: '1.5em',
              padding: '15px 15px',
            }}
          >
            Find Buddy!
          </Button>
        </Link>
      </div>
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="md"
        mt={20}
        ml={10}
        mr={10}
        bgGradient="linear(to-b, #7dd3fc, #075985)"
      >
        <Text fontSize="xl" mb={4}>
          Matched Users
        </Text>

        {loading ? (
          <SimpleGrid columns={3} spacing={4}>
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} height="120px" borderRadius="md" />
            ))}
          </SimpleGrid>
        ) : (
          <SimpleGrid columns={3} spacing={4}>
            {matchedUsers && matchedUsers.length > 0 ? (
              matchedUsers.map((user) => (
                <Box
                  key={user._id}
                  borderWidth="1px"
                  borderRadius="md"
                  p={4}
                  onClick={() => handleUserClick(user)}
                  cursor="pointer"
                >
                  <Text>{user.fullName}</Text>
                </Box>
              ))
            ) : (
              <Text>No matched users found.</Text>
            )}
          </SimpleGrid>
        )}
      </Box>

      <Modal isOpen={selectedUser !== null} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedUser && selectedUser.fullName}'s Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Display user info */}
            {selectedUser && (
            <div>
            <p>Name: {selectedUser.fullName}</p>
            <p>Email: {selectedUser.email}</p>
            <p>Courses: {selectedUser.courses}</p>
            </div>
          )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}

export default FindUserMatch;