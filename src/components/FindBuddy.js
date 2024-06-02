import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './styles.css';

// async function searchGroups() {
//   try {
//       // Connect to the MongoDB server
//       await client.connect();
//       console.log('Connected successfully to server');

//       const db = client.db("35L");
//       const collection = db.collection('groups');
//       const courseFilter = { course: 'YourCourseName' }; // Get input from textbox ???
      
//       const results = await collection.find(courseFilter).toArray();
      
//       console.log('Found documents:', results);
//   } finally {

//       await client.close();
//   }
// }

const Group = mongoose.model('Group', GroupSchema);

// Function to search groups by course
// const searchGroupsByCourse = async (course) => {
//     try {
//         const groups = await Group.find({ course });
//         if (groups.length > 0) {
//             console.log(`Groups found for course "${course}":`);
//             groups.forEach(group => {
//                 console.log(`- Group: ${group.name}, Course: ${group.course}`);
//             });
//         } else {
//             console.log(`No groups found for course "${course}".`);
//         }
//     } catch (err) {
//         console.error('Error searching for groups:', err.message);
//     } finally {
//         mongoose.connection.close();
//     }
// };


function FindBuddy() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false); // is user logged in?

  return (
    <>
        {loggedIn ? 
          null 
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
