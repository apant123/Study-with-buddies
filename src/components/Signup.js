import React from 'react';
import { Stack, TextField, Button } from '@mui/material';

export default function Signup() {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      style={{ minHeight: '100vh' }}
    >
      <h1>Sign Up</h1>
      <TextField label="Username" variant="outlined" />
      <TextField label="Email" type="email" variant="outlined" />
      <TextField label="Password" type="password" variant="outlined" />
      <Button variant="contained" color="primary">
        Sign Up
      </Button>
    </Stack>
  );
}
