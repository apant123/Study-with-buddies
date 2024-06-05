import courseOptions from './courseOptions';
import { useAuthContext } from '../hooks/useAuthContext';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { ChakraProvider, Text, FormControl, FormLabel, Input, Button, Center, VStack } from '@chakra-ui/react';
import {useLogout} from '../hooks/useLogout';
import { Route, Routes, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { user } = useAuthContext();
  const userId = localStorage.getItem('userId');
  const {logout} = useLogout();
  const [email, setEmail] = useState('');
  const [userName, setUsername] = useState('');
  const [fullName, setName] = useState('');
  const [courses, setCourses] = useState([]);
  const [transformedCourses, setTCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleLogout = () => {
    logout();
  }

  useEffect(() => {  
    
    const fetchProfile = async () => {
      console.log(userId);
      const response = await fetch(`/api/user/getUserById/${userId}`);
      const json = await response.json();

      if (response.ok) {
        setTCourses(json.courses.map((course) => ({ value: course, label: course })));
        setCourses(json.courses);
        setName(json.fullName);
        setEmail(json.email);
        setUsername(json.userName);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = [];
    if (!fullName.includes(' ')) {
      validationErrors.push('Full Name must include first name and last name separated by a space.');
    }
    if (courses.length < 3) {
      validationErrors.push('Please choose at least three courses.');
    }
    if (userName.length < 5) {
      validationErrors.push('Username must be at least 5 characters.');
    }

    if (validationErrors.length > 0) {
      alert(validationErrors.join('\n'));
      return;
    }

    try {
      const response = await fetch(`/api/user/updateProfile/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify({ fullName, courses, email, userName }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      } else {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Failed to update user');
    }
  };

  return (
    <div px={0} style={{justifyContent:"center", alignItems:"center", display:"flex"}}>
    {user ?
    <ChakraProvider px={0}>
      <VStack mt="20" spacing="4" align="center" justify="center" p="4" borderRadius="lg" boxShadow="lg" w="lg" maxW="100%" >
        <Text fontSize="2xl" fontWeight="bold" mb="3">
          Profile Settings
        </Text>

        <form onSubmit={handleSubmit}>
          <FormControl id="name" isRequired mb="3">
            <FormLabel fontSize="lg">Full Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={fullName}
              onChange={(e) => setName(e.target.value)}
              fontSize="lg"
            />
          </FormControl>

          <FormControl id="username" isRequired mb="3">
            <FormLabel fontSize="lg">Username</FormLabel>
            <Input
              type="text"
              name="username"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              fontSize="lg"
            />
          </FormControl>

          <FormControl id="email" isRequired mb="3">
            <FormLabel fontSize="lg">Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fontSize="lg"
            />
          </FormControl>

          <FormControl id="courses" isRequired mb="3">
            <FormLabel fontSize="lg">Courses</FormLabel>
            <Select
              value={transformedCourses}
              options={courseOptions}
              isMulti
              onChange={(selectedOptions) => {
                setCourses(selectedOptions.map((option) => option.value));
                setTCourses(selectedOptions);
              }}
            />
          </FormControl>

          <Button type="submit" bg="#075985" colorScheme="blue" textColor="white" mt="4" fontSize="lg">
            Save Profile
          </Button>
        </form>
        <Button bg="#fc5858" colorScheme="red" textColor="white" mt="4" fontSize="lg" onClick={() => {
          handleLogout();
          navigate("/");
          }}>
            Logout
        </Button>
      </VStack>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Profile Updated</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Your profile has been updated successfully!</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
    :
    <div style={{ marginTop: 40, textAlign: 'center' }}>
      <p style={{fontSize: 30}}><b>You are not logged in. Please login to check your profile!</b></p>
      <ChakraProvider><Button marginTop="10px" colorScheme="blue" size='md' onClick={() => navigate('/login')}>
        LOGIN
      </Button></ChakraProvider>
    </div>
    }
  </div>
  );
}

export default Profile;
