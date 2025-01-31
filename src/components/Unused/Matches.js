// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { ChakraProvider, Box, Text, Button } from '@chakra-ui/react';
// import { useAuthContext } from '../hooks/useAuthContext';

// function Matches() {
//   const [users, setMatches] = useState(null);
//   const {user} = useAuthContext()
  
//   useEffect(() => {
//     const fetchMatches = async () => {
//         const body = JSON.stringify({ groups: user.groups })
//         const response = await fetch('/api/user/getUsers', {
//             method: 'POST', // or 'GET' depending on your server configuration
//             headers: {
//                 'Content-Type': 'application/json',
//                 // 'Authorization': 'Bearer ${user.token}' // Uncomment this line if needed
//             },
//             body: body
//         });
//         const json = await response.json();

//         if (response.ok) {
//             setMatches(json);
//             console.log(json);
//         }
//     };

//     if(user){
//       fetchMatches();
//       if (users == []) {
//         console.log("empty")
//         return;
//       }
//     }

//   }, []);
//   return (
//     <ChakraProvider>
//       <Box bg="#f0f9ff" className='home' mt={20} ml={4} mr={4}>
//         <Box className='events'>
//           {users &&
//             users.map((userD) => (
//               <Box key={userD._id} p={4} borderWidth="1px" borderRadius="md" mb={4}>
//                 <Text fontSize="lg" fontWeight="bold" mb={2}>
//                   {userD.fullName}
//                 </Text>
//                 <Text>
//                   Age: {userD.age}
//                 </Text>
//               </Box>
//             ))}
//         </Box>
//       </Box>
//     </ChakraProvider>
//   );
// }

// export default Matches;