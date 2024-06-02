import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, Button, TextField } from '@mui/material';
import { useNavigate, Navigate } from 'react-router-dom';
import './styles.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdSaveAs } from "react-icons/md";

function hidePass(pass) {
  var str = '';
  for (var i = 0; i < pass.length; i++) {
    str += '*';
  }
  return str;
}

function Profile() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(true); // is user logged in?
  const [editMode, setEditMode] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [fullName, setName] = useState('Sunny Vinay');
  const [username, setUsername] = useState('sunnygotskillz');
  const [email, setEmail] = useState('sunnyvinay7@gmail.com');
  const [password, setPassword] = useState('pass123');
  const [courses, setCourses] = useState('19');
  
  return (
    <>
        {loggedIn ? 
        <div>
          <h1 style={{fontSize:"50px"}}><b>Your Profile</b></h1>

          <div style={{justifyContent:"center", display:"flex", paddingBottom:"15px"}}>
            <Box width="600px" alignItems="center" p={2} sx={{border: '5px solid #6ed0d4' }} >
              <Stack spacing="30px">
                <div>
                  <Typography sx={{fontSize:"25px",fontWeight:"bold"}}>Full Name</Typography>
                  {editMode ? <TextField sx={{width:"40ch"}} defaultValue={fullName} onChange={(e) => setName(e.target.value)}/> : <Typography>{fullName}</Typography> }
                </div>
                <div>
                  <Typography sx={{fontSize:"25px",fontWeight:"bold"}}>Username</Typography>
                  {editMode ? <TextField sx={{width:"40ch"}} defaultValue={username} onChange={(e) => setUsername(e.target.value)}/> : <Typography>{username}</Typography> }
                </div>
                <div>
                  <Typography sx={{fontSize:"25px",fontWeight:"bold"}}>Email</Typography>
                  {editMode ? <TextField sx={{width:"40ch"}} defaultValue={email} onChange={(e) => setEmail(e.target.value)}/> : <Typography>{email}</Typography> }
                </div>
                <div>
                  <Typography sx={{fontSize:"25px",fontWeight:"bold"}}>Password</Typography>
                    {editMode ?
                      <TextField sx={{width:"40ch"}} defaultValue={password} onChange={(e) => setPassword(e.target.value)}/>
                    :
                    <div>
                      {showPass ? 
                        <div style={{diplay:'flex', justifyContent:"space-between"}}>
                          <Typography style={{display: 'inline-block', paddingRight:'10px'}}>{password}</Typography>  
                          <FaEyeSlash size={20} onClick={() => {setShowPass(!showPass)}} style={{display: 'inline-block', paddingTop:"3px"}} />
                        </div>
                      :
                        <div>
                          <Typography style={{display: 'inline-block', paddingRight:'10px'}}>{hidePass(password)}</Typography>
                          <FaEye style={{display: 'inline-block'}} onClick={() => {setShowPass(!showPass)}}/>
                        </div>
                      }         
                    </div>
                    } 
                </div>
                <div>
                  <Typography sx={{fontSize:"25px",fontWeight:"bold"}}>Courses</Typography>
                </div>
              </Stack>
            </Box> 
          </div>

          {editMode ?
              <Button variant="contained" color="primary" size="large" startIcon={<MdSaveAs />} 
                onClick={() => {
                  setEditMode(false);
                }}>

                Save Changes
              </Button>
            :
            <Button variant="contained" color="primary" size="large" startIcon={<CiEdit />} onClick={() => setEditMode(true)}>
                Edit
              </Button>
          }
        </div>
        : 
          <Navigate to="/login" />
        }
    </>
  );
}

export default Profile;

// Profile.jsx
// import courseOptions from './courseOptions';
// import { useAuthContext } from '../hooks/useAuthContext';
// import React, { useState, useEffect } from 'react';
// import Select from 'react-select';
// import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
// import { ChakraProvider, Text, FormControl, FormLabel, Input, Button, Center, VStack } from '@chakra-ui/react';
// // import courseOptions from './courseOptions';
// // import 'react-toastify/dist/ReactToastify.css';


// function Profile() {
//   const { user } = useAuthContext();
//   const userId = localStorage.getItem('userId');
//   const [email, setEmail] = useState('');
//   const [userName, setUsername] = useState('');
//   const [fullName, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [courses, setCourses] = useState('');
//   const [transformedSports, setTSports] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);


//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };
  
//   useEffect(() => {
//     const fetchProfile = async () => {
//       const response = await fetch(`/api/user/getUserById/${userId}`);
//       const json = await response.json();

//       console.log(json.courses);




