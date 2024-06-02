import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './styles.css';

// async function searchGroups() {
//   try {
//       // Connect to the MongoDB server
//       await client.connect();
//       console.log('Connected successfully to server');

//       const db = client.db(dbName);
//       const collection = db.collection('your_collection_name');
//       const courseFilter = { course: 'YourCourseName' };
      
//       const results = await collection.find(courseFilter).toArray();
      
//       console.log('Found documents:', results);
//   } finally {

//       await client.close();
//   }
// }

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
