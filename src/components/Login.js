import React from 'react';
import { Stack, TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      style={{ minHeight: '100vh' }}
    >
      <h1>Login</h1>
      <TextField label="Username" variant="outlined" />
      <TextField label="Password" type="password" variant="outlined" />
      <Button variant="contained" color="primary">
        Login
      </Button>
      <Typography variant="body2" style={{ marginTop: 20 }}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </Typography>
    </Stack>
  );
}
