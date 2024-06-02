// Profile.jsx
import courseOptions from './courseOptions';
import { useAuthContext } from '../hooks/useAuthContext';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { ChakraProvider, Text, FormControl, FormLabel, Input, Button, Center, VStack } from '@chakra-ui/react';
// import 'react-toastify/dist/ReactToastify.css';


function Profile() {
  const { user } = useAuthContext();
  const userId = localStorage.getItem('userId');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setName] = useState('');
  const [courses, setCourses] = useState('');
  const [transformedCourses, setTCourses] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  
  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(`/api/user/getUserById/${userId}`);
      const json = await response.json();

      console.log(json.courses);




      if (response.ok) {
        setTCourses(json.courses.map((course) => ({ value: course, label: course })));
        console.log(transformedCourses);
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

    // Validation checks
    const validationErrors = [];

    if (!fullName.includes(' ')) {
      validationErrors.push('Full Name must include first name and last name separated by a space.');
    }

    if (courses.length < 3) {
      validationErrors.push('Please choose at least five sports.');
    }

    if (username.length < 5) {
      validationErrors.push('Username must be at least 5 characters.');
    }

    // Password validation
    if (password.length < 8) {
       validationErrors.push('Password must be at least 8 characters.');
     }

      if (!/[A-Z]/.test(password)) {
        validationErrors.push('Password must contain at least one uppercase letter.');
      }

      if (!/[a-z]/.test(password)) {
        validationErrors.push('Password must contain at least one lowercase letter.');
      }

      if (!/\d/.test(password)) {
        validationErrors.push('Password must contain at least one digit.');
      }

    if (validationErrors.length > 0) {
      alert(validationErrors.join('\n'));
      return;
    }



    try {
      console.log('is this working')
      const response = await fetch(`/api/user/updateProfile/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify({ fullName, courses, email, username }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      } else {  
        const updatedUser = await response.json();
        console.log('User updated:', updatedUser);
        setIsModalOpen(true);


      }
    } catch (error) {
      console.error('Failed to update user');
    }
  };

  return (
    <ChakraProvider>
      <Center bg="#f0f9ff">
        <VStack mt="20" spacing="4" align="center" justify="center" p="4" borderRadius="lg" boxShadow="lg" w="lg" maxW="100%" bg="whiteAlpha.800">
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

            <FormControl>
              <FormLabel htmlFor="sports">Courses</FormLabel>
              <Select
                id="sports"
                value={transformedCourses}
                options={courseOptions}
                isMulti
                onChange={(selectedOptions) => {
                  setCourses((e) => selectedOptions.map((option) => option.value));
                  setTCourses(selectedOptions);
                }}
              ></Select>
            </FormControl>


            <FormControl id="username" mb="3">
              <FormLabel fontSize="lg">Username</FormLabel>
              <Input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fontSize="lg"
              />
            </FormControl>

            <Button align="center" type="submit" bg="#075985" color="#075985" textColor="white" mt="4" fontSize="lg">
              Save Profile
            </Button>
          </form>
        </VStack>
      </Center>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Profile Updated</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Your profile has been changed successfully!</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}

export default Profile;
