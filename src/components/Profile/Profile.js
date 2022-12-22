import * as React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Profile() {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <Box>
        <Typography>Profile</Typography>
        <strong>{currentUser.email}</strong>
      </Box>
    </Container>
  );
}
