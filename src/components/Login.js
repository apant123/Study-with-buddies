
import React, { useState } from 'react';
import { Stack, TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
// import { login } from '../services/api';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // const handleLogin = async () => {
  //   try {
  //     const response = await login({ username, password });
  //     localStorage.setItem('token', response.token);
  //     navigate('/profile');
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      style={{ minHeight: '100vh' }}
    >
      <h1>Login</h1>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary">
        Login
      </Button>
      <Typography variant="body2" style={{ marginTop: 20 }}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </Typography>
    </Stack>
  );
}