//       if (response.ok) {
//         setTSports(json.courses.map((course) => ({ value: course, label: course })));
//         console.log(transformedSports);
//         setCourses(json.courses);
//         setName(json.fullName);
//         setAge(json.age);
//         setEmail(json.email);
//         setUsername(json.userName);
//       }
//     };

//     if (user) {
//       fetchProfile();
//     }
//   }, [user]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation checks
//     const validationErrors = [];

//     if (!fullName.includes(' ')) {
//       validationErrors.push('Full Name must include first name and last name separated by a space.');
//     }

//     if (parseInt(age, 10) < 18 || isNaN(parseInt(age, 10))) {
//       validationErrors.push('Age must be at least 18 and a valid number.');
//     }

//     if (courses.length < 5) {
//       validationErrors.push('Please choose at least five sports.');
//     }

//     if (userName.length < 5) {
//       validationErrors.push('Username must be at least 5 characters.');
//     }

//     if (validationErrors.length > 0) {
//       alert(validationErrors.join('\n'));
//       return;
//     }

//     try {
//       const response = await fetch(`/api/user/updateProfile/${userId}`, {
//         method: 'PATCH',
//         body: JSON.stringify({ fullName, age, courses, email, userName }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       } else {  
//         const updatedUser = await response.json();
//         console.log('User updated:', updatedUser);
//         setIsModalOpen(true);


//       }
//     } catch (error) {
//       console.error('Failed to update user');
//     }
//   };

//   // return (
//   //   <ChakraProvider>
//   //     <Center bg="#f0f9ff">
//   //       <VStack mt="20" spacing="4" align="center" justify="center" p="4" borderRadius="lg" boxShadow="lg" w="lg" maxW="100%" bg="whiteAlpha.800">
//   //         <Text fontSize="2xl" fontWeight="bold" mb="3">
//   //           Profile Settings
//   //         </Text>

//   //         <form onSubmit={handleSubmit}>
//   //           <FormControl id="name" isRequired mb="3">
//   //             <FormLabel fontSize="lg">Full Name</FormLabel>
//   //             <Input
//   //               type="text"
//   //               name="name"
//   //               value={fullName}
//   //               onChange={(e) => setName(e.target.value)}
//   //               fontSize="lg"
//   //             />
//   //           </FormControl>

//   //           <FormControl id="email" isRequired mb="3">
//   //             <FormLabel fontSize="lg">Email</FormLabel>
//   //             <Input
//   //               type="email"
//   //               name="email"
//   //               value={email}
//   //               onChange={(e) => setEmail(e.target.value)}
//   //               fontSize="lg"
//   //             />
//   //           </FormControl>

//   //           <FormControl>
//   //             <FormLabel htmlFor="courses">Courses You Take</FormLabel>
//   //             <Select
//   //               id="courses"
//   //               value={transformedSports}
//   //               options={courseOptions}
//   //               isMulti
//   //               onChange={(selectedOptions) => {
//   //                 setCourses((e) => selectedOptions.map((option) => option.value));
//   //                 setTSports(selectedOptions);
//   //               }}
//   //             ></Select>
//   //           </FormControl>

//   //           <FormControl id="age" isRequired mb="3">
//   //             <FormLabel fontSize="lg">Age</FormLabel>
//   //             <Input
//   //               type="number"
//   //               name="age"
//   //               value={age}
//   //               onChange={(e) => setAge(e.target.value)}
//   //               fontSize="lg"
//   //             />
//   //           </FormControl>

//   //           <FormControl id="username" mb="3">
//   //             <FormLabel fontSize="lg">Username</FormLabel>
//   //             <Input
//   //               type="text"
//   //               name="username"
//   //               value={userName}
//   //               onChange={(e) => setUsername(e.target.value)}
//   //               fontSize="lg"
//   //             />
//   //           </FormControl>

//   //           <Button align="center" type="submit" bg="#075985" color="#075985" textColor="white" mt="4" fontSize="lg">
//   //             Save Profile
//   //           </Button>
//   //         </form>
//   //       </VStack>
//   //     </Center>
//   //     <Modal isOpen={isModalOpen} onClose={handleModalClose}>
//   //       <ModalOverlay />
//   //       <ModalContent>
//   //         <ModalHeader>Profile Updated</ModalHeader>
//   //         <ModalCloseButton />
//   //         <ModalBody>
//   //           <Text>Your profile has been changed successfully!</Text>
//   //         </ModalBody>
//   //         <ModalFooter>
//   //           <Button colorScheme="blue" onClick={handleModalClose}>
//   //             Close
//   //           </Button>
//   //         </ModalFooter>
//   //       </ModalContent>
//   //     </Modal>
//   //   </ChakraProvider>
//   // );
// }

// export default Profile;