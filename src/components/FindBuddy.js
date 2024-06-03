import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Table,Tbody, Tr, Td, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function FindUsers() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/user/getUsers'); // Adjust the endpoint to your needs
      const json = await response.json();

      if (response.ok) {
        setUsers(json);
      }
    };

    if (user) {
      fetchUsers();
    } else {
      console.log("no user");
    }
  }, [user]);

  const filteredUsers = users.filter((userD) => 
    userD.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <>
    {user ?
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
        bgGradient="linear(to-b, #7dd3fc, #075985)"
        className="home"
        mt="20px"
        paddingLeft="10px"
        paddingRight="10px"
        paddingTop="10px"
      >
        {/* Search Bar */}
        <Input
          bg="white"
          type="text"
          placeholder="Search by full name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          mb={4}
        />

        <Table variant="simple" size="md">
          <Tbody>
            {filteredUsers.map((userD) => (
              <Tr key={userD._id} onClick={() => handleUserClick(userD)}>
                <Td fontSize="lg" fontWeight="bold">
                  {userD.fullName}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Modal isOpen={selectedUser !== null} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>User Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
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
      </Box>
    </ChakraProvider>
    :
    <div style={{ marginTop: 40, textAlign: 'center' }}>
      <p style={{fontSize: 30}}><b>You are not logged in. Please login to find study buddies!</b></p>
      <ChakraProvider><Button marginTop="10px" colorScheme="blue" size='md' onClick={() => navigate('/login')}>
        LOGIN
      </Button></ChakraProvider>
    </div>
    }
    </>
  );
}

export default FindUsers;


/*import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { useAuthContext } from "../hooks/useAuthContext";

function FindBuddy() {
  const navigate = useNavigate();
  const {user} = useAuthContext();

  return (
    <>
        {user ? 
          <p>You are logged in.</p> 
        : 
        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <p style={{fontSize: 30}}><b>You are not logged in. Please login to find study buddies!</b></p>
          <Button variant="contained" color="primary" size="large" onClick={() => navigate('/login')}>
            Login
          </Button>
        </div>
        }
    </>
  );
}

export default FindBuddy;
*/