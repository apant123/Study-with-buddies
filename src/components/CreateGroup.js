import courseOptions from './courseOptions';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { Stack, Button, Select, TextField, Typography, MenuItem } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuthContext } from "../hooks/useAuthContext";
import './DatePickerStyle.css';

const CreateGroup = () => {
  const [groupname, setGroupName] = useState(''); // Group name
  const [course, setCourse] = useState(''); // Course that group belongs to
  const [meetingDay, setMeetingDay] = useState(null); // Day group meets
  const [description, setDescription] = useState(''); // Group Description
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');
  const [location, setLocation] = useState('');  // Meeting Location
  const [meetingTime, setMeetingTime] = useState(null);  // Meeting time
  const {user} = useAuthContext();
  const navigate = useNavigate();

  const handleNextQuestion = () => {
    setError(null);

    if (groupname.length <= 4) {
        setError('Group name must be at least 5 characters.');
        return false;
    } else if (course.length === 0) {
        setError('Please choose at least one course.');
        return false;
    } else if (meetingDay == null) {
        setError('Please enter a day');
        return false;
    } else if (description.length <= 9) {
        setError('Description must be at least 10 characters.');
        return false;
    } else if (location.length === 0) {
        setError('Please enter a location.');
        return false;
    } else if (meetingTime == null) {
        setError('Please enter a time.');
        return false;
    } else if (description.length < 10) {
        setError('Description must be at least 10 characters.');
        return false;
    }

    return true;
  };

  const handleCreateGroup = async (e) => {
    setError(null);
    e.preventDefault();

    console.log({ groupname, course, meetingDay, description, location, meetingTime})

    const newGroup = {
      groupname,
      course,
      meetingDay,
      description,
      location,
      meetingTime: meetingTime ? meetingTime.toLocaleTimeString() : null,
    };

    const response = await fetch('/api/groups', {
      method: 'POST',
      body: JSON.stringify(newGroup),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();
    console.log(json._id)
    
    const groupId = json._id;
    const jsonId = {myGroups: groupId}
    console.log(JSON.stringify(jsonId))

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      try {
        const response2 = await fetch(`/api/user/addGroup/${userId}`, {
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
      } catch (error) {
        console.error('Failed to add group:', error);
      }
      setError(null);
      console.log('new group added', json);
    }

    setIsSubmitted(true);
  };

  const handleCreateAnotherGroup = () => {
    setGroupName('');
    setCourse('');
    setMeetingDay('');
    setDescription('');
    setIsSubmitted(false);
    setLocation('');
    setMeetingTime(null);
  };

  const renderEndButtons = () => {
    if (isSubmitted) {
      return (
        <Stack spacing={4} direction="row">
          <Button
            variant="contained"
            color="primary"
            sx={{
              margin: '10px',
            }}
            onClick={() => navigate('/mygroups')}
          >
            Back to My Groups
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              margin: '10px',
            }}
            onClick={handleCreateAnotherGroup}
          >
            Create Another Group
          </Button>
        </Stack>
      );
    }

    return (
      <Button
        variant="contained"
        color="primary"
        sx={{
          width:"25ch",
          justifyContent:"center", textAlign:"center", alignItems:"center"
        }}
        onClick={(e) => {
            if (handleNextQuestion()) {
                handleCreateGroup(e);
            }
        }}
      >
        Submit Group
      </Button>
    );
  };

  const renderForm = () => {
    if (isSubmitted) {
      return <p>Congratulations! Your group has been created!</p>;
    }

    return (
      <Stack direction="column" spacing={3} sx={{justifyContent:"center", alignText:"center", alignItems:"center"}}>
        <Stack direction="column">
          <Typography><b>Group Name</b></Typography>
          <TextField
            id="groupname"
            value={groupname}
            onChange={(e) => setGroupName(e.target.value)}
            sx={{width:"50ch"}}
          />
        </Stack>
        
        <Stack direction="column">
          <Typography><b>Course</b></Typography>
          <Select
            labelId="course-select-label"
            value={course}
            onChange={(course) => {setCourse(course.target.value)}}
            sx={{width:"57ch"}}
          >
            {courseOptions.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </Stack>
        
        <Stack direction="column" sx={{width:"50ch"}}>
          <Typography><b>Meeting Day</b></Typography>
          <DatePicker
            id="meetingDate"
            selected={meetingDay ? new Date(meetingDay) : null}
            onChange={(date) => setMeetingDay(date)}
            dateFormat="MM/dd/yyyy"
            minDate={new Date()}
            className="custom-date-picker"
            popperClassName="custom-popper"
          />
        </Stack>

        <Stack direction="column">
          <Typography><b>Description</b></Typography>
          <TextField
            id="description"
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            sx={{width:"50ch"}}
          />
        </Stack>

        <Stack direction="column"> 
          <Typography><b>Location</b></Typography>
          <TextField
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            sx={{width:"50ch"}}
          />
        </Stack>
        
        <Stack direction="column">
          <Typography><b>Time</b></Typography>
          <DatePicker
            id="meetingTime"
            selected={meetingTime ? new Date(meetingTime) : null}
            onChange={(time) => setMeetingTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            dateFormat="h:mm aa"
            className="custom-time-picker"
            popperClassName="custom-popper"
          />  
        </Stack>
      </Stack>
    );
};

  return (
    <>
      {user ?
      <div>
        <h1>Create a group</h1>
          <Stack maxWidth={true} direction="column" spacing={6} sx={{justifyContent:"center", alignItems:"center", display:"flex"}}>
              {renderForm()}
              {error && (
              <p style={{ color: 'red', marginTop: '10px' }}>
                  Error: {error}
              </p>
              )}
              {renderEndButtons()}
          </Stack>
      </div>
      :
      <div style={{ marginTop: 40, textAlign: 'center' }}>
        <p style={{ fontSize: 30 }}>
          <b>You are not logged in. Please login to create study groups!</b>
        </p>
        <Button variant="contained" color="primary" size="large" onClick={() => navigate('/login')}>
          Login
        </Button>
      </div>
     }
  </>
  );
};

export default CreateGroup;
